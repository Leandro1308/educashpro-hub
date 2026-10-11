(function(){
"use strict";
const engine=window.EduCashProBookQuiz;
const chapters=(window.EduCashProBookQuizChapters||[]).slice().sort((a,b)=>a.id-b.id);
if(!engine||chapters.length!==21||chapters.some((c,i)=>c.id!==i+1||!Array.isArray(c.lessons)||c.lessons.length!==12)){
  throw new Error("book_business_21_incomplete_chapters");
}
const Q=[];
chapters.forEach((ch,ci)=>{
  ch.lessons.forEach((lesson,li)=>{
    if(!Array.isArray(lesson)||lesson.length!==4||lesson.some(s=>typeof s!=="string"||s.trim().length<15)){
      throw new Error("book_business_21_invalid_lesson_"+ch.id+"_"+li);
    }
    const alternatives=[];
    const used=new Set([ci]);
    for(let shift=0;shift<3;shift++){
      let ix=(ci+4+li*3+shift*6)%chapters.length;
      while(used.has(ix))ix=(ix+1)%chapters.length;
      used.add(ix);
      const altChapter=chapters[ix],altLesson=altChapter.lessons[(li*5+shift*3)%12];
      alternatives.push({
        option:altLesson[2],
        comment:"Este é outro princípio verdadeiro, estudado no Capítulo "+altChapter.id+" — "+altChapter.title+". "+altLesson[3]+" Entretanto, ele não responde à situação específica apresentada nesta pergunta: "+lesson[1]
      });
    }
    const correct={
      option:lesson[2],
      comment:"Este é o princípio diretamente relacionado à situação descrita. "+lesson[3]
    };
    const correctIndex=(ch.id+li*3)%4;
    alternatives.splice(correctIndex,0,correct);
    Q.push({
      id:ch.id*100+li+1,
      chapter:ch.id,
      scope:"Capítulo "+ch.id+" · "+ch.title,
      covers:[ch.id],
      intro:lesson[0],
      question:lesson[1],
      options:alternatives.map(a=>a.option),
      answer:correctIndex,
      optionComments:alternatives.map(a=>a.comment),
      comment:lesson[3]+"\n\nAplicação prática: "+lesson[0]+" "+lesson[2]+"\n\nIdeia central deste capítulo: "+ch.overview
    });
  });
});
engine.register({
  id:"book-business-21",
  icon:"📘",
  title:"O Negócio do Século XXI",
  subtitle:"21 capítulos · 12 lições interativas por capítulo · 252 perguntas com explicações educativas.",
  source:{title:"O Negócio do Século XXI",authors:"Robert T. Kiyosaki, John Fleming e Kim Kiyosaki"},
  chapters:chapters.map(({id,title,part,overview})=>({id,title,part,overview})),
  questions:Q
});
})();
