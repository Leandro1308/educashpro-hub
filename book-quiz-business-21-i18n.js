(function(){
"use strict";
const LANGS=["pt","en","es","ru"];
const S={
 pt:{title:"O Negócio do Século XXI",subtitle:"21 capítulos · 12 lições interativas por capítulo · 252 perguntas com explicações educativas.",chapter:"Capítulo",other:"Este é outro princípio verdadeiro, estudado no Capítulo {number} — {title}. {explanation} Entretanto, ele não responde à situação específica apresentada nesta pergunta: {question}",correct:"Este é o princípio diretamente relacionado à situação descrita. {explanation}",practice:"Aplicação prática: {scenario} {principle}",central:"Ideia central deste capítulo: {overview}"},
 en:{title:"The Business of the 21st Century",subtitle:"21 chapters · 12 interactive lessons per chapter · 252 questions with educational explanations.",chapter:"Chapter",other:"This is another valid principle, discussed in Chapter {number} — {title}. {explanation} However, it does not directly answer the situation described in this question: {question}",correct:"This is the principle that directly relates to the situation described. {explanation}",practice:"Practical application: {scenario} {principle}",central:"Key idea of this chapter: {overview}"},
 es:{title:"El negocio del siglo XXI",subtitle:"21 capítulos · 12 lecciones interactivas por capítulo · 252 preguntas con explicaciones educativas.",chapter:"Capítulo",other:"Este es otro principio válido, estudiado en el capítulo {number} — {title}. {explanation} Sin embargo, no responde directamente a la situación planteada en esta pregunta: {question}",correct:"Este es el principio que se relaciona directamente con la situación descrita. {explanation}",practice:"Aplicación práctica: {scenario} {principle}",central:"Idea central de este capítulo: {overview}"},
 ru:{title:"Бизнес XXI века",subtitle:"21 глава · 12 интерактивных уроков в каждой главе · 252 вопроса с подробными пояснениями.",chapter:"Глава",other:"Это еще один верный принцип, который рассматривается в главе {number} — {title}. {explanation} Однако он не отвечает непосредственно на ситуацию, описанную в этом вопросе: {question}",correct:"Именно этот принцип непосредственно относится к описанной ситуации. {explanation}",practice:"Практическое применение: {scenario} {principle}",central:"Основная идея этой главы: {overview}"}
};
const fill=(template,values)=>template.replace(/\{(\w+)\}/g,(_,name)=>String(values[name]??""));
const isValid=(chapters)=>Array.isArray(chapters)&&chapters.length===21&&chapters.every((ch,i)=>ch?.id===i+1&&typeof ch.title==="string"&&ch.title.length>3&&typeof ch.overview==="string"&&ch.overview.length>80&&Array.isArray(ch.lessons)&&ch.lessons.length===12&&ch.lessons.every(a=>Array.isArray(a)&&a.length===4&&a.every(s=>typeof s==="string"&&s.trim().length>=12)));
function chaptersFor(lang){
 if(lang==="pt")return (window.EduCashProBookQuizChapters||[]).slice().sort((a,b)=>a.id-b.id);
 return (window.EduCashProBookQuizTranslations?.[lang]||[]).slice().sort((a,b)=>a.id-b.id);
}
function build(language){
 const lang=LANGS.includes(String(language).slice(0,2).toLowerCase())?String(language).slice(0,2).toLowerCase():"pt";
 const chapters=chaptersFor(lang);
 if(!isValid(chapters))throw new Error("book_quiz_missing_or_incomplete_locale_"+lang);
 const strings=S[lang],questions=[];
 chapters.forEach((ch,ci)=>ch.lessons.forEach((lesson,li)=>{
  const used=new Set([ci]),answers=[];
  for(let shift=0;shift<3;shift++){
   let ix=(ci+4+li*3+shift*6)%chapters.length;
   while(used.has(ix))ix=(ix+1)%chapters.length;
   used.add(ix);
   const otherChapter=chapters[ix],otherLesson=otherChapter.lessons[(li*5+shift*3)%12];
   answers.push({
    option:otherLesson[2],
    comment:fill(strings.other,{number:otherChapter.id,title:otherChapter.title,explanation:otherLesson[3],question:lesson[1]})
   });
  }
  const correctIndex=(ch.id+li*3)%4;
  answers.splice(correctIndex,0,{option:lesson[2],comment:fill(strings.correct,{explanation:lesson[3]})});
  const id=ch.id*100+li+1;
  questions.push({
   id,chapter:ch.id,scope:strings.chapter+" "+ch.id+" · "+ch.title,covers:[ch.id],
   intro:lesson[0],question:lesson[1],options:answers.map(a=>a.option),answer:correctIndex,
   optionComments:answers.map(a=>a.comment),
   comment:[lesson[3],fill(strings.practice,{scenario:lesson[0],principle:lesson[2]}),fill(strings.central,{overview:ch.overview})].join("\n\n")
  });
 }));
 const cfg={id:"book-business-21",locale:lang,icon:"📘",title:strings.title,subtitle:strings.subtitle,
  source:{title:strings.title,authors:"Robert T. Kiyosaki, John Fleming "+({pt:"e",en:"and",es:"y",ru:"и"}[lang])+" Kim Kiyosaki"},
  chapters:chapters.map(({id,title,part,overview})=>({id,title,part,overview})),questions};
 window.EduCashProBookQuiz.register(cfg);
 return true;
}
window.EduCashProBookQuizBooks={build,available:lang=>isValid(chaptersFor(lang)),supported:LANGS};
})();
