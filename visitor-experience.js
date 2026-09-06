(function () {
  const tg = window.Telegram?.WebApp;
  const originalFetch = window.fetch.bind(window);
  const apiBaseFromUrl = String(new URL(window.location.href).searchParams.get("api") || "").replace(/\/+$/, "");
  const API_BASE = /^https:\/\//i.test(apiBaseFromUrl) ? apiBaseFromUrl : "https://educashpro-all.onrender.com";

  const visitorState = {
    session: null,
    partnerItems: [],
    loadingShowcase: false,
  };

  const COPY = {
    pt: {
      lockTitle: "ÁREA EXCLUSIVA PARA ASSINANTES",
      lockText: "Ative sua assinatura para acessar cursos exclusivos, grupos, bots, canais, benefícios e os detalhes completos das empresas parceiras.",
      subscribe: "ATIVAR ASSINATURA",
      close: "Agora não",
      tools: "Ferramentas",
      toolsSub: "Sorteadores locais com acesso livre",
      partnersTitle: "Empresas parceiras",
      partnersText: "Conheça empresas que já fazem parte do EduCashPro. Descontos, condições, endereços e contatos são exclusivos para assinantes ativos.",
      noPartners: "Novas empresas parceiras aparecerão aqui.",
      partnerLock: "Os detalhes desta empresa são exclusivos para assinantes ativos.",
      logo: "Logotipo da empresa",
      logoHelp: "Envie PNG, JPG ou WebP. A imagem será reduzida automaticamente para até 400 × 400 px.",
      logoChoose: "Escolher imagem",
      logoUploading: "Enviando logotipo…",
      logoReady: "Logotipo pronto.",
      logoError: "Não foi possível enviar o logotipo. Você ainda pode salvar a empresa sem imagem.",
      logoConfig: "Upload de logotipo ainda não configurado pelo administrador.",
      descHelp: "Descreva a empresa e os principais serviços oferecidos.",
      rulesHelp: "Explique claramente as condições do benefício ou desconto.",
    },
    en: {
      lockTitle: "SUBSCRIBERS-ONLY AREA",
      lockText: "Activate your subscription to access exclusive courses, groups, bots, channels, benefits and full partner company details.",
      subscribe: "ACTIVATE SUBSCRIPTION",
      close: "Not now",
      tools: "Tools",
      toolsSub: "Free local randomizers",
      partnersTitle: "Partner companies",
      partnersText: "See companies already in EduCashPro. Discounts, conditions, addresses and contacts are exclusive to active subscribers.",
      noPartners: "New partner companies will appear here.",
      partnerLock: "This company's details are exclusive to active subscribers.",
      logo: "Company logo",
      logoHelp: "Upload PNG, JPG or WebP. The image will be resized automatically to a maximum of 400 × 400 px.",
      logoChoose: "Choose image",
      logoUploading: "Uploading logo…",
      logoReady: "Logo ready.",
      logoError: "The logo could not be uploaded. You can still save the company without an image.",
      logoConfig: "Logo upload has not been configured by the administrator yet.",
      descHelp: "Describe the company and its main services.",
      rulesHelp: "Clearly explain the benefit or discount conditions.",
    },
    es: {
      lockTitle: "ÁREA EXCLUSIVA PARA SUSCRIPTORES",
      lockText: "Activa tu suscripción para acceder a cursos exclusivos, grupos, bots, canales, beneficios y los datos completos de las empresas asociadas.",
      subscribe: "ACTIVAR SUSCRIPCIÓN",
      close: "Ahora no",
      tools: "Herramientas",
      toolsSub: "Sorteadores locales de acceso libre",
      partnersTitle: "Empresas asociadas",
      partnersText: "Conoce empresas que ya forman parte de EduCashPro. Descuentos, condiciones, direcciones y contactos son exclusivos para suscriptores activos.",
      noPartners: "Las nuevas empresas asociadas aparecerán aquí.",
      partnerLock: "Los detalles de esta empresa son exclusivos para suscriptores activos.",
      logo: "Logotipo de la empresa",
      logoHelp: "Envía PNG, JPG o WebP. La imagen se reducirá automáticamente hasta 400 × 400 px.",
      logoChoose: "Elegir imagen",
      logoUploading: "Enviando logotipo…",
      logoReady: "Logotipo listo.",
      logoError: "No fue posible enviar el logotipo. Aún puedes guardar la empresa sin imagen.",
      logoConfig: "La carga de logotipos aún no ha sido configurada por el administrador.",
      descHelp: "Describe la empresa y sus principales servicios.",
      rulesHelp: "Explica claramente las condiciones del beneficio o descuento.",
    },
    ru: {
      lockTitle: "РАЗДЕЛ ТОЛЬКО ДЛЯ ПОДПИСЧИКОВ",
      lockText: "Активируйте подписку, чтобы получить доступ к эксклюзивным курсам, группам, ботам, каналам, преимуществам и полной информации о партнёрах.",
      subscribe: "АКТИВИРОВАТЬ ПОДПИСКУ",
      close: "Не сейчас",
      tools: "Инструменты",
      toolsSub: "Бесплатная локальная жеребьёвка",
      partnersTitle: "Компании-партнёры",
      partnersText: "Посмотрите компании, уже участвующие в EduCashPro. Скидки, условия, адреса и контакты доступны только активным подписчикам.",
      noPartners: "Новые компании-партнёры появятся здесь.",
      partnerLock: "Подробная информация об этой компании доступна только активным подписчикам.",
      logo: "Логотип компании",
      logoHelp: "Загрузите PNG, JPG или WebP. Изображение автоматически уменьшится до 400 × 400 пикселей.",
      logoChoose: "Выбрать изображение",
      logoUploading: "Загрузка логотипа…",
      logoReady: "Логотип готов.",
      logoError: "Не удалось загрузить логотип. Компанию можно сохранить без изображения.",
      logoConfig: "Загрузка логотипов ещё не настроена администратором.",
      descHelp: "Опишите компанию и её основные услуги.",
      rulesHelp: "Чётко укажите условия преимущества или скидки.",
    },
  };

  function language() {
    const value = String(visitorState.session?.profile?.language || "pt").toLowerCase();
    return COPY[value] ? value : "pt";
  }
  function tr(key) { return COPY[language()][key] || COPY.pt[key] || key; }
  function escapeHtml(value) { return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]); }
  function isVisitor() { return visitorState.session && visitorState.session.profile?.active !== true; }

  window.fetch = async function (...args) {
    const response = await originalFetch(...args);
    try {
      const url = typeof args[0] === "string" ? args[0] : args[0]?.url || "";
      if (/\/api\/hub\/(session|partners)$/.test(url)) {
        const data = await response.clone().json();
        if (url.endsWith("/session") && data?.ok) visitorState.session = data;
        if (url.endsWith("/partners") && data?.ok && Array.isArray(data.items)) visitorState.partnerItems = data.items;
        queueMicrotask(enhance);
      }
    } catch {}
    return response;
  };

  function openSubscription() {
    const url = String(visitorState.session?.subscribeUrl || visitorState.session?.botUrl || "").trim();
    if (!url) return;
    if (/^https:\/\/t\.me\//i.test(url) && tg?.openTelegramLink) return tg.openTelegramLink(url);
    if (tg?.openLink) return tg.openLink(url);
    window.open(url, "_blank", "noopener");
  }

  function showLock(message) {
    const modal = document.getElementById("accessModal");
    if (!modal) return openSubscription();
    const icon = document.getElementById("modalIcon");
    const title = document.getElementById("modalTitle");
    const description = document.getElementById("modalDescription");
    const list = document.getElementById("modalLearning");
    const subscribe = document.getElementById("modalSubscribe");
    const cancel = modal.querySelector(".modalCancel");
    if (icon) icon.textContent = "🔒";
    if (title) title.textContent = tr("lockTitle");
    if (description) description.textContent = message || tr("lockText");
    if (list) list.innerHTML = "";
    if (subscribe) { subscribe.textContent = `⚡ ${tr("subscribe")}`; subscribe.onclick = openSubscription; }
    if (cancel) cancel.textContent = tr("close");
    modal.classList.remove("hidden");
  }

  function bindVisitorNavigation() {
    if (!isVisitor()) return;
    document.querySelectorAll('#bottomNav button[data-view="explore"]').forEach((button) => {
      if (button.dataset.visitorLocked === "1") return;
      button.dataset.visitorLocked = "1";
      button.addEventListener("click", (event) => {
        if (!isVisitor()) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        showLock();
      }, true);
    });
  }

  function enhanceVisitorHome() {
    if (!isVisitor()) return;
    const content = document.getElementById("content");
    const intro = content?.querySelector("#openPresentation");
    const grid = intro?.parentElement?.querySelector(".quickGrid");
    if (!grid) return;

    grid.querySelectorAll("[data-locked-experience]").forEach((button) => {
      if (button.dataset.visitorModal === "1") return;
      button.dataset.visitorModal = "1";
      button.addEventListener("click", (event) => {
        if (!isVisitor()) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        showLock();
      }, true);
    });

  }

  async function loadVisitorPartners() {
    if (!isVisitor() || visitorState.loadingShowcase || !visitorState.session?.token) return;
    visitorState.loadingShowcase = true;
    const target = document.getElementById("visitorPartnerGrid");
    try {
      const response = await originalFetch(`${API_BASE}/api/hub/partners`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: visitorState.session.token, page: 1 }),
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.reason || "partners");
      visitorState.partnerItems = Array.isArray(data.items) ? data.items : [];
      if (!target) return;
      target.innerHTML = visitorState.partnerItems.length
        ? visitorState.partnerItems.map((item) => partnerTile(item)).join("")
        : `<div class="visitorPartnerEmpty">${escapeHtml(tr("noPartners"))}</div>`;
      target.querySelectorAll("[data-visitor-partner]").forEach((button) => button.onclick = () => showLock(tr("partnerLock")));
    } catch {
      if (target) target.innerHTML = `<div class="visitorPartnerEmpty">${escapeHtml(tr("noPartners"))}</div>`;
    } finally {
      visitorState.loadingShowcase = false;
    }
  }

  function initials(name) {
    return String(name || "E").split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  }

  function partnerTile(item) {
    const logo = item.logoUrl
      ? `<img src="${escapeHtml(item.logoUrl)}" alt="" loading="lazy" referrerpolicy="no-referrer">`
      : `<span>${escapeHtml(initials(item.companyName))}</span>`;
    return `<button type="button" class="visitorPartnerTile" data-visitor-partner="${escapeHtml(item.id)}"><span class="visitorPartnerLogo">${logo}</span><strong>${escapeHtml(item.companyName)}</strong><small>🔒</small></button>`;
  }

  function enhancePartnerCards() {
    if (!visitorState.partnerItems.length) return;
    document.querySelectorAll(".partnerCard").forEach((card) => {
      if (card.dataset.logoEnhanced === "1") return;
      const name = card.querySelector("h3")?.textContent?.trim();
      const item = visitorState.partnerItems.find((candidate) => candidate.companyName === name);
      if (!item?.logoUrl) return;
      const icon = card.querySelector(".itemIcon");
      if (!icon) return;
      icon.classList.add("partnerLogoIcon");
      icon.innerHTML = `<img src="${escapeHtml(item.logoUrl)}" alt="" loading="lazy" referrerpolicy="no-referrer">`;
      card.dataset.logoEnhanced = "1";
    });
  }

  function addCounter(textarea, helpText) {
    if (!textarea || textarea.dataset.counterReady === "1") return;
    textarea.dataset.counterReady = "1";
    textarea.maxLength = 800;
    const help = document.createElement("div");
    help.className = "fieldAssist";
    const hint = document.createElement("span");
    hint.textContent = helpText;
    const counter = document.createElement("span");
    const update = () => { counter.textContent = `${textarea.value.length} / 800`; };
    textarea.addEventListener("input", update);
    update();
    help.append(hint, counter);
    textarea.closest(".field")?.appendChild(help);
  }

  function resizeLogo(file) {
    return new Promise((resolve, reject) => {
      const objectUrl = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => {
        try {
          const max = 400;
          const scale = Math.min(1, max / Math.max(image.naturalWidth, image.naturalHeight));
          const width = Math.max(1, Math.round(image.naturalWidth * scale));
          const height = Math.max(1, Math.round(image.naturalHeight * scale));
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const context = canvas.getContext("2d", { alpha: true });
          context.drawImage(image, 0, 0, width, height);
          URL.revokeObjectURL(objectUrl);
          canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("encode")), "image/webp", 0.82);
        } catch (error) { URL.revokeObjectURL(objectUrl); reject(error); }
      };
      image.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error("image")); };
      image.src = objectUrl;
    });
  }

  async function uploadPartnerLogo(file, ui) {
    const allowed = new Set(["image/png", "image/jpeg", "image/webp"]);
    if (!allowed.has(file.type) || file.size > 5 * 1024 * 1024) throw new Error("invalid_file");
    ui.status.textContent = tr("logoUploading");
    ui.submit.disabled = true;
    const optimized = await resizeLogo(file);
    const signatureResponse = await originalFetch(`${API_BASE}/api/hub/logo-signature`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: visitorState.session?.token || "" }),
      cache: "no-store",
    });
    const signatureData = await signatureResponse.json().catch(() => ({}));
    if (!signatureResponse.ok) {
      if (signatureData?.reason === "logo_upload_not_configured") throw new Error("not_configured");
      throw new Error(signatureData?.reason || "signature");
    }
    const form = new FormData();
    form.append("file", optimized, "logo.webp");
    form.append("api_key", signatureData.apiKey);
    form.append("timestamp", String(signatureData.timestamp));
    form.append("folder", signatureData.folder);
    form.append("signature", signatureData.signature);
    const uploadResponse = await originalFetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(signatureData.cloudName)}/image/upload`, { method: "POST", body: form });
    const uploaded = await uploadResponse.json().catch(() => ({}));
    if (!uploadResponse.ok || !uploaded.secure_url) throw new Error("upload");
    const previousPublicId = ui.publicId?.value || "";
    ui.logoUrl.value = uploaded.secure_url;
    if (ui.publicId) ui.publicId.value = uploaded.public_id || "";
    if (previousPublicId && previousPublicId !== uploaded.public_id) {
      originalFetch(`${API_BASE}/api/hub/media/delete`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: visitorState.session?.token || "", publicId: previousPublicId }), cache: "no-store" }).catch(() => {});
    }
    ui.preview.innerHTML = `<img src="${escapeHtml(uploaded.secure_url)}" alt="">`;
    ui.preview.classList.add("ready");
    ui.status.textContent = tr("logoReady");
  }

  function enhancePartnerForm() {
    const form = document.getElementById("submissionForm");
    const companyName = document.getElementById("companyName");
    if (!form || !companyName || form.dataset.partnerEnhanced === "1") return;
    form.dataset.partnerEnhanced = "1";

    const description = document.getElementById("description");
    const rules = document.getElementById("discountRules");
    if (description) description.rows = 7;
    if (rules) rules.rows = 8;
    addCounter(description, tr("descHelp"));
    addCounter(rules, tr("rulesHelp"));

    const field = document.createElement("div");
    field.className = "field fullField partnerLogoField";
    field.innerHTML = `<label>${escapeHtml(tr("logo"))}</label><div class="partnerLogoUpload"><div class="partnerLogoPreview"><span>🏪</span></div><div class="partnerLogoControls"><label class="secondaryButton partnerLogoButton">${escapeHtml(tr("logoChoose"))}<input id="partnerLogoFile" type="file" accept="image/png,image/jpeg,image/webp" hidden></label><small>${escapeHtml(tr("logoHelp"))}</small><span class="partnerLogoStatus"></span></div></div><input id="logoUrl" type="hidden" value=""><input id="logoPublicId" type="hidden" value="">`;
    companyName.closest(".field")?.insertAdjacentElement("beforebegin", field);

    const fileInput = field.querySelector("#partnerLogoFile");
    const logoUrl = field.querySelector("#logoUrl");
    const publicId = field.querySelector("#logoPublicId");
    const preview = field.querySelector(".partnerLogoPreview");
    const status = field.querySelector(".partnerLogoStatus");
    const submit = document.getElementById("submitForm");
    fileInput.addEventListener("change", async () => {
      const file = fileInput.files?.[0];
      if (!file) return;
      try {
        await uploadPartnerLogo(file, { logoUrl, publicId, preview, status, submit });
      } catch (error) {
        logoUrl.value = "";
        status.textContent = error?.message === "not_configured" ? tr("logoConfig") : tr("logoError");
      } finally {
        submit.disabled = false;
      }
    });
  }

  function enhance() {
    bindVisitorNavigation();
    enhanceVisitorHome();
    enhancePartnerForm();
    enhancePartnerCards();
  }

  const observer = new MutationObserver(() => enhance());
  observer.observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener("DOMContentLoaded", enhance);
})();
