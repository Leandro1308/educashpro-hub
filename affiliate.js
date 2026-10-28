(function(){
const lang=window.EduCashProLocale?.resolve?.()||'pt',C=window.EduCashProAffiliateCopy[lang]||window.EduCashProAffiliateCopy.pt,API='https://educashpro-all.onrender.com';
const WALT_URL='https://telegram.me/walt/start?startapp=ref-4-QhxQcMqCsfw';
const $=id=>document.getElementById(id),esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let cfg=null,session=null,link='',walletUi=null,connecting=false,verifying=false,unsubscribe=null,conditionsVerified=false;
const STATUS_COPY={
pt:['Percentuais de referência: adesão de 30% para inativos e 60% para ativos; renovações de 30%, 20%, 10%, 5% e 5% para ativos. Aguardando confirmação das condições atuais.','Não foi possível confirmar as condições atuais. A comparação permanece disponível; tente novamente antes de participar.','Tentar novamente'],
en:['Reference rates: 30% initial commission for inactive members and 60% for active members; active renewal rates of 30%, 20%, 10%, 5% and 5%. Awaiting confirmation of current terms.','Current terms could not be confirmed. The comparison remains available; try again before joining.','Try again'],
es:['Porcentajes de referencia: adhesión del 30% para inactivos y 60% para activos; renovaciones del 30%, 20%, 10%, 5% y 5% para activos. Pendiente de confirmar las condiciones actuales.','No se pudieron confirmar las condiciones actuales. La comparación sigue disponible; vuelve a intentarlo antes de participar.','Reintentar'],
ru:['Справочные ставки: 30% за первую покупку для неактивных и 60% для активных; продления для активных — 30%, 20%, 10%, 5% и 5%. Ожидается подтверждение действующих условий.','Не удалось подтвердить действующие условия. Сравнение остаётся доступным; повторите попытку перед участием.','Повторить']
}[lang]||null;
function referenceConfig(){return {priceUsdt:null,inactiveJoinPercent:30,joinPercent:60,renewalPercents:[30,20,10,5,5],freeReferralEnabled:true,qualificationEnabled:false,levelRequirements:{},accepted:false,walletLinked:false,canShare:false};}
function showConditionsStatus(message,retry=false){
 $('status').textContent=message;
 let button=document.getElementById('conditionsRetry');
 if(button)button.remove();
 if(retry){button=document.createElement('button');button.id='conditionsRetry';button.type='button';button.className='secondaryCta';button.textContent=(STATUS_COPY||['','','Try again'])[2];button.onclick=()=>void refreshConditions();$('status').after(button);}
}
async function refreshConditions(){
 conditionsVerified=false;updateJoin();
 showConditionsStatus((STATUS_COPY||[C.loading])[0]);
 try{
 cfg={...cfg,...await post('/api/affiliate/public-config')};conditionsVerified=true;render();
 if(session){try{await privateConfig();}catch{showConditionsStatus(C.error,true);return;}}
 showConditionsStatus('');
 }catch{
 conditionsVerified=false;updateJoin();
 showConditionsStatus((STATUS_COPY||['',C.unavailable])[1],true);
 }
}
window.EduCashProAffiliateSessionActive=p=>{
 const sub=p?.subscription||{};
 if(p?.lifetime||p?.adminLifetime||p?.partnerLifetime||p?.onchainLifetime||p?.pendingLifetime||sub.lifetime||sub.pendingLifetime)return true;
 const until=Number(p?.activeUntil||sub.activeUntil||0);
 return (p?.active===true||p?.isActive===true||sub.active===true)&&(!until||(until<100000000000?until*1000:until)>Date.now());
};
const pct=n=>Number.isFinite(n)?Number(n)+'%':'—';
async function post(path,body={}){const r=await fetch(API+path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),cache:'no-store',signal:AbortSignal.timeout(10000)});const d=await r.json();if(!r.ok||!d.ok)throw Error(d.reason||'request_failed');return d;}
function acceptedSession(){const s=window.EduCashProPlatform?.readWebSession?.();if(s?.token)window.EduCashProPlatform.writeWebSession?.({...s,profile:{...s.profile,affiliateAccepted:true}});}
function updateJoin(){ $('join').disabled=!conditionsVerified||!session||!cfg?.walletLinked||!$('agree').checked; }
function render(){
const amount=n=>new Intl.NumberFormat(lang,{maximumFractionDigits:6}).format(n);
const sale=Number(cfg.priceUsdt),hasExample=Number.isFinite(sale)&&sale>0;
const exampleEarn=percent=>hasExample&&Number.isFinite(percent)?'<p class="commissionExample">'+esc(C.exampleEarn.replace('{amount}',amount(sale*percent/100)))+'</p>':'';
$('conditions').innerHTML=`<section class="card commissionOffer"><h2>${esc(C.plans)}</h2><p>${esc(C.initialHint)}</p><div class="commissionCards"><article><h3>${esc(C.free)}</h3><span>${esc(C.first)}</span><strong class="commissionRate">${pct(cfg.inactiveJoinPercent)}</strong>${exampleEarn(cfg.inactiveJoinPercent)}<p>${esc(C.freeDetail)}</p></article><article class="commissionActive"><span class="eyebrow">${esc(C.activeKicker)}</span><h3>${esc(C.paid)}</h3><span>${esc(C.first)}</span><strong class="commissionRate">${pct(cfg.joinPercent)}</strong>${exampleEarn(cfg.joinPercent)}<p>${esc(C.paidDetail)}</p></article></div>${hasExample?'<p class="note">'+esc(C.example.replace('{amount}',amount(sale)))+'</p>':''}<h3 class="renewalTitle">${esc(C.renew)}</h3><div class="tableWrap"><table class="renewalTable"><thead><tr><th scope="col">${esc(C.level)}</th><th scope="col">${esc(C.free)}</th><th scope="col">${esc(C.paid)}</th></tr></thead><tbody>${cfg.renewalPercents.map((n,i)=>'<tr><th scope="row">'+esc(C.level)+' '+(i+1)+(i===0?' — '+esc(C.direct):'')+'</th><td>'+esc(C.zeroRenew)+'</td><td class="activeRenewal">'+pct(n)+'</td></tr>').join('')}</tbody></table></div><p class="note">${esc(C.renewHint)}</p><aside class="subscriberBenefits"><p>${esc(C.activeBenefit)}</p>${cfg.active?'<strong>'+esc(C.alreadyActive)+'</strong>':'<a class="activateButton" href="./?subscribe=pay&amp;lang='+encodeURIComponent(lang)+'">'+esc(C.subscribeCta)+'</a>'}</aside>${!cfg.freeReferralEnabled?'<p class="note">'+esc(C.pending)+'</p>':''}${cfg.qualificationEnabled?'<p>'+esc(C.requirements)+': '+Object.entries(cfg.levelRequirements).map(([l,n])=>l+': '+n).join(' · ')+'</p>':''}</section>`;
$('enrollment').hidden=!!cfg.accepted||!!cfg.canShare;$('agree').checked=false;updateJoin();$('join').hidden=!session;$('login').hidden=!!session;$('agree').disabled=!conditionsVerified||!session||!cfg.walletLinked;
$('login').href='./?affiliateReturn=1&lang='+lang;$('member').hidden=!cfg.accepted&&!cfg.canShare;
$('walletLogin').href='./?affiliateReturn=1&lang='+lang;$('walletLogin').hidden=!!session;
$('connectWallet').hidden=!session||cfg.walletLinked;$('connectWallet').disabled=connecting;
$('walletState').textContent=cfg.walletLinked?C.walletConnected:'';
$('walletReady').textContent=cfg.walletLinked?'':C.walletReady;
$('memberStatus').textContent=!cfg.walletLinked?C.walletReady:cfg.canShare?C.accepted:C.pending;
link=cfg.canShare?cfg.preferredAffiliateLink||'':'';
$('linkTools').hidden=!link;$('affiliateLink').textContent=link;
$('networkButton').href='./?view=area&panel=network&lang='+lang;$('networkButton').hidden=!cfg.walletLinked||!(cfg.active===true||window.EduCashProAffiliateSessionActive?.(session?.profile));
}
let memberPromise=null;
async function privateConfig(){
 if(!session)return;
 if(memberPromise)return memberPromise;
 memberPromise=(async()=>{
   const member=await post('/api/affiliate/member',{token:session.token});
   cfg={...cfg,...member};
   const saved=window.EduCashProPlatform?.readWebSession?.();
   if(saved?.token===session.token)window.EduCashProPlatform.writeWebSession?.({...saved,profile:{...saved.profile,walletLinked:member.walletLinked,affiliateAccepted:member.accepted,referralCode:member.referralCode||saved.profile?.referralCode,active:member.active===true||saved.profile?.active===true,...(member.lifetime?{subscription:{...saved.profile?.subscription,lifetime:true,active:true}}:{})}});
   render();
 })();
 try{return await memberPromise;}finally{memberPromise=null;}
}
let sdkPromise;
function loadWalletSdk(){
if(window.TON_CONNECT_UI?.TonConnectUI)return Promise.resolve();
if(!sdkPromise)sdkPromise=new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='https://unpkg.com/@tonconnect/ui@3.0.0/dist/tonconnect-ui.min.js';s.async=true;s.onload=()=>window.TON_CONNECT_UI?.TonConnectUI?resolve():reject(Error('wallet_sdk_missing'));s.onerror=()=>reject(Error('wallet_sdk_unavailable'));document.head.appendChild(s);}).catch(e=>{sdkPromise=null;throw e;});
return sdkPromise;
}
function walletErrorMessage(error){
 const reason=String(error?.data?.reason||error?.message||'');
 const messages={
 pt:{wallet_identity_conflict:'Esta carteira já pertence a outra conta EduCashPro. Entre na conta originalmente vinculada; o vínculo não foi alterado.',session_changed:'A conta mudou durante a conexão. Entre novamente e tente conectar.',ton_proof_not_supported:'A carteira não enviou a comprovação de propriedade. Abra novamente a conexão e autorize a solicitação.',wallet_restore_timeout:'A carteira não respondeu à restauração. Tente abrir novamente a conexão.'},
 en:{wallet_identity_conflict:'This wallet belongs to another EduCashPro account. Sign in to the originally linked account.',session_changed:'The account changed during connection. Sign in again.',ton_proof_not_supported:'The wallet did not send ownership proof. Reconnect and approve the request.',wallet_restore_timeout:'Wallet restoration timed out. Try connecting again.'},
 es:{wallet_identity_conflict:'Esta cartera pertenece a otra cuenta EduCashPro. Entra en la cuenta vinculada originalmente.',session_changed:'La cuenta cambió durante la conexión. Inicia sesión de nuevo.',ton_proof_not_supported:'La cartera no envió la prueba de propiedad. Reconecta y autoriza la solicitud.',wallet_restore_timeout:'La restauración de la cartera agotó el tiempo. Inténtalo de nuevo.'},
 ru:{wallet_identity_conflict:'Этот кошелёк связан с другой учётной записью EduCashPro. Войдите в исходную учётную запись.',session_changed:'Учётная запись изменилась. Войдите снова.',ton_proof_not_supported:'Кошелёк не отправил подтверждение владения. Подключитесь снова и подтвердите запрос.',wallet_restore_timeout:'Время восстановления кошелька истекло. Повторите подключение.'}
 };
 return messages[lang]?.[reason]||C.walletError;
}
async function connectWallet(){
if(connecting||cfg?.walletLinked)return;
const latest=window.EduCashProPlatform?.readWebSession?.();
if(!latest?.token || !latest?.profile?.userId)return;
session=latest;const connectingUserId=latest.profile.userId;
connecting=true;$('connectWallet').disabled=true;$('walletState').textContent=C.walletWaiting;
try{
await privateConfig();
if(cfg.walletLinked){$('walletState').textContent=C.walletConnected;return;}
await loadWalletSdk();
const auth=window.EduCashProWebAuth;if(!auth)throw Error('wallet_auth_missing');
if(!walletUi)walletUi=new window.TON_CONNECT_UI.TonConnectUI({manifestUrl:'https://go.educashpro.vip/tonconnect-manifest.json'});
// A fresh ownership proof must be signed for the currently signed-in account.

unsubscribe?.();unsubscribe=null;
const challenge=await auth.prepareWalletAuthentication(walletUi);
unsubscribe=walletUi.onStatusChange(async wallet=>{
 if(!wallet||verifying)return;
 verifying=true;
 try{
  if(!wallet.connectItems?.tonProof?.proof)throw Error('ton_proof_missing');
  // Do not attach to another account if the signed-in account changed mid-connection.
  const stored=window.EduCashProPlatform?.readWebSession?.();
  if(!stored?.token||stored.profile?.userId!==connectingUserId)throw Error('session_changed');
  session=stored;
  await auth.verifyWalletProof({challengeId:challenge.challengeId,wallet,language:lang});
  session=window.EduCashProPlatform.readWebSession();
  await window.EduCashProApp?.setSession?.(session);
  unsubscribe?.();unsubscribe=null;
  await privateConfig();$('walletState').textContent=C.walletConnected;
 }catch(error){ $('walletState').textContent=walletErrorMessage(error); }
 finally{verifying=false;}
});
await walletUi.openModal();
}catch(error){$('walletState').textContent=walletErrorMessage(error);}
finally{connecting=false;$('connectWallet').disabled=false;}
}
async function boot(){
document.documentElement.lang=lang;
for(const id of ['title','intro','why','purpose','rulesTitle','agreeLabel','join','login','linkLabel','copy','share','networkButton','back','walletTitle','walletIntro','walletFree'])$(id).textContent=C[({agreeLabel:'agree',linkLabel:'link',networkButton:'network'})[id]||id];
$('createWallet').textContent=C.walletCreate;$('createWallet').href=WALT_URL;$('connectWallet').textContent=C.wallet;$('walletLogin').textContent=C.walletLogin;
$('walletSteps').innerHTML=C.walletSteps.map(x=>'<li>'+esc(x)+'</li>').join('');
$('rules').innerHTML=C.rules.map(x=>'<li>'+esc(x)+'</li>').join('');$('status').textContent=C.loading;
$('agree').onchange=updateJoin;$('connectWallet').onclick=connectWallet;
$('join').onclick=async()=>{if(!conditionsVerified||!$('agree').checked||!session||!cfg?.walletLinked)return;$('join').disabled=true;try{await post('/api/affiliate/enroll',{token:session.token,agree:true,version:cfg.termsVersion,language:lang});await privateConfig();$('status').textContent=C.accepted;}catch{$('status').textContent=C.error;updateJoin();}};
$('copy').onclick=async()=>{if(!link)return;try{await navigator.clipboard.writeText(link);$('status').textContent=C.copied}catch{$('status').textContent=link}};
$('share').onclick=async()=>{if(!link)return;try{if(navigator.share)await navigator.share({title:'EduCashPro',url:link});else await navigator.clipboard.writeText(link)}catch{}};
const stored=window.EduCashProPlatform?.readWebSession?.();if(stored?.token)session=stored;
cfg=referenceConfig();render();
if(session)void privateConfig().catch(()=>{});
void refreshConditions();
if(!session){
 try{
 if(window.__EDUCASHPRO_TELEGRAM_SDK_PROMISE__)await Promise.race([window.__EDUCASHPRO_TELEGRAM_SDK_PROMISE__,new Promise(r=>setTimeout(r,2500))]);
 window.Telegram?.WebApp?.ready?.();
 const initData=window.EduCashProPlatform?.telegramInitData?.()||window.Telegram?.WebApp?.initData;
 if(initData){await window.EduCashProWebAuth.authenticateFromTelegram();session=window.EduCashProPlatform.readWebSession();if(conditionsVerified)await privateConfig();}
 }catch{showConditionsStatus(C.error,true);}
}
}
boot();
})();

