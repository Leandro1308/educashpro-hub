const BUILD="2026.10.07.3";

self.addEventListener("install",()=>self.skipWaiting());

self.addEventListener("activate",event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys
      .filter(key=>key.startsWith("educashpro-pwa-")||key.startsWith("educashpro-games-"))
      .map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("message",event=>{
  if(event.data==="SKIP_WAITING")self.skipWaiting();
});

// Intencionalmente não há listener de fetch.
// Navegações e assets seguem o cache HTTP normal do navegador, evitando
// páginas antigas, revalidações duplicadas e recarregamentos forçados.

