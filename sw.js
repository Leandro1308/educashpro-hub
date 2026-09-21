const CACHE_VERSION="educashpro-pwa-20260921.1";
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key.startsWith("educashpro-pwa-")&&key!==CACHE_VERSION).map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  if(event.request.mode==="navigate"){
    event.respondWith(fetch(event.request).catch(()=>new Response(
      "<!doctype html><html lang='pt-BR'><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>EduCashPro</title><body style='margin:0;background:#07111f;color:#fff;font-family:system-ui;display:grid;place-items:center;min-height:100vh;text-align:center;padding:24px;box-sizing:border-box'><main><h1>EduCashPro</h1><p>Sem conexão no momento. Conecte-se à internet e tente novamente.</p></main></body></html>",
      {headers:{"Content-Type":"text/html; charset=utf-8"}}
    )));
  }
});
