(function(){
  'use strict';
  const LABELS={
    pt:{home:'⌂ Início',tip:'Voltar ao menu principal'},
    en:{home:'⌂ Home',tip:'Return to the main menu'},
    es:{home:'⌂ Inicio',tip:'Volver al menú principal'},
    ru:{home:'⌂ Главная',tip:'Вернуться в главное меню'}
  };
  const root=document.documentElement;
  function translation(){
    const lang=window.EduCashProLocale?.resolve() || 'en';
    return LABELS[lang]||LABELS.en;
  }
  function open(){
    const app=window.EduCashProApp;
    if(window.matchMedia('(min-width:900px)').matches){
      if(root.dataset.ecpAuth==='1')app?.renderHome?.();
      return;
    }
    if(app?.renderArea)app.renderArea();
    else window.EduCashProWebEntry?.open?.();
  }
  function sync(view,profile){
    if(view)root.dataset.ecpView=view;
    if(profile!==undefined)root.dataset.ecpAuth=(profile?.userId||profile?.tgId)?'1':'0';
    const button=document.getElementById('webSiteMenuButton');
    if(!button)return;
    const c=translation();
    if(window.matchMedia('(min-width:900px)').matches){
      button.textContent=c.home;
      button.title=c.tip;
      button.setAttribute('aria-label',c.tip);
    } else {
      button.textContent='☰';
      button.title=c.tip;
      button.setAttribute('aria-label',c.tip);
    }
  }
  function boot(){
    const bar=document.querySelector('.topbar');
    if(!bar)return;
    if(!document.getElementById('webSiteMenuButton')){
      const b=document.createElement('button');
      b.id='webSiteMenuButton';b.className='iconButton';b.type='button';
      b.onclick=open;bar.appendChild(b);
    }
    sync();
  }
  function close(){}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
  window.addEventListener('resize',()=>sync(),{passive:true});
  window.EduCashProSiteMenu={open,close,sync};
})();
