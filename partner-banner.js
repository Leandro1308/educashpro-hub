(function () {
  "use strict";
  const COPY = {
    pt:{title:"Banner da empresa",help:"Uma imagem horizontal. PNG, JPG ou WebP até 5 MB; será ajustada para 1200 × 480 px e até 250 KB.",choose:"Escolher banner",uploading:"Preparando e enviando banner…",ready:"Banner pronto. Salve a empresa para confirmar.",error:"Não foi possível enviar. A imagem anterior foi preservada. Tente PNG, JPG ou WebP até 5 MB."},
    en:{title:"Business banner",help:"One horizontal image. PNG, JPG or WebP up to 5 MB; resized to 1200 × 480 px and up to 250 KB.",choose:"Choose banner",uploading:"Preparing and uploading banner…",ready:"Banner ready. Save the business to confirm.",error:"Upload failed. The previous image was preserved. Try PNG, JPG or WebP up to 5 MB."},
    es:{title:"Banner de la empresa",help:"Una imagen horizontal. PNG, JPG o WebP hasta 5 MB; se ajusta a 1200 × 480 px y hasta 250 KB.",choose:"Elegir banner",uploading:"Preparando y enviando banner…",ready:"Banner listo. Guarda la empresa para confirmar.",error:"No se pudo enviar. Se conservó la imagen anterior. Prueba PNG, JPG o WebP hasta 5 MB."},
    ru:{title:"Баннер компании",help:"Одно горизонтальное изображение. PNG, JPG или WebP до 5 МБ; размер до 1200 × 480 пикселей и 250 КБ.",choose:"Выбрать баннер",uploading:"Подготовка и загрузка баннера…",ready:"Баннер готов. Сохраните компанию для подтверждения.",error:"Загрузка не удалась. Предыдущее изображение сохранено. Используйте PNG, JPG или WebP до 5 МБ."}
  };
  const escape = value => String(value || "").replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  async function compress(file) {
    if(!["image/jpeg","image/png","image/webp"].includes(file.type) || file.size > 5*1024*1024)throw Error("invalid_image");
    const url=URL.createObjectURL(file), image=new Image();
    try {
      await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=reject;image.src=url;});
      const w=image.naturalWidth,h=image.naturalHeight;if(!w || !h || w*h>40000000)throw Error("invalid_image");
      const canvas=document.createElement("canvas");canvas.width=1200;canvas.height=480;
      const ctx=canvas.getContext("2d");if(!ctx)throw Error("canvas");
      ctx.fillStyle="#102238";ctx.fillRect(0,0,1200,480);
      // Contain the full artwork: do not crop text out of a company's banner.
      const scale=Math.min(1200/w,480/h);ctx.drawImage(image,(1200-w*scale)/2,(480-h*scale)/2,w*scale,h*scale);
      for(const quality of [.82,.7,.55,.4]) {
        const blob=await new Promise(resolve=>canvas.toBlob(resolve,"image/webp",quality));
        if(blob && blob.size<=250*1024)return blob;
      }
      throw Error("banner_too_large");
    } finally { URL.revokeObjectURL(url); }
  }
  function attach() {
    const form=document.getElementById("submissionForm");
    if(!form || !form.querySelector("#companyName") || form.dataset.partnerBanner === "1")return;
    form.dataset.partnerBanner="1";
    form.querySelector(".partnerMediaFields")?.remove();
    form.querySelector(".partnerLogoField")?.remove();
    const copy=COPY[document.documentElement.lang.slice(0,2)]||COPY.pt;
    const hidden=(id,value)=>{let node=form.querySelector("#"+id);if(!node){node=document.createElement("input");node.type="hidden";node.id=id;form.append(node);}node.value=value;return node;};
    // Existing logo and gallery assets are retained, with no new gallery editor.
    for(const id of ["logoUrl","logoPublicId"])hidden(id,form.dataset[id]||"");
    for(const id of ["galleryUrls","galleryPublicIds"])hidden(id,JSON.parse(form.dataset[id]||"[]").join("\n"));
    const cover=hidden("coverUrl",form.dataset.coverUrl||""), publicId=hidden("coverPublicId",form.dataset.coverPublicId||"");
    const originalPublicId=publicId.value;
    const field=document.createElement("div");field.className="field fullField";
    field.innerHTML=`<label for="partnerBannerFile">${escape(copy.title)}</label><small>${escape(copy.help)}</small><img class="partnerBannerPreview" alt="" style="width:100%;max-width:600px;aspect-ratio:5/2;object-fit:contain;border-radius:12px;background:#102238" ${cover.value?`src="${escape(cover.value)}"`:"hidden"}><input id="partnerBannerFile" type="file" accept="image/png,image/jpeg,image/webp"><span class="partnerBannerStatus" role="status"></span>`;
    form.querySelector("#companyName").closest(".field").before(field);
    const input=field.querySelector("input"), status=field.querySelector(".partnerBannerStatus"), preview=field.querySelector("img"),submit=form.querySelector('[type="submit"]');
    input.setAttribute("aria-label",copy.choose);
    form.addEventListener("submit",event=>{if(input.disabled){event.preventDefault();event.stopImmediatePropagation();}},true);
    input.addEventListener("change",async()=>{
      const file=input.files?.[0];if(!file)return;submit.disabled=true;input.disabled=true;status.textContent=copy.uploading;
      const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),45000);
      try {
        const blob=await compress(file),session=window.__EDUCASHPRO_SESSION__||window.EduCashProWebEntry?.getSession?.()||{};
        const response=await fetch("https://educashpro-all.onrender.com/api/hub/logo-signature",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:session.token||""}),signal:controller.signal});
        const sign=await response.json();if(!response.ok || !sign.ok)throw Error("signature");
        const body=new FormData();body.append("file",blob,"banner.webp");
        for(const key of ["api_key","timestamp","folder","signature"])body.append(key,String(key==="api_key"?sign.apiKey:sign[key]));
        const upload=await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(sign.cloudName)}/image/upload`,{method:"POST",body,signal:controller.signal});
        const saved=await upload.json();if(!upload.ok || !saved.secure_url || !saved.public_id)throw Error("upload");
        const unusedPendingId=publicId.value;
        if(unusedPendingId && unusedPendingId !== originalPublicId && unusedPendingId !== saved.public_id) {
          fetch("https://educashpro-all.onrender.com/api/hub/media/delete",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:session.token||"",publicId:unusedPendingId})}).catch(()=>{});
        }
        cover.value=saved.secure_url;publicId.value=saved.public_id;preview.src=saved.secure_url;preview.hidden=false;status.textContent=copy.ready;
      } catch {status.textContent=copy.error;}
      finally {clearTimeout(timeout);submit.disabled=false;input.disabled=false;input.value="";}
    });
  }
  window.EduCashProPartnerBanner={attach};
})();
