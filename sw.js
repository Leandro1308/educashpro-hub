const BUILD="2026.10.02.10";
const CACHE_VERSION="educashpro-pwa-20261002.10";

self.addEventListener("install",()=>self.skipWaiting());

self.addEventListener("activate",event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key.startsWith("educashpro-pwa-")&&key!==CACHE_VERSION).map(key=>caches.delete(key)));
    await self.clients.claim();

    const windows=await self.clients.matchAll({type:"window",includeUncontrolled:true});
    await Promise.all(windows.map(async client=>{
      try{
        const url=new URL(client.url);
        if(url.origin!==self.location.origin)return;
        if(url.searchParams.get("release")===BUILD)return;
        url.searchParams.set("release",BUILD);
        url.searchParams.set("swrefresh","1");
        await client.navigate(url.toString());
      }catch(_){}
    }));
  })());
});

async function fetchAndCache(request,cache){
  const response=await fetch(request,{cache:"no-store"});
  if(response.ok)await cache.put(request,response.clone());
  return response;
}

self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;

  const pathname=url.pathname.toLowerCase();
  if(pathname.endsWith("/version.json")||pathname.endsWith("version.json")){
    event.respondWith(fetch(event.request,{cache:"no-store"}));
    return;
  }

  const isCoreAsset=
    event.request.mode==="navigate"||
    ["script","style","document","worker","image","font"].includes(event.request.destination)||
    /\.(?:js|css|json|html|webmanifest|png|jpg|jpeg|webp|svg|woff2?)$/.test(pathname);

  if(!isCoreAsset)return;

  event.respondWith((async()=>{
    const cache=await caches.open(CACHE_VERSION);
    const cached=await cache.match(event.request);
    if(cached){
      event.waitUntil(fetchAndCache(event.request,cache).catch(()=>{}));
      return cached;
    }
    try{
      return await fetchAndCache(event.request,cache);
    }catch(_){
      const fallback=await caches.match(event.request,{ignoreSearch:true});
      if(fallback)return fallback;
      if(event.request.mode!=="navigate")throw new Error("offline_asset");
      return new Response(
        "<!doctype html><html lang='pt-BR'><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>EduCashPro</title><body style='margin:0;background:#07111f;color:#fff;font-family:system-ui;display:grid;place-items:center;min-height:100vh;text-align:center;padding:24px;box-sizing:border-box'><main><h1>EduCashPro</h1><p>Sem conexão no momento. Abra novamente um recurso que já tenha sido carregado neste aparelho.</p></main></body></html>",
        {headers:{"Content-Type":"text/html; charset=utf-8"}}
      );
    }
  })());
});