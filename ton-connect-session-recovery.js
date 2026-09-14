(function(){
  const lib=window.TON_CONNECT_UI;
  const Original=lib?.TonConnectUI;
  if(!Original||Original.__educashproRecoveryPatched)return;

  function hasFreshProof(wallet){
    const item=wallet?.connectItems?.tonProof;
    return !!(item&&typeof item==="object"&&item.proof);
  }

  function wait(ms){return new Promise(resolve=>setTimeout(resolve,ms))}

  async function waitForRestore(instance){
    try{
      const restored=instance?.connectionRestored;
      if(restored&&typeof restored.then==="function"){
        await Promise.race([restored,wait(1800)]);
        return;
      }
    }catch{}
    // Em alguns navegadores móveis a restauração chega alguns instantes
    // depois do construtor. Damos uma pequena janela para ela terminar.
    await wait(650);
  }

  class EduCashProTonConnectUI extends Original{
    constructor(options){
      const merged={
        ...(options||{}),
        actionsConfiguration:{
          returnStrategy:"back",
          ...((options&&options.actionsConfiguration)||{}),
        },
      };
      super(merged);
      this.__educashproResetPromise=Promise.resolve();
    }

    async ensureFreshLogin(){
      if(this.__educashproResetPromise)await this.__educashproResetPromise;
      this.__educashproResetPromise=(async()=>{
        await waitForRestore(this);
        // Uma sessão restaurada não contém um ton_proof novo. Para login,
        // precisamos obrigar uma conexão nova, mas sem enviar transação.
        const current=super.wallet;
        if((this.connected||current)&&!hasFreshProof(current)&&typeof this.disconnect==="function"){
          await Promise.resolve(this.disconnect()).catch(()=>{});
          await wait(180);
        }
      })();
      await this.__educashproResetPromise;
    }

    get wallet(){
      const current=super.wallet;
      return hasFreshProof(current)?current:null;
    }
  }

  EduCashProTonConnectUI.__educashproRecoveryPatched=true;
  lib.TonConnectUI=EduCashProTonConnectUI;
})();
