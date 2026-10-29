(async function(){
'use strict';
if(location.protocol==='https:'&&'serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js?v=20261029.4').catch(()=>{});
const language=document.documentElement.lang,copy={pt:['Verificando sua assinatura…','Livros exclusivos para assinantes ativos.','Entre na sua conta para acessar os livros.','Não foi possível verificar o acesso. Tente novamente.','Minha conta e assinatura'],en:['Checking your subscription…','Books are exclusive to active subscribers.','Sign in to access the books.','Unable to verify access. Please try again.','My account and subscription'],es:['Verificando tu suscripción…','Libros exclusivos para suscriptores activos.','Inicia sesión para acceder a los libros.','No se pudo verificar el acceso. Inténtalo de nuevo.','Mi cuenta y suscripción'],ru:['Проверяем подписку…','Книги доступны только активным подписчикам.','Войдите в аккаунт, чтобы открыть книги.','Не удалось проверить доступ. Повторите попытку.','Аккаунт и подписка']}[language]||[];
const message=document.getElementById('bookAccessMessage'),link=document.getElementById('bookAccessAccount');message.textContent=copy[0];link.textContent=copy[4];link.href='../?view=area&lang='+language;
try{
 let token='';try{token=sessionStorage.getItem('educashpro:book-access-token')||JSON.parse(localStorage.getItem('educashpro:web-session')||'null')?.token||'';sessionStorage.removeItem('educashpro:book-access-token');}catch{}
 const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);let response;
 try{response=await fetch('https://educashpro-all.onrender.com/api/hub/books',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+(token||'cookie-session')},body:JSON.stringify({token,language}),cache:'no-store',signal:controller.signal});}finally{clearTimeout(timeout);}
 if(!response.ok){message.textContent=copy[response.status===401?2:response.status===403?1:3];return;}
 const data=await response.json();if(!data.ok||typeof data.html!=='string'||!data.html.startsWith('<!doctype html>'))throw Error('invalid_book_payload');
 document.open();document.write(data.html);document.close();
 document.querySelectorAll('.libraryLanguages a').forEach(link=>link.addEventListener('click',()=>{if(token)try{sessionStorage.setItem('educashpro:book-access-token',token);}catch{}}));
}catch{message.textContent=copy[3];}
})();
