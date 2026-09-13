(function(){
  const platform=window.EduCashProPlatform;
  if(!platform?.isWeb?.())return;

  const STRINGS={
    pt:{
      loginOther:"Entrar usando outro dispositivo",
      connected:"Este dispositivo está conectado à sua conta.",
      help:"Para adicionar outro computador ou celular, abra o EduCashPro no novo aparelho, escolha “Entrar usando outro dispositivo” e digite aqui o código exibido nele.",
      add:"Adicionar novo dispositivo",
      cancel:"Cancelar",
      input:"Digite o código exibido no novo aparelho",
      approved:"Dispositivo autorizado. O novo aparelho entrará automaticamente.",
      invalid:"Código inválido ou expirado. Gere um novo código no outro aparelho."
    },
    en:{
      loginOther:"Sign in using another device",
      connected:"This device is connected to your account.",
      help:"To add another computer or phone, open EduCashPro on the new device, choose “Sign in using another device”, and enter the code shown there here.",
      add:"Add another device",
      cancel:"Cancel",
      input:"Enter the code shown on the new device",
      approved:"Device authorized. The new device will sign in automatically.",
      invalid:"Invalid or expired code. Generate a new code on the other device."
    },
    es:{
      loginOther:"Entrar usando otro dispositivo",
      connected:"Este dispositivo está conectado a tu cuenta.",
      help:"Para añadir otro ordenador o móvil, abre EduCashPro en el nuevo dispositivo, elige “Entrar usando otro dispositivo” e introduce aquí el código que aparece allí.",
      add:"Añadir otro dispositivo",
      cancel:"Cancelar",
      input:"Introduce el código mostrado en el nuevo dispositivo",
      approved:"Dispositivo autorizado. El nuevo dispositivo iniciará sesión automáticamente.",
      invalid:"Código inválido o caducado. Genera un código nuevo en el otro dispositivo."
    },
    ru:{
      loginOther:"Войти с помощью другого устройства",
      connected:"Это устройство подключено к вашему аккаунту.",
      help:"Чтобы добавить другой компьютер или телефон, откройте EduCashPro на новом устройстве, выберите вход через другое устройство и введите здесь показанный там код.",
      add:"Добавить другое устройство",
      cancel:"Отмена",
      input:"Введите код с нового устройства",
      approved:"Устройство разрешено. На новом устройстве вход выполнится автоматически.",
      invalid:"Код недействителен или истёк. Создайте новый код на другом устройстве."
    }
  };

  function lang(){
    const session=window.EduCashProWebEntry?.getSession?.()||platform.readWebSession?.();
    const raw=String(session?.profile?.language||navigator.language||"pt").toLowerCase();
    if(raw.startsWith("en"))return"en";
    if(raw.startsWith("es"))return"es";
    if(raw.startsWith("ru"))return"ru";
    return"pt";
  }
  function s(key){return STRINGS[lang()]?.[key]||STRINGS.pt[key]||key}

  function ensureStyles(){
    if(document.getElementById("devicePairingUxStyles"))return;
    const style=document.createElement("style");
    style.id="devicePairingUxStyles";
    style.textContent=`
      .webDeviceConnectedSummary{display:flex;align-items:center;gap:10px;padding:13px 14px;margin:12px 0;border:1px solid rgba(48,230,166,.2);border-radius:14px;background:rgba(48,230,166,.08);color:#dffef2;font-weight:800}
      .webDeviceConnectedSummary .check{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:#30e6a6;color:#061b15;font-weight:950;flex:0 0 auto}
      .webPairApprove[data-collapsed="true"],#webPairApproveStatus[data-collapsed="true"]{display:none!important}
      #webTogglePairing{margin-top:8px}
    `;
    document.head.appendChild(style);
  }

  function patchPublic(){
    const button=document.getElementById("webPhoneLoginButton");
    if(button&&!button.dataset.deviceUx){
      button.dataset.deviceUx="1";
      button.textContent=`📱 ${s("loginOther")}`;
    }
  }

  function patchAuthenticated(){
    const input=document.getElementById("webPairApproveCode");
    if(!input)return;
    const card=input.closest(".webMemberCard");
    if(!card||card.dataset.deviceUx)return;
    card.dataset.deviceUx="1";

    const paragraph=card.querySelector("p");
    if(paragraph)paragraph.textContent=s("help");
    input.placeholder=s("input");

    const form=card.querySelector(".webPairApprove");
    const status=document.getElementById("webPairApproveStatus");
    if(!form||!status)return;

    const summary=document.createElement("div");
    summary.className="webDeviceConnectedSummary";
    summary.innerHTML=`<span class="check">✓</span><span>${s("connected")}</span>`;
    form.before(summary);

    const toggle=document.createElement("button");
    toggle.id="webTogglePairing";
    toggle.type="button";
    toggle.className="webAuthSecondary webAuthGhost";
    toggle.textContent=s("add");
    summary.after(toggle);

    form.dataset.collapsed="true";
    status.dataset.collapsed="true";

    let opened=false;
    const setOpened=(value)=>{
      opened=Boolean(value);
      form.dataset.collapsed=opened?"false":"true";
      status.dataset.collapsed=opened?"false":"true";
      toggle.textContent=opened?s("cancel"):s("add");
      if(opened){
        status.textContent="";
        window.setTimeout(()=>input.focus(),50);
      }
    };
    toggle.addEventListener("click",()=>setOpened(!opened));

    const statusObserver=new MutationObserver(()=>{
      const text=String(status.textContent||"").toLowerCase();
      const success=text.includes("autoriz")||text.includes("authorized")||text.includes("autorizado")||text.includes("разреш");
      const invalid=text.includes("invál")||text.includes("invalid")||text.includes("caduc")||text.includes("истёк");
      if(success){status.textContent=s("approved");window.setTimeout(()=>setOpened(false),1400)}
      else if(invalid){status.textContent=s("invalid")}
    });
    statusObserver.observe(status,{childList:true,characterData:true,subtree:true});
  }

  function patch(){ensureStyles();patchPublic();patchAuthenticated()}
  const observer=new MutationObserver(patch);
  observer.observe(document.getElementById("content")||document.body,{childList:true,subtree:true});
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",patch,{once:true});else patch();
})();
