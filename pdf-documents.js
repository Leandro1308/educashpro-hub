(function(){
'use strict';
const SITE='https://go.educashpro.vip';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function referralUrl(session={}){
 const code=String(session.profile?.referralCode||'').trim();
 if(code)return `${SITE}/?ref=${encodeURIComponent(code.toUpperCase())}`;
 try{const u=new URL(session.affiliateLink||'');if(u.origin===SITE&&u.searchParams.get('ref'))return `${SITE}/?ref=${encodeURIComponent(u.searchParams.get('ref'))}`;}catch{}
 return SITE+'/';
}
function footerHtml({session,language='pt'}={}){const prefix={pt:'Criado com',en:'Created with',es:'Creado con',ru:'Создано с помощью'}[language]||'Created with';return `<footer data-pdf-footer style="margin-top:24px;padding:12px;border-top:1px solid #d8e1e9;text-align:center;font:12px Arial,sans-serif;color:#536373">${prefix} <a href="${esc(referralUrl(session))}" target="_blank" rel="noopener noreferrer" style="color:#087b60;text-decoration:underline">EduCashPro</a></footer>`;}
function stamp(pdf,url){const count=pdf.internal.getNumberOfPages();for(let n=1;n<=count;n++){pdf.setPage(n);const size=pdf.internal.pageSize,w=size.getWidth(),h=size.getHeight();pdf.setFont('helvetica','normal');pdf.setFontSize(10);pdf.setTextColor(8,123,96);const name='EduCashPro',width=pdf.getTextWidth(name),x=(w-width)/2,y=h-10;pdf.text(name,x,y);pdf.link(x,y-4,width,6,{url});pdf.setFontSize(8);pdf.setTextColor(90,105,120);pdf.text(`${n} / ${count}`,w-12,y,{align:'right'});}return pdf;}
function load(){if(window.html2pdf)return Promise.resolve(window.html2pdf);if(window.__EDUCASHPRO_HTML2PDF__)return window.__EDUCASHPRO_HTML2PDF__;window.__EDUCASHPRO_HTML2PDF__=new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';s.onload=()=>{if(window.html2pdf)resolve(window.html2pdf);else{window.__EDUCASHPRO_HTML2PDF__=null;reject(Error('pdf_library_missing'));}};s.onerror=()=>{window.__EDUCASHPRO_HTML2PDF__=null;reject(Error('pdf_library_failed'));};document.head.appendChild(s);});return window.__EDUCASHPRO_HTML2PDF__;}
async function exportHtml(html,{filename='educashpro.pdf',session={},language='pt',share=false}={}){
 const html2pdf=await load(),holder=document.createElement('div');holder.style.cssText='position:fixed;left:-10000px;top:0;width:740px;background:#fff';holder.innerHTML=html;
 holder.querySelectorAll('[data-pdf-footer],.noPrint').forEach(n=>n.remove());document.body.appendChild(holder);
 try{const worker=html2pdf().set({margin:[10,10,22,10],filename,enableLinks:true,image:{type:'jpeg',quality:.96},html2canvas:{scale:2,useCORS:true},jsPDF:{unit:'mm',format:'a4',orientation:'portrait'},pagebreak:{mode:['css','legacy']}}).from(holder.firstElementChild).toPdf();const pdf=await worker.get('pdf');stamp(pdf,referralUrl(session));if(share&&navigator.share&&typeof File==='function'){const file=new File([pdf.output('blob')],filename,{type:'application/pdf'});if(navigator.canShare?.({files:[file]})){await navigator.share({files:[file],title:'EduCashPro'});return;}}pdf.save(filename);}finally{holder.remove();}
}
window.EduCashProPdf={referralUrl,footerHtml,stamp,exportHtml};
})();
