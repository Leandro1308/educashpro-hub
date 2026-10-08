(function(){
  "use strict";

  let tg=window.Telegram?.WebApp;
  const params=new URL(location.href).searchParams;
  const API_BASE="https://educashpro-all.onrender.com";
  const content=document.getElementById("content");
  const toast=document.getElementById("toast");

  let token="";
  let lang=window.EduCashProLocale?.resolve?.()||"pt";
  let items=[];
  let adminItems=[];
  let adminAvailable=false;
  let permissions={};
  let activeTab="help";
  let reportFiles=[];
  let adminFilter="all";

  const COPY={
    pt:{
      subtitle:"Central de Ajuda",help:"Central de Ajuda",report:"Relatar problema",mine:"Meus chamados",admin:"Fila do suporte",
      hero:"Como podemos ajudar?",heroSub:"Pesquise uma função, aprenda como usar ou envie um chamado para o suporte.",
      search:"Pesquisar uma função, dúvida ou problema…",all:"Todos",purpose:"Para que serve",where:"Onde encontrar",steps:"Como usar",tip:"Importante",
      noGuide:"Nenhuma orientação encontrada.",read:"Abrir manual",stillHelp:"Ainda está com problema?",reportThis:"Relatar este problema",
      reportTitle:"Relatar um problema",reportLead:"Descreva o que aconteceu. O sistema anexará informações técnicas para facilitar a análise.",
      category:"Categoria",message:"Descreva o problema",placeholder:"Explique o que você fez, o que esperava acontecer e o que ocorreu.",prints:"Adicionar prints",
      printsHint:"Até 3 imagens. Você poderá revisar antes de enviar.",characters:"caracteres",send:"Enviar problema",sending:"Enviando…",
      sentTitle:"Problema enviado com sucesso",sentText:"Recebemos sua mensagem e ela entrou na fila de atendimento.",viewTicket:"Ver meu chamado",backHelp:"Voltar à Central de Ajuda",
      myTitle:"Meus chamados",myLead:"Acompanhe respostas, status e histórico dos seus relatos.",emptyTickets:"Você ainda não enviou chamados.",
      ticket:"Chamado",created:"Enviado",updated:"Atualizado",reply:"Responder",replyPlaceholder:"Escreva uma resposta para o suporte…",sendReply:"Enviar resposta",
      worked:"Funcionou",continues:"O problema continua",resolutionQuestion:"O suporte marcou este chamado como resolvido. A correção funcionou?",
      status_received:"Recebido",status_in_analysis:"Em análise",status_awaiting_user:"Aguardando você",status_resolved:"Resolvido",
      adminTitle:"Fila do suporte",adminLead:"Chamados em ordem de chegada. O mais antigo aparece primeiro.",oldest:"Mais antigo primeiro",
      statusAll:"Todos",user:"Usuário",technical:"Informações técnicas",attachments:"Anexos",conversation:"Histórico",
      markAnalysis:"Marcar em análise",adminReply:"Responder ao usuário",adminReplyPlaceholder:"Digite a resposta que será enviada diretamente ao usuário.",
      sendAdminReply:"Enviar resposta",replyResolve:"Responder e resolver",markResolved:"Marcar resolvido",delete:"Excluir",confirmDelete:"Excluir definitivamente este chamado?",
      adminLocked:"Abra o suporte pelo Painel Administrativo desbloqueado para acessar a fila.",error:"Não foi possível concluir.",retry:"Tentar novamente",
      tooShort:"Descreva o problema com pelo menos 10 caracteres.",maxImages:"Você pode enviar no máximo 3 prints.",invalidImage:"Use imagens JPG, PNG, WebP ou HEIC de até 8 MB.",
      uploadError:"Não foi possível enviar uma das imagens.",rate:"Aguarde alguns segundos antes de enviar outro chamado.",openLimit:"Há muitos chamados em aberto. Aguarde a resolução de um deles.",
      replySent:"Resposta enviada.",statusChanged:"Status atualizado.",fixedThanks:"Obrigado pela confirmação.",reopened:"O chamado voltou para análise.",removeImage:"Remover",
      back:"Voltar"
    },
    en:{
      subtitle:"Help Center",help:"Help Center",report:"Report a problem",mine:"My tickets",admin:"Support queue",
      hero:"How can we help?",heroSub:"Search for a feature, learn how to use it or send a support ticket.",
      search:"Search for a feature, question or problem…",all:"All",purpose:"What it does",where:"Where to find it",steps:"How to use it",tip:"Important",
      noGuide:"No guide found.",read:"Open guide",stillHelp:"Still having a problem?",reportThis:"Report this problem",
      reportTitle:"Report a problem",reportLead:"Describe what happened. Technical information will be attached automatically.",
      category:"Category",message:"Describe the problem",placeholder:"Explain what you did, what you expected and what happened.",prints:"Add screenshots",
      printsHint:"Up to 3 images. You can review them before sending.",characters:"characters",send:"Send problem",sending:"Sending…",
      sentTitle:"Problem sent successfully",sentText:"Your message is now in the support queue.",viewTicket:"View my ticket",backHelp:"Back to Help Center",
      myTitle:"My tickets",myLead:"Follow replies, status and ticket history.",emptyTickets:"You have not sent any tickets yet.",
      ticket:"Ticket",created:"Sent",updated:"Updated",reply:"Reply",replyPlaceholder:"Write a reply to support…",sendReply:"Send reply",
      worked:"It worked",continues:"The problem continues",resolutionQuestion:"Support marked this ticket as resolved. Did the fix work?",
      status_received:"Received",status_in_analysis:"In analysis",status_awaiting_user:"Waiting for you",status_resolved:"Resolved",
      adminTitle:"Support queue",adminLead:"Tickets are ordered by arrival, oldest first.",oldest:"Oldest first",
      statusAll:"All",user:"User",technical:"Technical information",attachments:"Attachments",conversation:"History",
      markAnalysis:"Mark in analysis",adminReply:"Reply to user",adminReplyPlaceholder:"Type the reply that will be sent directly to the user.",
      sendAdminReply:"Send reply",replyResolve:"Reply and resolve",markResolved:"Mark resolved",delete:"Delete",confirmDelete:"Permanently delete this ticket?",
      adminLocked:"Open support from the unlocked Administration panel to access the queue.",error:"Could not complete.",retry:"Try again",
      tooShort:"Describe the problem with at least 10 characters.",maxImages:"You can send up to 3 screenshots.",invalidImage:"Use JPG, PNG, WebP or HEIC images up to 8 MB.",
      uploadError:"Could not upload one of the images.",rate:"Wait a few seconds before sending another ticket.",openLimit:"There are too many open tickets. Wait for one to be resolved.",
      replySent:"Reply sent.",statusChanged:"Status updated.",fixedThanks:"Thanks for confirming.",reopened:"The ticket is back in analysis.",removeImage:"Remove",back:"Back"
    },
    es:{
      subtitle:"Centro de Ayuda",help:"Centro de Ayuda",report:"Informar problema",mine:"Mis casos",admin:"Cola de soporte",
      hero:"¿Cómo podemos ayudarte?",heroSub:"Busca una función, aprende a usarla o envía un caso al soporte.",
      search:"Buscar función, duda o problema…",all:"Todos",purpose:"Para qué sirve",where:"Dónde encontrar",steps:"Cómo usar",tip:"Importante",
      noGuide:"No se encontró ninguna orientación.",read:"Abrir manual",stillHelp:"¿El problema continúa?",reportThis:"Informar este problema",
      reportTitle:"Informar un problema",reportLead:"Describe lo ocurrido. Se adjuntará información técnica automáticamente.",
      category:"Categoría",message:"Describe el problema",placeholder:"Explica lo que hiciste, qué esperabas y qué ocurrió.",prints:"Agregar capturas",
      printsHint:"Hasta 3 imágenes. Puedes revisarlas antes de enviar.",characters:"caracteres",send:"Enviar problema",sending:"Enviando…",
      sentTitle:"Problema enviado correctamente",sentText:"Tu mensaje entró en la cola de soporte.",viewTicket:"Ver mi caso",backHelp:"Volver al Centro de Ayuda",
      myTitle:"Mis casos",myLead:"Sigue respuestas, estado e historial.",emptyTickets:"Aún no has enviado casos.",
      ticket:"Caso",created:"Enviado",updated:"Actualizado",reply:"Responder",replyPlaceholder:"Escribe una respuesta al soporte…",sendReply:"Enviar respuesta",
      worked:"Funcionó",continues:"El problema continúa",resolutionQuestion:"Soporte marcó este caso como resuelto. ¿Funcionó la corrección?",
      status_received:"Recibido",status_in_analysis:"En análisis",status_awaiting_user:"Esperando tu respuesta",status_resolved:"Resuelto",
      adminTitle:"Cola de soporte",adminLead:"Casos por orden de llegada, del más antiguo al más reciente.",oldest:"Más antiguo primero",
      statusAll:"Todos",user:"Usuario",technical:"Información técnica",attachments:"Adjuntos",conversation:"Historial",
      markAnalysis:"Marcar en análisis",adminReply:"Responder al usuario",adminReplyPlaceholder:"Escribe la respuesta que será enviada al usuario.",
      sendAdminReply:"Enviar respuesta",replyResolve:"Responder y resolver",markResolved:"Marcar resuelto",delete:"Eliminar",confirmDelete:"¿Eliminar definitivamente este caso?",
      adminLocked:"Abre soporte desde el panel administrativo desbloqueado.",error:"No fue posible completar.",retry:"Intentar de nuevo",
      tooShort:"Describe el problema con al menos 10 caracteres.",maxImages:"Puedes enviar hasta 3 capturas.",invalidImage:"Usa imágenes JPG, PNG, WebP o HEIC de hasta 8 MB.",
      uploadError:"No fue posible enviar una imagen.",rate:"Espera unos segundos antes de enviar otro caso.",openLimit:"Hay demasiados casos abiertos.",
      replySent:"Respuesta enviada.",statusChanged:"Estado actualizado.",fixedThanks:"Gracias por confirmar.",reopened:"El caso volvió a análisis.",removeImage:"Eliminar",back:"Volver"
    },
    ru:{
      subtitle:"Центр помощи",help:"Центр помощи",report:"Сообщить о проблеме",mine:"Мои обращения",admin:"Очередь поддержки",
      hero:"Чем мы можем помочь?",heroSub:"Найдите функцию, прочитайте инструкцию или отправьте обращение в поддержку.",
      search:"Поиск функции, вопроса или проблемы…",all:"Все",purpose:"Назначение",where:"Где найти",steps:"Как использовать",tip:"Важно",
      noGuide:"Инструкция не найдена.",read:"Открыть инструкцию",stillHelp:"Проблема осталась?",reportThis:"Сообщить о проблеме",
      reportTitle:"Сообщить о проблеме",reportLead:"Опишите ситуацию. Технические данные будут приложены автоматически.",
      category:"Категория",message:"Опишите проблему",placeholder:"Что вы сделали, чего ожидали и что произошло?",prints:"Добавить снимки",
      printsHint:"До 3 изображений. Их можно проверить перед отправкой.",characters:"символов",send:"Отправить",sending:"Отправка…",
      sentTitle:"Обращение успешно отправлено",sentText:"Сообщение добавлено в очередь поддержки.",viewTicket:"Открыть обращение",backHelp:"Назад в Центр помощи",
      myTitle:"Мои обращения",myLead:"Следите за ответами и статусом.",emptyTickets:"Обращений пока нет.",
      ticket:"Обращение",created:"Отправлено",updated:"Обновлено",reply:"Ответить",replyPlaceholder:"Напишите ответ поддержке…",sendReply:"Отправить ответ",
      worked:"Исправлено",continues:"Проблема осталась",resolutionQuestion:"Поддержка отметила обращение как решённое. Всё работает?",
      status_received:"Получено",status_in_analysis:"На рассмотрении",status_awaiting_user:"Ожидает вашего ответа",status_resolved:"Решено",
      adminTitle:"Очередь поддержки",adminLead:"Обращения по порядку поступления: старые сверху.",oldest:"Сначала старые",
      statusAll:"Все",user:"Пользователь",technical:"Технические данные",attachments:"Вложения",conversation:"История",
      markAnalysis:"Взять в работу",adminReply:"Ответить пользователю",adminReplyPlaceholder:"Введите ответ, который получит пользователь.",
      sendAdminReply:"Отправить ответ",replyResolve:"Ответить и решить",markResolved:"Отметить решённым",delete:"Удалить",confirmDelete:"Удалить обращение навсегда?",
      adminLocked:"Откройте поддержку из разблокированной панели администратора.",error:"Не удалось выполнить.",retry:"Повторить",
      tooShort:"Опишите проблему минимум 10 символами.",maxImages:"Можно отправить не более 3 снимков.",invalidImage:"Используйте JPG, PNG, WebP или HEIC до 8 МБ.",
      uploadError:"Не удалось загрузить изображение.",rate:"Подождите несколько секунд перед новым обращением.",openLimit:"Слишком много открытых обращений.",
      replySent:"Ответ отправлен.",statusChanged:"Статус обновлён.",fixedThanks:"Спасибо за подтверждение.",reopened:"Обращение снова на рассмотрении.",removeImage:"Удалить",back:"Назад"
    }
  };
  const CATEGORY={
    pt:{access:"Acesso e conta",subscription:"Assinatura",agenda:"Agenda",affiliates:"Afiliados",tools:"Ferramentas",games:"Jogos",links:"Página de links",payment:"Pagamento",other:"Outro"},
    en:{access:"Access and account",subscription:"Subscription",agenda:"Schedule",affiliates:"Affiliates",tools:"Tools",games:"Games",links:"Link page",payment:"Payment",other:"Other"},
    es:{access:"Acceso y cuenta",subscription:"Suscripción",agenda:"Agenda",affiliates:"Afiliados",tools:"Herramientas",games:"Juegos",links:"Página de enlaces",payment:"Pago",other:"Otro"},
    ru:{access:"Доступ и аккаунт",subscription:"Подписка",agenda:"Календарь",affiliates:"Партнёры",tools:"Инструменты",games:"Игры",links:"Страница ссылок",payment:"Оплата",other:"Другое"}
  };

  const t=(key)=>COPY[lang]?.[key]||COPY.pt[key]||key;
  const esc=(value)=>String(value??"").replace(/[&<>"']/g,(c)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const show=(message)=>{if(!toast)return;toast.textContent=message;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2400)};
  const categoryLabel=(value)=>CATEGORY[lang]?.[value]||CATEGORY.pt[value]||value;
  const statusLabel=(value)=>t(`status_${value}`);
  const ticketLabel=(item)=>item?.ticketNumber?`#${String(item.ticketNumber).padStart(6,"0")}`:`#${String(item?.id||"").slice(-6).toUpperCase()}`;
  const locale=()=>lang==="pt"?"pt-BR":lang==="en"?"en-US":lang==="es"?"es-ES":"ru-RU";
  const date=(value)=>value?new Date(value).toLocaleString(locale(),{dateStyle:"short",timeStyle:"short"}):"—";

  async function resolveTelegramRuntime(){
    if(window.__EDUCASHPRO_TELEGRAM_HINT__&&window.__EDUCASHPRO_TELEGRAM_SDK_PROMISE__){
      await Promise.race([Promise.resolve(window.__EDUCASHPRO_TELEGRAM_SDK_PROMISE__).catch(()=>false),new Promise((resolve)=>setTimeout(resolve,3000))]);
    }
    tg=window.Telegram?.WebApp;
    try{tg?.ready?.();tg?.expand?.()}catch{}
  }
  async function api(path,payload={}){
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),15000);
    try{
      const response=await fetch(`${API_BASE}${path}`,{
        method:"POST",
        headers:{"Content-Type":"application/json","X-Admin-Unlock":sessionStorage.getItem("educashpro.admin.unlock")||""},
        body:JSON.stringify(payload),
        cache:"no-store",
        signal:controller.signal
      });
      const data=await response.json().catch(()=>({}));
      if(!response.ok){const error=new Error(data.reason||"error");error.reason=data.reason;error.status=response.status;throw error}
      return data;
    }finally{clearTimeout(timer)}
  }
  function technicalContext(){
    let remembered="";
    try{remembered=localStorage.getItem("educashpro:last-route:v1")||""}catch{}
    const source=params.get("from")||document.referrer||remembered||location.href;
    return {
      build:String(window.__EDUCASHPRO_SUPPORT_BUILD__||window.__EDUCASHPRO_PAGE_BUILD__||window.EDUCASHPRO_ASSET_VERSION||""),
      route:String(source).slice(0,600),
      language:lang,
      userAgent:navigator.userAgent||"",
      platform:navigator.userAgentData?.platform||navigator.platform||"",
      viewport:`${window.innerWidth}x${window.innerHeight}@${window.devicePixelRatio||1}`
    };
  }
  function tabs(){
    const buttons=[
      ["help","🔎",t("help")],["report","🚨",t("report")],["mine","💬",t("mine")]
    ];
    if(adminAvailable)buttons.push(["admin","🛠️",t("admin")]);
    return `<nav class="supportTabs">${buttons.map(([id,icon,label])=>`<button class="${activeTab===id?"active":""}" data-tab="${id}"><span>${icon}</span><b>${esc(label)}</b></button>`).join("")}</nav>`;
  }
  function shell(body){
    content.innerHTML=`${tabs()}<div class="supportBody">${body}</div>`;
    content.querySelectorAll("[data-tab]").forEach((button)=>button.onclick=()=>openTab(button.dataset.tab));
  }
  function manualArticles(){return window.EduCashProSupportManual?.articles?.(lang)||[]}
  function renderHelp(query="",group=""){
    activeTab="help";
    const articles=manualArticles();
    const groups=[...new Set(articles.map((a)=>a.group))];
    const q=String(query||"").trim().toLocaleLowerCase(locale());
    const filtered=articles.filter((a)=>{
      const matchesGroup=!group||a.group===group;
      const hay=[a.title,a.summary,a.purpose,a.where,a.keywords,...(a.steps||[])].join(" ").toLocaleLowerCase(locale());
      return matchesGroup&&(!q||hay.includes(q));
    });
    shell(`
      <section class="supportHero"><span class="eyebrow">EDUCASHPRO</span><h1>🔎 ${esc(t("hero"))}</h1><p>${esc(t("heroSub"))}</p>
        <label class="supportSearch"><span>🔎</span><input id="helpSearch" value="${esc(query)}" placeholder="${esc(t("search"))}"></label>
      </section>
      <div class="guideGroups"><button class="${!group?"active":""}" data-group="">${esc(t("all"))}</button>${groups.map((g)=>`<button class="${group===g?"active":""}" data-group="${esc(g)}">${esc(g)}</button>`).join("")}</div>
      <section class="guideGrid">${filtered.length?filtered.map((a)=>`<button class="guideCard" data-guide="${esc(a.id)}"><span class="guideIcon">${a.icon}</span><div><small>${esc(a.group)}</small><strong>${esc(a.title)}</strong><p>${esc(a.summary)}</p></div><b>›</b></button>`).join(""):`<div class="empty">${esc(t("noGuide"))}</div>`}</section>
    `);
    const search=document.getElementById("helpSearch");
    let timer=0;
    search?.addEventListener("input",()=>{clearTimeout(timer);timer=setTimeout(()=>renderHelp(search.value,group),120)});
    content.querySelectorAll("[data-group]").forEach((button)=>button.onclick=()=>renderHelp(query,button.dataset.group));
    content.querySelectorAll("[data-guide]").forEach((button)=>button.onclick=()=>renderArticle(button.dataset.guide));
  }
  function renderArticle(id){
    activeTab="help";
    const article=manualArticles().find((a)=>a.id===id);
    if(!article)return renderHelp();
    shell(`
      <button class="textBack" id="articleBack">← ${esc(t("back"))}</button>
      <article class="manualArticle">
        <header><span class="manualIcon">${article.icon}</span><div><small>${esc(article.group)}</small><h1>${esc(article.title)}</h1><p>${esc(article.summary)}</p></div></header>
        <section><h2>🎯 ${esc(t("purpose"))}</h2><p>${esc(article.purpose)}</p></section>
        <section><h2>📍 ${esc(t("where"))}</h2><p class="manualPath">${esc(article.where)}</p></section>
        <section><h2>🧭 ${esc(t("steps"))}</h2><ol>${(article.steps||[]).map((step)=>`<li>${esc(step)}</li>`).join("")}</ol></section>
        <aside><b>💡 ${esc(t("tip"))}</b><p>${esc(article.tip)}</p></aside>
        <div class="manualSupport"><strong>${esc(t("stillHelp"))}</strong><button id="reportArticle" class="primary">🚨 ${esc(t("reportThis"))}</button></div>
      </article>
    `);
    document.getElementById("articleBack").onclick=()=>renderHelp();
    document.getElementById("reportArticle").onclick=()=>{activeTab="report";renderReport(article.id)};
  }
  function categoryOptions(selected="other"){
    return Object.keys(CATEGORY.pt).map((key)=>`<option value="${key}" ${selected===key?"selected":""}>${esc(categoryLabel(key))}</option>`).join("");
  }
  function guideCategory(id){
    return ({account:"access",start:"access",subscription:"subscription",agenda:"agenda",affiliate:"affiliates",tools:"tools",finance:"tools",games:"games",links:"links",professional:"other",academy:"other",explore:"other",benefits:"other",telegram:"access",troubleshoot:"other"})[id]||"other";
  }
  function renderReport(guideId=""){
    activeTab="report";
    reportFiles=[];
    shell(`
      <section class="supportHero compact"><span class="eyebrow">SUPORTE</span><h1>🚨 ${esc(t("reportTitle"))}</h1><p>${esc(t("reportLead"))}</p></section>
      <section class="reportCard">
        <label><span>${esc(t("category"))}</span><select id="reportCategory">${categoryOptions(guideCategory(guideId))}</select></label>
        <label><span>${esc(t("message"))}</span><textarea id="reportMessage" maxlength="500" rows="7" placeholder="${esc(t("placeholder"))}"></textarea><small id="charCount">0/500 ${esc(t("characters"))}</small></label>
        <div class="uploadBlock"><div><b>📎 ${esc(t("prints"))}</b><small>${esc(t("printsHint"))}</small></div><label class="uploadButton">＋ ${esc(t("prints"))}<input id="reportImages" type="file" accept="image/*" multiple hidden></label><div id="imagePreview" class="imagePreview"></div></div>
        <div class="privacyNote">🔒 Build, página, navegador e dispositivo são enviados automaticamente. Não envie senhas, códigos ou chaves privadas.</div>
        <button id="sendReport" class="primary wide">🚀 ${esc(t("send"))}</button>
      </section>
    `);
    const message=document.getElementById("reportMessage");
    message.addEventListener("input",()=>document.getElementById("charCount").textContent=`${message.value.length}/500 ${t("characters")}`);
    document.getElementById("reportImages").addEventListener("change",(event)=>pickImages(event.target.files));
    document.getElementById("sendReport").onclick=submitReport;
  }
  function pickImages(fileList){
    const next=[...fileList];
    if(reportFiles.length+next.length>3){show(t("maxImages"));return}
    for(const file of next){
      if(!/^image\//i.test(file.type)||file.size>8*1024*1024){show(t("invalidImage"));continue}
      reportFiles.push({file,url:URL.createObjectURL(file)});
    }
    renderImagePreviews();
  }
  function renderImagePreviews(){
    const host=document.getElementById("imagePreview");
    if(!host)return;
    host.innerHTML=reportFiles.map((item,index)=>`<figure><img src="${esc(item.url)}" alt=""><button type="button" data-remove-image="${index}" aria-label="${esc(t("removeImage"))}">✕</button></figure>`).join("");
    host.querySelectorAll("[data-remove-image]").forEach((button)=>button.onclick=()=>{
      const index=Number(button.dataset.removeImage);const item=reportFiles[index];if(item?.url)URL.revokeObjectURL(item.url);reportFiles.splice(index,1);renderImagePreviews();
    });
  }
  async function optimizeImage(file){
    const url=URL.createObjectURL(file);
    try{
      const image=new Image();
      image.decoding="async";
      await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=reject;image.src=url});
      const width=image.naturalWidth||image.width,height=image.naturalHeight||image.height;
      const max=1440,scale=Math.min(1,max/Math.max(width,height));
      const canvas=document.createElement("canvas");
      canvas.width=Math.max(1,Math.round(width*scale));canvas.height=Math.max(1,Math.round(height*scale));
      const ctx=canvas.getContext("2d",{alpha:false});ctx.drawImage(image,0,0,canvas.width,canvas.height);
      const blob=await new Promise((resolve)=>canvas.toBlob(resolve,"image/webp",.82))||await new Promise((resolve)=>canvas.toBlob(resolve,"image/jpeg",.84))||file;
      return {blob,filename:blob===file?file.name:"support.webp",width:canvas.width,height:canvas.height};
    }finally{URL.revokeObjectURL(url)}
  }
  async function uploadReportImages(){
    if(!reportFiles.length)return[];
    const sign=await api("/api/support/upload-signature",{token});
    const results=[];
    for(const item of reportFiles){
      const optimized=await optimizeImage(item.file);
      const form=new FormData();
      form.append("file",optimized.blob,optimized.filename);
      form.append("api_key",sign.apiKey);
      form.append("timestamp",String(sign.timestamp));
      form.append("folder",sign.folder);
      form.append("signature",sign.signature);
      const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),45000);
      try{
        const response=await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(sign.cloudName)}/image/upload`,{method:"POST",body:form,signal:controller.signal});
        const data=await response.json().catch(()=>({}));
        if(!response.ok||!data.secure_url||!data.public_id)throw new Error("upload");
        results.push({url:data.secure_url,publicId:data.public_id,width:Number(data.width||optimized.width||0),height:Number(data.height||optimized.height||0),bytes:Number(data.bytes||optimized.blob.size||0)});
      }finally{clearTimeout(timer)}
    }
    return results;
  }
  async function submitReport(){
    const message=document.getElementById("reportMessage").value.trim();
    const category=document.getElementById("reportCategory").value;
    if(message.length<10)return show(t("tooShort"));
    const button=document.getElementById("sendReport");button.disabled=true;button.textContent=t("sending");
    try{
      let attachments=[];
      try{attachments=await uploadReportImages()}catch{throw Object.assign(new Error("upload"),{reason:"upload"})}
      const data=await api("/api/support/submit",{token,category,message,attachments,context:technicalContext()});
      items.unshift(data.item);
      reportFiles.forEach((item)=>item.url&&URL.revokeObjectURL(item.url));reportFiles=[];
      renderSuccess(data.item);
    }catch(error){
      const key=error.reason==="rate_limited"?"rate":error.reason==="open_limit"?"openLimit":error.reason==="upload"?"uploadError":"error";
      show(t(key));button.disabled=false;button.textContent=`🚀 ${t("send")}`;
    }
  }
  function renderSuccess(item){
    shell(`<section class="successCard"><span>✅</span><h1>${esc(t("sentTitle"))}</h1><p>${esc(t("sentText"))}</p><strong>${esc(t("ticket"))} ${esc(ticketLabel(item))}</strong><small>${esc(t("created"))}: ${esc(date(item.createdAt))}</small><div><button id="successTicket" class="primary">${esc(t("viewTicket"))}</button><button id="successHelp" class="secondary">${esc(t("backHelp"))}</button></div></section>`);
    document.getElementById("successTicket").onclick=()=>renderTicket(item,false);
    document.getElementById("successHelp").onclick=()=>renderHelp();
  }
  function ticketCard(item,admin=false){
    const last=(item.thread||[]).at(-1);
    return `<button class="ticketCard" data-ticket="${esc(item.id)}"><div class="ticketTop"><strong>${esc(t("ticket"))} ${esc(ticketLabel(item))}</strong><span class="status ${esc(item.status)}">${esc(statusLabel(item.status))}</span></div><b>${esc(categoryLabel(item.category))}</b><p>${esc(last?.text||item.message||"")}</p><small>${esc(admin?t("created"):t("updated"))}: ${esc(date(admin?item.createdAt:item.updatedAt))}</small>${admin?`<em>${esc(item.user?.name||item.user?.username||item.user?.userId||item.user?.tgId||"—")}</em>`:""}</button>`;
  }
  function renderMine(){
    activeTab="mine";
    shell(`<section class="supportHero compact"><span class="eyebrow">SUPORTE</span><h1>💬 ${esc(t("myTitle"))}</h1><p>${esc(t("myLead"))}</p></section><section class="ticketList">${items.length?items.map((item)=>ticketCard(item)).join(""):`<div class="empty">${esc(t("emptyTickets"))}</div>`}</section>`);
    content.querySelectorAll("[data-ticket]").forEach((button)=>button.onclick=()=>renderTicket(items.find((x)=>x.id===button.dataset.ticket),false));
  }
  function threadMarkup(item){
    return (item.thread||[]).map((entry)=>`<div class="threadMessage ${esc(entry.role)}"><div><b>${entry.role==="admin"?"EduCashPro":entry.role==="system"?"•":esc(item.user?.name||t("user"))}</b><small>${esc(date(entry.createdAt))}</small></div><p>${esc(entry.text)}</p></div>`).join("");
  }
  function attachmentsMarkup(item){
    return item.attachments?.length?`<section class="ticketSection"><h3>📎 ${esc(t("attachments"))}</h3><div class="ticketImages">${item.attachments.map((a,i)=>`<a href="${esc(a.url)}" target="_blank" rel="noopener"><img src="${esc(a.url)}" alt="${esc(t("attachments"))} ${i+1}"></a>`).join("")}</div></section>`:"";
  }
  function renderTicket(item,isAdmin){
    if(!item)return isAdmin?renderAdmin():renderMine();
    activeTab=isAdmin?"admin":"mine";
    const context=item.context||{};
    shell(`
      <button id="ticketBack" class="textBack">← ${esc(t("back"))}</button>
      <article class="ticketDetail">
        <header><div><small>${esc(categoryLabel(item.category))}</small><h1>${esc(t("ticket"))} ${esc(ticketLabel(item))}</h1><p>${esc(t("created"))}: ${esc(date(item.createdAt))}</p></div><span class="status ${esc(item.status)}">${esc(statusLabel(item.status))}</span></header>
        ${isAdmin?`<section class="userStrip"><b>👤 ${esc(t("user"))}</b><span>${esc(item.user?.name||"—")} ${item.user?.username?`@${esc(item.user.username)}`:""}</span><code>${esc(item.user?.userId||item.user?.tgId||"")}</code></section>`:""}
        ${attachmentsMarkup(item)}
        ${isAdmin?`<details class="ticketTech"><summary>🧪 ${esc(t("technical"))}</summary><dl><dt>Build</dt><dd>${esc(context.build||"—")}</dd><dt>Page</dt><dd>${esc(context.route||"—")}</dd><dt>Platform</dt><dd>${esc(context.platform||"—")}</dd><dt>Viewport</dt><dd>${esc(context.viewport||"—")}</dd><dt>User Agent</dt><dd>${esc(context.userAgent||"—")}</dd></dl></details>`:""}
        <section class="ticketSection"><h3>💬 ${esc(t("conversation"))}</h3><div class="thread">${threadMarkup(item)}</div></section>
        ${isAdmin?adminActions(item):userActions(item)}
      </article>
    `);
    document.getElementById("ticketBack").onclick=()=>isAdmin?renderAdmin():renderMine();
    if(isAdmin)bindAdminTicket(item);else bindUserTicket(item);
  }
  function userActions(item){
    if(item.status==="resolved"&&!item.userConfirmedAt){
      return `<section class="resolutionBox"><b>${esc(t("resolutionQuestion"))}</b><div><button id="ticketFixed" class="primary">✅ ${esc(t("worked"))}</button><button id="ticketContinues" class="secondary">❌ ${esc(t("continues"))}</button></div></section>`;
    }
    if(item.userConfirmedAt)return"";
    return `<section class="replyBox"><label><span>${esc(t("reply"))}</span><textarea id="userReply" maxlength="500" rows="4" placeholder="${esc(t("replyPlaceholder"))}"></textarea><small id="userReplyCount">0/500</small></label><button id="sendUserReply" class="primary wide">${esc(t("sendReply"))}</button></section>`;
  }
  function bindUserTicket(item){
    document.getElementById("ticketFixed")?.addEventListener("click",()=>confirmResolution(item,"fixed"));
    document.getElementById("ticketContinues")?.addEventListener("click",()=>confirmResolution(item,"continues"));
    const field=document.getElementById("userReply");
    field?.addEventListener("input",()=>document.getElementById("userReplyCount").textContent=`${field.value.length}/500`);
    document.getElementById("sendUserReply")?.addEventListener("click",async()=>{
      const message=field.value.trim();if(message.length<2)return;
      try{await api("/api/support/user/reply",{token,id:item.id,message});show(t("replySent"));await loadUserItems();renderTicket(items.find((x)=>x.id===item.id),false)}catch{show(t("error"))}
    });
  }
  async function confirmResolution(item,outcome){
    try{await api("/api/support/user/confirm",{token,id:item.id,outcome});show(t(outcome==="fixed"?"fixedThanks":"reopened"));await loadUserItems();renderTicket(items.find((x)=>x.id===item.id),false)}catch{show(t("error"))}
  }
  function adminActions(item){
    const canReply=permissions.primary||permissions.actions?.includes("support.reply");
    const canDelete=permissions.primary||permissions.actions?.includes("support.delete");
    return `<section class="adminTicketActions">
      ${canReply?`<div class="statusActions"><button id="markAnalysis" class="secondary">🔎 ${esc(t("markAnalysis"))}</button><button id="markResolved" class="secondary">✅ ${esc(t("markResolved"))}</button></div><label><span>${esc(t("adminReply"))}</span><textarea id="adminReply" maxlength="1500" rows="5" placeholder="${esc(t("adminReplyPlaceholder"))}"></textarea><small id="adminReplyCount">0/1500</small></label><div class="statusActions"><button id="sendAdminReply" class="primary">💬 ${esc(t("sendAdminReply"))}</button><button id="replyResolve" class="secondary">✅ ${esc(t("replyResolve"))}</button></div>`:""}
      ${canDelete?`<button id="deleteTicket" class="danger wide">🗑️ ${esc(t("delete"))}</button>`:""}
    </section>`;
  }
  function bindAdminTicket(item){
    const field=document.getElementById("adminReply");
    field?.addEventListener("input",()=>document.getElementById("adminReplyCount").textContent=`${field.value.length}/1500`);
    document.getElementById("markAnalysis")?.addEventListener("click",()=>adminStatus(item,"in_analysis"));
    document.getElementById("markResolved")?.addEventListener("click",()=>adminStatus(item,"resolved"));
    document.getElementById("sendAdminReply")?.addEventListener("click",()=>adminReply(item,false));
    document.getElementById("replyResolve")?.addEventListener("click",()=>adminReply(item,true));
    document.getElementById("deleteTicket")?.addEventListener("click",()=>deleteTicket(item));
  }
  async function adminStatus(item,status){
    try{await api("/api/support/admin/status",{token,id:item.id,status});show(t("statusChanged"));await loadAdminItems();renderTicket(adminItems.find((x)=>x.id===item.id),true)}catch{show(t("error"))}
  }
  async function adminReply(item,resolved){
    const field=document.getElementById("adminReply"),reply=field?.value.trim()||"";if(reply.length<2)return;
    try{await api("/api/support/admin/reply",{token,id:item.id,reply,status:resolved?"resolved":"awaiting_user"});show(t("replySent"));await loadAdminItems();renderTicket(adminItems.find((x)=>x.id===item.id),true)}catch{show(t("error"))}
  }
  async function deleteTicket(item){
    if(!confirm(t("confirmDelete")))return;
    try{await api("/api/support/admin/delete",{token,id:item.id});adminItems=adminItems.filter((x)=>x.id!==item.id);show(t("statusChanged"));renderAdmin()}catch{show(t("error"))}
  }
  function renderAdmin(){
    activeTab="admin";
    const filters=["all","received","in_analysis","awaiting_user","resolved"];
    const visible=adminFilter==="all"?adminItems:adminItems.filter((item)=>item.status===adminFilter);
    shell(`
      <section class="supportHero compact"><span class="eyebrow">ADMIN</span><h1>🛠️ ${esc(t("adminTitle"))}</h1><p>${esc(t("adminLead"))}</p><small>↑ ${esc(t("oldest"))}</small></section>
      <div class="adminFilters">${filters.map((filter)=>`<button class="${adminFilter===filter?"active":""}" data-admin-filter="${filter}">${esc(filter==="all"?t("statusAll"):statusLabel(filter))} <span>${filter==="all"?adminItems.length:adminItems.filter((x)=>x.status===filter).length}</span></button>`).join("")}</div>
      <section class="ticketList">${visible.length?visible.map((item)=>ticketCard(item,true)).join(""):`<div class="empty">${esc(t("emptyTickets"))}</div>`}</section>
    `);
    content.querySelectorAll("[data-admin-filter]").forEach((button)=>button.onclick=()=>{adminFilter=button.dataset.adminFilter;renderAdmin()});
    content.querySelectorAll("[data-ticket]").forEach((button)=>button.onclick=()=>renderTicket(adminItems.find((x)=>x.id===button.dataset.ticket),true));
  }
  async function loadUserItems(){
    const data=await api("/api/support/bootstrap",{token,adminMode:false});
    items=data.items||[];adminAvailable=!!data.adminAvailable;permissions=data.permissions||permissions;
    return data;
  }
  async function loadAdminItems(){
    try{
      const data=await api("/api/support/bootstrap",{token,adminMode:true});
      adminItems=data.items||[];permissions=data.permissions||permissions;adminAvailable=true;
      return data;
    }catch(error){
      if(error.reason==="admin_locked"){show(t("adminLocked"));activeTab="help";renderHelp();return null}
      throw error;
    }
  }
  async function openTab(tab){
    if(tab==="help")return renderHelp();
    if(tab==="report")return renderReport();
    if(tab==="mine")return renderMine();
    if(tab==="admin"){
      activeTab="admin";
      if(!adminItems.length)await loadAdminItems().catch(()=>show(t("error")));
      if(activeTab==="admin")renderAdmin();
    }
  }
  async function init(){
    await resolveTelegramRuntime();
    document.getElementById("close").onclick=()=>window.EduCashProPlatform?.close?.();
    document.getElementById("back").onclick=()=>history.length>1?history.back():location.assign("./");
    try{
      const stored=window.EduCashProPlatform?.readWebSession?.();
      if(stored?.token&&stored?.profile?.userId){
        token=stored.token;lang=["pt","en","es","ru"].includes(stored.profile?.language)?stored.profile.language:lang;
      }else{
        const initData=window.EduCashProPlatform?.telegramInitData?.()||"";
        if(!initData)throw new Error("session_required");
        const session=await api("/api/hub/session",{initData});
        token=session.token;lang=["pt","en","es","ru"].includes(session.profile?.language)?session.profile.language:lang;
      }
      document.documentElement.lang=lang;
      document.getElementById("subtitle").textContent=t("subtitle");
      await loadUserItems();
      const requested=params.get("ticket");
      const item=requested?items.find((x)=>x.id===requested):null;
      if(item)return renderTicket(item,false);
      renderHelp();
    }catch(error){
      content.innerHTML=`<div class="empty">${esc(t("error"))}<button id="retry" class="primary">${esc(t("retry"))}</button></div>`;
      document.getElementById("retry")?.addEventListener("click",()=>location.reload());
    }
  }

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();