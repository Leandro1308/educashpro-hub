const assert=require("node:assert/strict");
const {chromium,webkit}=require("playwright");
const BASE="http://127.0.0.1:8765";
async function scenario(engine) {
  const browser=await engine.launch(engine===chromium?{headless:true,channel:"chrome",args:["--no-sandbox"]}:{headless:true});
  try{
    const state={revision:1,workspaceId:"mfw_family",updatedAt:"2026-10-27T14:00:00.000Z",
      months:{"2026-10":{income:1000,currency:"BRL",expenses:[]}}};
    const clone=x=>structuredClone(x);
    const cloud=async(actor,path,payload={})=>{
      const ws={workspaceId:state.workspaceId,role:actor==="owner"?"owner":"member",
        ownerName:"EduCashPro Família",canEdit:true,canOpen:true,canExportPdf:actor==="owner",canShare:actor==="owner",
        participants:[{userId:"owner",displayName:"Leandro"},{userId:"guest",displayName:"Andrea"}], ownerActive:true,memberActive:actor==="owner",revision:state.revision,updatedAt:state.updatedAt};
      if(path.endsWith("/list"))return {ok:true,workspaces:[clone(ws)]};
      if(path.endsWith("/owner-data"))return {ok:true,months:clone(state.months),revision:state.revision,updatedAt:state.updatedAt};
      if(path.endsWith("/month"))return {ok:true,workspace:clone(ws),
        record:clone(state.months[payload.month]||{income:0,currency:"BRL",expenses:[]})};
      const record=state.months[payload.month]||={income:0,currency:"BRL",expenses:[]};
      if(path.endsWith("/income"))record.income=Number(payload.income);
      else if(path.endsWith("/currency"))record.currency=payload.currency;
      else if(path.endsWith("/expense")){
        if(payload.action==="add"){
          record.expenses.unshift({...clone(payload.expense),payerName:payload.expense.payerUserId==="owner"?"Leandro":payload.expense.payerUserId==="guest"?"Andrea":null,id:"expense-"+(state.revision+1)});
        }else if(payload.action==="update"){
          const item=record.expenses.find(x=>x.id===payload.expenseId);
          if(!item)throw Error("expense_not_found");
          Object.assign(item,{amount:payload.amount,category:payload.category,description:payload.description,date:payload.date,paid:payload.paid,payerUserId:payload.payerUserId,payerName:payload.payerUserId==="owner"?"Leandro":payload.payerUserId==="guest"?"Andrea":null});
        }else if(payload.action==="remove")record.expenses=record.expenses.filter(x=>x.id!==payload.expenseId);
      }else throw Error("Unexpected path "+path);
      state.revision++;
      return {ok:true,record:clone(record),revision:state.revision};
    };
    async function createClient(actor){
      const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,locale:"pt-BR"});
      const page=await context.newPage(),errors=[];
      page.on("pageerror",error=>errors.push(error.message));
      await page.exposeFunction("ledgerRequest",(path,payload)=>cloud(actor,path,payload));
      await page.route(BASE+"/shared-ledger-audit.html",route=>route.fulfill({status:200,contentType:"text/html",body:'<!doctype html><html lang="pt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><div id="content"></div></body></html>'}));
      await page.goto(BASE+"/shared-ledger-audit.html");
      await page.evaluate(()=>{window.EduCashProNavigation={stamp:()=>1,isCurrent:()=>true};window.EduCashProApp={rememberRoute(){}}});
      await page.addScriptTag({url:BASE+"/monthly-finance-sharing.js"});
      await page.evaluate(async(actor)=>{
        await window.EduCashProFinanceShare.init({
          language:"pt",active:actor==="owner",
          session:{profile:{userId:actor,email:actor+"@example.test"}},
          api:(path,payload)=>window.ledgerRequest(path,payload),
          read:()=>({}),hydrate:()=>{},
          markSynced(){},saveBaseline(){},hasPending:()=>false,
          backToFinance:()=>{document.getElementById("content").innerHTML="Voltar"}
        });
        await window.EduCashProFinanceShare.openViewer("mfw_family","2026-10");
      },actor);
      await page.locator("#financeSharedWorkspaceRoot").waitFor();
      return {page,context,errors};
    }
    const owner=await createClient("owner"),guest=await createClient("guest");
    const summary=async page=>page.locator(".financeSummary strong").allTextContents();
    assert.deepEqual(await summary(owner.page),await summary(guest.page));
    // The owner adds a charge; the guest should see the same totals on focus.
    await owner.page.locator("#sharedExpenseValue").fill("113.85");
    await owner.page.locator("#sharedExpenseCategory").selectOption("education");
    await owner.page.locator("#sharedExpenseDescription").fill("ChatGPT");
    await owner.page.locator("#sharedExpenseDate").fill("2026-10-27");
    await owner.page.locator("#sharedExpensePayer").selectOption("owner");
    await owner.page.locator("#sharedExpenseSave").click();
    await owner.page.getByText("ChatGPT",{exact:true}).waitFor();
    await guest.page.evaluate(()=>window.dispatchEvent(new Event("focus")));
    await guest.page.getByText("ChatGPT",{exact:true}).waitFor();
    assert.deepEqual(await summary(owner.page),await summary(guest.page),"Both devices must display identical balance");
    // The guest corrects the expense; the owner receives the same amount.
    await guest.page.locator('[data-shared-edit]').first().click();
    await guest.page.locator("#sharedExpenseValue").fill("120");
    await guest.page.locator("#sharedExpenseDescription").fill("ChatGPT compartilhado");
    await guest.page.locator("#sharedExpenseSave").click();
    await guest.page.getByText("ChatGPT compartilhado",{exact:true}).waitFor();
    await owner.page.evaluate(()=>window.dispatchEvent(new Event("focus")));
    await owner.page.getByText("ChatGPT compartilhado",{exact:true}).waitFor();
    assert.deepEqual(await summary(owner.page),await summary(guest.page),"Guest edits must update owner balance");
    // Simultaneous owner and guest inserts must both survive.
    for(const [client,name] of [[owner,"Educação"],[guest,"Mercado"]]){
      await client.page.locator("#sharedExpenseValue").fill("25");
      await client.page.locator("#sharedExpenseCategory").selectOption("food");
      await client.page.locator("#sharedExpenseDescription").fill(name);
      await client.page.locator("#sharedExpenseDate").fill("2026-10-27");
      await client.page.locator("#sharedExpensePayer").selectOption(client===owner?"owner":"guest");
    }
    await Promise.all([owner.page.locator("#sharedExpenseSave").click(),guest.page.locator("#sharedExpenseSave").click()]);
    await owner.page.getByText("Educação",{exact:true}).waitFor();
    await guest.page.getByText("Mercado",{exact:true}).waitFor();
    await owner.page.evaluate(()=>window.dispatchEvent(new Event("focus")));
    await guest.page.evaluate(()=>window.dispatchEvent(new Event("focus")));
    await owner.page.getByText("Mercado",{exact:true}).waitFor();
    await guest.page.getByText("Educação",{exact:true}).waitFor();
    assert.equal(state.months["2026-10"].expenses.length,3);
    assert.equal(state.months["2026-10"].expenses.reduce((a,x)=>a+x.amount,0),170);
    assert.deepEqual(await summary(owner.page),await summary(guest.page));
    assert.match(await owner.page.locator(".financePanel").first().innerText(),/Leandro/);
    assert.match(await owner.page.locator(".financePanel").first().innerText(),/Andrea/);
    assert.equal(state.months["2026-10"].expenses.filter(x=>x.payerUserId==="owner").reduce((a,x)=>a+x.amount,0),145);
    assert.equal(state.months["2026-10"].expenses.filter(x=>x.payerUserId==="guest").reduce((a,x)=>a+x.amount,0),25);
    assert.deepEqual(owner.errors,[],"Owner browser errors");
    assert.deepEqual(guest.errors,[],"Guest browser errors");
    console.log("SHARED_LEDGER_TWO_USERS_PASS engine="+(engine===chromium?"chrome":"webkit")+" revision="+state.revision+" expenses="+state.months["2026-10"].expenses.length+" total=170");
    await owner.context.close();await guest.context.close();
  }finally{await browser.close()}
}
scenario(process.env.FINANCE_TEST_WEBKIT==="1"?webkit:chromium).catch(error=>{console.error(error.stack||error);process.exitCode=1});
