(function(){
"use strict";
const A=window.EduCashProLocalArcade;if(!A)return;
const COPY={
pt:{choose:"Escolha a modalidade",level1:"Nível 1 · Defesa clássica",level1Sub:"Mova para os lados e destrua as bolinhas antes que atravessem a defesa.",level2:"Nível 2 · Combate aéreo",level2Sub:"Voe em várias direções, desvie dos tiros inimigos e dispare rajadas contra outros aviões.",how1:"Como jogar: mova o avião para a esquerda e direita. O disparo é automático. Destrua as bolinhas antes que atravessem a base. Você começa com 5 vidas; a cada 30 segundos ganha 1 vida e a velocidade aumenta.",how2:"Como jogar: você começa com 5 vidas e 2 aviões inimigos. Use ▲ ▼ ◀ ▶ no celular ou setas/WASD no computador. Cada toque em RAJADA dispara 5 tiros. Cada inimigo dispara 1 tiro por segundo. A cada 30 segundos entra mais 1 inimigo, até o máximo de 5. A velocidade não aumenta.",fire:"RAJADA",enemies:"Inimigos",hits:"Abatidos",survive:"Destrua os aviões inimigos e desvie dos tiros antes de ser atingido.",controls2:"Use as setas ou WASD para voar. No celular, use os quatro botões. Cada toque em RAJADA dispara cinco tiros.",wave:"Novo avião inimigo entrou no combate!"},
en:{choose:"Choose a mode",level1:"Level 1 · Classic defense",level1Sub:"Move sideways and destroy the balls before they cross the defense.",level2:"Level 2 · Air combat",level2Sub:"Fly in several directions, dodge enemy fire and shoot bursts at hostile aircraft.",how1:"How to play: move left and right. Shooting is automatic. Destroy the balls before they cross the base. You start with 5 lives; every 30 seconds you gain 1 life and speed increases.",how2:"How to play: you start with 5 lives and 2 enemy aircraft. Use ▲ ▼ ◀ ▶ on mobile or arrows/WASD on desktop. Each BURST tap fires 5 shots. Each enemy fires 1 shot per second. Every 30 seconds one enemy is added, up to 5. Speed does not increase.",fire:"BURST",enemies:"Enemies",hits:"Destroyed",survive:"Destroy enemy aircraft and dodge their shots before you are hit.",controls2:"Use arrows or WASD to fly. On mobile, use the four buttons. Each BURST tap fires five shots.",wave:"A new enemy aircraft entered combat!"},
es:{choose:"Elige la modalidad",level1:"Nivel 1 · Defensa clásica",level1Sub:"Muévete a los lados y destruye las bolas antes de que crucen la defensa.",level2:"Nivel 2 · Combate aéreo",level2Sub:"Vuela en varias direcciones, esquiva los disparos enemigos y lanza ráfagas contra otros aviones.",how1:"Cómo jugar: muévete a izquierda y derecha. El disparo es automático. Destruye las bolas antes de que crucen la base. Comienzas con 5 vidas; cada 30 segundos ganas 1 vida y aumenta la velocidad.",how2:"Cómo jugar: comienzas con 5 vidas y 2 aviones enemigos. Usa ▲ ▼ ◀ ▶ en móvil o flechas/WASD en computadora. Cada toque en RÁFAGA dispara 5 tiros. Cada enemigo dispara 1 tiro por segundo. Cada 30 segundos entra 1 enemigo más, hasta 5. La velocidad no aumenta.",fire:"RÁFAGA",enemies:"Enemigos",hits:"Derribados",survive:"Destruye los aviones enemigos y esquiva sus disparos.",controls2:"Usa flechas o WASD. En el móvil, usa los cuatro botones. Cada toque en RÁFAGA dispara cinco tiros.",wave:"¡Un nuevo avión enemigo entró en combate!"},
ru:{choose:"Выберите режим",level1:"Уровень 1 · Классическая оборона",level1Sub:"Двигайтесь в стороны и уничтожайте шары до линии обороны.",level2:"Уровень 2 · Воздушный бой",level2Sub:"Летайте в разных направлениях, уклоняйтесь от огня и стреляйте очередями по самолётам.",how1:"Как играть: двигайтесь влево и вправо. Стрельба автоматическая. Уничтожайте шары до линии базы. В начале 5 жизней; каждые 30 секунд добавляется 1 жизнь и растёт скорость.",how2:"Как играть: в начале 5 жизней и 2 самолёта противника. На телефоне используйте ▲ ▼ ◀ ▶, на компьютере — стрелки/WASD. Каждое нажатие ОЧЕРЕДЬ выпускает 5 выстрелов. Каждый враг стреляет 1 раз в секунду. Каждые 30 секунд добавляется 1 враг, максимум 5. Скорость не увеличивается.",fire:"ОЧЕРЕДЬ",enemies:"Враги",hits:"Сбито",survive:"Уничтожайте самолёты и уклоняйтесь от их выстрелов.",controls2:"Используйте стрелки или WASD. На телефоне — четыре кнопки. Каждое нажатие ОЧЕРЕДЬ выпускает пять выстрелов.",wave:"В бой вошёл новый самолёт противника!"}
};
function c(k,l){return COPY[l]?.[k]||COPY.pt[k]||k}
function plane(ctx,x,y,color,angle,scale){
ctx.save();ctx.translate(x,y);ctx.rotate(angle||0);ctx.scale(scale||1,scale||1);ctx.fillStyle=color||"#dcecff";
ctx.beginPath();ctx.moveTo(0,-30);ctx.lineTo(12,5);ctx.lineTo(38,18);ctx.lineTo(9,17);ctx.lineTo(0,31);ctx.lineTo(-9,17);ctx.lineTo(-38,18);ctx.lineTo(-12,5);ctx.closePath();ctx.fill();
ctx.fillStyle="#30e6a6";ctx.fillRect(-5,-12,10,22);ctx.restore()
}
function sky(ctx,W,H,now){
ctx.fillStyle="#071522";ctx.fillRect(0,0,W,H);
for(let s=0;s<55;s++){const x=(s*97)%W,y=(s*61+now*.03)%H;ctx.fillStyle=s%8===0?"#7ea8d8":"#27425e";ctx.fillRect(x,y,1.5,1.5)}
}
function menu(l){
A.stop();
A.content().innerHTML='<main class="laPage"><button class="textButton airBack">← '+A.esc(A.t("back",l))+'</button><section class="laHero"><span class="laEye">EDUCASHPRO PLAY</span><h1>✈️ '+A.esc(A.t("airTitle",l))+'</h1><p>'+A.esc(c("choose",l))+'</p><p style="margin-top:8px;font-size:12px;color:#91a4b9">'+A.esc(A.t("airHow",l))+'</p></section><section class="laInfo"><article class="laCard"><h3>'+A.esc(c("level1",l))+'</h3><p>'+A.esc(c("level1Sub",l))+'</p><p style="margin-top:8px;font-size:12px;color:#91a4b9">'+A.esc(c("how1",l))+'</p><button class="laPrimary" data-air-mode="level-1" id="airLevel1">'+A.esc(A.t("start",l))+'</button></article><article class="laCard"><h3>'+A.esc(c("level2",l))+'</h3><p>'+A.esc(c("level2Sub",l))+'</p><p style="margin-top:8px;font-size:12px;color:#91a4b9">'+A.esc(c("how2",l))+'</p><button class="laPrimary" data-air-mode="level-2" id="airLevel2">'+A.esc(A.t("start",l))+'</button></article></section><p class="notice">📱 '+A.esc(A.t("local",l))+'</p></main>';
document.querySelector(".airBack").onclick=A.catalog;
document.getElementById("airLevel1").onclick=()=>classic(l);
document.getElementById("airLevel2").onclick=()=>combat(l);
A.top()
}
function classic(l){
A.stop();
const old=A.get("air"),oldRecordMs=Number(old.recordMs||0),oldBest=Number(old.bestDestroyed||0);
A.content().innerHTML='<main class="laPage"><button class="textButton airBack">← '+A.esc(A.t("back",l))+'</button><div class="laHud"><div><small>'+A.esc(A.t("lives",l))+'</small><b id="airLives"></b></div><div><small>'+A.esc(A.t("speed",l))+'</small><b id="airSpeed"></b></div><div><small>'+A.esc(A.t("destroyed",l))+'</small><b id="airDestroyed">0</b></div><div><small>'+A.esc(A.t("record",l))+'</small><b>'+oldBest+'</b></div></div><div class="laWrap"><canvas id="airCanvas" class="laCanvas" width="450" height="700"></canvas><div id="airToast" class="laToast"></div><div id="airOver"></div></div><details class="gameRules" open><summary>'+A.esc(A.t("how",l))+'</summary><p>'+A.esc(c("how1",l))+'</p></details><div class="laControls"><button id="airLeft" class="laControl big">◀</button><button id="airMinus" class="laControl">−</button><div class="laSpeed">⚡ <b id="airSpeed2"></b></div><button id="airPlus" class="laControl">+</button><button id="airRight" class="laControl big">▶</button></div></main>';
const canvas=document.getElementById("airCanvas"),ctx=canvas.getContext("2d"),W=canvas.width,H=canvas.height,player={x:W/2,y:H-70},balls=[],shots=[],keys={left:false,right:false},toast=document.getElementById("airToast");
let lives=5,baseTier=1,adjust=0,destroyed=0,start=performance.now(),last=start,bonusCount=0,spawnIn=.25,shotIn=0,ended=false,frameId=0;
const tier=()=>A.clamp(baseTier+adjust,1,baseTier+3),fallSpeed=()=>68+tier()*22;
function hud(){document.getElementById("airLives").textContent="❤️".repeat(Math.min(lives,10))+(lives>10?("+"+(lives-10)):"");document.getElementById("airSpeed").textContent=document.getElementById("airSpeed2").textContent=tier()+"x";document.getElementById("airDestroyed").textContent=destroyed}
function flash(m){toast.textContent=m;toast.classList.add("show");clearTimeout(flash.timer);flash.timer=setTimeout(()=>toast.classList.remove("show"),1000)}
function addBall(){const r=13+Math.random()*10;balls.push({x:30+Math.random()*(W-60),y:-r,r,color:["#ff6b7a","#4a8cff","#ffc85c","#a88cff","#30e6a6","#ff8fd8"][Math.floor(Math.random()*6)]})}
function finish(now){
if(ended)return;ended=true;if(frameId)cancelAnimationFrame(frameId);
const durationMs=now-start,recordMs=Math.max(oldRecordMs,durationMs),bestDestroyed=Math.max(oldBest,destroyed);
A.save("air",{recordMs,bestDestroyed,lastDestroyed:destroyed,bestTier:Math.max(Number(old.bestTier||0),baseTier)});
const over=document.getElementById("airOver");over.className="laOver";
over.innerHTML='<div><span class="laEye">'+A.esc(A.t("gameOver",l))+'</span><h2>✈️ '+destroyed+'</h2><p>'+A.esc(A.t("destroyed",l))+': <b>'+destroyed+'</b> · '+A.esc(A.t("record",l))+': <b>'+bestDestroyed+'</b> · '+A.fmt(durationMs)+'</p><div class="laActions"><button id="airAgain" class="laPrimary">'+A.esc(A.t("again",l))+'</button><button id="airExit" class="laSecondary">'+A.esc(A.t("exit",l))+'</button></div></div>';
document.getElementById("airAgain").onclick=()=>classic(l);document.getElementById("airExit").onclick=A.catalog
}
function frame(now){
frameId=0;if(ended)return;const dt=Math.min(.035,(now-last)/1000||0);last=now;
const elapsed=now-start,nextBonus=Math.floor(elapsed/30000);
if(nextBonus>bonusCount){const gained=nextBonus-bonusCount;bonusCount=nextBonus;lives+=gained;baseTier+=gained;adjust=Math.max(adjust,0);flash(A.t("levelUp",l))}
if(keys.left)player.x-=270*dt;if(keys.right)player.x+=270*dt;player.x=A.clamp(player.x,38,W-38);
spawnIn-=dt;if(spawnIn<=0){addBall();spawnIn=A.clamp(.98-tier()*.045,.3,.85)}
shotIn-=dt;if(shotIn<=0){shots.push({x:player.x,y:player.y-28});shotIn=.19}
for(const s of shots)s.y-=430*dt;for(const b of balls)b.y+=fallSpeed()*dt;
for(let i=shots.length-1;i>=0;i--){const s=shots[i];if(s.y<-20){shots.splice(i,1);continue}let hit=-1;for(let j=balls.length-1;j>=0;j--){const b=balls[j],dx=s.x-b.x,dy=s.y-b.y;if(dx*dx+dy*dy<b.r*b.r){hit=j;break}}if(hit>=0){balls.splice(hit,1);shots.splice(i,1);destroyed++}}
for(let i=balls.length-1;i>=0;i--){if(balls[i].y-balls[i].r>H){balls.splice(i,1);lives--;baseTier=Math.max(1,baseTier-1);adjust=Math.min(adjust,0);flash(A.t("escaped",l));if(lives<=0){finish(now);return}}}
sky(ctx,W,H,now);ctx.strokeStyle="rgba(48,230,166,.25)";ctx.setLineDash([10,8]);ctx.beginPath();ctx.moveTo(0,H-18);ctx.lineTo(W,H-18);ctx.stroke();ctx.setLineDash([]);
for(const s of shots){ctx.fillStyle="#eafff8";ctx.fillRect(s.x-2,s.y-10,4,18);ctx.fillStyle="#30e6a6";ctx.fillRect(s.x-1,s.y-15,2,8)}
for(const b of balls){ctx.fillStyle=b.color;ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);ctx.fill();ctx.fillStyle="rgba(255,255,255,.35)";ctx.beginPath();ctx.arc(b.x-b.r*.3,b.y-b.r*.3,b.r*.28,0,Math.PI*2);ctx.fill()}
plane(ctx,player.x,player.y);hud();frameId=requestAnimationFrame(frame)
}
function move(clientX){const rect=canvas.getBoundingClientRect();player.x=A.clamp((clientX-rect.left)/rect.width*W,38,W-38)}
const pointerDown=e=>{e.preventDefault();move(e.clientX);canvas.setPointerCapture?.(e.pointerId)},pointerMove=e=>{if(e.buttons||e.pointerType==="touch")move(e.clientX)},keyDown=e=>{if(e.key==="ArrowLeft")keys.left=true;if(e.key==="ArrowRight")keys.right=true},keyUp=e=>{if(e.key==="ArrowLeft")keys.left=false;if(e.key==="ArrowRight")keys.right=false};
canvas.addEventListener("pointerdown",pointerDown);canvas.addEventListener("pointermove",pointerMove);window.addEventListener("keydown",keyDown);window.addEventListener("keyup",keyUp);
document.querySelector(".airBack").onclick=A.catalog;
const left=document.getElementById("airLeft"),right=document.getElementById("airRight");
left.onpointerdown=()=>keys.left=true;left.onpointerup=left.onpointercancel=()=>keys.left=false;right.onpointerdown=()=>keys.right=true;right.onpointerup=right.onpointercancel=()=>keys.right=false;
document.getElementById("airMinus").onclick=()=>{adjust=A.clamp(adjust-1,-2,3);hud()};document.getElementById("airPlus").onclick=()=>{adjust=A.clamp(adjust+1,-2,3);hud()};
A.setStop(()=>{ended=true;if(frameId)cancelAnimationFrame(frameId);canvas.removeEventListener("pointerdown",pointerDown);canvas.removeEventListener("pointermove",pointerMove);window.removeEventListener("keydown",keyDown);window.removeEventListener("keyup",keyUp)});
hud();frameId=requestAnimationFrame(frame);A.top()
}
function combat(l){
A.stop();
const old=A.get("air-combat"),oldBest=Number(old.bestDestroyed||0),oldRecord=Number(old.recordMs||0);
A.content().innerHTML='<main class="laPage"><button class="textButton airBack">← '+A.esc(A.t("back",l))+'</button><section class="laHero" style="padding-bottom:12px"><span class="laEye">NÍVEL 2</span><h1>✈️ '+A.esc(c("level2",l))+'</h1><p>'+A.esc(c("survive",l))+'</p></section><div class="laHud"><div><small>'+A.esc(A.t("lives",l))+'</small><b id="air2Lives"></b></div><div><small>'+A.esc(c("enemies",l))+'</small><b id="air2Enemies">2</b></div><div><small>'+A.esc(c("hits",l))+'</small><b id="air2Destroyed">0</b></div><div><small>'+A.esc(A.t("record",l))+'</small><b>'+oldBest+'</b></div></div><div class="laWrap"><canvas id="air2Canvas" class="laCanvas" width="450" height="700"></canvas><div id="air2Toast" class="laToast"></div><div id="air2Over"></div></div><p class="notice">'+A.esc(c("controls2",l))+'</p><details class="gameRules" open><summary>'+A.esc(A.t("how",l))+'</summary><p>'+A.esc(c("how2",l))+'</p></details><div style="display:grid;grid-template-columns:repeat(3,72px);justify-content:center;gap:8px;margin:12px auto"><span></span><button id="air2Up" class="laControl big">▲</button><span></span><button id="air2Left" class="laControl big">◀</button><button id="air2Down" class="laControl big">▼</button><button id="air2Right" class="laControl big">▶</button></div><button id="air2Fire" class="laPrimary" style="width:min(360px,92%);margin:8px auto 0;display:block">🔥 '+A.esc(c("fire",l))+'</button></main>';
const canvas=document.getElementById("air2Canvas"),ctx=canvas.getContext("2d"),W=canvas.width,H=canvas.height,player={x:W/2,y:H-90,r:24},enemies=[],shots=[],enemyShots=[],keys={left:false,right:false,up:false,down:false},toast=document.getElementById("air2Toast");
let lives=5,destroyed=0,targetCount=2,start=performance.now(),last=start,lastIncrease=0,ended=false,frameId=0;
function flash(m){toast.textContent=m;toast.classList.add("show");clearTimeout(flash.timer);flash.timer=setTimeout(()=>toast.classList.remove("show"),1000)}
function spawnEnemy(){const a=Math.random()*Math.PI*2,speed=52+Math.random()*42,e={x:45+Math.random()*(W-90),y:55+Math.random()*220,r:24,vx:Math.cos(a)*speed,vy:Math.sin(a)*speed,shot:1};if(Math.abs(e.vy)<24)e.vy=(Math.random()<.5?-1:1)*28;enemies.push(e)}
function maintain(){while(enemies.length<targetCount)spawnEnemy()}
function fire(){if(ended)return;for(const vx of[-140,-70,0,70,140])shots.push({x:player.x,y:player.y-30,vx,vy:-470})}
function enemyFire(e){const dx=player.x-e.x,dy=player.y-e.y,len=Math.hypot(dx,dy)||1,speed=210;enemyShots.push({x:e.x,y:e.y+18,vx:dx/len*speed,vy:dy/len*speed,r:5})}
function hud(){document.getElementById("air2Lives").textContent="❤️".repeat(Math.max(0,lives));document.getElementById("air2Enemies").textContent=targetCount;document.getElementById("air2Destroyed").textContent=destroyed}
function collide(a,b,r){const dx=a.x-b.x,dy=a.y-b.y;return dx*dx+dy*dy<r*r}
function finish(now){
if(ended)return;ended=true;if(frameId)cancelAnimationFrame(frameId);
const durationMs=now-start,bestDestroyed=Math.max(oldBest,destroyed),recordMs=Math.max(oldRecord,durationMs);
A.save("air-combat",{bestDestroyed,recordMs,lastDestroyed:destroyed});
const over=document.getElementById("air2Over");over.className="laOver";
over.innerHTML='<div><span class="laEye">'+A.esc(A.t("gameOver",l))+'</span><h2>✈️ '+destroyed+'</h2><p>'+A.esc(c("hits",l))+': <b>'+destroyed+'</b> · '+A.esc(A.t("record",l))+': <b>'+bestDestroyed+'</b> · '+A.fmt(durationMs)+'</p><div class="laActions"><button id="air2Again" class="laPrimary">'+A.esc(A.t("again",l))+'</button><button id="air2Exit" class="laSecondary">'+A.esc(A.t("exit",l))+'</button></div></div>';
document.getElementById("air2Again").onclick=()=>combat(l);document.getElementById("air2Exit").onclick=A.catalog
}
function frame(now){
frameId=0;if(ended)return;const dt=Math.min(.035,(now-last)/1000||0);last=now;
const elapsed=now-start,step=Math.floor(elapsed/30000);
if(step>lastIncrease){lastIncrease=step;if(targetCount<5){targetCount++;flash(c("wave",l));maintain()}}
const moveSpeed=275;if(keys.left)player.x-=moveSpeed*dt;if(keys.right)player.x+=moveSpeed*dt;if(keys.up)player.y-=moveSpeed*dt;if(keys.down)player.y+=moveSpeed*dt;
player.x=A.clamp(player.x,35,W-35);player.y=A.clamp(player.y,300,H-45);
for(const e of enemies){e.x+=e.vx*dt;e.y+=e.vy*dt;if(e.x<30||e.x>W-30){e.vx*=-1;e.x=A.clamp(e.x,30,W-30)}if(e.y<35||e.y>H*.56){e.vy*=-1;e.y=A.clamp(e.y,35,H*.56)}e.shot-=dt;if(e.shot<=0){enemyFire(e);e.shot+=1}}
for(const s of shots){s.x+=s.vx*dt;s.y+=s.vy*dt}for(const s of enemyShots){s.x+=s.vx*dt;s.y+=s.vy*dt}
for(let i=shots.length-1;i>=0;i--){const s=shots[i];if(s.y<-30||s.x<-30||s.x>W+30){shots.splice(i,1);continue}let hit=-1;for(let j=enemies.length-1;j>=0;j--){if(collide(s,enemies[j],enemies[j].r)){hit=j;break}}if(hit>=0){enemies.splice(hit,1);shots.splice(i,1);destroyed++;maintain()}}
for(let i=enemyShots.length-1;i>=0;i--){const s=enemyShots[i];if(s.y>H+20||s.y<-20||s.x<-20||s.x>W+20){enemyShots.splice(i,1);continue}if(collide(s,player,player.r)){enemyShots.splice(i,1);lives--;flash("💥");if(lives<=0){finish(now);return}}}
sky(ctx,W,H,now);
for(const s of shots){ctx.fillStyle="#eafff8";ctx.fillRect(s.x-2,s.y-10,4,18);ctx.fillStyle="#30e6a6";ctx.fillRect(s.x-1,s.y-15,2,8)}
for(const s of enemyShots){ctx.fillStyle="#ff6b7a";ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill()}
for(const e of enemies)plane(ctx,e.x,e.y,"#ff8290",Math.PI,.72);
plane(ctx,player.x,player.y,"#dcecff",0,.88);hud();frameId=requestAnimationFrame(frame)
}
function hold(id,key){const el=document.getElementById(id),on=()=>keys[key]=true,off=()=>keys[key]=false;el.onpointerdown=on;el.onpointerup=el.onpointercancel=el.onpointerleave=off}
const keyDown=e=>{const k=e.key.toLowerCase();if(e.key==="ArrowLeft"||k==="a")keys.left=true;if(e.key==="ArrowRight"||k==="d")keys.right=true;if(e.key==="ArrowUp"||k==="w")keys.up=true;if(e.key==="ArrowDown"||k==="s")keys.down=true;if(e.code==="Space"){e.preventDefault();fire()}};
const keyUp=e=>{const k=e.key.toLowerCase();if(e.key==="ArrowLeft"||k==="a")keys.left=false;if(e.key==="ArrowRight"||k==="d")keys.right=false;if(e.key==="ArrowUp"||k==="w")keys.up=false;if(e.key==="ArrowDown"||k==="s")keys.down=false};
hold("air2Left","left");hold("air2Right","right");hold("air2Up","up");hold("air2Down","down");
document.getElementById("air2Fire").onclick=fire;document.querySelector(".airBack").onclick=()=>menu(l);
window.addEventListener("keydown",keyDown);window.addEventListener("keyup",keyUp);
A.setStop(()=>{ended=true;if(frameId)cancelAnimationFrame(frameId);window.removeEventListener("keydown",keyDown);window.removeEventListener("keyup",keyUp)});
maintain();hud();frameId=requestAnimationFrame(frame);A.top()
}
A.register("air-defense",(l)=>classic(l));
A.register("air-defense-2",(l)=>combat(l));
// Aliases kept for old links/bookmarks.
A.register("air-defense-menu",menu);
A.register("air-defense-level-1",(l)=>classic(l));
A.register("air-defense-level-2",(l)=>combat(l));
})();