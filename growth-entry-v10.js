(function(){
  const tg=window.Telegram?.WebApp;
  const raw=String(tg?.initDataUnsafe?.user?.language_code||navigator.language||document.documentElement.lang||"pt").toLowerCase();
  const lang=raw.startsWith("en")?"en":raw.startsWith("es")?"es":raw.startsWith("ru")?"ru":"pt";
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
  if(affiliate)affiliate.href=`./affiliate.html?lang=${encodeURIComponent(lang)}`;
  if(publish)publish.href=`./publish.html?lang=${encodeURIComponent(lang)}`;
})();
