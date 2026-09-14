(function(){
  const lib=window.TON_CONNECT_UI;
  const Original=lib?.TonConnectUI;
  if(!Original||Original.__educashproRecoveryPatched)return;

  function hasFreshProof(wallet){
    const item=wallet?.connectItems?.tonProof;
    return !!(item&&typeof item==="object"&&item.proof);
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
      if(this.connected&&typeof this.disconnect==="function"){
        this.__educashproResetPromise=Promise.resolve(this.disconnect()).catch(()=>{});
      }
    }

    async ensureFreshLogin(){
      await this.__educashproResetPromise;
      if(this.connected&&typeof this.disconnect==="function"){
        await Promise.resolve(this.disconnect()).catch(()=>{});
      }
    }

    get wallet(){
      const current=super.wallet;
      return hasFreshProof(current)?current:null;
    }
  }

  EduCashProTonConnectUI.__educashproRecoveryPatched=true;
  lib.TonConnectUI=EduCashProTonConnectUI;
})();
