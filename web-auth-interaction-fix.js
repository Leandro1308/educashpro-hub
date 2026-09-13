(function(){
  const platform=window.EduCashProPlatform;
  const auth=window.EduCashProWebAuth;
  if(!platform||!auth)return;

  let busy=false;

  function session(){return platform.readWebSession?.()||null}
  function lang(){const raw=String(session()?.profile?.language||navigator.language||"pt").toLowerCase();if(raw.startsWith("en"))return"en";if(raw.startsWith("es"))return"es";if(raw.startsWith("ru"))return"ru";return"pt"}
  const text={
    pt:{approved:"Dispositivo autorizado. Volte ao outro aparelho.",invalid:"Código inválido ou expirado.",copied:"Copiado"},
    en:{approved:"Device authorized. Return to the other device.",invalid:"Invalid or expired code.",copied:"Copied"},
    es:{approved:"Dispositivo autorizado. Vuelve al otro dispositivo.",invalid:"Código inválido o caducado.",copied:"Copiado"},
    ru:{approved:"Устройство разрешено. Вернитесь на другое устройство.",invalid:"Код недействителен или истёк.",copied:"Скопировано"}
  };
  function t(key){return text[lang()]?.[key]||text.pt[key]}

  async function approvePair(root){
    if(busy)return;
    const input=root.querySelector("#webPairApproveCode");
    const status=root.querySelector("#webPairApproveStatus");
    const button=root.querySelector("#webPairApproveButton");
    const code=String(input?.value||"").replace(/\D/g,"").slice(0,6);
    if(code.length!==6){if(status)status.textContent=t("invalid");return}
    busy=true;
    if(button)button.disabled=true;
    try{
      await auth.approveDevicePairing(code);
      if(status)status.textContent=t("approved");
      if(input)input.value="";
    }catch{
      if(status)status.textContent=t("invalid");
    }finally{
      busy=false;
      if(button)button.disabled=false;
    }
  }

  async function copyReferral(root){
    const input=root.querySelector(".webCopyRow input");
    const button=root.querySelector("#webReferralCopy");
    const value=String(input?.value||"");
    if(!value)return;
    try{await navigator.clipboard.writeText(value)}catch{
      try{input?.focus();input?.select();document.execCommand("copy")}catch{}
    }
    if(button){const old=button.textContent;button.textContent=t("copied");setTimeout(()=>{if(button.isConnected)button.textContent=old},1200)}
  }

  function bind(root){
    root.querySelector("#webReferralCopy")?.addEventListener("click",event=>{event.preventDefault();copyReferral(root)});
    root.querySelector("#webPairApproveButton")?.addEventListener("click",event=>{event.preventDefault();approvePair(root)});
    root.querySelector("#webOpenPresentation")?.addEventListener("click",event=>{event.preventDefault();window.EduCashProApp?.renderPresentation?.()});
    root.querySelector("#webOpenGames")?.addEventListener("click",async event=>{event.preventDefault();await window.EduCashProResources?.loadGames?.();window.EduCashProMentalGames?.renderCatalog?.({public:true,lang:lang(),back:()=>window.EduCashProWebEntry?.renderAuthenticated?.()})});
    root.querySelector("#webLogout")?.addEventListener("click",event=>{event.preventDefault();platform.writeWebSession?.(null);location.reload()});
  }

  function stabilize(){
    const content=document.getElementById("content");
    if(!content||content.dataset.webInteractionStable==="1"||!content.querySelector(".webMember"))return;
    const y=window.scrollY;
    const clone=content.cloneNode(true);
    clone.dataset.webInteractionStable="1";
    content.replaceWith(clone);
    document.querySelectorAll(".webAuthLayer").forEach(node=>node.remove());
    document.documentElement.style.pointerEvents="";
    document.body.style.pointerEvents="";
    document.body.style.overflow="";
    bind(clone);
    requestAnimationFrame(()=>window.scrollTo(0,y));
  }

  function loadPairingUx(){
    if(document.querySelector('script[data-device-pairing-ux="1"]'))return;
    const script=document.createElement("script");
    script.defer=true;
    script.dataset.devicePairingUx="1";
    script.src="./device-pairing-ux.js?v=20260913.1";
    document.head.appendChild(script);
  }

  const observer=new MutationObserver(stabilize);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>setTimeout(stabilize,0),{once:true});else setTimeout(stabilize,0);
  window.addEventListener("educashpro:web-session-ready",()=>setTimeout(stabilize,0));
  loadPairingUx();
})();
