const assert=require("node:assert/strict");
const fs=require("node:fs");
const {chromium,webkit}=require("playwright");
const ROOT="http://127.0.0.1:8765";
async function scenario(engine,language){
  const isSafari=engine===webkit;
  const browser=await engine.launch(isSafari?{headless:true}:{headless:true,channel:"chrome",args:["--no-sandbox"]});
  try{
    const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,locale:({pt:"pt-BR",en:"en-US",es:"es-ES",ru:"ru-RU"}[language]),acceptDownloads:true});
    const page=await context.newPage(),errors=[];
    page.on("pageerror",error=>errors.push(error.message));
    page.on("dialog",dialog=>dialog.dismiss());
    await page.route(ROOT+"/audit-share.html",route=>route.fulfill({
      status:200,contentType:"text/html",body:'<!doctype html><html lang="pt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><div id="content"></div></body></html>'
    }));
    await page.goto(ROOT+"/audit-share.html");
    await page.evaluate(language=>{
      window.__EDUCASHPRO_SESSION__={token:"test-session",profile:{userId:"sharing-test-account",active:true,language,email:"owner@example.test"}};
      window.EduCashProNavigation={stamp:()=>1,isCurrent:()=>true};
      window.EduCashProAccess={snapshot:()=>({known:true,active:true}),isActive:()=>true};
      window.__fake={createCalls:0,createPayloads:[],failCreate:true,workspace:null,members:[],calls:[],months:{"2026-10":{income:1234,currency:"BRL",expenses:[{id:"item-1",amount:113.85,category:"education",description:"ChatGPT",date:"2026-10-27",paid:true,createdAt:Date.now()}]}}};
      window.EduCashProApp={rememberRoute(){},openSubscription(){},
        financeApi:async (path,payload={})=>{
          const f=window.__fake;
          f.calls.push(path);
          if(path.endsWith("/list"))return{ok:true,workspaces:f.workspace?[{...f.workspace,members:f.members}]:[]};
          if(path.endsWith("/share/create")){
            f.createCalls+=1;
            f.createPayloads.push(payload);
            if(f.failCreate)throw Error("verified_email_required");
            f.workspace={workspaceId:"mfw_test",role:"owner",ownerActive:true,memberActive:true,canOpen:true,canShare:true,canExportPdf:true,canEdit:true,updatedAt:"2026-10-27T15:00:00.000Z"};
            return{ok:true,created:true,workspace:f.workspace};
          }
          if(path.endsWith("/owner-data"))return{ok:true,months:f.months,updatedAt:f.workspace?.updatedAt};
          if(path.endsWith("/share/resolve"))return{ok:true,person:{displayName:"Pessoa Teste",email:payload.email,active:false}};
          if(path.endsWith("/share/invite")){
            f.members.push({email:payload.email,displayName:"Pessoa Teste",slotType:"guest",userId:"guest-1"});
            return{ok:true,member:f.members[f.members.length-1]};
          }
          if(path.endsWith("/share/remove")){
            f.members=f.members.filter(m=>m.email!==payload.email);
            return{ok:true,removed:true};
          }
          if(path.endsWith("/share/sync"))return{ok:true,updatedAt:new Date().toISOString()};
          if(path.endsWith("/month"))return{ok:true,record:f.months[payload.month]||{income:0,expenses:[]},workspace:{...f.workspace,canEdit:true}};
          return{ok:true};
        }
      };
      localStorage.setItem("educashpro:monthly-finance:sharing-test-account",JSON.stringify(window.__fake.months));
    },language);
    await page.addScriptTag({url:ROOT+"/resource-loader.js"});
    await page.addScriptTag({url:ROOT+"/local-tools-and-games.js"});
    await page.evaluate(()=>window.EduCashProLocal.openTool("monthly-finance"));
    await page.locator("#financeStart").click();
    await page.locator("#financeShareAction").click();
    await page.locator("#financeShareCreate").waitFor({timeout:12000});
    assert.equal(await page.evaluate(()=>window.__fake.createCalls),0,"Sharing may not upload financial data without explicit activation");
    await page.locator("#financeShareCreate").click();
    await page.locator("#financeShareStatus").getByText(({pt:"Confirme seu e-mail cadastrado",en:"Verify your registered",es:"Verifica tu correo registrado",ru:"Подтвердите адрес электронной почты"}[language])).waitFor({timeout:10000});
    assert.equal(await page.evaluate(()=>window.__fake.createCalls),1,"Failed activation must be counted and remain retryable");
    await page.evaluate(()=>window.__fake.failCreate=false);
    await page.locator("#financeShareCreate").click();
    await page.locator("#financeLookupForm").waitFor({timeout:10000});
    assert.equal(await page.evaluate(()=>window.__fake.createCalls),2,"Only explicit retry creates shared workspace");
    assert.deepEqual(await page.evaluate(()=>window.__fake.createPayloads[1]),{},"Personal history must not be sent when creating a shared control");
    await page.locator("#financeInviteEmail").fill("guest@example.test");
    await page.locator("#financeLookupForm button[type=submit], #financeLookupForm button").first().click();
    await page.locator("#financeConfirmPerson").waitFor({timeout:10000});
    await page.locator("#financeConfirmPerson").click();
    await page.locator('[data-remove-member="guest@example.test"]').waitFor({timeout:12000});
    assert.equal(await page.evaluate(()=>window.__fake.members.length),1,"Invited member did not appear");
    await page.locator('[data-remove-member="guest@example.test"]').click();
    await page.waitForFunction(()=>window.__fake.members.length===0);
    await page.locator("#financeShareBack").click();
    // Personal and shared views are separate; both participants open the same shared workspace.
    await page.locator('[data-open-shared="mfw_test"]').click();
    await page.locator("#financeViewerPdf").waitFor({timeout:15000});
    assert.equal(await page.locator("#financeSharedWorkspaceRoot").count(),1,"Owner must open canonical shared ledger");
    await page.waitForFunction(()=>typeof window.EduCashProPdf?.exportHtml==="function",{timeout:10000});
    if(!isSafari){
      const bundle=require.resolve("html2pdf.js/dist/html2pdf.bundle.min.js");
      await page.addScriptTag({path:bundle});
      await page.evaluate(()=>{
        const exportOriginal=window.EduCashProPdf.exportHtml;
        window.EduCashProPdf.exportHtml=async (html,config)=>{
          window.__pdfReport={html,filename:config.filename};
          return exportOriginal(html,config);
        };
      });
      const waitDownload=page.waitForEvent("download",{timeout:35000});
      await page.locator("#financeViewerPdf").click();
      const download=await waitDownload;
      assert.match(download.suggestedFilename(),/^educashpro-financas-\d{4}-\d\d\.pdf$/);
      const path=await download.path();
      const bytes=fs.readFileSync(path);
      assert(bytes.subarray(0,5).toString()==="%PDF-","Downloaded file is not a PDF");
      assert(bytes.length>1500,"Generated PDF is unexpectedly empty");
      const rendered="/tmp/educashpro-finance-"+language;
      execFileSync("pdftoppm",["-f","1","-l","1","-r","150","-png","-singlefile",path,rendered]);
      const visibleText=execFileSync("tesseract",[rendered+".png","stdout"],{encoding:"utf8",stdio:["ignore","pipe","ignore"]});
      assert.match(visibleText,/ChatGPT/i,"Generated PDF does not visibly render the saved expense");
      const report=await page.evaluate(()=>window.__pdfReport);
      assert(report.html.includes("EduCashPro"),"Report lacks EduCashPro branding");
      assert(report.html.includes("ChatGPT"),"Report lacks saved expense entries");
      assert(report.html.includes(({pt:"Criado com",en:"Created with",es:"Creado con",ru:"Создано с помощью"}[language])),"Report lacks translated creator footer");
      console.log("REAL_FINANCE_PDF_PASS "+JSON.stringify({bytes:bytes.length,filename:download.suggestedFilename()}));
    }
    await page.evaluate(()=>{
      window.EduCashProPdf.exportHtml=async()=>{throw Error("pdf_download_unavailable_test")};
    });
    await page.locator("#financeViewerPdf").click();
    await page.locator(".financePrintFallback").waitFor({timeout:10000});
    assert((await page.locator(".financePrintFallback").innerText()).includes(({pt:"salvar como PDF",en:"save as PDF",es:"guardar como PDF",ru:"сохранить PDF"}[language])),"Safari fallback must offer print to PDF");
    await page.locator("#financePrintClose").click();
    assert.equal(await page.locator(".financePrintFallback").count(),0,"PDF fallback dialog cannot close");
    assert.deepEqual(errors,[],"Client-side errors");
    console.log("FINANCE_SHARE_PDF_PASS "+(isSafari?"safari-webkit":"chrome")+" "+JSON.stringify({createCalls:await page.evaluate(()=>window.__fake.createCalls),invited:await page.evaluate(()=>window.__fake.members.length)}));
    await context.close();
  }finally{await browser.close();}
}
(async()=>{for(const language of ["pt","en","es","ru"])await scenario(process.env.TEST_WEBKIT==="1"?webkit:chromium,language)})().catch(e=>{console.error(e.stack||e);process.exitCode=1});
