(function () {
  "use strict";
  const platform = window.EduCashProPlatform;
  if (!platform?.isWeb?.()) return;
  const API = "https://educashpro-all.onrender.com";
  const WALLET_REF = "https://telegram.me/walt/start?startapp=ref-4-QhxQcMqCsfw";
  let ui = null, unsubscribe = null, layer = null, busy = false, verifiedWallet = "", pollTimer = 0;
  let selectedAction = "pay", pendingOpen = false, challenge = null, closed = true;
  const COPY = {
    pt: {title:"Prepare sua carteira e assine",close:"Fechar",login:"Entre com seu e-mail para preservar sua conta e indicação.",steps:["Crie ou acesse sua carteira na Walt pelo botão abaixo. Para conectar ao site, use a carteira não custodial (DeFi Account / TON Wallet), quando disponível.","Deposite USDT na rede TON. Reserve o valor da assinatura e, se possível, US$ 1 adicional para taxas de transação. Confira a rede e o endereço antes de depositar.","Na opção de troca da carteira, converta esse valor adicional de USDT em TON. Mantenha o valor da assinatura em USDT. A reserva em TON pode servir para futuras renovações; o custo varia e pode exigir reposição.","Volte a esta página, conecte a carteira e confira o valor antes de autorizar o pagamento."],create:"Criar ou acessar carteira na Walt",connect:"Já preparei minha carteira — conectar",pay:"Pagar assinatura",connecting:"Confirme a conexão na carteira. Essa etapa não cobra a assinatura.",ready:"Carteira verificada e vinculada à sua conta. Você pode autorizar o pagamento.",sent:"Transação enviada. Aguardando confirmação na blockchain…",done:"Assinatura confirmada! Seu acesso foi atualizado.",wait:"A confirmação ainda está em processamento. Você pode fechar esta página; confira sua assinatura em Minha Área. Não pague novamente enquanto houver uma compra em processamento.",error:"Não foi possível concluir. Confira sua conexão e os saldos de USDT e TON e tente novamente.",price:"Valor da assinatura",fee:"A taxa de transação é exibida pela carteira antes de confirmar.",back:"Voltar à minha área",other:"Se a Walt estiver indisponível, use outra carteira compatível com TON Connect.",loading:"Consultando o valor atual…"},
    en: {title:"Prepare your wallet and subscribe",close:"Close",login:"Sign in with email to preserve your account and referral.",steps:["Create or open your Walt wallet using the button below. To connect to the website, use its self-custodial wallet (DeFi Account / TON Wallet), when available.","Deposit USDT on the TON network. Set aside the subscription amount and, if possible, an extra US$1 for transaction fees. Check the network and address before depositing.","Use the wallet's swap feature to convert the extra USDT into TON. Keep the subscription amount in USDT. The TON reserve can cover future renewal fees; costs vary and you may need to replenish it.","Return here, connect your wallet and review the amount before authorizing payment."],create:"Create or open wallet in Walt",connect:"My wallet is ready — connect",pay:"Pay subscription",connecting:"Approve the connection in your wallet. This step does not charge the subscription.",ready:"Wallet verified and linked to your account. You can authorize payment.",sent:"Transaction sent. Waiting for blockchain confirmation…",done:"Subscription confirmed! Your access has been updated.",wait:"Confirmation is still processing. You may close this page and check My Area. Do not pay again while a purchase is processing.",error:"Could not complete. Check your connection and USDT and TON balances, then try again.",price:"Subscription amount",fee:"Your wallet displays the transaction fee before confirmation.",back:"Back to my area",other:"If Walt is unavailable, use another TON Connect compatible wallet.",loading:"Checking the current price…"},
    es: {title:"Prepara tu cartera y suscríbete",close:"Cerrar",login:"Entra con tu correo para conservar tu cuenta y referido.",steps:["Crea o abre tu cartera en Walt con el botón siguiente. Para conectar al sitio, usa la cartera sin custodia (DeFi Account / TON Wallet), cuando esté disponible.","Deposita USDT en la red TON. Reserva el importe de la suscripción y, si es posible, US$1 adicional para tarifas de transacción. Comprueba la red y la dirección.","En la opción de intercambio, convierte el USDT adicional en TON. Conserva el importe de la suscripción en USDT. La reserva en TON puede servir para renovaciones; las tarifas varían y puede ser necesario reponerla.","Regresa aquí, conecta la cartera y revisa el importe antes de autorizar el pago."],create:"Crear o abrir cartera en Walt",connect:"Mi cartera está lista — conectar",pay:"Pagar suscripción",connecting:"Confirma la conexión en la cartera. Este paso no cobra la suscripción.",ready:"Cartera verificada y vinculada. Puedes autorizar el pago.",sent:"Transacción enviada. Esperando confirmación en la blockchain…",done:"¡Suscripción confirmada! Acceso actualizado.",wait:"La confirmación sigue en proceso. Puedes cerrar y consultar Mi Área. No pagues nuevamente mientras haya una compra en proceso.",error:"No se pudo completar. Revisa la conexión y los saldos de USDT y TON e inténtalo de nuevo.",price:"Importe de la suscripción",fee:"La cartera muestra la tarifa antes de confirmar.",back:"Volver a mi área",other:"Si Walt no está disponible, usa otra cartera compatible con TON Connect.",loading:"Consultando el precio actual…"},
    ru: {title:"Подготовьте кошелёк и оформите подписку",close:"Закрыть",login:"Войдите по e-mail, чтобы сохранить аккаунт и реферальную связь.",steps:["Создайте или откройте кошелёк Walt кнопкой ниже. Для подключения к сайту используйте некастодиальный кошелёк (DeFi Account / TON Wallet), если он доступен.","Пополните USDT в сети TON. Оставьте сумму подписки и, по возможности, ещё US$1 для комиссий за транзакции. Проверьте сеть и адрес.","Обменяйте дополнительную сумму USDT на TON в кошельке. Сумму подписки оставьте в USDT. Резерв TON может покрывать комиссии при продлении; расходы меняются, резерв может потребовать пополнения.","Вернитесь на сайт, подключите кошелёк и проверьте сумму перед оплатой."],create:"Создать или открыть кошелёк Walt",connect:"Кошелёк готов — подключить",pay:"Оплатить подписку",connecting:"Подтвердите подключение в кошельке. Этот шаг не оплачивает подписку.",ready:"Кошелёк проверен и привязан. Можно подтвердить оплату.",sent:"Транзакция отправлена. Ожидается подтверждение блокчейна…",done:"Подписка подтверждена! Доступ обновлён.",wait:"Подтверждение ещё обрабатывается. Можно закрыть страницу и проверить аккаунт. Не оплачивайте повторно, пока покупка обрабатывается.",error:"Не удалось завершить. Проверьте соединение и баланс USDT и TON.",price:"Сумма подписки",fee:"Кошелёк покажет комиссию перед подтверждением.",back:"Вернуться в аккаунт",other:"Если Walt недоступен, используйте другой кошелёк с TON Connect.",loading:"Проверяем актуальную цену…"}
  };
  const session = () => platform.readWebSession?.();
  const language = () => String(session()?.profile?.language || document.documentElement.lang || navigator.language || "pt").slice(0,2).toLowerCase();
  const copy = () => COPY[language()] || COPY.pt;
  const esc = value => String(value ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const status = text => { const el=layer?.querySelector("[data-status]"); if(el) el.textContent=text; };
  async function request(path, options={}) {
    const response = await fetch(API+path,{...options,headers:{"Content-Type":"application/json",Authorization:`Bearer ${session()?.token || ""}`,...options.headers},cache:"no-store"});
    const text = await response.text(); let data; try{data=JSON.parse(text)}catch{data={message:text}}
    if(!response.ok || data?.ok===false) throw new Error(data?.message || data?.reason || data?.code || "request_failed");
    return data;
  }
  function close(){ closed=true; clearTimeout(pollTimer);unsubscribe?.();unsubscribe=null; layer?.remove();layer=null; }
  async function connect(){
    if(busy || closed)return; busy=true; status(copy().connecting);
    try{
      if(!window.TON_CONNECT_UI){
        await new Promise((resolve,reject)=>{const script=document.createElement("script");script.src="https://unpkg.com/@tonconnect/ui@3.0.0/dist/tonconnect-ui.min.js";script.onload=resolve;script.onerror=reject;document.head.appendChild(script)});
      }
      if(closed)return;
      if(!ui) {
        ui=new window.TON_CONNECT_UI.TonConnectUI({manifestUrl:"https://go.educashpro.vip/tonconnect-manifest.json",actionsConfiguration:{returnStrategy:"back"}});
        ui.onModalStateChange?.(state=>{layer?.classList.toggle("walletPickerOpen",state?.status==="opened")});
      }
      await ui.connectionRestored;
      if(ui.connected) await ui.disconnect();
      verifiedWallet="";
      challenge=await window.EduCashProWebAuth.prepareWalletAuthentication(ui);
      unsubscribe?.();
      unsubscribe=ui.onStatusChange(async wallet=>{
        if(closed)return;
        verifiedWallet="";
        layer.querySelector("[data-pay]").disabled=true;
        if(!wallet?.account?.address)return;
        try{
          if(String(wallet.account.chain)!=="-239")throw new Error("Use TON mainnet");
          await window.EduCashProWebAuth.verifyWalletProof({challengeId:challenge.challengeId,wallet,language:language()});
          if(closed)return;
          verifiedWallet=wallet.account.address;
          await window.EduCashProApp?.setSession?.(session());
          layer.querySelector("[data-pay]").disabled=false;
          status(copy().ready);
        }catch(error){status(copy().error+" "+error.message)}
      });
      await ui.openModal();
    }catch(error){status(copy().error+" "+(error?.message||""))}finally{busy=false}
  }
  async function confirmPayment(previousUntil, previousActive, attempt=0){
    if(closed)return;
    try{
      const data=await request("/api/platform-account/overview",{method:"POST",body:"{}"});
      const sub=data.subscription;
      if(sub?.active && (!previousActive || Number(sub.activeUntil||0)>previousUntil)){
        await window.EduCashProWebAuth.validateStoredSession({preserveOnNetworkError:true});
        await window.EduCashProAccess?.refresh?.();
        await window.EduCashProApp?.setSession?.(session());
        status(copy().done);return;
      }
    }catch{}
    if(attempt>=39){status(copy().wait);return;}
    pollTimer=setTimeout(()=>confirmPayment(previousUntil,previousActive,attempt+1),3000);
  }
  async function pay(){
    if(busy || !verifiedWallet || closed)return;
    if(ui?.wallet?.account?.address!==verifiedWallet){status(copy().connecting);return;}
    busy=true;const button=layer.querySelector("[data-pay]");button.disabled=true;
    try{
      const before=await request("/api/platform-account/overview",{method:"POST",body:"{}"});
      const qs=new URLSearchParams({owner:verifiedWallet,action:selectedAction});
      const data=await request("/api/ton/build-tx?"+qs);
      const tx=data.tx;
      if(!tx?.messages?.length || !tx.validUntil)throw new Error("invalid_transaction");
      await ui.sendTransaction({validUntil:tx.validUntil,messages:tx.messages.map(({address,amount,payload,stateInit})=>({address,amount,payload,stateInit}))});
      status(copy().sent);
      await confirmPayment(Number(before.subscription?.activeUntil||0),before.subscription?.active===true);
    }catch(error){status(copy().error+" "+error.message);button.disabled=false}finally{busy=false}
  }
  async function open(action="pay"){
    if(!platform.isWeb())return false;
    selectedAction=["pay","renew","lifetime"].includes(action)?action:"pay";
    if(!session()?.token){pendingOpen=true;window.EduCashProWebEntry?.openEmail?.();return true;}
    close();closed=false;verifiedWallet="";busy=false;
    document.getElementById("accessModal")?.classList.add("hidden");
    const c=copy();layer=document.createElement("div");layer.className="webCheckoutLayer";
    layer.innerHTML=`<section class="webCheckoutSheet" role="dialog" aria-modal="true" aria-label="${esc(c.title)}"><button data-close aria-label="${esc(c.close)}">✕</button><h2>${esc(c.title)}</h2><p data-price>${esc(c.loading)}</p><ol>${c.steps.map(s=>`<li>${esc(s)}</li>`).join("")}</ol><a class="wideButton" href="${WALLET_REF}" target="_blank" rel="noopener noreferrer">${esc(c.create)}</a><p>${esc(c.fee)}</p><button class="wideButton" data-connect>${esc(c.connect)}</button><button class="wideButton" data-pay disabled>${esc(c.pay)}</button><p data-status role="status" aria-live="polite"></p><p>${esc(c.other)}</p><button class="secondaryButton" data-back>${esc(c.back)}</button></section>`;
    if(!document.getElementById("webCheckoutStyle")){const s=document.createElement("style");s.id="webCheckoutStyle";s.textContent=".webCheckoutLayer{position:fixed;inset:0;z-index:9998;background:rgba(1,7,15,.85);display:grid;place-items:center;padding:15px}.webCheckoutLayer.walletPickerOpen{visibility:hidden;pointer-events:none}.webCheckoutSheet{width:min(100%,560px);box-sizing:border-box;max-height:92vh;overflow:auto;background:#0d1b2d;color:#fff;border-radius:22px;padding:24px}.webCheckoutSheet li{margin:15px 0;line-height:1.6}.webCheckoutSheet p{line-height:1.5;color:#bdd0df}.webCheckoutSheet [data-close]{float:right;background:transparent;color:white;border:0;font-size:24px}.webCheckoutSheet .wideButton{display:block;box-sizing:border-box;width:100%;text-align:center;margin:12px 0;padding:14px;text-decoration:none}.webCheckoutSheet button:disabled{opacity:.5}";document.head.appendChild(s)}
    document.body.appendChild(layer);layer.querySelector("[data-close]").onclick=close;layer.querySelector("[data-back]").onclick=close;layer.querySelector("[data-connect]").onclick=connect;layer.querySelector("[data-pay]").onclick=pay;
    try{const cfg=await request("/api/webapp/config");if(!closed){const value=Number(selectedAction==="lifetime"?cfg.lifetimePriceUsdt:cfg.planPriceUsdt);if(!Number.isFinite(value)||value<=0)throw new Error("price_unavailable");layer.querySelector("[data-price]").textContent=`${c.price}: ${value.toFixed(2)} USDT`;}}
    catch(error){status(c.error);layer?.querySelector("[data-connect]")?.setAttribute("disabled","");}
    return true;
  }
  window.EduCashProWebCheckout={open,close};
  window.addEventListener("educashpro:web-session-ready",()=>{if(pendingOpen){pendingOpen=false;void open(selectedAction)}});
  const requested=new URL(location.href).searchParams.get("subscribe");
  if(requested){selectedAction=["pay","renew","lifetime"].includes(requested)?requested:"pay";pendingOpen=true;window.addEventListener("educashpro:entry-api-ready",()=>{if(session()?.token&&pendingOpen){pendingOpen=false;void open(selectedAction)}},{once:true});setTimeout(()=>{if(pendingOpen&&session()?.token){pendingOpen=false;void open(selectedAction)}},1500);}
})();
