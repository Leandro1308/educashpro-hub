(function(){
"use strict";

const LANGS=["pt","en","es","ru"];
const COPY={
pt:{
hubTitle:"Ferramentas Financeiras",hubSub:"Cálculos, controle e documentos informativos para sua vida financeira e seu negócio.",limited:"ACESSO LIMITADO",unlimited:"ILIMITADO",subscriber:"ASSINANTE",how:"Como usar",back:"Voltar",save:"Salvar",calculate:"Calcular",clear:"Limpar",result:"Resultado",example:"Preencher exemplo",limitTitle:"Limite gratuito atingido",limitText:"Assinantes ativos têm registros, históricos e documentos informativos ilimitados.",activate:"Ativar assinatura",currency:"Moeda",name:"Nome",value:"Valor",date:"Data",status:"Status",pending:"Pendente",received:"Recebido",overdue:"Atrasado",remove:"Excluir",saved:"Salvo com sucesso.",invalid:"Preencha os campos obrigatórios com valores válidos.",freeRule:"Não assinante: até {n}. Assinante: ilimitado.",terms:"Termos de Uso",
receivables:"Contas a Receber",receivablesSub:"Acompanhe clientes, valores e vencimentos.",client:"Cliente",description:"Descrição",due:"Vencimento",addReceivable:"Adicionar recebimento",totalOpen:"A receber",totalReceived:"Recebido",totalOverdue:"Em atraso",empty:"Nenhum registro.",markReceived:"Marcar recebido",
quote:"Orçamento Informativo",quoteSub:"Crie um documento informativo de proposta de valores, sem emissão de fatura.",issuer:"Responsável/empresa",customer:"Cliente",item:"Item/serviço",qty:"Quantidade",unitPrice:"Valor unitário",addItem:"Adicionar item",notes:"Observações",generate:"Gerar documento",print:"Imprimir / salvar em PDF",docTitle:"ORÇAMENTO INFORMATIVO",docNote:"Documento informativo de valores. Não constitui fatura, nota fiscal ou documento de cobrança.",quoteNumber:"Referência",
salePrice:"Preço de Venda",salePriceSub:"Calcule preço, lucro e margem a partir dos custos.",cost:"Custo base",extraCosts:"Custos adicionais",fees:"Taxas/comissões (%)",targetMargin:"Margem desejada (%)",salePriceResult:"Preço de venda estimado",profit:"Lucro estimado",margin:"Margem",
breakEven:"Ponto de Equilíbrio",breakEvenSub:"Descubra quanto precisa vender para cobrir os custos.",fixedCosts:"Custos fixos",variableUnit:"Custo variável por unidade",unitPriceLabel:"Preço por unidade",breakEvenQty:"Unidades para equilíbrio",breakEvenRevenue:"Faturamento no equilíbrio",
revenueGoal:"Meta de Faturamento",revenueGoalSub:"Transforme sua meta de lucro em uma meta de vendas.",desiredProfit:"Lucro desejado",variablePercent:"Custos variáveis sobre vendas (%)",revenueNeeded:"Faturamento necessário",dailyGoal:"Meta diária (30 dias)",weeklyGoal:"Meta semanal",
roi:"ROI",roiSub:"Calcule o retorno percentual de um investimento.",investment:"Investimento",revenue:"Receita gerada",otherCosts:"Outros custos",netReturn:"Retorno líquido",roiResult:"ROI",
compound:"Juros Compostos Avançados",compoundSub:"Simule valor inicial, aportes, retiradas, taxa e prazo.",initial:"Valor inicial",monthlyContribution:"Aporte mensal",monthlyWithdrawal:"Retirada mensal",rateAnnual:"Taxa anual (%)",years:"Anos",future:"Valor futuro",contributed:"Total aportado",withdrawn:"Total retirado",interestGain:"Resultado dos juros",
helpReceivables:"Cadastre cada valor que espera receber, com cliente, valor e vencimento. Atualize o status quando o pagamento ocorrer. O painel soma valores pendentes, recebidos e atrasados.",
helpQuote:"Informe responsável, cliente e itens. O sistema gera um orçamento informativo que pode ser impresso ou salvo em PDF. Ele não cria fatura ou nota fiscal.",
helpSalePrice:"Informe custo base, custos adicionais, taxas sobre a venda e a margem desejada. O sistema estima o preço necessário e mostra o lucro e a margem resultante.",
helpBreakEven:"Informe custos fixos, custo variável por unidade e preço de venda unitário. O sistema calcula quantas unidades precisam ser vendidas para cobrir os custos.",
helpRevenueGoal:"Informe custos fixos, percentual de custos variáveis e lucro desejado. O sistema calcula o faturamento estimado necessário, além de metas diária e semanal.",
helpRoi:"Informe o valor investido, a receita gerada e outros custos. O ROI compara o retorno líquido com o investimento inicial.",
helpCompound:"Informe valor inicial, aporte e retirada mensal, taxa anual e prazo. A simulação capitaliza mensalmente e mostra valor futuro, aportes, retiradas e efeito dos juros."
},
en:{
hubTitle:"Financial Tools",hubSub:"Calculations, tracking and informative documents for personal and business finances.",limited:"LIMITED ACCESS",unlimited:"UNLIMITED",subscriber:"SUBSCRIBER",how:"How to use",back:"Back",save:"Save",calculate:"Calculate",clear:"Clear",result:"Result",example:"Fill example",limitTitle:"Free limit reached",limitText:"Active subscribers get unlimited records, history and informative documents.",activate:"Activate subscription",currency:"Currency",name:"Name",value:"Amount",date:"Date",status:"Status",pending:"Pending",received:"Received",overdue:"Overdue",remove:"Delete",saved:"Saved.",invalid:"Fill required fields with valid values.",freeRule:"Non-subscriber: up to {n}. Subscriber: unlimited.",terms:"Terms of Use",
receivables:"Accounts Receivable",receivablesSub:"Track customers, amounts and due dates.",client:"Customer",description:"Description",due:"Due date",addReceivable:"Add receivable",totalOpen:"Open",totalReceived:"Received",totalOverdue:"Overdue",empty:"No records.",markReceived:"Mark received",
quote:"Informative Quote",quoteSub:"Create an informative pricing proposal document, without issuing an invoice.",issuer:"Issuer/business",customer:"Customer",item:"Item/service",qty:"Quantity",unitPrice:"Unit price",addItem:"Add item",notes:"Notes",generate:"Generate document",print:"Print / save as PDF",docTitle:"INFORMATIVE QUOTE",docNote:"Informative pricing document. It is not an invoice, tax document or collection document.",quoteNumber:"Reference",
salePrice:"Sale Price",salePriceSub:"Calculate price, profit and margin from costs.",cost:"Base cost",extraCosts:"Additional costs",fees:"Fees/commissions (%)",targetMargin:"Target margin (%)",salePriceResult:"Estimated sale price",profit:"Estimated profit",margin:"Margin",
breakEven:"Break-even Point",breakEvenSub:"Find how much you need to sell to cover costs.",fixedCosts:"Fixed costs",variableUnit:"Variable cost per unit",unitPriceLabel:"Unit sale price",breakEvenQty:"Break-even units",breakEvenRevenue:"Break-even revenue",
revenueGoal:"Revenue Goal",revenueGoalSub:"Turn your profit goal into a sales target.",desiredProfit:"Desired profit",variablePercent:"Variable costs on sales (%)",revenueNeeded:"Required revenue",dailyGoal:"Daily goal (30 days)",weeklyGoal:"Weekly goal",
roi:"ROI",roiSub:"Calculate the percentage return on an investment.",investment:"Investment",revenue:"Revenue generated",otherCosts:"Other costs",netReturn:"Net return",roiResult:"ROI",
compound:"Advanced Compound Interest",compoundSub:"Simulate initial amount, contributions, withdrawals, rate and term.",initial:"Initial amount",monthlyContribution:"Monthly contribution",monthlyWithdrawal:"Monthly withdrawal",rateAnnual:"Annual rate (%)",years:"Years",future:"Future value",contributed:"Total contributed",withdrawn:"Total withdrawn",interestGain:"Interest effect",
helpReceivables:"Add each amount you expect to receive with customer, value and due date. Update the status after payment. The dashboard totals open, received and overdue values.",
helpQuote:"Enter issuer, customer and items. The system generates an informative quote that can be printed or saved as PDF. It does not create an invoice or tax document.",
helpSalePrice:"Enter base cost, additional costs, sale fees and target margin. The system estimates the required sale price and shows profit and resulting margin.",
helpBreakEven:"Enter fixed costs, variable cost per unit and unit sale price. The system calculates how many units must be sold to cover costs.",
helpRevenueGoal:"Enter fixed costs, variable-cost percentage and desired profit. The system calculates estimated required revenue plus daily and weekly targets.",
helpRoi:"Enter investment, generated revenue and other costs. ROI compares net return with the initial investment.",
helpCompound:"Enter initial amount, monthly contribution and withdrawal, annual rate and term. The simulation compounds monthly and shows future value, contributions, withdrawals and the interest effect."
},
es:{
hubTitle:"Herramientas Financieras",hubSub:"Cálculos, control y documentos informativos para tus finanzas y tu negocio.",limited:"ACCESO LIMITADO",unlimited:"ILIMITADO",subscriber:"SUSCRIPTOR",how:"Cómo usar",back:"Volver",save:"Guardar",calculate:"Calcular",clear:"Limpiar",result:"Resultado",example:"Completar ejemplo",limitTitle:"Límite gratuito alcanzado",limitText:"Los suscriptores activos tienen registros, historial y documentos informativos ilimitados.",activate:"Activar suscripción",currency:"Moneda",name:"Nombre",value:"Valor",date:"Fecha",status:"Estado",pending:"Pendiente",received:"Recibido",overdue:"Vencido",remove:"Eliminar",saved:"Guardado.",invalid:"Completa los campos obligatorios con valores válidos.",freeRule:"No suscriptor: hasta {n}. Suscriptor: ilimitado.",terms:"Términos de Uso",
receivables:"Cuentas por Cobrar",receivablesSub:"Controla clientes, valores y vencimientos.",client:"Cliente",description:"Descripción",due:"Vencimiento",addReceivable:"Agregar cobro",totalOpen:"Por cobrar",totalReceived:"Recibido",totalOverdue:"Vencido",empty:"Sin registros.",markReceived:"Marcar recibido",
quote:"Presupuesto Informativo",quoteSub:"Crea un documento informativo de propuesta de valores, sin emitir factura.",issuer:"Responsable/empresa",customer:"Cliente",item:"Ítem/servicio",qty:"Cantidad",unitPrice:"Valor unitario",addItem:"Agregar ítem",notes:"Observaciones",generate:"Generar documento",print:"Imprimir / guardar en PDF",docTitle:"PRESUPUESTO INFORMATIVO",docNote:"Documento informativo de valores. No constituye factura, documento fiscal ni documento de cobro.",quoteNumber:"Referencia",
salePrice:"Precio de Venta",salePriceSub:"Calcula precio, beneficio y margen a partir de los costos.",cost:"Costo base",extraCosts:"Costos adicionales",fees:"Tasas/comisiones (%)",targetMargin:"Margen deseado (%)",salePriceResult:"Precio de venta estimado",profit:"Beneficio estimado",margin:"Margen",
breakEven:"Punto de Equilibrio",breakEvenSub:"Descubre cuánto necesitas vender para cubrir costos.",fixedCosts:"Costos fijos",variableUnit:"Costo variable por unidad",unitPriceLabel:"Precio por unidad",breakEvenQty:"Unidades de equilibrio",breakEvenRevenue:"Facturación de equilibrio",
revenueGoal:"Meta de Facturación",revenueGoalSub:"Convierte tu meta de beneficio en una meta de ventas.",desiredProfit:"Beneficio deseado",variablePercent:"Costos variables sobre ventas (%)",revenueNeeded:"Facturación necesaria",dailyGoal:"Meta diaria (30 días)",weeklyGoal:"Meta semanal",
roi:"ROI",roiSub:"Calcula el retorno porcentual de una inversión.",investment:"Inversión",revenue:"Ingresos generados",otherCosts:"Otros costos",netReturn:"Retorno neto",roiResult:"ROI",
compound:"Interés Compuesto Avanzado",compoundSub:"Simula valor inicial, aportes, retiros, tasa y plazo.",initial:"Valor inicial",monthlyContribution:"Aporte mensual",monthlyWithdrawal:"Retiro mensual",rateAnnual:"Tasa anual (%)",years:"Años",future:"Valor futuro",contributed:"Total aportado",withdrawn:"Total retirado",interestGain:"Efecto de intereses",
helpReceivables:"Registra cada valor que esperas recibir con cliente, importe y vencimiento. Actualiza el estado cuando se produzca el pago. El panel suma valores pendientes, recibidos y vencidos.",
helpQuote:"Indica responsable, cliente e ítems. El sistema genera un presupuesto informativo que puede imprimirse o guardarse como PDF. No crea factura ni documento fiscal.",
helpSalePrice:"Indica costo base, costos adicionales, tasas sobre la venta y margen deseado. El sistema estima el precio necesario y muestra beneficio y margen resultante.",
helpBreakEven:"Indica costos fijos, costo variable por unidad y precio de venta unitario. El sistema calcula cuántas unidades deben venderse para cubrir los costos.",
helpRevenueGoal:"Indica costos fijos, porcentaje de costos variables y beneficio deseado. El sistema calcula la facturación estimada necesaria y metas diaria y semanal.",
helpRoi:"Indica inversión, ingresos generados y otros costos. El ROI compara el retorno neto con la inversión inicial.",
helpCompound:"Indica valor inicial, aporte y retiro mensual, tasa anual y plazo. La simulación capitaliza mensualmente y muestra valor futuro, aportes, retiros y efecto de intereses."
},
ru:{
hubTitle:"Финансовые инструменты",hubSub:"Расчёты, учёт и информационные документы для личных финансов и бизнеса.",limited:"ОГРАНИЧЕННЫЙ ДОСТУП",unlimited:"БЕЗ ОГРАНИЧЕНИЙ",subscriber:"ПОДПИСКА",how:"Как пользоваться",back:"Назад",save:"Сохранить",calculate:"Рассчитать",clear:"Очистить",result:"Результат",example:"Заполнить пример",limitTitle:"Бесплатный лимит исчерпан",limitText:"Активные подписчики получают неограниченные записи, историю и информационные документы.",activate:"Активировать подписку",currency:"Валюта",name:"Имя",value:"Сумма",date:"Дата",status:"Статус",pending:"Ожидается",received:"Получено",overdue:"Просрочено",remove:"Удалить",saved:"Сохранено.",invalid:"Заполните обязательные поля корректными значениями.",freeRule:"Без подписки: до {n}. С подпиской: без ограничений.",terms:"Условия использования",
receivables:"Дебиторская задолженность",receivablesSub:"Контролируйте клиентов, суммы и сроки.",client:"Клиент",description:"Описание",due:"Срок",addReceivable:"Добавить платёж",totalOpen:"К получению",totalReceived:"Получено",totalOverdue:"Просрочено",empty:"Нет записей.",markReceived:"Отметить полученным",
quote:"Информационная смета",quoteSub:"Создайте информационный документ с предложением стоимости без выставления счёта.",issuer:"Ответственный/компания",customer:"Клиент",item:"Товар/услуга",qty:"Количество",unitPrice:"Цена за единицу",addItem:"Добавить позицию",notes:"Примечания",generate:"Создать документ",print:"Печать / сохранить PDF",docTitle:"ИНФОРМАЦИОННАЯ СМЕТА",docNote:"Информационный документ о стоимости. Не является счётом, налоговым или платёжным документом.",quoteNumber:"Номер",
salePrice:"Цена продажи",salePriceSub:"Рассчитайте цену, прибыль и маржу по затратам.",cost:"Базовая себестоимость",extraCosts:"Дополнительные расходы",fees:"Комиссии (%)",targetMargin:"Желаемая маржа (%)",salePriceResult:"Расчётная цена продажи",profit:"Расчётная прибыль",margin:"Маржа",
breakEven:"Точка безубыточности",breakEvenSub:"Узнайте объём продаж для покрытия расходов.",fixedCosts:"Постоянные расходы",variableUnit:"Переменные затраты на единицу",unitPriceLabel:"Цена единицы",breakEvenQty:"Единиц до безубыточности",breakEvenRevenue:"Выручка в точке безубыточности",
revenueGoal:"Цель по выручке",revenueGoalSub:"Преобразуйте цель по прибыли в цель по продажам.",desiredProfit:"Желаемая прибыль",variablePercent:"Переменные расходы от продаж (%)",revenueNeeded:"Необходимая выручка",dailyGoal:"Цель в день (30 дней)",weeklyGoal:"Цель в неделю",
roi:"ROI",roiSub:"Рассчитайте процентную отдачу от инвестиции.",investment:"Инвестиции",revenue:"Полученная выручка",otherCosts:"Прочие расходы",netReturn:"Чистый результат",roiResult:"ROI",
compound:"Сложные проценты",compoundSub:"Смоделируйте начальную сумму, пополнения, снятия, ставку и срок.",initial:"Начальная сумма",monthlyContribution:"Ежемесячное пополнение",monthlyWithdrawal:"Ежемесячное снятие",rateAnnual:"Годовая ставка (%)",years:"Лет",future:"Будущая сумма",contributed:"Всего внесено",withdrawn:"Всего снято",interestGain:"Эффект процентов",
helpReceivables:"Добавляйте ожидаемые платежи с клиентом, суммой и сроком. После оплаты меняйте статус. Панель суммирует ожидаемые, полученные и просроченные суммы.",
helpQuote:"Укажите ответственного, клиента и позиции. Система создаёт информационную смету для печати или сохранения в PDF. Она не создаёт счёт или налоговый документ.",
helpSalePrice:"Укажите базовую себестоимость, дополнительные расходы, комиссии и желаемую маржу. Система оценит требуемую цену и покажет прибыль и маржу.",
helpBreakEven:"Укажите постоянные расходы, переменные затраты на единицу и цену продажи. Система рассчитает количество единиц для покрытия расходов.",
helpRevenueGoal:"Укажите постоянные расходы, долю переменных расходов и желаемую прибыль. Система рассчитает необходимую выручку и дневную/недельную цель.",
helpRoi:"Укажите инвестицию, полученную выручку и прочие расходы. ROI сравнивает чистый результат с первоначальной инвестицией.",
helpCompound:"Укажите начальную сумму, ежемесячные пополнения и снятия, годовую ставку и срок. Симуляция использует ежемесячную капитализацию."
}
};

let opt={language:"pt",session:null,back:null,toolBack:null,subscribe:null};
const state={quoteItems:[{name:"",qty:1,price:0}]};
function lang(){const c=String(opt.language||window.EduCashProLocale?.resolve?.()||"pt").slice(0,2);return LANGS.includes(c)?c:"pt"}
function t(k){return COPY[lang()][k]||COPY.pt[k]||k}
function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function active(){return window.EduCashProAccess?.isActive?.()===true||opt.active===true}
function uid(){return opt.session?.profile?.userId||opt.session?.profile?.tgId||"local"}
function key(name){return "educashpro:financial-tools:"+uid()+":"+name}
function read(name,fallback=[]){try{const v=JSON.parse(localStorage.getItem(key(name))||"null");return v??fallback}catch{return fallback}}
function write(name,value){localStorage.setItem(key(name),JSON.stringify(value))}
function num(id){return Number(String(document.getElementById(id)?.value||"0").replace(",", "."))||0}
function money(v,currency){try{return new Intl.NumberFormat(lang()==="pt"?"pt-BR":lang(),{style:"currency",currency:currency||"USD",maximumFractionDigits:2}).format(Number(v||0))}catch{return (currency||"")+" "+Number(v||0).toFixed(2)}}
function target(){return document.getElementById("content")}
function currencies(){return ["USD","EUR","BRL","GBP","MXN","ARS","COP","RUB","USDT"].map(c=>`<option value="${c}">${c}</option>`).join("")}
function header(title,sub){return `<button id="finBack" class="textButton">← ${esc(t("back"))}</button><section class="hero finHero"><span class="eyebrow">${active()?esc(t("unlimited")):esc(t("limited"))}</span><h1>${esc(title)}</h1><p>${esc(sub)}</p><button class="secondaryButton finHelpBtn" id="finHelp">❔ ${esc(t("how"))}</button></section>`}
function wireBack(fn){document.getElementById("finBack").onclick=fn||opt.toolBack||renderHub}
function help(text){const el=document.createElement("div");el.className="finHelpOverlay";el.innerHTML=`<section class="finHelpCard"><button class="finHelpClose">✕</button><h2>❔ ${esc(t("how"))}</h2><p>${esc(text)}</p></section>`;document.body.appendChild(el);el.querySelector(".finHelpClose").onclick=()=>el.remove();el.onclick=e=>{if(e.target===el)el.remove()}}
function wireHelp(text){document.getElementById("finHelp").onclick=()=>help(text)}
function showLimit(){const el=document.createElement("div");el.className="finHelpOverlay";el.innerHTML=`<section class="finHelpCard"><button class="finHelpClose">✕</button><h2>🔒 ${esc(t("limitTitle"))}</h2><p>${esc(t("limitText"))}</p><button id="finSubscribe" class="wideButton">${esc(t("activate"))}</button></section>`;document.body.appendChild(el);el.querySelector(".finHelpClose").onclick=()=>el.remove();el.querySelector("#finSubscribe").onclick=()=>{el.remove();opt.subscribe?.()}}
function canAdd(name,limit){return active()||read(name,[]).length<limit}
function rule(n){return t("freeRule").replace("{n}",String(n))}
function field(id,label,type="number",value=""){return `<label class="finField"><span>${esc(label)}</span><input id="${id}" type="${type}" value="${esc(value)}" ${type==="number"?'step="any" inputmode="decimal"':""}></label>`}
function currencyField(){return `<label class="finField"><span>${esc(t("currency"))}</span><select id="finCurrency">${currencies()}</select></label>`}
function resultBox(rows){return `<section class="finResults">${rows.map(([a,b])=>`<article><small>${esc(a)}</small><strong>${esc(b)}</strong></article>`).join("")}</section>`}
function renderHub(){
 const cards=[
 ["📥",t("receivables"),t("receivablesSub"),renderReceivables],
 ["📄",t("quote"),t("quoteSub"),renderQuote]
 ];
 target().innerHTML=`<button id="finBack" class="textButton">← ${esc(t("back"))}</button><section class="hero"><span class="eyebrow">EDUCASHPRO</span><h1>💼 ${esc(t("hubTitle"))}</h1><p>${esc(t("hubSub"))}</p></section><section class="quickGrid">${cards.map((c,i)=>`<button class="quickCard" data-fin-card="${i}"><span class="emoji">${c[0]}</span><strong>${esc(c[1])}</strong><small>${esc(c[2])}</small><span class="freeAccessBadge">${esc(active()?t("unlimited"):t("limited"))}</span></button>`).join("")}</section>`;
 document.getElementById("finBack").onclick=()=>opt.back?.();
 document.querySelectorAll("[data-fin-card]").forEach(b=>b.onclick=()=>cards[Number(b.dataset.finCard)][3]());
 window.scrollTo({top:0,behavior:"smooth"});
}

function renderReceivables(){
 const limit=10;let list=read("receivables",[]);
 const refresh=()=>{
  const now=new Date();now.setHours(0,0,0,0);
  list=list.map(x=>({...x,status:x.status==="received"?"received":new Date(x.due+"T00:00:00")<now?"overdue":"pending"}));write("receivables",list);
  const cur=document.getElementById("finCurrency")?.value||"USD";
  const open=list.filter(x=>x.status!=="received").reduce((s,x)=>s+Number(x.value),0),rec=list.filter(x=>x.status==="received").reduce((s,x)=>s+Number(x.value),0),over=list.filter(x=>x.status==="overdue").reduce((s,x)=>s+Number(x.value),0);
  document.getElementById("recSummary").innerHTML=resultBox([[t("totalOpen"),money(open,cur)],[t("totalReceived"),money(rec,cur)],[t("totalOverdue"),money(over,cur)]]);
  document.getElementById("recList").innerHTML=list.length?list.map(x=>`<article class="finListItem"><div><strong>${esc(x.client)}</strong><small>${esc(x.description||"")} · ${esc(x.due)}</small><span class="finStatus ${esc(x.status)}">${esc(t(x.status))}</span></div><b>${esc(money(x.value,x.currency||cur))}</b><div class="finListActions">${x.status!=="received"?`<button data-rec-paid="${x.id}">✓ ${esc(t("markReceived"))}</button>`:""}<button data-rec-remove="${x.id}">× ${esc(t("remove"))}</button></div></article>`).join(""):`<div class="empty">${esc(t("empty"))}</div>`;
  document.querySelectorAll("[data-rec-paid]").forEach(b=>b.onclick=()=>{const x=list.find(i=>String(i.id)===b.dataset.recPaid);if(x){x.status="received";x.receivedAt=Date.now();write("receivables",list);refresh()}});
  document.querySelectorAll("[data-rec-remove]").forEach(b=>b.onclick=()=>{list=list.filter(i=>String(i.id)!==b.dataset.recRemove);write("receivables",list);refresh()});
 };
 target().innerHTML=header(t("receivables"),t("receivablesSub"))+`<section class="finCard"><div class="finGrid">${currencyField()}${field("recClient",t("client"),"text")}${field("recDesc",t("description"),"text")}${field("recValue",t("value"))}${field("recDue",t("due"),"date")}</div><button id="recAdd" class="wideButton">＋ ${esc(t("addReceivable"))}</button><small class="finRule">${esc(rule(limit))}</small></section><div id="recSummary"></div><section id="recList" class="finList"></section>`;
 wireBack();wireHelp(t("helpReceivables"));
 document.getElementById("finCurrency").onchange=refresh;
 document.getElementById("recAdd").onclick=()=>{if(!canAdd("receivables",limit))return showLimit();const client=document.getElementById("recClient").value.trim(),value=num("recValue"),due=document.getElementById("recDue").value;if(!client||!(value>0)||!due)return alert(t("invalid"));list.unshift({id:Date.now(),client,description:document.getElementById("recDesc").value.trim(),value,due,currency:document.getElementById("finCurrency").value,status:"pending"});write("receivables",list);refresh()};
 refresh();
}

function renderQuote(){
 let items=[{name:"",qty:1,price:0}];const limit=3;
 const rows=()=>{document.getElementById("quoteItems").innerHTML=items.map((x,i)=>`<div class="finQuoteRow">${field("qiN"+i,t("item"),"text",x.name)}${field("qiQ"+i,t("qty"),"number",x.qty)}${field("qiP"+i,t("unitPrice"),"number",x.price)}<button data-qi-remove="${i}">×</button></div>`).join("");document.querySelectorAll("[data-qi-remove]").forEach(b=>b.onclick=()=>{items.splice(Number(b.dataset.qiRemove),1);if(!items.length)items.push({name:"",qty:1,price:0});rows()})};
 target().innerHTML=header(t("quote"),t("quoteSub"))+`<section class="finCard"><div class="finGrid">${currencyField()}${field("qIssuer",t("issuer"),"text")}${field("qCustomer",t("customer"),"text")}${field("qRef",t("quoteNumber"),"text",String(Date.now()).slice(-6))}</div><div id="quoteItems"></div><button id="qAddItem" class="secondaryButton">＋ ${esc(t("addItem"))}</button><label class="finField"><span>${esc(t("notes"))}</span><textarea id="qNotes" rows="3"></textarea></label><button id="qGenerate" class="wideButton">${esc(t("generate"))}</button><small class="finRule">${esc(rule(limit))}</small></section><div id="quotePreview"></div>`;
 wireBack();wireHelp(t("helpQuote"));rows();
 document.getElementById("qAddItem").onclick=()=>{items.push({name:"",qty:1,price:0});rows()};
 document.getElementById("qGenerate").onclick=()=>{const issuer=document.getElementById("qIssuer").value.trim(),customer=document.getElementById("qCustomer").value.trim(),currency=document.getElementById("finCurrency").value,ref=document.getElementById("qRef").value.trim();const parsed=items.map((_,i)=>({name:document.getElementById("qiN"+i)?.value.trim(),qty:num("qiQ"+i),price:num("qiP"+i)})).filter(x=>x.name&&x.qty>0&&x.price>=0);if(!issuer||!customer||!parsed.length)return alert(t("invalid"));if(!active()&&!canAdd("quotes",limit))return showLimit();const total=parsed.reduce((s,x)=>s+x.qty*x.price,0);const doc={id:Date.now(),issuer,customer,currency,ref,items:parsed,notes:document.getElementById("qNotes").value.trim(),total};const saved=read("quotes",[]);saved.unshift(doc);write("quotes",saved);document.getElementById("quotePreview").innerHTML=`<section class="finDocument" id="finPrintable"><header><strong>EduCashPro</strong><h2>${esc(t("docTitle"))}</h2><small>${esc(t("quoteNumber"))}: ${esc(ref)}</small></header><p><b>${esc(t("issuer"))}:</b> ${esc(issuer)}</p><p><b>${esc(t("customer"))}:</b> ${esc(customer)}</p><table><thead><tr><th>${esc(t("item"))}</th><th>${esc(t("qty"))}</th><th>${esc(t("unitPrice"))}</th><th>Total</th></tr></thead><tbody>${parsed.map(x=>`<tr><td>${esc(x.name)}</td><td>${x.qty}</td><td>${esc(money(x.price,currency))}</td><td>${esc(money(x.qty*x.price,currency))}</td></tr>`).join("")}</tbody><tfoot><tr><td colspan="3">Total</td><td>${esc(money(total,currency))}</td></tr></tfoot></table>${doc.notes?`<p>${esc(doc.notes)}</p>`:""}<p class="finDocNote">${esc(t("docNote"))}</p><button id="qPrint" class="wideButton noPrint">${esc(t("print"))}</button></section>`;document.getElementById("qPrint").onclick=()=>window.print()};
}

function setOptions(args={},toolBack=null){
 opt={language:LANGS.includes(args.language)?args.language:(window.EduCashProLocale?.resolve?.()||"pt"),session:args.session||window.__EDUCASHPRO_SESSION__||{},active:args.active===true,back:args.back,toolBack,subscribe:args.subscribe};
}
function render(args={}){setOptions(args,null);renderHub()}
function open(id,args={}){
 setOptions(args,args.back||null);
 const map={receivables:renderReceivables,quote:renderQuote};
 const fn=map[id];
 if(!fn)return renderHub();
 fn();
}
window.EduCashProFinancialTools={render,renderHub,open};
})();