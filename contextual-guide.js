(function(){
"use strict";
if(window.EduCashProContextGuide)return;
const IDS={
areaProfessional:"professional",editProfilePhoto:"profile-photo",areaLinkPage:"link-page",areaAgenda:"agenda",
areaAccountSettings:"account",areaLanguage:"account",areaPreferences:"notifications",membershipProof:"credential",areaNetwork:"affiliate",
areaSubscription:"subscription",areaSmartLink:"smart-link",areaAffiliate:"affiliate",affiliateQr:"affiliate",
areaSupport:"troubleshoot",areaDocuments:"account",manageProjects:"project-register",
areaAdminEntry:"admin",openHelpCenter:"start",
copyLink:"affiliate",gameHistory:"games",offerBenefit:"benefit-offer",
openProjection:"affiliate-calc",reactivate:"subscription",
accountCenterButton:"account",loadAreaProjects:"project-register",
finPdfAction:"finance-pdf",financePdfAction:"finance-pdf",financeShareAction:"finance-share",
marketExpand:"market-chart"
};
const FEATURE={
academy:"academy",technical:"market-chart",financial:"academy",telegram:"telegram",tools:"tools",
"finance-control":"monthly-finance",games:"games",explore:"explore",benefits:"benefits",
marketplace:"marketplace",professional:"professional",links:"link-page",agenda:"agenda",
"smart-link":"smart-link",credential:"credential",affiliate:"affiliate",
network:"affiliate",subscription:"subscription",support:"troubleshoot",admin:"admin",
"network_marketing":"academy","financial_education":"academy",
"technical_analysis":"market-chart","free_courses":"free_courses",
"math-space":"math-space","peg-solitaire":"peg-solitaire",
"sliding-puzzle":"sliding-puzzle","word-search":"word-search","math-academy":"math-academy",
"monthly-finance":"monthly-finance","receivables":"receivables","quote":"quote",
"link-page":"link-page","qr-code":"qr-code","randomizers":"randomizers",
"games":"games","affiliate-calc":"affiliate-calc","affiliate":"affiliate",
"professional":"professional", "my-qr":"credential",
"pair-device":"device-pairing", "language":"account", "preferences":"notifications",
"settings":"account", "documents":"account", "profile-photo":"profile-photo",
"publish":"project-register","projects":"project-register",
"marketplace-company":"marketplace",
"chart":"market-chart","technical":"market-technical",
"heatmap":"market-heatmap","calendar":"market-calendar","fibonacci":"market-fibonacci",
"services":"agenda-services","clients":"agenda-clients","team":"agenda-team",
"finance":"agenda-finance","agenda":"agenda","settings":"agenda-settings"
};
const MANUAL={
home:"start",learn:"academy",academy:"academy",account:"account",
subscription:"subscription",affiliate:"affiliate",professional:"professional",
agenda:"agenda",links:"links","monthly-finance":"finance",tools:"tools",games:"games",
explore:"explore",benefits:"benefits",telegram:"telegram",admin:"account",
"troubleshoot":"troubleshoot","financial_education":"academy"
};
const ACCESS={
"free_courses":"free","book-business-21":"free","set-for-life":"free","fundamentos_marketing_rede":"free",
"marketing_rede_educashpro":"subscriber","profissionalize_telegram":"subscriber",
"analise_tecnica_completa":"free","liberdade_financeira_assinantes":"subscriber",
"monthly-finance":"mixed","receivables":"limited","quote":"limited",
"affiliate-calc":"free","link-page":"limited","smart-link":"limited","qr-code":"free",
"randomizers":"free","games":"mixed","math-space":"mixed","peg-solitaire":"mixed",
"sliding-puzzle":"mixed","word-search":"mixed","math-academy":"mixed",
"agenda":"subscriber","agenda-settings":"subscriber","agenda-services":"subscriber",
"agenda-clients":"subscriber","agenda-team":"subscriber","agenda-finance":"subscriber",
"market-chart":"subscriber","market-technical":"subscriber",
"market-fibonacci":"free","market-calendar":"free","market-heatmap":"free",
"marketplace":"free","company-register":"subscriber","project-register":"subscriber",
"benefit-offer":"subscriber","profile-photo":"account","device-pairing":"account",
"notifications":"account","credential":"account","professional":"subscriber","finance-share":"mixed",
"finance-pdf":"mixed","wallet":"account"
};
const COPY={
pt:{title:"Como usar esta função",steps:"Passo a passo para começar",tip:"Importante",close:"Entendi, continuar",reopen:"Como usar",loading:"Preparando a explicação…",error:"Não foi possível abrir a orientação completa. Consulte a Central de Ajuda.",free:"Gratuito",mixed:"Livre com recursos adicionais",limited:"Gratuito com limites",subscriber:"Assinatura ativa",account:"Conta necessária",admin:"Administrador",more:"Orientações detalhadas em quatro idiomas",hide:"Fechar botão de ajuda"},
en:{title:"How to use this feature",steps:"Step-by-step instructions",tip:"Important",close:"Got it, continue",reopen:"How to use",loading:"Preparing your guide…",error:"The full guide could not be opened. Please use the Help Center.",free:"Free",mixed:"Free with extra features",limited:"Free with limits",subscriber:"Active subscription",account:"Account required",admin:"Administrator",more:"Detailed guidance in four languages",hide:"Hide help button"},
es:{title:"Cómo usar esta función",steps:"Instrucciones paso a paso",tip:"Importante",close:"Entendido, continuar",reopen:"Cómo usar",loading:"Preparando la explicación…",error:"No se pudo abrir la guía completa. Consulta el Centro de Ayuda.",free:"Gratis",mixed:"Gratis con funciones adicionales",limited:"Gratis con límites",subscriber:"Suscripción activa",account:"Cuenta necesaria",admin:"Administrador",more:"Instrucciones detalladas en cuatro idiomas",hide:"Ocultar botón de ayuda"},
ru:{title:"Как пользоваться функцией",steps:"Пошаговая инструкция",tip:"Важно",close:"Понятно, продолжить",reopen:"Как пользоваться",loading:"Подготавливаем инструкцию…",error:"Не удалось открыть полное руководство. Используйте Справочный центр.",free:"Бесплатно",mixed:"Бесплатно с дополнительными функциями",limited:"Бесплатно с ограничениями",subscriber:"Активная подписка",account:"Нужен аккаунт",admin:"Администратор",more:"Подробные инструкции на четырёх языках",hide:"Скрыть кнопку справки"}
};
const SITE_KEYS=new Set(["home","learn","explore","benefits","area","tools","presentation"]);
const I={
"network_projection":"affiliate-calc",
"monthly-finance:overview":"monthly-finance",
"monthly-finance:share":"finance-share"
};
let current="",openId="",generation=0,root=null,dismissedFor="";
const loaded=new Map();
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function lang(){
 const value=String(window.EduCashProLocale?.resolve?.()||window.__EDUCASHPRO_SESSION__?.profile?.language||document.documentElement.lang||navigator.language||"pt").toLowerCase().slice(0,2);
 return COPY[value]?value:"pt";
}
const ui=(name,l=lang())=>COPY[l]?.[name]||COPY.pt[name]||name;
function script(src){
 if(window.EduCashProResources?.script)return window.EduCashProResources.script("./"+src);
 return new Promise((res,rej)=>{const e=document.createElement("script");e.src="./"+src;e.onload=res;e.onerror=rej;document.head.appendChild(e)});
}
async function data(id,l){
 if(!loaded.has(l)){
  loaded.set(l,Promise.all([script("contextual-guides-"+l+".js"),script("support-manual.js")]).catch(error=>{loaded.delete(l);throw error}));
 }
 await loaded.get(l);
 const special=window.EduCashProGuideTranslations?.[l]?.[id];
 if(special && special[2]?.length>=4)return {title:special[0],summary:special[1],steps:special[2],tip:special[3]};
 const fallback=MANUAL[id]||id;
 const article=window.EduCashProSupportManual?.articles?.(l)?.find(x=>x.id===fallback);
 if(!article)throw new Error("guide_missing_"+id+"_"+l);
 return{title:article.title,summary:article.purpose||article.summary,steps:article.steps,tip:article.tip,where:article.where};
}
function close(){
 generation++;
 if(root){root.remove();root=null}
 openId="";
 updateButton();
}
function render(id,doc,l){
 if(!root||openId!==id)return;
 const status=ACCESS[id]||window.EduCashProFeatures?.get?.(id)?.access||"";
 const badge=status?'<span class="ecpGuideBadge">'+esc(ui(status,l))+'</span>':"";
 const where=doc.where?'<p class="ecpGuideWhere">📍 '+esc(doc.where)+'</p>':"";
 const card=root.querySelector(".ecpGuideCard");if(!card)return;
 card.innerHTML='<header class="ecpGuideHeader"><span class="ecpGuideEyebrow">❔ '+esc(ui("title",l))+'</span><button class="ecpGuideX" aria-label="'+esc(ui("close",l))+'" type="button">✕</button></header>'+
 '<h2 id="ecpGuideTitle">'+esc(doc.title)+'</h2>'+badge+'<p class="ecpGuideSummary">'+esc(doc.summary)+'</p>'+where+
 '<h3>'+esc(ui("steps",l))+'</h3><ol class="ecpGuideSteps">'+doc.steps.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ol>'+
 (doc.tip?'<aside class="ecpGuideTip"><strong>'+esc(ui("tip",l))+'</strong><p>'+esc(doc.tip)+'</p></aside>':"")+
 '<button class="ecpGuideDone" type="button">'+esc(ui("close",l))+'</button>';
 card.querySelector(".ecpGuideX").onclick=close;
 card.querySelector(".ecpGuideDone").onclick=close;
}
function open(id){
 if(!id)return;
 const l=lang(),serial=++generation;
 close();
 generation=serial;
 openId=id;current=id;updateButton();
 root=document.createElement("div");root.id="ecpGuideOverlay";root.className="ecpGuideOverlay";root.setAttribute("role","presentation");
 root.innerHTML='<div class="ecpGuideBackdrop" data-ecp-guide-dismiss></div><section class="ecpGuideCard" role="dialog" aria-modal="true" aria-labelledby="ecpGuideTitle"><div class="ecpGuideLoading" id="ecpGuideTitle">'+esc(ui("loading",l))+'</div><button class="ecpGuideDone" type="button">'+esc(ui("close",l))+'</button></section>';
 document.body.appendChild(root);
 updateButton();
 root.querySelector("[data-ecp-guide-dismiss]").onclick=close;
 root.querySelector(".ecpGuideDone").onclick=close;
 data(id,l).then(doc=>{if(serial===generation&&openId===id)render(id,doc,l)}).catch(()=>{if(serial!==generation||!root)return;render(id,{title:ui("title",l),summary:ui("error",l),steps:[],tip:""},l)});
}
function updateButton(){
 if(!document.body)return;
 let launcher=document.getElementById("ecpContextGuideLauncher");
 if(!launcher){
  launcher=document.createElement("div");
  launcher.id="ecpContextGuideLauncher";
  launcher.className="ecpContextGuideLauncher";
  launcher.innerHTML='<button type="button" id="ecpContextGuideButton" class="ecpContextGuideButton"></button>'+
    '<button type="button" id="ecpContextGuideDismiss" class="ecpContextGuideDismiss" aria-label="Hide help button">✕</button>';
  document.body.appendChild(launcher);
  launcher.querySelector("#ecpContextGuideButton").onclick=()=>root?close():open(current);
  launcher.querySelector("#ecpContextGuideDismiss").onclick=()=>{
    dismissedFor=current;
    close();
  };
 }
 const button=launcher.querySelector("#ecpContextGuideButton");
 button.textContent="❔ "+ui("reopen");
 button.setAttribute("aria-expanded",root?"true":"false");
 const hide=launcher.querySelector("#ecpContextGuideDismiss");
 hide.title=ui("hide");
 hide.setAttribute("aria-label",ui("hide"));
 launcher.hidden=!current||current==="home"||dismissedFor===current;
}
function setContext(id){
 if(!id||id==="home"){
   current="";
   dismissedFor="";
   close();
   return;
 }
 if(current!==id){
   current=id;
   dismissedFor="";
   close();
 }
 updateButton();
}
function resolve(target){
 if(!(target instanceof Element)||target.closest("#ecpGuideOverlay")||target.closest("#ecpContextGuideButton"))return"";
 const matched=target.closest("[data-tool-id],[data-course],[data-academy-category],[data-play],[data-tournament],[data-open-game],[data-market-widget],[data-fin-card],[data-action],[data-target],[data-view],[data-book-chapter],[data-reader-chapter],button[id],a[href]");
 if(!matched)return"";
 const d=matched.dataset;
 if(d.course)return d.course;
 if(d.academyCategory)return FEATURE[d.academyCategory]||d.academyCategory;
 if(d.toolId)return d.toolId;
 if(d.play)return FEATURE[d.play]||d.play;
 if(d.tournament)return FEATURE[d.tournament]||"games";
 if(d.openGame)return d.openGame==="peg"?"peg-solitaire":d.openGame==="sliding"?"sliding-puzzle":"games";
 if(d.marketWidget)return FEATURE[d.marketWidget]||"market-chart";
 if(d.finCard)return d.finCard==="0"?"receivables":"quote";
 const onAgenda=/\/agenda\.html$/i.test(location.pathname);
 if(d.view)return onAgenda?(FEATURE[d.view]||"agenda"):(SITE_KEYS.has(d.view)?({learn:"academy",explore:"explore",benefits:"benefits",area:"account",tools:"tools",home:"home",presentation:"start"}[d.view]):"");
 if(d.target)return FEATURE[d.target]||MANUAL[d.target]||"";
 if(d.action){if(d.action==="settings")return"account";return FEATURE[d.action]||"";}
 if(matched.id&&IDS[matched.id])return IDS[matched.id];
 if(matched.tagName==="A"){const href=matched.getAttribute("href")||"";if(href.includes("marketplace.html"))return"marketplace";if(href.includes("agenda.html"))return"agenda";if(href.includes("support.html"))return"troubleshoot"}
 if(d.bookChapter!==undefined)return "book-business-21";
 return"";
}
document.addEventListener("click",event=>{
 const id=resolve(event.target);
 if(!id)return;
 if(id==="home"){setContext("");return}
 const src=event.target?.closest?.("a[href]");
 if(src&&/\\.(html)(\\?|$)/i.test(src.getAttribute("href")||"")){
   try{sessionStorage.setItem("educashpro:context-guide-next",id)}catch{}
   return;
 }
 // Navigation selects help context; only the small button opens instructions.
 setTimeout(()=>setContext(id),120);
},true);
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&root)close()});
document.addEventListener("DOMContentLoaded",()=>{
 let target="";
 try{
   target=sessionStorage.getItem("educashpro:context-guide-next")||"";
   sessionStorage.removeItem("educashpro:context-guide-next");
 }catch{}
 const page=String(location.pathname||"");
 if(!target){
   if(/\/agenda\.html$/i.test(page))target="agenda";
   else if(/\/marketplace\.html$/i.test(page))target="marketplace";
   else if(/\/affiliate\.html$/i.test(page))target="affiliate";
   else if(/\/publish\.html$/i.test(page))target="project-register";
   else if(/\/support\.html$/i.test(page))target="troubleshoot";
 }
 if(!target){
   try{
     const query=new URL(location.href).searchParams;
     const direct=query.get("course")||query.get("academy")||"";
     if(direct){target=FEATURE[direct]||direct.split(":")[0];}
   }catch{}
 }
 updateButton();
 if(target)setTimeout(()=>setContext(target),280);
});
window.EduCashProContextGuide={open,close,setContext,available:id=>Boolean(ACCESS[id]||MANUAL[id]||FEATURE[id]||IDS[id]),keys:{features:FEATURE,ids:IDS,access:ACCESS}};
})();
