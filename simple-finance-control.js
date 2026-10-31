(function () {
  "use strict";
  const DAY = 86400000;
  const API = "/api/personal-finance/";
  const DICT = {
    pt: { title:"Controle de Gastos", lead:"Simples, rápido e seguro", back:"Voltar", trial:"Teste gratuito", days:"dias restantes", active:"Assinatura ativa", ended:"Teste encerrado: consulte seu histórico ou assine para continuar.", subscribe:"Ativar assinatura", loading:"Carregando seus registros...", unavailable:"Não foi possível acessar seus registros. Verifique a conexão e entre novamente.", month:"Mês", income:"Receitas", expense:"Despesas", balance:"Saldo", last:"Último gasto", noLast:"Nenhum gasto", newRecord:"Novo lançamento", edit:"Editar lançamento", type:"Tipo", value:"Valor", category:"Categoria", date:"Data", description:"Descrição (opcional)", save:"Salvar lançamento", update:"Atualizar", cancel:"Cancelar", history:"Histórico do mês", empty:"Nenhum lançamento neste mês.", delete:"Excluir", editAction:"Editar", confirm:"Excluir este lançamento?", saved:"Registro salvo.", removed:"Registro excluído.", error:"Não foi possível salvar. Tente novamente.", currency:"Moeda do mês", currencyLocked:"A moeda não pode ser alterada depois do primeiro lançamento.", migration:"Há registros antigos neste aparelho.", import:"Importar histórico antigo", imported:"Histórico importado.", how:"Registre entradas e saídas; os totais são calculados automaticamente.", note:"Dados armazenados na sua conta EduCashPro.", incomeType:"Receita", expenseType:"Despesa", categories:{food:"Alimentação",housing:"Moradia",transport:"Transporte",health:"Saúde",education:"Educação",shopping:"Compras",leisure:"Lazer",bills:"Contas",work:"Trabalho",salary:"Salário",other:"Outros"} },
    en: { title:"Expense Tracker", lead:"Simple, fast and secure", back:"Back", trial:"Free trial", days:"days left", active:"Active subscription", ended:"Your trial ended: view your history or subscribe to continue.", subscribe:"Subscribe", loading:"Loading your records...", unavailable:"Unable to load your records. Check your connection and sign in again.", month:"Month", income:"Income", expense:"Expenses", balance:"Balance", last:"Last expense", noLast:"No expenses", newRecord:"New entry", edit:"Edit entry", type:"Type", value:"Amount", category:"Category", date:"Date", description:"Description (optional)", save:"Save entry", update:"Update", cancel:"Cancel", history:"Monthly history", empty:"No entries this month.", delete:"Delete", editAction:"Edit", confirm:"Delete this entry?", saved:"Entry saved.", removed:"Entry deleted.", error:"Unable to save. Please try again.", currency:"Monthly currency", currencyLocked:"You cannot change currency after your first entry.", migration:"Old records were found on this device.", import:"Import old history", imported:"History imported.", how:"Enter income and expenses; totals update automatically.", note:"Data stored in your EduCashPro account.", incomeType:"Income", expenseType:"Expense", categories:{food:"Food",housing:"Housing",transport:"Transport",health:"Health",education:"Education",shopping:"Shopping",leisure:"Leisure",bills:"Bills",work:"Work",salary:"Salary",other:"Other"} },
    es: { title:"Control de Gastos", lead:"Sencillo, rápido y seguro", back:"Volver", trial:"Prueba gratuita", days:"días restantes", active:"Suscripción activa", ended:"Tu prueba terminó: consulta el historial o suscríbete para continuar.", subscribe:"Suscribirse", loading:"Cargando registros...", unavailable:"No se pudieron cargar los registros. Revisa la conexión y vuelve a iniciar sesión.", month:"Mes", income:"Ingresos", expense:"Gastos", balance:"Saldo", last:"Último gasto", noLast:"Sin gastos", newRecord:"Nuevo registro", edit:"Editar registro", type:"Tipo", value:"Importe", category:"Categoría", date:"Fecha", description:"Descripción (opcional)", save:"Guardar registro", update:"Actualizar", cancel:"Cancelar", history:"Historial del mes", empty:"No hay registros este mes.", delete:"Eliminar", editAction:"Editar", confirm:"¿Eliminar este registro?", saved:"Registro guardado.", removed:"Registro eliminado.", error:"No se pudo guardar. Inténtalo de nuevo.", currency:"Moneda del mes", currencyLocked:"No puedes cambiar la moneda después del primer registro.", migration:"Hay registros antiguos en este dispositivo.", import:"Importar historial anterior", imported:"Historial importado.", how:"Registra ingresos y gastos; los totales se calculan automáticamente.", note:"Datos guardados en tu cuenta EduCashPro.", incomeType:"Ingreso", expenseType:"Gasto", categories:{food:"Alimentación",housing:"Vivienda",transport:"Transporte",health:"Salud",education:"Educación",shopping:"Compras",leisure:"Ocio",bills:"Facturas",work:"Trabajo",salary:"Salario",other:"Otros"} },
    ru: { title:"Учёт расходов", lead:"Просто, быстро и безопасно", back:"Назад", trial:"Бесплатный период", days:"дней осталось", active:"Подписка активна", ended:"Пробный период окончен: история доступна, для новых записей нужна подписка.", subscribe:"Подписаться", loading:"Загружаем записи...", unavailable:"Не удалось загрузить данные. Проверьте сеть и войдите снова.", month:"Месяц", income:"Доходы", expense:"Расходы", balance:"Баланс", last:"Последний расход", noLast:"Пока нет расходов", newRecord:"Новая запись", edit:"Изменить запись", type:"Тип", value:"Сумма", category:"Категория", date:"Дата", description:"Описание (необязательно)", save:"Сохранить запись", update:"Обновить", cancel:"Отмена", history:"История за месяц", empty:"Записей за месяц нет.", delete:"Удалить", editAction:"Изменить", confirm:"Удалить запись?", saved:"Запись сохранена.", removed:"Запись удалена.", error:"Не удалось сохранить. Попробуйте снова.", currency:"Валюта месяца", currencyLocked:"После первой записи изменить валюту нельзя.", migration:"На устройстве найдены старые записи.", import:"Импортировать историю", imported:"История импортирована.", how:"Записывайте доходы и расходы; итоги рассчитываются автоматически.", note:"Данные хранятся в вашем аккаунте EduCashPro.", incomeType:"Доход", expenseType:"Расход", categories:{food:"Еда",housing:"Жильё",transport:"Транспорт",health:"Здоровье",education:"Образование",shopping:"Покупки",leisure:"Досуг",bills:"Счета",work:"Работа",salary:"Зарплата",other:"Другое"} }
  };
  const CATS_EXPENSE = ["food","housing","transport","health","education","shopping","leisure","bills","other"];
  const CATS_INCOME = ["salary","work","other"];
  let options = {}, response = null, month = "", editing = "", busy = false, notice = "", epoch = 0;
  const lang = () => DICT[options.language] ? options.language : "pt";
  const t = () => DICT[lang()];
  const escapeHtml = (v) => String(v ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const today = () => { const d = new Date(); const p = n => String(n).padStart(2,"0"); return d.getFullYear()+"-"+p(d.getMonth()+1)+"-"+p(d.getDate()); };
  const currentMonth = () => today().slice(0,7);
  const monthOk = m => /^[0-9]{4}-(0[1-9]|1[0-2])$/.test(m);
  const formatMoney = (n) => { try { return new Intl.NumberFormat(lang()==="pt"?"pt-BR":lang(),{style:"currency",currency:response?.record?.currency||"BRL"}).format(n); } catch { return String(Number(n||0).toFixed(2)); } };
  const entries = () => response?.record?.entries || [];
  const root = () => document.getElementById("content");
  const api = async (path, data) => { if (typeof options.api !== "function") throw Error("api_unavailable"); const r = await options.api(API + path, data); if (!r?.ok) throw Error(r?.reason || "api_error"); return r; };
  const legacy = () => {
    try {
      const p = options.session?.profile || {};
      const key = "educashpro:monthly-finance:" + (p.userId || p.tgId || "local");
      if (localStorage.getItem(key + ":personal-imported") === "1") return null;
      const months = JSON.parse(localStorage.getItem(key) || "{}");
      return Object.values(months).some(m => (m?.expenses?.length || 0) > 0 || Number(m?.income || 0) > 0) ? months : null;
    } catch { return null; }
  };
  const moneyInput = (v) => {
    let s = String(v || "").replace(/[^0-9,.]/g,"");
    if (s.includes(",") && s.includes(".")) s = s.replaceAll(".","").replace(",",".");
    else if(s.includes(",")) s=s.replace(",",".");
    const n = Number(s); return Number.isFinite(n) && n > 0 && n <= 1000000000 ? Math.round(n*100)/100 : 0;
  };
  const card = (title, value, cls = "") => '<div class="eflMetric '+cls+'"><small>'+escapeHtml(title)+'</small><strong>'+escapeHtml(value)+'</strong></div>';
  function markup() {
    const l=t(), record=response?.record||{currency:"BRL",entries:[]}, records=entries();
    const incomeCents=records.filter(e=>e.type==="income").reduce((a,e)=>a+Math.round(e.amount*100),0);
    const outCents=records.filter(e=>e.type==="expense").reduce((a,e)=>a+Math.round(e.amount*100),0);
    const lastExpense=[...records].reverse().find(e=>e.type==="expense");
    const days=Math.max(0,Math.ceil((Date.parse(response?.trialEndsAt||0)-Date.now())/DAY));
    let status=response?.subscribed?l.active:(response?.trialActive?l.trial+" · "+days+" "+l.days:l.ended);
    const sorted=records.map((e,i)=>({...e,order:i})).sort((a,b)=>b.date.localeCompare(a.date)||b.order-a.order);
    const edit=records.find(e=>e.id===editing), editType=edit?.type||"expense";
    const cats=(editType==="income"?CATS_INCOME:CATS_EXPENSE).map(k=>'<option value="'+k+'"'+(edit?.category===k?' selected':'')+'>'+escapeHtml(l.categories[k])+'</option>').join("");
    const currencyChoices=["BRL","USD","EUR","GBP"].map(c=>'<option'+(record.currency===c?' selected':'')+' value="'+c+'">'+c+'</option>').join("");
    let html='<main class="financeLite"><header class="eflHead"><button class="eflBack" id="eflBack" type="button">← '+escapeHtml(l.back)+'</button><div class="eflBrand"><strong>'+escapeHtml(l.title)+'</strong><small>'+escapeHtml(l.lead)+'</small></div></header>';
    html+='<div class="eflStatus'+(response?.canWrite?'':' eflExpired')+'">'+escapeHtml(status)+'</div>';
    html+='<div class="eflToolbar"><label>'+escapeHtml(l.month)+'<input type="month" id="eflMonth" value="'+escapeHtml(month)+'"></label><label>'+escapeHtml(l.currency)+'<select id="eflCurrency" '+(records.length?'disabled title="'+escapeHtml(l.currencyLocked)+'"':'')+'>'+currencyChoices+'</select></label></div>';
    html+='<div class="eflSummary">'+card(l.income,formatMoney(incomeCents/100),"eflPositive")+card(l.expense,formatMoney(outCents/100),"eflNegative")+card(l.balance,formatMoney((incomeCents-outCents)/100))+card(l.last,lastExpense?formatMoney(lastExpense.amount):l.noLast)+'</div>';
    if (!response?.canWrite) html+='<section class="eflLock"><p>'+escapeHtml(l.ended)+'</p><button type="button" id="eflSubscribe">'+escapeHtml(l.subscribe)+'</button></section>';
    if (response?.canWrite) {
      html+='<form id="eflForm" class="eflForm"><strong>'+(edit?escapeHtml(l.edit):escapeHtml(l.newRecord))+'</strong>';
      html+='<div class="eflFields"><label>'+escapeHtml(l.type)+'<select id="eflType" name="type"><option value="expense"'+(editType==="expense"?' selected':'')+'>'+escapeHtml(l.expenseType)+'</option><option value="income"'+(editType==="income"?' selected':'')+'>'+escapeHtml(l.incomeType)+'</option></select></label>';
      html+='<label>'+escapeHtml(l.value)+'<input name="amount" type="text" inputmode="decimal" required placeholder="0,00" value="'+escapeHtml(edit?.amount||"")+'"></label>';
      html+='<label>'+escapeHtml(l.category)+'<select name="category" id="eflCategory">'+cats+'</select></label>';
      html+='<label>'+escapeHtml(l.date)+'<input name="date" type="date" required value="'+escapeHtml(edit?.date||((today().startsWith(month))?today():month+"-01"))+'"></label>';
      html+='<label class="eflFull">'+escapeHtml(l.description)+'<input name="description" maxlength="140" value="'+escapeHtml(edit?.description||"")+'"></label></div>';
      html+='<div class="eflActions"><button type="submit" class="eflPrimary">'+escapeHtml(edit?l.update:l.save)+'</button>'+(edit?'<button type="button" id="eflCancel">'+escapeHtml(l.cancel)+'</button>':'')+'</div></form>';
    }
    if(legacy() && response?.canWrite) html+='<div class="eflMigration">'+escapeHtml(l.migration)+' <button type="button" id="eflImport">'+escapeHtml(l.import)+'</button></div>';
    html+='<section class="eflHistory"><h3>'+escapeHtml(l.history)+'</h3>';
    html+=sorted.length?sorted.map(e=>'<div class="eflEntry"><div><strong>'+escapeHtml(e.description||l.categories[e.category]||e.category)+'</strong><small>'+escapeHtml(e.date)+' · '+escapeHtml(l.categories[e.category]||e.category)+'</small></div><div class="eflEntryRight"><b class="'+(e.type==="income"?"eflPositive":"eflNegative")+'">'+(e.type==="income"?"+":"−")+escapeHtml(formatMoney(e.amount))+'</b>'+(response?.canWrite?'<span><button type="button" data-edit="'+escapeHtml(e.id)+'">'+escapeHtml(l.editAction)+'</button><button type="button" data-delete="'+escapeHtml(e.id)+'">'+escapeHtml(l.delete)+'</button></span>':'')+'</div></div>').join(""):'<p class="eflEmpty">'+escapeHtml(l.empty)+'</p>';
    html+='</section><p class="eflFoot">'+escapeHtml(l.note)+'</p></main>';
    return html;
  }
  function draw() {
    if(!response||!root()?.querySelector(".financeLite"))return;
    root().innerHTML=markup();
    const view=root().querySelector(".financeLite"); if(!view)return;
    view.querySelector("#eflBack").onclick=()=>options.back?.();
    view.querySelector("#eflMonth").onchange=e=>{ if(monthOk(e.target.value)) {month=e.target.value;editing="";void load();} };
    view.querySelector("#eflCurrency").onchange=async e=>{const currency=e.target.value; try { const d=await api("change",{month,action:"currency",currency});response.record=d.record;notice="";draw(); } catch{notice=t().error;drawNotice();} };
    if(!response.canWrite){view.querySelector("#eflSubscribe").onclick=()=>options.subscribe?.();}
    const form=view.querySelector("#eflForm");
    if(form){
      form.querySelector("#eflType").onchange=e=>{
        const selector=form.querySelector("#eflCategory");selector.innerHTML=(e.target.value==="income"?CATS_INCOME:CATS_EXPENSE).map(k=>'<option value="'+k+'">'+escapeHtml(t().categories[k])+'</option>').join("");
      };
      form.onsubmit=async e=>{
        e.preventDefault(); if(busy)return;
        const values=new FormData(form), amount=moneyInput(values.get("amount")), date=String(values.get("date")||"");
        if(!amount||date.slice(0,7)!==month){notice=t().error;drawNotice();return;}
        busy=true;form.querySelector("[type=submit]").disabled=true;
        try{
          const entry={type:values.get("type"),amount,category:values.get("category"),date,description:values.get("description")};
          const d=await api("change",{month,action:editing?"update":"add",id:editing||undefined,entry,currency:response.record.currency});
          response.record=d.record;editing="";notice=t().saved;draw();
        }catch(error){notice=error?.message==="subscription_required"?t().ended:t().error;drawNotice();form.querySelector("[type=submit]").disabled=false;}
        finally{busy=false;}
      };
      view.querySelector("#eflCancel")?.addEventListener("click",()=>{editing="";draw();});
      view.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>{editing=b.dataset.edit;draw();view.querySelector("#eflForm input[name=amount]")?.focus();});
      view.querySelectorAll("[data-delete]").forEach(b=>b.onclick=async()=>{
        if(busy||!confirm(t().confirm))return;
        busy=true;
        try{const d=await api("change",{month,action:"delete",id:b.dataset.delete});response.record=d.record;editing="";notice=t().removed;draw();}
        catch{notice=t().error;drawNotice();}
        finally{busy=false;}
      });
    }
    view.querySelector("#eflImport")?.addEventListener("click",async()=>{
      if(busy)return;busy=true;
      try{const months=legacy();await api("import",{months});const p=options.session?.profile||{};const key="educashpro:monthly-finance:"+(p.userId||p.tgId||"local");localStorage.setItem(key+":personal-imported","1");notice=t().imported;await load();}
      catch{notice=t().error;drawNotice();}
      finally{busy=false;}
    });
    drawNotice();
  }
  function drawNotice(){const v=root()?.querySelector(".financeLite");if(!v)return;let p=v.querySelector("#eflNotice");if(!p){p=document.createElement("p");p.id="eflNotice";p.className="eflNotice";v.querySelector(".eflHead")?.after(p);}p.textContent=notice;}
  async function load(){
    const stamp=++epoch;
    if(!root())return;
    root().innerHTML='<main class="financeLite"><button id="eflBackLoading" class="eflBack" type="button">←</button><p class="eflEmpty">'+escapeHtml(t().loading)+'</p></main>';
    root().querySelector("#eflBackLoading")?.addEventListener("click",()=>options.back?.());
    try{
      const data=await api("open",{month});
      if(stamp!==epoch || !root()?.querySelector(".financeLite"))return;
      response=data;draw();
    }catch(error){
      if(stamp!==epoch || !root()?.querySelector(".financeLite"))return;
      root().innerHTML='<main class="financeLite"><button class="eflBack" id="eflBackError" type="button">← '+escapeHtml(t().back)+'</button><p class="eflEmpty">'+escapeHtml(t().unavailable)+'</p></main>';
      root().querySelector("#eflBackError").onclick=()=>options.back?.();
    }
  }
  function render(args={}){
    options={...args, language:DICT[args.language]?args.language:"pt"};
    month=monthOk(args.month)?args.month:currentMonth();
    editing="";notice="";response=null;
    window.EduCashProApp?.rememberRoute?.("finance");
    return load();
  }
  window.EduCashProFinance={render};
})();