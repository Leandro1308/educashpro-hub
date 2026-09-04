(function () {
  "use strict";

  const tg = window.Telegram?.WebApp;
  const params = new URL(window.location.href).searchParams;
  const apiParam = String(params.get("api") || "").replace(/\/+$/, "");
  const DEFAULT_API_BASE = "https://educashpro-all.onrender.com";
  const API_BASE = /^https:\/\//i.test(apiParam) ? apiParam : DEFAULT_API_BASE;
  const originalFetch = window.fetch.bind(window);
  let session = null;

  const COPY = {
    pt: {
      pageTitle: "Minha página de links", pageCardSub: "Reúna seus links em uma página personalizada",
      shortTitle: "Link Inteligente", shortCardSub: "Crie um endereço curto com sua chamada",
      back: "Voltar", free: "ACESSO LIVRE", loading: "Carregando…", error: "Não foi possível concluir. Tente novamente.",
      pageLead: "Crie uma página pública para reunir seus principais links e divulgar seu trabalho.", name: "Nome ou título",
      bio: "Descrição curta", slug: "Endereço personalizado", linkTitle: "Título do botão", destination: "Endereço completo",
      add: "Adicionar mais um link", save: "Salvar e publicar", saved: "Página publicada com sucesso.", copy: "Copiar endereço", share: "Compartilhar página",
      copied: "Endereço copiado.", freeLimit: "A página gratuita permite até 3 links.", proLimit: "Sua assinatura libera até 20 links.",
      hidden: "{count} links estão guardados e temporariamente ocultos. Renove para reativá-los.", unlockTitle: "Libere até 20 links",
      unlockText: "Ative sua assinatura EduCashPro para adicionar mais links e ampliar sua presença digital.", subscribe: "Ativar assinatura",
      presentation: "Conhecer o EduCashPro", later: "Agora não", responsibility: "Declaro que sou responsável pelos endereços adicionados e que não utilizarei esta ferramenta para fraude, conteúdo ilegal, páginas maliciosas ou violação de direitos de terceiros.",
      accept: "Você precisa aceitar a declaração de responsabilidade.", invalidUrl: "Use somente endereços completos iniciados por https://.",
      shortLead: "Transforme um endereço longo em um link curto com uma página transparente antes do destino.", buttonLabel: "Título do botão",
      create: "Criar Link Inteligente", myLinks: "Meus links", noLinks: "Você ainda não criou links inteligentes.", remove: "Excluir",
      continueTo: "Continuar para", officialCta: "Conheça o Marketing de Rede do EduCashPro no Telegram",
      officialButton: "Conhecer o EduCashPro", externalNotice: "O destino abaixo foi informado pelo criador deste link. O EduCashPro não controla nem endossa o conteúdo externo.",
      unavailable: "Este endereço não está disponível.", open: "Abrir", ownerCta: "Crie também sua página no EduCashPro", invalidSlug: "O endereço personalizado precisa ter pelo menos 3 caracteres.", slugInUse: "Esse endereço já está sendo usado. Escolha outro.", nameRequired: "Informe o nome ou título da página.", linkRequired: "Adicione pelo menos um link completo.", rateLimited: "Muitas tentativas em pouco tempo. Aguarde um minuto.", shareText: "Veja minha página de links no EduCashPro",
    },
    en: {
      pageTitle: "My link page", pageCardSub: "Keep your links on one personalized page", shortTitle: "Smart Link", shortCardSub: "Create a short address with your call to action", back: "Back", free: "FREE ACCESS", loading: "Loading…", error: "Unable to complete. Try again.", pageLead: "Create a public page for your main links and work.", name: "Name or title", bio: "Short description", slug: "Custom address", linkTitle: "Button title", destination: "Full address", add: "Add another link", save: "Save and publish", saved: "Page published successfully.", copy: "Copy address", share: "Share page", copied: "Address copied.", freeLimit: "The free page allows up to 3 links.", proLimit: "Your subscription unlocks up to 20 links.", hidden: "{count} links are saved and temporarily hidden. Renew to restore them.", unlockTitle: "Unlock up to 20 links", unlockText: "Activate EduCashPro to add more links and expand your digital presence.", subscribe: "Activate subscription", presentation: "Discover EduCashPro", later: "Not now", responsibility: "I am responsible for the submitted addresses and will not use this tool for fraud, illegal content, malicious pages or rights violations.", accept: "You must accept the responsibility statement.", invalidUrl: "Only complete https:// addresses are accepted.", shortLead: "Turn a long address into a short link with a transparent page before the destination.", buttonLabel: "Button title", create: "Create Smart Link", myLinks: "My links", noLinks: "You have not created smart links yet.", remove: "Delete", continueTo: "Continue to", officialCta: "Discover EduCashPro Network Marketing on Telegram", officialButton: "Discover EduCashPro", externalNotice: "The destination below was submitted by this link's creator. EduCashPro does not control or endorse external content.", unavailable: "This address is unavailable.", open: "Open", ownerCta: "Create your EduCashPro page too", invalidSlug: "The custom address must contain at least 3 characters.", slugInUse: "This address is already in use. Choose another.", nameRequired: "Enter the page name or title.", linkRequired: "Add at least one complete link.", rateLimited: "Too many attempts. Wait one minute.", shareText: "View my EduCashPro link page",
    },
    es: {
      pageTitle: "Mi página de enlaces", pageCardSub: "Reúne tus enlaces en una página personalizada", shortTitle: "Enlace Inteligente", shortCardSub: "Crea una dirección corta con tu llamada", back: "Volver", free: "ACCESO LIBRE", loading: "Cargando…", error: "No fue posible completar. Inténtalo de nuevo.", pageLead: "Crea una página pública para reunir tus enlaces y divulgar tu trabajo.", name: "Nombre o título", bio: "Descripción breve", slug: "Dirección personalizada", linkTitle: "Título del botón", destination: "Dirección completa", add: "Añadir otro enlace", save: "Guardar y publicar", saved: "Página publicada correctamente.", copy: "Copiar dirección", copied: "Dirección copiada.", freeLimit: "La página gratuita permite hasta 3 enlaces.", proLimit: "Tu suscripción libera hasta 20 enlaces.", hidden: "{count} enlaces están guardados y ocultos temporalmente. Renueva para reactivarlos.", unlockTitle: "Libera hasta 20 enlaces", unlockText: "Activa tu suscripción EduCashPro para añadir más enlaces y ampliar tu presencia digital.", subscribe: "Activar suscripción", presentation: "Conocer EduCashPro", later: "Ahora no", responsibility: "Declaro que soy responsable de las direcciones añadidas y que no usaré esta herramienta para fraude, contenido ilegal, páginas maliciosas o violación de derechos.", accept: "Debes aceptar la declaración de responsabilidad.", invalidUrl: "Usa solamente direcciones completas que comiencen con https://.", shortLead: "Convierte una dirección larga en un enlace corto con una página transparente antes del destino.", buttonLabel: "Título del botón", create: "Crear Enlace Inteligente", myLinks: "Mis enlaces", noLinks: "Aún no has creado enlaces inteligentes.", remove: "Eliminar", continueTo: "Continuar a", officialCta: "Conoce el Marketing de Red de EduCashPro en Telegram", officialButton: "Conocer EduCashPro", externalNotice: "El destino fue informado por el creador. EduCashPro no controla ni respalda el contenido externo.", unavailable: "Esta dirección no está disponible.", open: "Abrir", ownerCta: "Crea también tu página en EduCashPro",
    },
    ru: {
      pageTitle: "Моя страница ссылок", pageCardSub: "Соберите ссылки на одной странице", shortTitle: "Умная ссылка", shortCardSub: "Создайте короткий адрес с призывом", back: "Назад", free: "СВОБОДНЫЙ ДОСТУП", loading: "Загрузка…", error: "Не удалось выполнить действие. Попробуйте снова.", pageLead: "Создайте публичную страницу со своими основными ссылками.", name: "Имя или заголовок", bio: "Краткое описание", slug: "Персональный адрес", linkTitle: "Название кнопки", destination: "Полный адрес", add: "Добавить ссылку", save: "Сохранить и опубликовать", saved: "Страница опубликована.", copy: "Копировать адрес", copied: "Адрес скопирован.", freeLimit: "Бесплатная страница содержит до 3 ссылок.", proLimit: "Подписка открывает до 20 ссылок.", hidden: "Сохранено и временно скрыто ссылок: {count}. Возобновите подписку.", unlockTitle: "Откройте до 20 ссылок", unlockText: "Активируйте EduCashPro, чтобы добавить больше ссылок.", subscribe: "Активировать подписку", presentation: "Узнать об EduCashPro", later: "Не сейчас", responsibility: "Я отвечаю за добавленные адреса и не буду использовать инструмент для мошенничества, незаконного контента, вредоносных страниц или нарушения прав.", accept: "Необходимо принять заявление об ответственности.", invalidUrl: "Допускаются только полные адреса https://.", shortLead: "Преобразуйте длинный адрес в короткую ссылку с прозрачной промежуточной страницей.", buttonLabel: "Название кнопки", create: "Создать умную ссылку", myLinks: "Мои ссылки", noLinks: "У вас пока нет умных ссылок.", remove: "Удалить", continueTo: "Перейти", officialCta: "Узнайте о сетевом маркетинге EduCashPro в Telegram", officialButton: "Узнать об EduCashPro", externalNotice: "Адрес указан создателем ссылки. EduCashPro не контролирует и не одобряет внешний контент.", unavailable: "Адрес недоступен.", open: "Открыть", ownerCta: "Создайте свою страницу в EduCashPro",
    },
  };

  Object.assign(COPY.es, {
    share: "Compartir página", invalidSlug: "La dirección personalizada debe tener al menos 3 caracteres.",
    slugInUse: "Esta dirección ya está en uso. Elige otra.", nameRequired: "Indica el nombre o título de la página.",
    linkRequired: "Añade al menos un enlace completo.", rateLimited: "Demasiados intentos. Espera un minuto.",
    shareText: "Mira mi página de enlaces en EduCashPro",
  });
  Object.assign(COPY.ru, {
    share: "Поделиться страницей", invalidSlug: "Персональный адрес должен содержать не менее 3 символов.",
    slugInUse: "Этот адрес уже используется. Выберите другой.", nameRequired: "Укажите имя или заголовок страницы.",
    linkRequired: "Добавьте хотя бы одну полную ссылку.", rateLimited: "Слишком много попыток. Подождите минуту.",
    shareText: "Посмотрите мою страницу ссылок EduCashPro",
  });

  Object.assign(COPY.pt,{profilePhoto:"Foto do perfil da página",linkPhoto:"Miniatura do link",choosePhoto:"Escolher foto",removePhoto:"Remover foto",imageError:"Não foi possível enviar a imagem. Use JPG, PNG ou WebP.",imageUploading:"Enviando imagens…"});
  Object.assign(COPY.en,{profilePhoto:"Page profile photo",linkPhoto:"Link thumbnail",choosePhoto:"Choose photo",removePhoto:"Remove photo",imageError:"Could not upload the image. Use JPG, PNG or WebP.",imageUploading:"Uploading images…"});
  Object.assign(COPY.es,{profilePhoto:"Foto de perfil de la página",linkPhoto:"Miniatura del enlace",choosePhoto:"Elegir foto",removePhoto:"Eliminar foto",imageError:"No fue posible enviar la imagen. Usa JPG, PNG o WebP.",imageUploading:"Subiendo imágenes…"});
  Object.assign(COPY.ru,{profilePhoto:"Фото профиля страницы",linkPhoto:"Миниатюра ссылки",choosePhoto:"Выбрать фото",removePhoto:"Удалить фото",imageError:"Не удалось загрузить изображение. Используйте JPG, PNG или WebP.",imageUploading:"Загрузка изображений…"});

  function language() { const value = String(session?.profile?.language || params.get("lang") || "pt").toLowerCase(); return COPY[value] ? value : "pt"; }
  function text(key, values = {}) { return Object.entries(values).reduce((value, [name, item]) => value.replace(`{${name}}`, item), COPY[language()][key] || COPY.pt[key] || key); }
  function esc(value) { return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]); }
  function content() { return document.getElementById("content"); }
  function active() { return session?.profile?.active === true; }
  function home() { document.querySelector('#bottomNav button[data-view="home"]')?.click(); }
  function validUrl(value) { try { const url = new URL(String(value)); return url.protocol === "https:"; } catch { return false; } }
  function slugify(value) { return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40); }
  function pageSlug(value, pageName) {
    const raw = String(value || "").trim().replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 160);
    return (raw || slugify(pageName)).normalize("NFC");
  }
  function requestMessage(error) {
    const reason = String(error?.message || "");
    const map = { invalid_slug: "invalidSlug", slug_in_use: "slugInUse", name_required: "nameRequired", link_required: "linkRequired", invalid_link: "invalidUrl", responsibility_required: "accept", rate_limited: "rateLimited" };
    return text(map[reason] || "error");
  }
  function openUrl(url) { if (!url) return; if (/^https:\/\/t\.me\//i.test(url) && tg?.openTelegramLink) return tg.openTelegramLink(url); if (tg?.openLink) return tg.openLink(url); window.location.assign(url); }
  function toast(message) { const node = document.getElementById("toast"); if (!node) return; node.textContent = message; node.classList.add("show"); setTimeout(() => node.classList.remove("show"), 2300); }

  async function copyText(value) {
    const textValue = String(value || "");
    try {
      if (!navigator.clipboard?.writeText) throw new Error("clipboard_unavailable");
      await navigator.clipboard.writeText(textValue);
    } catch {
      const field = document.createElement("textarea");
      field.value = textValue;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    toast(text("copied"));
  }

  async function sharePage(url, title) {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: text("shareText"), url });
        return;
      } catch (error) {
        if (error?.name === "AbortError") return;
      }
    }
    const telegramShare = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text("shareText"))}`;
    if (tg?.openTelegramLink) {
      tg.openTelegramLink(telegramShare);
      return;
    }
    await copyText(url);
  }

  function publishedMarkup(url) {
    return `<strong>${esc(text("saved"))}</strong><a class="publishedUrl" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(url)}</a><div class="cardActions"><button id="copyPublished" class="secondaryButton">${esc(text("copy"))}</button><button id="sharePublished" class="primaryButton">${esc(text("share"))}</button></div>`;
  }

  function bindPublishedActions(url, title) {
    document.getElementById("copyPublished")?.addEventListener("click", () => copyText(url));
    document.getElementById("sharePublished")?.addEventListener("click", () => sharePage(url, title));
  }

  function showPublishedLink(url, title) {
    const target = document.getElementById("publishedLink");
    if (!target) return;
    target.className = "publishedLink";
    target.innerHTML = publishedMarkup(url);
    bindPublishedActions(url, title);
  }

  async function api(path, body, publicRequest = false) { const response = await originalFetch(`${API_BASE}${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), cache: publicRequest ? "default" : "no-store" }); const data = await response.json().catch(() => ({})); if (!response.ok || data?.ok === false) throw new Error(data?.reason || "REQUEST"); return data; }
  async function compressImage(file, maxSize) {
    if (!file || !/^image\/(jpeg|png|webp)$/i.test(file.type) || file.size > 8 * 1024 * 1024) throw new Error("IMAGE");
    const bitmap = await createImageBitmap(file), scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas"); canvas.width = Math.max(1, Math.round(bitmap.width * scale)); canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height); bitmap.close?.();
    return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("IMAGE")), "image/webp", .82));
  }
  async function uploadPageImage(file, maxSize) {
    const sign = await api("/api/hub/link-page/media-signature", { token: session?.token }), blob = await compressImage(file, maxSize), form = new FormData();
    form.append("file", blob, "image.webp"); form.append("api_key", sign.apiKey); form.append("timestamp", String(sign.timestamp)); form.append("folder", sign.folder); form.append("signature", sign.signature);
    const response = await originalFetch(`https://api.cloudinary.com/v1_1/${sign.cloudName}/image/upload`, { method: "POST", body: form }), data = await response.json().catch(() => ({}));
    if (!response.ok || !data.secure_url || !data.public_id) throw new Error("IMAGE");
    return { url: data.secure_url, publicId: data.public_id };
  }
  function imagePicker(label, kind, media) {
    const value = media?.url || "", publicId = media?.publicId || "";
    return `<div class="imagePicker" data-image-kind="${kind}" data-image-url="${esc(value)}" data-image-public-id="${esc(publicId)}"><span>${esc(label)}</span><div class="imagePreview">${value ? `<img src="${esc(value)}" alt="">` : `<div>📷</div>`}</div><label class="secondaryButton imageChoose">${esc(text("choosePhoto"))}<input type="file" accept="image/jpeg,image/png,image/webp" hidden data-image-input></label><button type="button" class="textButton imageRemove">${esc(text("removePhoto"))}</button></div>`;
  }

  function field(label, id, value = "", extra = "") { return `<div class="field"><label for="${id}">${esc(label)}</label><input id="${id}" value="${esc(value)}" ${extra}></div>`; }
  function responsibility() { return `<label class="linkResponsibility"><input id="linkResponsibility" type="checkbox"> <span>${esc(text("responsibility"))}</span></label>`; }
  function publicUrl(kind, code) { const url = new URL("https://go.educashpro.vip/"); url.searchParams.set(kind, String(code || "")); return url.toString(); }

  function showUpgrade() {
    const modal = document.getElementById("accessModal");
    document.getElementById("modalIcon").textContent = "✨";
    document.getElementById("modalTitle").textContent = text("unlockTitle");
    document.getElementById("modalDescription").textContent = text("unlockText");
    document.getElementById("modalLearning").innerHTML = "";
    const subscribe = document.getElementById("modalSubscribe"); subscribe.textContent = text("subscribe"); subscribe.onclick = () => openUrl(session?.subscribeUrl || session?.botUrl);
    const cancel = modal.querySelector(".modalCancel"); cancel.textContent = text("presentation"); cancel.onclick = () => { modal.classList.add("hidden"); window.EduCashProApp?.renderPresentation?.(); };
    modal.classList.remove("hidden");
  }

  async function renderPageEditor() {
    content().innerHTML = `<button id="linkBack" class="textButton">← ${esc(text("back"))}</button><section class="hero"><span class="eyebrow">${esc(text("free"))}</span><h1>🔗 ${esc(text("pageTitle"))}</h1><p>${esc(text("pageLead"))}</p></section><div class="empty">${esc(text("loading"))}</div>`;
    document.getElementById("linkBack").onclick = home;
    try {
      const data = await api("/api/hub/link-page", { token: session?.token });
      renderPageForm(data.page || {});
    } catch { renderPageForm({}); }
  }

  function renderPageForm(page) {
    const limit = active() ? 20 : 3;
    const storedLinks = Array.isArray(page.links) ? page.links.slice(0, 20) : [];
    const visibleLinks = storedLinks.slice(0, limit);
    while (visibleLinks.length < Math.min(limit, 3)) visibleLinks.push({ title: "", url: "" });
    const savedUrl = page.slug ? publicUrl("page", page.slug) : "";
    content().innerHTML = `<button id="linkBack" class="textButton">← ${esc(text("back"))}</button><section class="hero"><span class="eyebrow">${esc(active() ? text("proLimit") : text("freeLimit"))}</span><h1>🔗 ${esc(text("pageTitle"))}</h1><p>${esc(text("pageLead"))}</p></section><article class="toolCard linkEditor">${imagePicker(text("profilePhoto"), "profile", page.profileImage)}${field(text("name"), "linkName", page.name || session?.profile?.firstName || "", 'maxlength="70"')}${field(text("bio"), "linkBio", page.bio || "", 'maxlength="180"')}${field(text("slug"), "linkSlug", page.slug || "", 'maxlength="160" inputmode="url" autocomplete="off" spellcheck="false"')}<div id="linkRows" class="linkRows">${visibleLinks.map(linkRow).join("")}</div><button id="addLinkRow" class="secondaryButton linkAdd" type="button">＋ ${esc(text("add"))}</button>${!active() && storedLinks.length > 3 ? `<p class="notice">${esc(text("hidden", { count: storedLinks.length - 3 }))}</p>` : ""}${responsibility()}<button id="saveLinkPage" class="wideButton" type="button">${esc(text("save"))}</button><div id="publishedLink" class="${savedUrl ? "publishedLink" : "hidden"}">${savedUrl ? publishedMarkup(savedUrl) : ""}</div></article>`;
    document.getElementById("linkBack").onclick = home;
    document.getElementById("addLinkRow").onclick = () => { const rows = document.querySelectorAll(".linkRow"); if (rows.length >= limit) return showUpgrade(); document.getElementById("linkRows").insertAdjacentHTML("beforeend", linkRow({})); bindRowButtons(); };
    bindRowButtons();
    bindImagePickers();
    if (savedUrl) bindPublishedActions(savedUrl, page.name || session?.profile?.firstName || text("pageTitle"));
    document.getElementById("saveLinkPage").onclick = async () => {
      if (!document.getElementById("linkResponsibility").checked) return toast(text("accept"));
      const rows = [...document.querySelectorAll(".linkRow")];
      const edited = rows.map((row) => ({ title: row.querySelector("[data-link-title]").value.trim(), url: row.querySelector("[data-link-url]").value.trim(), row })).filter((link) => link.title || link.url);
      const pageName = document.getElementById("linkName").value.trim();
      if (!pageName) return toast(text("nameRequired"));
      if (!edited.length) return toast(text("linkRequired"));
      if (edited.some((link) => !link.title || !validUrl(link.url))) return toast(text("invalidUrl"));
      try {
        const saveButton = document.getElementById("saveLinkPage"); saveButton.disabled = true; saveButton.textContent = text("imageUploading");
        const profilePicker = document.querySelector('[data-image-kind="profile"]');
        let profileImage = profilePicker?.dataset.imageUrl ? { url: profilePicker.dataset.imageUrl, publicId: profilePicker.dataset.imagePublicId } : null;
        const profileFile = profilePicker?.querySelector("[data-image-input]")?.selectedFile;
        if (profileFile) profileImage = await uploadPageImage(profileFile, 640);
        const prepared = [];
        for (const item of edited) {
          const picker = item.row.querySelector('[data-image-kind="link"]');
          let thumbnail = picker?.dataset.imageUrl ? { url: picker.dataset.imageUrl, publicId: picker.dataset.imagePublicId } : null;
          const file = picker?.querySelector("[data-image-input]")?.selectedFile;
          if (file) thumbnail = await uploadPageImage(file, 192);
          prepared.push({ title: item.title, url: item.url, thumbnail });
        }
        const links = active() ? prepared : [...prepared.slice(0, 3), ...storedLinks.slice(3)];
        const normalizedSlug = pageSlug(document.getElementById("linkSlug").value, pageName);
        document.getElementById("linkSlug").value = normalizedSlug;
        const data = await api("/api/hub/link-page/save", { token: session?.token, page: { name: pageName, bio: document.getElementById("linkBio").value.trim(), slug: normalizedSlug, profileImage, links }, acceptedResponsibility: true });
        const slug = data.page?.slug || data.slug; const url = data.publicUrl || publicUrl("page", slug);
        showPublishedLink(url, pageName);
      } catch (error) { toast(error?.message === "IMAGE" ? text("imageError") : requestMessage(error)); }
      finally { const button = document.getElementById("saveLinkPage"); if (button) { button.disabled = false; button.textContent = text("save"); } }
    };
  }

  function linkRow(link) { return `<div class="linkRow">${imagePicker(text("linkPhoto"), "link", link.thumbnail)}${field(text("linkTitle"), "", link.title || "", 'data-link-title maxlength="60"')}${field(text("destination"), "", link.url || "", 'data-link-url type="url" inputmode="url" placeholder="https://"')}<button class="linkRemove" type="button" aria-label="${esc(text("remove"))}">✕</button></div>`; }
  function bindImagePickers(root = document) { root.querySelectorAll(".imagePicker").forEach((picker) => { if (picker.dataset.bound) return; picker.dataset.bound = "1"; const input = picker.querySelector("[data-image-input]"), preview = picker.querySelector(".imagePreview"); input.onchange = () => { const file = input.files?.[0]; if (!file) return; if (!/^image\/(jpeg|png|webp)$/i.test(file.type) || file.size > 8 * 1024 * 1024) { input.value = ""; return toast(text("imageError")); } input.selectedFile = file; preview.innerHTML = `<img src="${esc(URL.createObjectURL(file))}" alt="">`; }; picker.querySelector(".imageRemove").onclick = () => { input.value = ""; input.selectedFile = null; picker.dataset.imageUrl = ""; picker.dataset.imagePublicId = ""; preview.innerHTML = "<div>📷</div>"; }; }); }
  function bindRowButtons() { document.querySelectorAll(".linkRemove").forEach((button) => button.onclick = () => button.closest(".linkRow")?.remove()); bindImagePickers(document.getElementById("linkRows")); }

  async function renderShortener() {
    content().innerHTML = `<button id="shortBack" class="textButton">← ${esc(text("back"))}</button><section class="hero"><span class="eyebrow">${esc(text("free"))}</span><h1>✂️ ${esc(text("shortTitle"))}</h1><p>${esc(text("shortLead"))}</p></section><article class="toolCard linkEditor">${field(text("destination"), "shortDestination", "", 'type="url" inputmode="url" placeholder="https://"')}${field(text("buttonLabel"), "shortLabel", "", 'maxlength="60"')}${responsibility()}<button id="createShort" class="wideButton">${esc(text("create"))}</button></article><section class="sectionHead"><div><h2>${esc(text("myLinks"))}</h2></div></section><div id="shortList" class="cardList"><div class="empty">${esc(text("loading"))}</div></div>`;
    document.getElementById("shortBack").onclick = home;
    document.getElementById("createShort").onclick = createShort;
    loadShorts();
  }

  async function createShort() {
    const destination = document.getElementById("shortDestination").value.trim(); const label = document.getElementById("shortLabel").value.trim();
    if (!document.getElementById("linkResponsibility").checked) return toast(text("accept"));
    if (!validUrl(destination) || !label) return toast(text("invalidUrl"));
    try { await api("/api/hub/short-links/create", { token: session?.token, destination, label, acceptedResponsibility: true }); toast(text("saved")); renderShortener(); } catch { toast(text("error")); }
  }
  async function loadShorts() {
    const target = document.getElementById("shortList");
    try { const data = await api("/api/hub/short-links", { token: session?.token }); const items = Array.isArray(data.items) ? data.items : []; target.innerHTML = items.length ? items.map((item) => `<article class="itemCard"><div class="itemTop"><div class="itemIcon">✂️</div><div><h3>${esc(item.label)}</h3><p>${esc(item.publicUrl || publicUrl("go", item.code))}</p></div></div><div class="cardActions"><button class="secondaryButton" data-copy-short="${esc(item.publicUrl || publicUrl("go", item.code))}">${esc(text("copy"))}</button><button class="secondaryButton" data-remove-short="${esc(item.id || item.code)}">🗑️ ${esc(text("remove"))}</button></div></article>`).join("") : `<div class="empty">${esc(text("noLinks"))}</div>`; target.querySelectorAll("[data-copy-short]").forEach((button) => button.onclick = () => copyText(button.dataset.copyShort)); target.querySelectorAll("[data-remove-short]").forEach((button) => button.onclick = async () => { await api("/api/hub/short-links/delete", { token: session?.token, id: button.dataset.removeShort }); loadShorts(); }); } catch { target.innerHTML = `<div class="empty error">${esc(text("error"))}</div>`; }
  }

  async function bootPublic(searchParams) {
    const slug = searchParams.get("page"); const code = searchParams.get("go");
    if (!slug && !code) return false;
    document.getElementById("closeButton")?.classList.add("hidden"); document.getElementById("bottomNav")?.classList.add("hidden");
    content().innerHTML = `<section class="splash"><div class="splashLogo">E</div><h1>EduCashPro</h1><p>${esc(text("loading"))}</p></section>`;
    try {
      if (slug) renderPublicPage((await api("/api/public/link-page", { slug, language: language() }, true)).page);
      else renderPublicShort((await api("/api/public/short-link", { code, language: language() }, true)).link);
    } catch { content().innerHTML = `<section class="publicLinkShell"><div class="publicBrand">E</div><h1>${esc(text("unavailable"))}</h1></section>`; }
    return true;
  }
  function renderPublicPage(page) {
    if (!page) throw new Error("NOT_FOUND");
    const links = Array.isArray(page.links) ? page.links : [];
    content().innerHTML = `<section class="publicLinkShell"><div class="publicAvatar">${page.profileImage?.url ? `<img src="${esc(page.profileImage.url)}" alt="${esc(page.name)}">` : esc(String(page.name || "E").slice(0, 1).toUpperCase())}</div><h1>${esc(page.name)}</h1><p>${esc(page.bio || "")}</p><div class="publicButtons">${links.map((link) => `<button data-public-url="${esc(link.url)}">${link.thumbnail?.url ? `<img src="${esc(link.thumbnail.url)}" alt="">` : ""}<span>${esc(link.title)}</span></button>`).join("")}</div><button id="publicAffiliate" class="publicAffiliate">✨ ${esc(page.affiliateCtaLabel || text("ownerCta"))}</button><small>EduCashPro</small></section>`;
    content().querySelectorAll("[data-public-url]").forEach((button) => button.onclick = () => openUrl(button.dataset.publicUrl)); document.getElementById("publicAffiliate").onclick = () => openUrl(page.affiliateUrl || page.officialUrl);
  }
  function renderPublicShort(link) {
    if (!link || !validUrl(link.destination)) throw new Error("NOT_FOUND");
    content().innerHTML = `<section class="publicLinkShell publicShort"><div class="publicBrand">E</div><span class="eyebrow">EDUCASHPRO</span><h1>${esc(text("officialCta"))}</h1><p>${esc(text("externalNotice"))}</p><button id="shortDestinationButton" class="publicDestination">${esc(link.label || text("continueTo"))}</button><button id="shortAffiliateButton" class="publicAffiliate">✨ ${esc(text("officialButton"))}</button></section>`;
    document.getElementById("shortDestinationButton").onclick = () => openUrl(link.destination); document.getElementById("shortAffiliateButton").onclick = () => openUrl(link.affiliateUrl || link.officialUrl);
  }

  window.fetch = async function (...args) { const response = await originalFetch(...args); try { const url = typeof args[0] === "string" ? args[0] : args[0]?.url || ""; if (/\/api\/hub\/session$/.test(url)) { const data = await response.clone().json(); if (data?.ok) session = data; } } catch {} return response; };
  window.EduCashProLinks = { text, renderPageEditor, renderShortener, bootPublic };
})();
