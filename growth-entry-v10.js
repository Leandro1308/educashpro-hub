(function(){
  const tg=window.Telegram?.WebApp;
  const raw=String(tg?.initDataUnsafe?.user?.language_code||navigator.language||document.documentElement.lang||"en").toLowerCase();
  const lang=window.EduCashProLocale?.resolve() || (raw.startsWith("pt")?"pt":raw.startsWith("es")?"es":raw.startsWith("ru")?"ru":"en");
  const copy={
    pt:{affiliate:"Meu Link de Afiliado",publish:"Publicar projeto"},
    en:{affiliate:"My Affiliate Link",publish:"Publish project"},
    es:{affiliate:"Mi Enlace de Afiliado",publish:"Publicar proyecto"},
    ru:{affiliate:"Моя партнёрская ссылка",publish:"Опубликовать проект"}
  }[lang];
  const affiliate=document.getElementById("affiliateQuickAction");
  const publish=document.getElementById("publishQuickAction");
  const affiliateLabel=document.getElementById("affiliateQuickLabel");
  const publishLabel=document.getElementById("publishQuickLabel");
  if(affiliateLabel)affiliateLabel.textContent=copy.affiliate;
  if(publishLabel)publishLabel.textContent=copy.publish;
  if(affiliate){const code=String(window.__EDUCASHPRO_SESSION__?.profile?.referralCode||"").trim().toUpperCase();affiliate.href=`./affiliate.html?lang=${encodeURIComponent(lang)}${code?`&ref=${encodeURIComponent(code)}`:""}`;}
  if(publish)publish.href=`./publish.html?lang=${encodeURIComponent(lang)}`;
})();
