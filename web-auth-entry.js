(function(){
  const platform=window.EduCashProPlatform;
  const auth=window.EduCashProWebAuth;
  if(!platform?.isWeb?.()||!auth)return;

  const state={session:null,checking:true,ui:null,challenge:null,unsubscribe:null,busy:false};
  const MANIFEST_URL="https://go.educashpro.vip/tonconnect-manifest.json";
  const BOT_URL="https://t.me/EduCashProBot";

  function esc(value){return String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[ch]))}
  function profile(){return state.session?.profile||null}
  function injectStyles(){if(document.getElementById("educashproWebAuthStyles"))return;const style=document.createElement("style");style.id="educashproWebAuthStyles";style.textContent=`
    .webAuthButton{width:100%;min-height:50px;margin-top:10px;border:0;border-radius:15px;background:#30e6a6;color:#061b15;font:900 14px/1.2 Inter,system-ui,sans-serif;cursor:pointer}
    .webAuthSecondary{width:100%;min-height:46px;margin-top:9px;border:1px solid rgba(255,255,255,.1);border-radius:14px;background:#12243b;color:#f7fbff;font:800 13px/1.2 Inter,system-ui,sans-serif;cursor:pointer}
    .webAuthLayer{position:fixed;z-index:9999;inset:0;display:grid;place-items:end center;padding:18px;background:rgba(1,7,15,.72);backdrop-filter:blur(8px)}
    .webAuthSheet{width:min(100%,520px);padding:20px;border:1px solid rgba(255,255,255,.1);border-radius:24px;background:#0d1b2d;color:#f7fbff;box-shadow:0 24px 70px rgba(0,0,0,.45)}
    .webAuthSheet h2{margin:0 0 8px;font-size:22px}.webAuthSheet p{margin:0 0 15px;color:#9db0c6;line-height:1.5}.webAuthClose{float:right;border:0;background:transparent;color:#9db0c6;font-size:22px;cursor:pointer}.webAuthError{min-height:18px;margin-top:12px;color:#ff8c98;font-size:12px}.webMember{display:grid;gap:14px}.webMemberHero,.webMemberCard{padding:18px;border:1px solid rgba(255,255,255,.09);border-radius:20px;background:#0d1b2d}.webMemberHero{background:linear-gradient(135deg,#12334a,#0b1d31)}.webMemberHero h1{margin:6px 0 8px;font-size:28px}.webMemberHero p,.webMemberCard p{color:#9db0c6;line-height:1.5}.webMemberBadge{display:inline-block;padding:6px 9px;border-radius:999px;background:rgba(48,230,166,.11);color:#30e6a6;font-size:10px;font-weight:900}.webIdentityRow{display:grid;grid-template-columns:110px 1fr;gap:8px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.08);font-size:12px}.webIdentityRow:last-child{border:0}.webIdentityRow span{color:#9db0c6}.webIdentityRow b{word-break:break-all}.webModuleGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:9px}.webModule{display:block;padding:15px;border:1px solid rgba(255,255,255,.09);border-radius:17px;background:#12243b;color:#f7fbff;text-decoration:none;text-align:left}.webModule span{font-size:22px}.webModule b{display:block;margin-top:7px}.webModule small{display:block;margin-top:4px;color:#9db0c6;line-height:1.35}.webCopyRow{display:flex;gap:8px}.webCopyRow input{min-width:0;flex:1;min-height:44px;padding:0 10px;border:1px solid rgba(255,255,255,.1);border-radius:12px;background:#081827;color:#f7fbff}.webCopyRow button{border:0;border-radius:12px;background:#30e6a6;color:#061b15;font-weight:900;padding:0 13px}@media(max-width:560px){.webModuleGrid{grid-template-columns:1fr}.webIdentityRow{grid-template-columns:90px 1fr}}
  `;document.head.appendChild(style)}

  function closeLayer(){document.querySelector(".webAuthLayer")?.remove()}
  function setError(message){const el=document.getElementById("webAuthError");if(el)el.textContent=String(message||"")}

  async function finishWallet(wallet){if(state.busy||!state.challenge?.challengeId)return;state.busy=true;setError("");try{const result=await auth.verifyWalletProof({challengeId:state.challenge.challengeId,wallet});state.session=platform.readWebSession?.();closeLayer();renderAuthenticated();window.dispatchEvent(new CustomEvent("educashpro:web-session-ready",{detail:result}))}catch(error){setError(error?.message||"Não foi possível autenticar esta carteira.")}finally{state.busy=false}}

  async function openLogin(){injectStyles();closeLayer();const layer=document.createElement("div");layer.className="webAuthLayer";layer.innerHTML=`<section class="webAuthSheet"><button class="webAuthClose" type="button" aria-label="Fechar">✕</button><span class="webMemberBadge">CONTA EDUCASHPRO</span><h2>Entrar com carteira TON</h2><p>A carteira será usada apenas para provar que este endereço pertence a você. Nenhuma transação é solicitada neste login.</p><div id="webAuthTonConnect"></div><div id="webAuthError" class="webAuthError"></div></section>`;document.body.appendChild(layer);layer.querySelector(".webAuthClose").onclick=closeLayer;
    try{
      if(!window.TON_CONNECT_UI?.TonConnectUI)throw new Error("TON Connect não carregou.");
      state.unsubscribe?.();state.ui=new window.TON_CONNECT_UI.TonConnectUI({manifestUrl:MANIFEST_URL,buttonRootId:"webAuthTonConnect"});
      state.challenge=await auth.prepareWalletAuthentication(state.ui);
      state.unsubscribe=auth.watchWalletAuthentication(state.ui,{getChallenge:()=>state.challenge});
      window.addEventListener("educashpro:web-authenticated",()=>{state.session=platform.readWebSession?.();closeLayer();renderAuthenticated()},{once:true});
      window.addEventListener("educashpro:web-auth-error",event=>setError(event.detail?.message||"Falha na autenticação."),{once:true});
      if(state.ui.wallet)await finishWallet(state.ui.wallet);
    }catch(error){setError(error?.message||"Autenticação Web indisponível.")}
  }

  function logout(){platform.writeWebSession?.(null);state.session=null;location.reload()}
  function referralUrl(){const code=profile()?.referralCode;if(!code)return"";return `${location.origin}${location.pathname}?ref=${encodeURIComponent(code)}`}
  async function copyReferral(){const value=referralUrl();if(!value)return;try{await navigator.clipboard.writeText(value)}catch{}const button=document.getElementById("webReferralCopy");if(button){const old=button.textContent;button.textContent="Copiado";setTimeout(()=>button.textContent=old,1200)}}

  function renderAuthenticated(){const content=document.getElementById("content");const p=profile();if(!content||!p?.userId)return false;document.querySelector(".growthQuickActions")?.classList.add("hidden");document.getElementById("bottomNav")?.classList.add("hidden");const ref=referralUrl();content.innerHTML=`<section class="webMember"><div class="webMemberHero"><span class="webMemberBadge">WEB • CONTA AUTENTICADA</span><h1>${esc(p.firstName||"Bem-vindo ao EduCashPro")}</h1><p>Sua identidade EduCashPro funciona fora do Telegram. Nesta fase Web, apenas recursos não financeiros estão disponíveis.</p></div><div class="webMemberCard"><h2>Sua identidade</h2><div class="webIdentityRow"><span>userId</span><b>${esc(p.userId)}</b></div><div class="webIdentityRow"><span>referralCode</span><b>${esc(p.referralCode||"—")}</b></div><div class="webIdentityRow"><span>Wallet</span><b>${p.walletLinked?"Vinculada":"Não vinculada"}</b></div><div class="webIdentityRow"><span>Telegram</span><b>${p.telegramLinked?"Vinculado":"Ainda não vinculado"}</b></div>${ref?`<div class="webCopyRow" style="margin-top:12px"><input value="${esc(ref)}" readonly><button id="webReferralCopy" type="button">Copiar</button></div>`:""}</div><div class="webMemberCard"><h2>Recursos disponíveis</h2><div class="webModuleGrid"><button id="webOpenPresentation" class="webModule" type="button"><span>📘</span><b>Conheça o EduCashPro</b><small>Apresentação e visão geral da plataforma.</small></button><button id="webOpenGames" class="webModule" type="button"><span>🎮</span><b>Jogos gratuitos</b><small>Recursos locais de atenção e raciocínio.</small></button><a class="webModule" href="./marketplace.html"><span>🏪</span><b>Marketplace</b><small>Explore empresas e páginas públicas.</small></a><a class="webModule" href="${BOT_URL}" target="_blank" rel="noopener"><span>✈️</span><b>Telegram</b><small>Abra o canal de integração com o Telegram.</small></a></div></div><button id="webLogout" class="webAuthSecondary" type="button">Sair desta conta Web</button></section>`;
    document.getElementById("webReferralCopy")?.addEventListener("click",copyReferral);
    document.getElementById("webOpenPresentation")?.addEventListener("click",()=>window.EduCashProApp?.renderPresentation?.());
    document.getElementById("webOpenGames")?.addEventListener("click",async()=>{await window.EduCashProResources?.loadGames?.();window.EduCashProMentalGames?.renderCatalog?.({public:true,lang:String(p.language||"pt").slice(0,2),back:renderAuthenticated})});
    document.getElementById("webLogout")?.addEventListener("click",logout);
    return true
  }

  function enhancePublic(){if(state.session?.profile?.userId){renderAuthenticated();return}const landing=document.querySelector(".publicWelcome");if(!landing||document.getElementById("webLoginButton"))return;const button=document.createElement("button");button.id="webLoginButton";button.className="webAuthButton";button.type="button";button.textContent="💎 Entrar com carteira TON";button.onclick=openLogin;const hint=landing.querySelector(".publicWelcomeHint");landing.insertBefore(button,hint||null)}

  async function boot(){injectStyles();state.session=await auth.validateStoredSession().catch(()=>null);state.checking=false;enhancePublic();const observer=new MutationObserver(enhancePublic);observer.observe(document.getElementById("content")||document.body,{childList:true,subtree:true});window.EduCashProWebEntry={open:openLogin,renderAuthenticated,logout,getSession:()=>state.session}}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
