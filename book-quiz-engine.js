(function(){
  "use strict";
  if(window.EduCashProBookQuiz)return;

  const registry=new Map();
  const contentNode=()=>document.getElementById("content");
  const esc=(value)=>String(value??"").replace(/[&<>"']/g,(c)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const COPY={
    pt:{back:"Voltar",start:"Começar",continue:"Continuar de onde parei",restart:"Recomeçar",progress:"Progresso",question:"Pergunta",of:"de",chapter:"Capítulo",score:"Acertos",local:"Seu progresso fica salvo somente neste aparelho.",comment:"Resposta comentada",correct:"Resposta correta!",wrong:"Não foi desta vez",next:"Próxima pergunta",finish:"Ver resultado",completed:"Desafio concluído",result:"Seu resultado",review:"Você percorreu os 100 conceitos sem repetição.",again:"Recomeçar do início",confirm:"Recomeçar apaga o progresso salvo neste aparelho. Continuar?",saved:"Progresso salvo neste aparelho",contentPt:"Conteúdo das perguntas em português",questions:"100 perguntas comentadas"},
    en:{back:"Back",start:"Start",continue:"Continue where I stopped",restart:"Restart",progress:"Progress",question:"Question",of:"of",chapter:"Chapter",score:"Correct",local:"Your progress is stored only on this device.",comment:"Commented answer",correct:"Correct answer!",wrong:"Not this time",next:"Next question",finish:"View result",completed:"Challenge completed",result:"Your result",review:"You completed all 100 concepts without repeated questions.",again:"Restart from the beginning",confirm:"Restarting clears progress stored on this device. Continue?",saved:"Progress saved on this device",contentPt:"Question content is in Portuguese",questions:"100 commented questions"},
    es:{back:"Volver",start:"Comenzar",continue:"Continuar donde quedé",restart:"Reiniciar",progress:"Progreso",question:"Pregunta",of:"de",chapter:"Capítulo",score:"Aciertos",local:"Tu progreso se guarda solamente en este dispositivo.",comment:"Respuesta comentada",correct:"¡Respuesta correcta!",wrong:"Esta vez no",next:"Siguiente pregunta",finish:"Ver resultado",completed:"Desafío completado",result:"Tu resultado",review:"Recorriste los 100 conceptos sin preguntas repetidas.",again:"Reiniciar desde el principio",confirm:"Reiniciar borra el progreso guardado en este dispositivo. ¿Continuar?",saved:"Progreso guardado en este dispositivo",contentPt:"El contenido de las preguntas está en portugués",questions:"100 preguntas comentadas"},
    ru:{back:"Назад",start:"Начать",continue:"Продолжить с места остановки",restart:"Начать заново",progress:"Прогресс",question:"Вопрос",of:"из",chapter:"Глава",score:"Верно",local:"Прогресс хранится только на этом устройстве.",comment:"Комментарий к ответу",correct:"Правильный ответ!",wrong:"В этот раз неверно",next:"Следующий вопрос",finish:"Результат",completed:"Задание завершено",result:"Ваш результат",review:"Вы прошли все 100 тем без повторяющихся вопросов.",again:"Начать сначала",confirm:"Перезапуск удалит прогресс на этом устройстве. Продолжить?",saved:"Прогресс сохранён на устройстве",contentPt:"Вопросы доступны на португальском",questions:"100 вопросов с комментариями"}
  };

  function lang(value){
    const raw=String(value||window.__EDUCASHPRO_SESSION__?.profile?.language||navigator.language||"pt").slice(0,2).toLowerCase();
    return COPY[raw]?raw:"pt";
  }
  function text(key,l){return COPY[lang(l)]?.[key]||COPY.pt[key]||key}
  function userKey(){
    const id=window.__EDUCASHPRO_SESSION__?.profile?.userId||window.__EDUCASHPRO_SESSION__?.profile?.telegramId||"device";
    return String(id).replace(/[^a-zA-Z0-9_-]/g,"").slice(0,80)||"device";
  }
  function storageKey(id){return "educashpro:book-quiz:v1:"+String(id)+":"+userKey()}
  function fresh(){return{version:1,index:0,score:0,answers:[],completed:false,updatedAt:new Date().toISOString()}}
  function read(id,total){
    try{
      const value=JSON.parse(localStorage.getItem(storageKey(id))||"null");
      if(!value||value.version!==1)return fresh();
      const answers=Array.isArray(value.answers)?value.answers.filter(Boolean).slice(0,total):[];
      const index=Math.max(0,Math.min(total,Number(value.index)||0));
      return{version:1,index,score:Math.max(0,Math.min(total,Number(value.score)||0)),answers,completed:value.completed===true&&index>=total,updatedAt:value.updatedAt||null};
    }catch{return fresh()}
  }
  function write(id,state){
    try{localStorage.setItem(storageKey(id),JSON.stringify({...state,updatedAt:new Date().toISOString()}))}catch{}
  }
  function reset(id){
    try{localStorage.removeItem(storageKey(id))}catch{}
  }
  function top(){window.scrollTo({top:0,behavior:"smooth"})}
  function backToCatalog(){
    window.EduCashProGameSuite?.renderCatalog?.(window.EduCashProGameBridge?.catalogContext||{});
  }
  function register(config){
    if(!config?.id||!Array.isArray(config.questions)||!config.questions.length)throw new Error("invalid_book_quiz");
    const ids=new Set(config.questions.map(q=>q.id));
    if(ids.size!==config.questions.length)throw new Error("duplicate_book_quiz_question_id");
    registry.set(String(config.id),config);
    return true;
  }

  function startScreen(config,l){
    const target=contentNode();if(!target)return;
    const total=config.questions.length,state=read(config.id,total),pct=Math.round((state.index/total)*100);
    target.innerHTML=`<main class="bookQuizPage">
      <button class="textButton bookQuizBack" type="button">← ${esc(text("back",l))}</button>
      <section class="bookQuizHero">
        <div class="bookQuizCover">${esc(config.icon||"📘")}</div>
        <div><span class="eyebrow">EDUCASHPRO · APRENDER NA PRÁTICA</span><h1>${esc(config.title)}</h1><p>${esc(config.subtitle||"")}</p></div>
      </section>
      <section class="bookQuizIntro">
        <div class="bookQuizStats"><span><b>${total}</b><small>${esc(text("questions",l))}</small></span><span><b>${state.score}</b><small>${esc(text("score",l))}</small></span><span><b>${state.index}</b><small>${esc(text("progress",l))}</small></span></div>
        <div class="bookQuizProgress"><span style="width:${pct}%"></span></div>
        <p class="bookQuizLocal">💾 ${esc(text("local",l))}</p>
        ${l!=="pt"?`<p class="bookQuizLanguage">🌐 ${esc(text("contentPt",l))}</p>`:""}
        <div class="bookQuizActions">
          <button id="bookQuizStart" class="wideButton" type="button">${esc(state.index>0&&!state.completed?text("continue",l):state.completed?text("result",l):text("start",l))}</button>
          ${state.index>0?`<button id="bookQuizReset" class="secondaryButton" type="button">↻ ${esc(text("restart",l))}</button>`:""}
        </div>
      </section>
    </main>`;
    target.querySelector(".bookQuizBack").onclick=backToCatalog;
    target.querySelector("#bookQuizStart").onclick=()=>state.completed?resultScreen(config,l,state):questionScreen(config,l,state);
    target.querySelector("#bookQuizReset")?.addEventListener("click",()=>{
      if(confirm(text("confirm",l))){reset(config.id);startScreen(config,l)}
    });
    top();
  }

  function questionScreen(config,l,state){
    const target=contentNode();if(!target)return;
    const total=config.questions.length;
    if(state.index>=total){state.completed=true;write(config.id,state);return resultScreen(config,l,state)}
    const q=config.questions[state.index],number=state.index+1,pct=Math.round((state.index/total)*100);
    target.innerHTML=`<main class="bookQuizPage">
      <div class="bookQuizTopbar"><button class="textButton bookQuizBack" type="button">← ${esc(text("back",l))}</button><span>💾 ${esc(text("saved",l))}</span></div>
      <section class="bookQuizQuestionCard">
        <div class="bookQuizMeta"><span>${esc(text("chapter",l))} ${Number(q.chapter)||"—"}</span><span>${esc(text("question",l))} ${number} ${esc(text("of",l))} ${total}</span><span>⭐ ${state.score}</span></div>
        <div class="bookQuizProgress"><span style="width:${pct}%"></span></div>
        <h2>${esc(q.question)}</h2>
        <div class="bookQuizOptions">${q.options.map((option,index)=>`<button type="button" data-book-option="${index}"><b>${String.fromCharCode(65+index)}</b><span>${esc(option)}</span></button>`).join("")}</div>
        <section id="bookQuizFeedback" class="bookQuizFeedback hidden"></section>
      </section>
    </main>`;
    target.querySelector(".bookQuizBack").onclick=()=>startScreen(config,l);
    target.querySelectorAll("[data-book-option]").forEach(button=>button.onclick=()=>answer(config,l,state,q,Number(button.dataset.bookOption)));
    top();
  }

  function answer(config,l,state,q,selected){
    const target=contentNode();if(!target)return;
    const buttons=[...target.querySelectorAll("[data-book-option]")];
    if(buttons.some(b=>b.disabled))return;
    const correct=Number(q.answer),isCorrect=selected===correct;
    buttons.forEach((button,index)=>{
      button.disabled=true;
      if(index===correct)button.classList.add("correct");
      if(index===selected&&index!==correct)button.classList.add("wrong");
    });
    const answeredIndex=state.index;
    state.answers.push({id:q.id,selected,correct:isCorrect});
    if(isCorrect)state.score++;
    state.index=Math.min(config.questions.length,state.index+1);
    state.completed=state.index>=config.questions.length;
    write(config.id,state);
    const feedback=target.querySelector("#bookQuizFeedback");
    feedback.classList.remove("hidden");
    feedback.innerHTML=`<div class="bookQuizFeedbackTitle">${isCorrect?"✅":"💡"} <b>${esc(isCorrect?text("correct",l):text("wrong",l))}</b></div>
      ${!isCorrect?`<p class="bookQuizCorrectAnswer"><strong>${esc(text("correct",l))}</strong> ${esc(q.options[correct])}</p>`:""}
      <h3>🧠 ${esc(text("comment",l))}</h3><p>${esc(q.comment)}</p>
      <button id="bookQuizNext" class="wideButton" type="button">${esc(state.completed?text("finish",l):text("next",l))} →</button>`;
    target.querySelector("#bookQuizNext").onclick=()=>state.completed?resultScreen(config,l,state):questionScreen(config,l,state);
    feedback.scrollIntoView({behavior:"smooth",block:"nearest"});
  }

  function resultScreen(config,l,state){
    const target=contentNode();if(!target)return;
    const total=config.questions.length,score=Math.max(0,Math.min(total,Number(state.score)||0)),pct=Math.round(score/total*100);
    target.innerHTML=`<main class="bookQuizPage">
      <button class="textButton bookQuizBack" type="button">← ${esc(text("back",l))}</button>
      <section class="bookQuizResult">
        <div class="bookQuizTrophy">🏆</div><span class="eyebrow">${esc(text("completed",l))}</span>
        <h1>${esc(config.title)}</h1>
        <div class="bookQuizResultScore"><b>${score}/${total}</b><span>${pct}%</span></div>
        <p>${esc(text("review",l))}</p>
        <p class="bookQuizLocal">💾 ${esc(text("local",l))}</p>
        <button id="bookQuizAgain" class="wideButton" type="button">↻ ${esc(text("again",l))}</button>
      </section>
    </main>`;
    target.querySelector(".bookQuizBack").onclick=backToCatalog;
    target.querySelector("#bookQuizAgain").onclick=()=>{if(confirm(text("confirm",l))){reset(config.id);startScreen(config,l)}};
    top();
  }

  function launch(id,options={}){
    const config=registry.get(String(id));
    if(!config)return false;
    startScreen(config,lang(options.lang));
    return true;
  }

  window.EduCashProBookQuiz={register,launch,read,reset,has:(id)=>registry.has(String(id)),ids:()=>[...registry.keys()]};
})();