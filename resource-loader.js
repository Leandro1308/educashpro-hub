(function(){
  "use strict";
  const loaded=new Map(),version="20260909.2";
  function script(src){
    if(loaded.has(src))return loaded.get(src);
    const promise=new Promise((resolve,reject)=>{
      const node=document.createElement("script");
      node.src=`${src}?v=${version}`;node.async=false;node.onload=resolve;
      node.onerror=()=>reject(new Error(`asset_failed:${src}`));
      document.head.appendChild(node);
    });
    loaded.set(src,promise);return promise;
  }
  async function series(files){for(const file of files)await script(file)}
  let gamesPromise=null,coursesPromise=null;
  function loadGames(){return gamesPromise||(gamesPromise=series(["./mental-games.js","./game-suite.js","./social-play.js","./game-polish-v3.js","./extra-games-v5.js","./extra-games-fix-v6.js","./falling-blocks-v7.js"]).then(()=>{const value=window.__EDUCASHPRO_SESSION__;if(value){window.EduCashProMentalGames?.setSession?.(value);window.EduCashProGameSuite?.setSession?.(value)}}).catch(error=>{gamesPromise=null;throw error}))}
  function loadCourses(){return coursesPromise||(coursesPromise=series(["./technical-analysis-course.js"]).catch(error=>{coursesPromise=null;throw error}))}
  window.EduCashProResources={loadGames,loadCourses};
})();
