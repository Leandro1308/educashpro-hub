(function(){
  "use strict";
  const params=new URLSearchParams(location.search),lang=["pt","en","es","ru"].includes(params.get("lang"))?params.get("lang"):"pt";
  document.documentElement.lang=lang==="pt"?"pt-BR":lang;

  const DICT={
    pt:{"SCORE":"PONTOS","HIGH SCORE":"RECORDE","BEST":"RECORDE","LENGTH":"TAMANHO","LEVEL":"NÍVEL","START GAME":"COMEÇAR","NEW GAME":"NOVO JOGO","BACK":"VOLTAR","DIFFICULTY":"DIFICULDADE","EASY":"FÁCIL","MEDIUM":"MÉDIO","HARD":"DIFÍCIL","MODE SELECT":"MODO","Classic":"Clássico","Wrap Edges":"Atravessar bordas","Obstacles":"Obstáculos","SOUND: ON":"SOM: LIGADO","SOUND: OFF":"SOM: DESLIGADO","TIME":"TEMPO","HITS":"ACERTOS","ACCURACY":"PRECISÃO","PLAY AGAIN":"JOGAR NOVAMENTE","TIME'S UP!":"TEMPO ESGOTADO!","PAUSE / RESET":"PAUSAR / REINICIAR","JOIN TILES TO REACH 2048":"JUNTE AS PEÇAS ATÉ 2048"},
    en:{},
    es:{"SCORE":"PUNTOS","HIGH SCORE":"RÉCORD","BEST":"RÉCORD","LENGTH":"LONGITUD","LEVEL":"NIVEL","START GAME":"EMPEZAR","NEW GAME":"NUEVO JUEGO","BACK":"VOLVER","DIFFICULTY":"DIFICULTAD","EASY":"FÁCIL","MEDIUM":"MEDIO","HARD":"DIFÍCIL","MODE SELECT":"MODO","Classic":"Clásico","Wrap Edges":"Cruzar bordes","Obstacles":"Obstáculos","SOUND: ON":"SONIDO: SÍ","SOUND: OFF":"SONIDO: NO","TIME":"TIEMPO","HITS":"ACIERTOS","ACCURACY":"PRECISIÓN","PLAY AGAIN":"JUGAR DE NUEVO","TIME'S UP!":"¡TIEMPO!","PAUSE / RESET":"PAUSA / REINICIO","JOIN TILES TO REACH 2048":"UNE LAS FICHAS HASTA 2048"},
    ru:{"SCORE":"ОЧКИ","HIGH SCORE":"РЕКОРД","BEST":"РЕКОРД","LENGTH":"ДЛИНА","LEVEL":"УРОВЕНЬ","START GAME":"НАЧАТЬ","NEW GAME":"НОВАЯ ИГРА","BACK":"НАЗАД","DIFFICULTY":"СЛОЖНОСТЬ","EASY":"ЛЕГКО","MEDIUM":"СРЕДНЕ","HARD":"СЛОЖНО","MODE SELECT":"РЕЖИМ","Classic":"Классика","Wrap Edges":"Сквозные края","Obstacles":"Препятствия","SOUND: ON":"ЗВУК: ВКЛ","SOUND: OFF":"ЗВУК: ВЫКЛ","TIME":"ВРЕМЯ","HITS":"ПОПАДАНИЯ","ACCURACY":"ТОЧНОСТЬ","PLAY AGAIN":"ЕЩЁ РАЗ","TIME'S UP!":"ВРЕМЯ ВЫШЛО!","PAUSE / RESET":"ПАУЗА / СБРОС","JOIN TILES TO REACH 2048":"СОЕДИНЯЙТЕ ПЛИТКИ ДО 2048"}
  };
  function translate(){
    const map=DICT[lang]||{};
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(n=>{const raw=n.nodeValue,trim=raw.trim();if(map[trim])n.nodeValue=raw.replace(trim,map[trim])});
    document.querySelectorAll("option").forEach(o=>{const k=o.textContent.trim();if(map[k])o.textContent=map[k]});
  }
  function key(type,key){document.dispatchEvent(new KeyboardEvent(type,{key,bubbles:true,cancelable:true}))}
  let sx=0,sy=0;
  addEventListener("touchstart",e=>{const t=e.changedTouches?.[0];if(t){sx=t.clientX;sy=t.clientY}},{passive:true});
  addEventListener("touchend",e=>{
    const t=e.changedTouches?.[0];if(!t)return;const dx=t.clientX-sx,dy=t.clientY-sy;if(Math.max(Math.abs(dx),Math.abs(dy))<32)return;
    const k=Math.abs(dx)>Math.abs(dy)?(dx>0?"ArrowRight":"ArrowLeft"):(dy>0?"ArrowDown":"ArrowUp");key("keydown",k);key("keyup",k);
  },{passive:true});
  const file=location.pathname.split("/").pop();
  if(file==="breakout.html"){
    const pad=document.createElement("div");pad.style.cssText="position:fixed;left:50%;bottom:8px;transform:translateX(-50%);display:flex;gap:12px;z-index:9999";
    pad.innerHTML='<button data-touch-key="ArrowLeft" style="width:72px;height:52px;font-size:24px">◀</button><button data-touch-key=" " style="width:72px;height:52px;font-size:18px">▶</button><button data-touch-key="ArrowRight" style="width:72px;height:52px;font-size:24px">▶</button>';
    document.body.appendChild(pad);
    pad.querySelectorAll("[data-touch-key]").forEach(b=>{const k=b.dataset.touchKey;b.addEventListener("pointerdown",e=>{e.preventDefault();key("keydown",k)});["pointerup","pointercancel","pointerleave"].forEach(ev=>b.addEventListener(ev,()=>key("keyup",k)))});
  }
  const style=document.createElement("style");style.textContent="canvas{max-width:100%!important;height:auto!important}body{overflow-x:hidden!important}@media(max-width:560px){body{padding:8px!important}.container{gap:12px!important}.info{min-width:min(100%,250px)!important}.game-board{max-width:100%!important;transform-origin:top center}}";document.head.appendChild(style);
  translate();
})();