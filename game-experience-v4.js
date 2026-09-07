(function(){
  "use strict";

  const suite=()=>window.EduCashProGameSuite;
  const social=window.EduCashProSocial;
  const bridge=window.EduCashProGameBridge||(window.EduCashProGameBridge={session:null,catalogContext:{}});
  if(!suite()||!social)return;

  const $=(s)=>document.querySelector(s);
  const content=()=>document.getElementById("content");
  const esc=(v)=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
  const lang=(v)=>suite()?.lang?.(v)||"pt";
  const active=()=>suite()?.active?.()===true;

  const COPY={
    pt:{
      tournamentTitle:"Antes de criar seu torneio",
      raffleTitle:"Antes de criar sua rifa ou sorteio",
      purpose:"O EduCashPro tem como objetivo ajudar o assinante a criar ativos e iniciativas digitais que podem ampliar suas oportunidades de renda.",
      group:"Crie primeiro um grupo exclusivo no Telegram, reúna as pessoas que deseja convidar e depois compartilhe nele o link ou o QR Code. Assim você concentra avisos, horário, regras e divulgação em um único lugar.",
      affiliate:"Quando alguém entrar pelo seu convite e ainda não possuir vínculo com outro afiliado, essa pessoa poderá ser vinculada a você. Se ela optar por realizar a assinatura e a adesão atender às regras vigentes do Programa de Afiliados, você poderá receber a comissão correspondente. Vínculos já existentes nunca são substituídos.",
      learn:"Conheça as regras completas do Programa de Afiliados na página de apresentação do EduCashPro. A participação é opcional e não há garantia de ganhos.",
      presentation:"Ver apresentação EduCashPro",
      continueTournament:"Continuar e criar torneio",
      continueRaffle:"Continuar e criar rifa / sorteio"
    },
    en:{
      tournamentTitle:"Before creating your tournament",
      raffleTitle:"Before creating your raffle or draw",
      purpose:"EduCashPro is designed to help subscribers create digital assets and initiatives that may expand their income opportunities.",
      group:"Create a private Telegram group first, gather the people you want to invite, then share the link or QR Code there. This keeps notices, schedules, rules and sharing in one place.",
      affiliate:"When someone enters through your invitation and has no existing affiliate relationship, that person may be linked to you. If they choose to subscribe and the subscription meets the current Affiliate Program rules, you may receive the corresponding commission. Existing relationships are never replaced.",
      learn:"See the full Affiliate Program rules on the EduCashPro presentation page. Participation is optional and earnings are not guaranteed.",
      presentation:"View EduCashPro presentation",
      continueTournament:"Continue and create tournament",
      continueRaffle:"Continue and create raffle / draw"
    },
    es:{
      tournamentTitle:"Antes de crear tu torneo",
      raffleTitle:"Antes de crear tu rifa o sorteo",
      purpose:"EduCashPro tiene como objetivo ayudar al suscriptor a crear activos e iniciativas digitales que puedan ampliar sus oportunidades de ingresos.",
      group:"Crea primero un grupo exclusivo en Telegram, reúne a las personas que deseas invitar y después comparte allí el enlace o código QR. Así concentras avisos, horario, reglas y difusión en un solo lugar.",
      affiliate:"Cuando alguien entre por tu invitación y todavía no tenga vínculo con otro afiliado, podrá quedar vinculado a ti. Si decide suscribirse y la adhesión cumple las reglas vigentes del Programa de Afiliados, podrás recibir la comisión correspondiente. Los vínculos existentes nunca se sustituyen.",
      learn:"Consulta las reglas completas del Programa de Afiliados en la página de presentación de EduCashPro. La participación es opcional y no existe garantía de ganancias.",
      presentation:"Ver presentación EduCashPro",
      continueTournament:"Continuar y crear torneo",
      continueRaffle:"Continuar y crear rifa / sorteo"
    },
    ru:{
      tournamentTitle:"Перед созданием турнира",
      raffleTitle:"Перед созданием розыгрыша",
      purpose:"EduCashPro помогает подписчикам создавать цифровые активы и инициативы, которые могут расширять возможности получения дохода.",
      group:"Сначала создайте отдельную группу Telegram, соберите приглашённых и затем разместите в ней ссылку или QR-код. Так объявления, время, правила и приглашения будут собраны в одном месте.",
      affiliate:"Если человек войдёт по вашему приглашению и ещё не связан с другим партнёром, он может быть закреплён за вами. Если он оформит подписку и условия соответствуют действующим правилам Партнёрской программы, вы можете получить предусмотренную комиссию. Существующие связи не заменяются.",
      learn:"Полные правила Партнёрской программы доступны на странице презентации EduCashPro. Участие добровольное, доход не гарантируется.",
      presentation:"О презентации EduCashPro",
      continueTournament:"Продолжить и создать турнир",
      continueRaffle:"Продолжить и создать розыгрыш"
    }
  };
  function c(key,l){const language=lang(l);return COPY[language]?.[key]||COPY.pt[key]||key}

  function backToCatalog(){suite()?.renderCatalog?.(bridge.catalogContext||{});}
  function openPresentation(){
    if(window.EduCashProApp?.renderPresentation)return window.EduCashProApp.renderPresentation();
    if(window.EduCashProApp?.showPresentation)return window.EduCashProApp.showPresentation();
    backToCatalog();
  }

  function strategyScreen(kind,l,onContinue){
    const isTournament=kind==="tournament";
    const title=isTournament?c("tournamentTitle",l):c("raffleTitle",l);
    const action=isTournament?c("continueTournament",l):c("continueRaffle",l);
    content().innerHTML=`<main class="gamePage ecpStrategyPage">
      <button class="textButton ecpStrategyBack" type="button">←</button>
      <section class="hero ecpStrategyHero">
        <span class="eyebrow">${isTournament?"🏆":"🎟️"} EduCashPro</span>
        <h1>${esc(title)}</h1>
        <p>${esc(c("purpose",l))}</p>
      </section>
      <section class="socialCard ecpStrategyCard">
        <h3>💡 ${esc(c("group",l))}</h3>
        <p>${esc(c("affiliate",l))}</p>
        <p class="ecpStrategyLearn">${esc(c("learn",l))}</p>
        <div class="socialActions one">
          <button id="ecpStrategyPresentation" class="secondaryButton" type="button">📘 ${esc(c("presentation",l))}</button>
          <button id="ecpStrategyContinue" class="wideButton" type="button">${esc(action)}</button>
        </div>
      </section>
    </main>`;
    $(".ecpStrategyBack").onclick=backToCatalog;
    $("#ecpStrategyPresentation").onclick=openPresentation;
    $("#ecpStrategyContinue").onclick=onContinue;
    window.scrollTo({top:0,behavior:"smooth"});
  }

  const originalTournament=social.openTournament?.bind(social);
  const originalRaffle=social.openRaffle?.bind(social);

  if(originalTournament){
    social.openTournament=function(game,options={}){
      const l=lang(options.lang);
      if(!active())return originalTournament(game,options);
      strategyScreen("tournament",l,()=>{
        originalTournament(game,options);
        requestAnimationFrame(()=>requestAnimationFrame(()=>document.querySelector("#continueTournament")?.click()));
      });
    };
  }

  if(originalRaffle){
    social.openRaffle=function(options={}){
      const l=lang(options.lang);
      if(!active())return originalRaffle(options);
      strategyScreen("raffle",l,()=>originalRaffle(options));
    };
  }

  function pegMoves(from,pegSet,cellSet,triangle){
    const[fr,fc]=from.split(",").map(Number);
    const dirs=triangle?[[0,2],[0,-2],[2,0],[-2,0],[2,2],[-2,-2]]:[[0,2],[0,-2],[2,0],[-2,0]];
    return dirs.flatMap(([dr,dc])=>{
      const to=`${fr+dr},${fc+dc}`,mid=`${fr+dr/2},${fc+dc/2}`;
      return cellSet.has(to)&&pegSet.has(mid)&&!pegSet.has(to)?[to]:[];
    });
  }

  function emphasizePegOptions(){
    const board=document.querySelector(".pegBoard");
    if(!board)return;
    const holes=[...board.querySelectorAll("[data-hole]")];
    const cells=new Set(holes.map(h=>h.dataset.hole));
    const pegs=new Set(holes.filter(h=>h.classList.contains("peg")).map(h=>h.dataset.hole));
    const triangle=board.classList.contains("pegTriangle");
    holes.forEach(h=>{h.classList.remove("ecpMovableChoice");if(!h.classList.contains("selected"))h.classList.remove("ecpMoveTarget")});
    const movable=holes.filter(h=>h.classList.contains("peg")&&pegMoves(h.dataset.hole,pegs,cells,triangle).length);
    movable.forEach(h=>h.classList.add("ecpMovableChoice"));
    const selected=holes.find(h=>h.classList.contains("selected"));
    if(selected){
      selected.classList.add("ecpSelectedPeg");
      pegMoves(selected.dataset.hole,pegs,cells,triangle).forEach(to=>board.querySelector(`[data-hole="${to}"]`)?.classList.add("ecpMoveTarget"));
    }
  }

  let timerState=null;
  let timerInterval=0;

  function textOf(el){return String(el?.textContent||"").trim()}
  function firstNumber(text){const m=String(text||"").match(/\d+/);return m?Number(m[0]):0}
  function detectTimedGame(){
    const peg=document.querySelector(".pegBoard");
    if(peg){
      const page=peg.closest(".gamePage");
      const stats=[...(page?.querySelectorAll(".gameStat")||[])];
      const moveStat=stats.find(x=>/jogad|move|ход|jugad/i.test(textOf(x)));
      return{kind:"peg",signature:`peg:${textOf(page?.querySelector(".eyebrow"))}`,progress:firstNumber(textOf(moveStat)),host:page?.querySelector(".gameStats")};
    }
    const slide=document.querySelector("[data-slide]");
    if(slide){
      const page=slide.closest(".gamePage");
      const moveStat=page?.querySelector(".gameStats .gameStat");
      return{kind:"slide",signature:`slide:${textOf(page?.querySelector(".eyebrow"))}`,progress:firstNumber(textOf(moveStat)),host:page?.querySelector(".gameStats")};
    }
    const words=document.querySelector(".wordBoard");
    if(words){
      const page=words.closest(".gamePage"),stat=page?.querySelector(".gameStats .gameStat");
      return{kind:"words",signature:`words:${textOf(page?.querySelector(".eyebrow"))}`,progress:firstNumber(textOf(stat)),host:page?.querySelector(".gameStats")};
    }
    const cross=document.querySelector(".crossGrid");
    if(cross){
      const page=cross.closest(".gamePage"),blanks=[...cross.querySelectorAll(".crossTile.blank")];
      const progress=blanks.filter(x=>textOf(x)!=="?").length;
      let host=page?.querySelector(".ecpCrossClockHost");
      if(!host&&page){host=document.createElement("div");host.className="gameStats ecpCrossClockHost";page.querySelector(".crossBank")?.before(host)}
      return{kind:"cross",signature:`cross:${textOf(page?.querySelector(".eyebrow"))}`,progress,host};
    }
    return null;
  }

  function formatElapsed(ms){
    const total=Math.max(0,Math.floor(ms/1000)),m=Math.floor(total/60),s=total%60;
    return`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
  }

  function ensureClock(){
    const detected=detectTimedGame();
    if(!detected){timerState=null;return;}
    if(!timerState||timerState.kind!==detected.kind||timerState.signature!==detected.signature||detected.progress<timerState.progress){
      timerState={kind:detected.kind,signature:detected.signature,startedAt:Date.now(),progress:detected.progress};
    }else timerState.progress=Math.max(timerState.progress,detected.progress);
    if(!detected.host)return;
    let clock=detected.host.querySelector("[data-ecp-game-clock]");
    if(!clock){clock=document.createElement("span");clock.className="gameStat ecpGameClock";clock.dataset.ecpGameClock="1";detected.host.appendChild(clock)}
    clock.textContent=`⏱ ${formatElapsed(Date.now()-timerState.startedAt)}`;
  }

  function polish(){emphasizePegOptions();ensureClock();}
  const observer=new MutationObserver(()=>queueMicrotask(polish));
  observer.observe(document.documentElement,{childList:true,subtree:true});
  timerInterval=window.setInterval(()=>{if(document.hidden)return;ensureClock()},1000);
  document.addEventListener("visibilitychange",()=>{if(!document.hidden)ensureClock()});
  document.addEventListener("DOMContentLoaded",polish);
  polish();

  window.EduCashProGameExperienceV4={polish};
})();
