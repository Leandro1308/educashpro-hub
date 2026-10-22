(function () {
  "use strict";

  const replacements = new Map([
    ["Mostre este QR Code ao parceiro. A validação não consulta Render nem MongoDB.", "Mostre este QR Code ao parceiro para confirmar sua assinatura EduCashPro."],
    ["Show this QR Code to the partner. Validation does not query Render or MongoDB.", "Show this QR Code to the partner to confirm your EduCashPro membership."],
    ["Muestra este QR al socio. La validación no consulta Render ni MongoDB.", "Muestra este QR al socio para confirmar tu suscripción a EduCashPro."],
    ["Покажите QR партнёру. Проверка не обращается к Render или MongoDB.", "Покажите QR партнёру для подтверждения подписки EduCashPro."]
  ]);

  const blocked = /\b(Render|MongoDB|GitHub|Cloudinary|Redis|Node\.js|Express|Telegraf|backend|frontend|endpoint|deploy|repository|reposit[oó]rio|localStorage)\b/i;
  let queued=false;

  function cleanText(value) {
    const exact = replacements.get(value);
    if (exact !== undefined) return exact;
    if (!blocked.test(value)) return value;
    const parts = String(value).split(/(?<=[.!?])\s+/);
    return parts.filter((part) => !blocked.test(part)).join(" ").trim();
  }

  function cleanNode(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      const parent = root.parentElement;
      if (!parent || /^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE)$/i.test(parent.tagName)) return;
      const original = root.nodeValue || "";
      const cleaned = cleanText(original);
      if (cleaned !== original) root.nodeValue = cleaned;
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;
    if (root.nodeType === Node.ELEMENT_NODE && /^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE)$/i.test(root.tagName)) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) cleanNode(walker.currentNode);
  }

  function run() {
    if(queued) return;
    queued=true;
    const execute=()=>{
      queued=false;
      cleanNode(document.getElementById("content"));
      cleanNode(document.querySelector(".growthQuickActions"));
      cleanNode(document.getElementById("accessModal"));
    };
    if(typeof requestAnimationFrame==="function") requestAnimationFrame(execute);
    else setTimeout(execute,16);
  }

  if(window.EduCashProRuntime?.onRender){
    window.EduCashProRuntime.onRender(run);
    document.addEventListener("DOMContentLoaded",run,{once:true});
  }else{
    document.addEventListener("DOMContentLoaded",()=>{
      run();
      const content=document.getElementById("content");
      if(!content) return;
      const observer=new MutationObserver(run);
      observer.observe(content,{childList:true,subtree:true});
    },{once:true});
  }
})();
