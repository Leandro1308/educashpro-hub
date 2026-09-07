(function(){
  "use strict";
  const nativeFetch=window.fetch.bind(window);
  const wait=(ms)=>new Promise(resolve=>setTimeout(resolve,ms));

  window.fetch=async function(input,init){
    const url=typeof input==="string"?input:String(input?.url||"");
    const method=String(init?.method||input?.method||"GET").toUpperCase();
    const isSession=method==="POST"&&/\/api\/hub\/session(?:\?|$)/.test(url);
    if(!isSession)return nativeFetch(input,init);

    try{
      const response=await nativeFetch(input,init);
      if(![502,503,504].includes(response.status))return response;
    }catch(error){
      if(init?.signal?.aborted)throw error;
    }

    await wait(280);
    return nativeFetch(input,init);
  };
})();
