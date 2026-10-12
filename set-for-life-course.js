(function(){
"use strict";
const LANGS=["pt","en","es","ru"];
const S={
pt:{title:"Set for Life — Construindo sua liberdade financeira",subtitle:"14 capítulos e apêndice · 12 conceitos e 12 perguntas por módulo · 180 exercícios comentados.",chapter:"Capítulo",other:"Este também é um conceito verdadeiro, explorado no módulo {number}: {title}. {explanation} Entretanto, ele não resolve diretamente a situação específica apresentada nesta pergunta.",correct:"Este princípio responde à situação: {explanation}",practice:"Exemplo de aplicação: {scenario} A decisão depende de compreender o princípio estudado e avaliar custos, riscos e contexto.",central:"Síntese deste módulo: {overview}",questions:["Qual ideia ajudaria a lidar melhor com esta situação?","Que princípio é mais relevante para esta decisão?","Qual aprendizado deve orientar a análise do caso?","Que consideração financeira é essencial aqui?","Qual orientação oferece uma resposta mais apropriada ao exemplo?","Que conceito ajuda a comparar as opções apresentadas?","Qual raciocínio deveria orientar o próximo passo?","Qual princípio reduz o risco de interpretar mal esse cenário?","Que reflexão explica o problema descrito?","Qual conceito permite uma decisão mais consciente?","Que ensinamento melhor se aplica ao caso?","Qual princípio oferece a melhor interpretação da situação?"]},
en:{title:"Set for Life — Building Financial Freedom",subtitle:"14 chapters and appendix · 12 concepts and 12 questions per module · 180 explained exercises.",chapter:"Chapter",other:"This is also a valid principle explored in module {number}: {title}. {explanation} However, it does not directly resolve the specific situation in this question.",correct:"This principle directly addresses the situation: {explanation}",practice:"Practical example: {scenario} Assess the costs, risks and context before making a decision.",central:"Key takeaway from this module: {overview}",questions:["Which idea would help address this situation?","Which principle matters most for this decision?","Which lesson should guide the analysis?","Which financial consideration is essential here?","Which guidance best fits the example?","Which concept helps compare the available choices?","Which reasoning should guide the next step?","Which principle prevents a misleading interpretation?","Which insight explains the described problem?","Which concept supports a more informed decision?","Which lesson applies most directly to this case?","Which principle best interprets this situation?"]},
es:{title:"Set for Life — Construyendo la libertad financiera",subtitle:"14 capítulos y apéndice · 12 conceptos y 12 preguntas por módulo · 180 ejercicios comentados.",chapter:"Capítulo",other:"Este también es un principio válido, explicado en el módulo {number}: {title}. {explanation} Sin embargo, no resuelve directamente la situación específica de esta pregunta.",correct:"Este principio responde directamente a la situación: {explanation}",practice:"Ejemplo práctico: {scenario} Evalúa costes, riesgos y contexto antes de decidir.",central:"Idea principal de este módulo: {overview}",questions:["¿Qué idea ayudaría a afrontar esta situación?","¿Qué principio es más importante para esta decisión?","¿Qué aprendizaje debe orientar el análisis?","¿Qué consideración financiera es esencial aquí?","¿Qué orientación corresponde mejor al ejemplo?","¿Qué concepto permite comparar las opciones?","¿Qué razonamiento debe orientar el siguiente paso?","¿Qué principio evita una interpretación engañosa?","¿Qué reflexión explica el problema descrito?","¿Qué concepto facilita una decisión consciente?","¿Qué enseñanza se aplica directamente al caso?","¿Qué principio interpreta mejor la situación?"]},
ru:{title:"Set for Life — Путь к финансовой свободе",subtitle:"14 глав и приложение · 12 понятий и 12 вопросов на каждый модуль · 180 вопросов с пояснениями.",chapter:"Глава",other:"Это тоже верный принцип, рассматриваемый в модуле {number}: {title}. {explanation} Однако он не отвечает непосредственно на ситуацию, описанную в этом вопросе.",correct:"Этот принцип непосредственно объясняет ситуацию: {explanation}",practice:"Практический пример: {scenario} Перед решением учитывайте расходы, риски и обстоятельства.",central:"Главная идея модуля: {overview}",questions:["Какая идея поможет в этой ситуации?","Какой принцип важнее всего для решения?","Какой урок поможет проанализировать пример?","Что прежде всего учитывать с финансовой точки зрения?","Какой подход лучше всего подходит к примеру?","Какое понятие помогает сравнить варианты?","Какая логика должна определять следующий шаг?","Какой принцип помогает избежать ошибочного вывода?","Какая идея объясняет описанную проблему?","Какое понятие помогает принять осознанное решение?","Какой вывод лучше всего применим к случаю?","Какой принцип наиболее точно описывает ситуацию?"]}
};
const fill=(str,variables)=>String(str).replace(/\{(\w+)\}/g,(_,key)=>String(variables[key]??""));
const chaptersFor=lang=>{
 const data=lang==="pt"?(window.EduCashProSetForLifeRaw||[]):(window.EduCashProSetForLifeTranslations?.[lang]||[]);
 return data.slice().sort((a,b)=>a.id-b.id);
};
const valid=arr=>Array.isArray(arr)&&arr.length===15&&arr.every((ch,i)=>ch.id===i+1&&ch.title?.length>5&&ch.overview?.length>80&&ch.lessons?.length===12&&ch.lessons.every(a=>a.length===3&&a.every((v,i)=>typeof v==="string"&&v.length>(i===0?15:i===1?70:40))));
function build(value){
 const lang=LANGS.includes(String(value||"pt").slice(0,2).toLowerCase())?String(value).slice(0,2).toLowerCase():"pt";
 const chapters=chaptersFor(lang);if(!valid(chapters))throw Error("set_for_life_missing_locale_"+lang);
 const labels=S[lang],questions=[];
 chapters.forEach((ch,ci)=>ch.lessons.forEach((lesson,li)=>{
  const used=new Set([ci]),options=[];
  for(let shift=0;shift<3;shift++){
   let index=(ci+4+li*3+shift*6)%chapters.length;
   while(used.has(index))index=(index+1)%chapters.length;
   used.add(index);
   const altChapter=chapters[index],alt=altChapter.lessons[(li*5+shift*3)%12];
   options.push({option:alt[0],comment:fill(labels.other,{number:altChapter.id,title:altChapter.title,explanation:alt[1]})});
  }
  const correctIndex=(ch.id+li*3)%4;
  options.splice(correctIndex,0,{option:lesson[0],comment:fill(labels.correct,{explanation:lesson[1]})});
  questions.push({
   id:ch.id*100+li+1,chapter:ch.id,scope:labels.chapter+" "+ch.id+" · "+ch.title,covers:[ch.id],
   intro:lesson[2],question:labels.questions[li],options:options.map(a=>a.option),answer:correctIndex,
   optionComments:options.map(a=>a.comment),
   comment:[lesson[1],fill(labels.practice,{scenario:lesson[2]}),fill(labels.central,{overview:ch.overview})].join("\n\n")
  });
 }));
 window.EduCashProBookQuiz.register({
  id:"set-for-life",locale:lang,icon:"📗",title:labels.title,subtitle:labels.subtitle,
  source:{title:"Set for Life: Dominate Life, Money and the American Dream",authors:"Scott Trench"},
  chapters:chapters.map(({id,title,part,overview})=>({id,title,part,overview})),questions
 });
 return true;
}
window.EduCashProSetForLife={build,available:lang=>valid(chaptersFor(lang)),supported:LANGS};
})();
