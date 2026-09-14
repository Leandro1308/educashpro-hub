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
      super(options);
      const restored=super.wallet;
      if(restored&&!hasFreshProof(restored)&&typeof this.disconnect==="function"){
        Promise.resolve(this.disconnect()).catch(()=>{});
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
