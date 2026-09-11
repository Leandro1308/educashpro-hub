(function () {
  const API_BASE = "https://educashpro-all.onrender.com";
  const CACHE_TTL = 5 * 60 * 1000;

  const qs = new URLSearchParams(location.search);
  const requestedLang = String(qs.get("lang") || navigator.language || "pt").toLowerCase();
  const lang = requestedLang.startsWith("en") ? "en" : requestedLang.startsWith("es") ? "es" : requestedLang.startsWith("ru") ? "ru" : "pt";

  const copy = {
    pt: {
      eyebrow: "EMPRESAS E PARCEIROS", title: "Encontre empresas no EduCashPro", subtitle: "Pesquise por nome, categoria ou localidade e acesse a página de cada empresa.",
      search: "Pesquisar", searchPlaceholder: "Nome, produto ou serviço", category: "Categoria", locality: "Localidade", localityPlaceholder: "Cidade, estado ou país",
      searchButton: "Pesquisar", clear: "Limpar filtros", loading: "Carregando empresas…", results: (n) => `${n} empresa${n === 1 ? "" : "s"} nesta página`,
      emptyTitle: "Nenhuma empresa encontrada", emptyText: "Tente alterar os filtros de pesquisa.", errorTitle: "Não foi possível carregar agora", errorText: "Tente novamente em alguns instantes.", retry: "Tentar novamente",
      previous: "Anterior", next: "Próxima", page: (n) => `Página ${n}`, all: "Todas as categorias", view: "Ver empresa", back: "Voltar ao Marketplace",
      about: "Sobre a empresa", contact: "Informações", contactField: "Contato", location: "Localidade", type: "Atendimento", online: "Online", physical: "Presencial", both: "Presencial e online", website: "Acessar empresa", benefit: "Benefício EduCashPro", benefitText: (v) => `Benefício informado: ${v}`,
      noDescription: "Esta empresa ainda não adicionou uma descrição pública.", noLocation: "Localidade não informada", gallery: "Fotos",
      reportLink: "Denunciar esta empresa", reportTitle: "Denunciar esta empresa", reportIntro: "Use esta opção apenas para informar um problema real com esta publicação.", reportReason: "Motivo", reportSelect: "Selecione", reportDetails: "Detalhes adicionais (opcional)", reportCancel: "Cancelar", reportSend: "Enviar denúncia", reportSending: "Enviando…", reportSuccess: "Obrigado. A denúncia foi registrada para análise e nenhuma ação automática foi tomada.", reportError: "Não foi possível enviar a denúncia agora.", reportLimited: "Limite de denúncias atingido. Tente novamente mais tarde.",
      reasons: { fraud:"Possível golpe ou fraude", misleading:"Informação falsa ou enganosa", spam:"Spam ou publicidade abusiva", inappropriate:"Conteúdo impróprio", broken_link:"Link quebrado ou destino incorreto", nonexistent:"Empresa inexistente", rights_violation:"Possível violação de direitos", other:"Outro motivo" },
    },
    en: {
      eyebrow: "BUSINESSES AND PARTNERS", title: "Find businesses on EduCashPro", subtitle: "Search by name, category or location and open each business page.",
      search: "Search", searchPlaceholder: "Name, product or service", category: "Category", locality: "Location", localityPlaceholder: "City, state or country",
      searchButton: "Search", clear: "Clear filters", loading: "Loading businesses…", results: (n) => `${n} business${n === 1 ? "" : "es"} on this page`,
      emptyTitle: "No businesses found", emptyText: "Try changing your search filters.", errorTitle: "Unable to load right now", errorText: "Please try again in a moment.", retry: "Try again",
      previous: "Previous", next: "Next", page: (n) => `Page ${n}`, all: "All categories", view: "View business", back: "Back to Marketplace",
      about: "About", contact: "Information", contactField: "Contact", location: "Location", type: "Service", online: "Online", physical: "In person", both: "In person and online", website: "Visit business", benefit: "EduCashPro benefit", benefitText: (v) => `Available benefit: ${v}`,
      noDescription: "This business has not added a public description yet.", noLocation: "Location not provided", gallery: "Photos",
      reportLink: "Report this business", reportTitle: "Report this business", reportIntro: "Use this option only to report a genuine problem with this listing.", reportReason: "Reason", reportSelect: "Select", reportDetails: "Additional details (optional)", reportCancel: "Cancel", reportSend: "Send report", reportSending: "Sending…", reportSuccess: "Thank you. The report was submitted for review and no automatic action was taken.", reportError: "The report could not be sent right now.", reportLimited: "Report limit reached. Please try again later.",
      reasons: { fraud:"Possible scam or fraud", misleading:"False or misleading information", spam:"Spam or abusive advertising", inappropriate:"Inappropriate content", broken_link:"Broken or incorrect link", nonexistent:"Business does not exist", rights_violation:"Possible rights violation", other:"Other reason" },
    },
    es: {
      eyebrow: "EMPRESAS Y SOCIOS", title: "Encuentra empresas en EduCashPro", subtitle: "Busca por nombre, categoría o ubicación y accede a la página de cada empresa.",
      search: "Buscar", searchPlaceholder: "Nombre, producto o servicio", category: "Categoría", locality: "Ubicación", localityPlaceholder: "Ciudad, estado o país",
      searchButton: "Buscar", clear: "Limpiar filtros", loading: "Cargando empresas…", results: (n) => `${n} empresa${n === 1 ? "" : "s"} en esta página`,
      emptyTitle: "No se encontraron empresas", emptyText: "Prueba cambiar los filtros de búsqueda.", errorTitle: "No fue posible cargar ahora", errorText: "Inténtalo de nuevo en unos instantes.", retry: "Intentar de nuevo",
      previous: "Anterior", next: "Siguiente", page: (n) => `Página ${n}`, all: "Todas las categorías", view: "Ver empresa", back: "Volver al Marketplace",
      about: "Sobre la empresa", contact: "Información", contactField: "Contacto", location: "Ubicación", type: "Atención", online: "Online", physical: "Presencial", both: "Presencial y online", website: "Acceder a la empresa", benefit: "Beneficio EduCashPro", benefitText: (v) => `Beneficio informado: ${v}`,
      noDescription: "Esta empresa aún no agregó una descripción pública.", noLocation: "Ubicación no informada", gallery: "Fotos",
      reportLink: "Denunciar esta empresa", reportTitle: "Denunciar esta empresa", reportIntro: "Usa esta opción solo para informar un problema real con esta publicación.", reportReason: "Motivo", reportSelect: "Selecciona", reportDetails: "Detalles adicionales (opcional)", reportCancel: "Cancelar", reportSend: "Enviar denuncia", reportSending: "Enviando…", reportSuccess: "Gracias. La denuncia fue registrada para revisión y no se tomó ninguna acción automática.", reportError: "No fue posible enviar la denuncia ahora.", reportLimited: "Se alcanzó el límite de denuncias. Inténtalo más tarde.",
      reasons: { fraud:"Posible fraude o estafa", misleading:"Información falsa o engañosa", spam:"Spam o publicidad abusiva", inappropriate:"Contenido inapropiado", broken_link:"Enlace roto o incorrecto", nonexistent:"La empresa no existe", rights_violation:"Posible violación de derechos", other:"Otro motivo" },
    },
    ru: {
      eyebrow: "КОМПАНИИ И ПАРТНЕРЫ", title: "Найдите компании в EduCashPro", subtitle: "Ищите по названию, категории или местоположению и открывайте страницу компании.",
      search: "Поиск", searchPlaceholder: "Название, товар или услуга", category: "Категория", locality: "Местоположение", localityPlaceholder: "Город, регион или страна",
      searchButton: "Искать", clear: "Очистить фильтры", loading: "Загрузка компаний…", results: (n) => `${n} компаний на этой странице`,
      emptyTitle: "Компании не найдены", emptyText: "Попробуйте изменить фильтры поиска.", errorTitle: "Не удалось загрузить", errorText: "Повторите попытку через несколько секунд.", retry: "Повторить",
      previous: "Назад", next: "Далее", page: (n) => `Страница ${n}`, all: "Все категории", view: "Открыть компанию", back: "Назад к Marketplace",
      about: "О компании", contact: "Информация", contactField: "Контакт", location: "Местоположение", type: "Формат", online: "Онлайн", physical: "Очно", both: "Очно и онлайн", website: "Перейти к компании", benefit: "Преимущество EduCashPro", benefitText: (v) => `Доступное преимущество: ${v}`,
      noDescription: "Компания пока не добавила публичное описание.", noLocation: "Местоположение не указано", gallery: "Фото",
      reportLink: "Пожаловаться на компанию", reportTitle: "Пожаловаться на компанию", reportIntro: "Используйте эту функцию только для сообщения о реальной проблеме с публикацией.", reportReason: "Причина", reportSelect: "Выберите", reportDetails: "Дополнительные сведения (необязательно)", reportCancel: "Отмена", reportSend: "Отправить жалобу", reportSending: "Отправка…", reportSuccess: "Спасибо. Жалоба отправлена на проверку, автоматических действий не предпринято.", reportError: "Сейчас не удалось отправить жалобу.", reportLimited: "Достигнут лимит жалоб. Повторите попытку позже.",
      reasons: { fraud:"Возможное мошенничество", misleading:"Ложная или вводящая в заблуждение информация", spam:"Спам или навязчивая реклама", inappropriate:"Неприемлемый контент", broken_link:"Неработающая или неверная ссылка", nonexistent:"Компания не существует", rights_violation:"Возможное нарушение прав", other:"Другая причина" },
    },
  }[lang];

  const segmentLabels = {
    pt: { pharmacy:"Farmácias", clinic:"Clínicas", physiotherapy:"Fisioterapia", gym:"Academias", dental:"Odontologia", laboratory:"Laboratórios", nutrition:"Nutrição", psychology:"Psicologia", beauty:"Beleza", education:"Educação", restaurants:"Restaurantes", retail:"Comércio", services:"Serviços", technology:"Tecnologia", other:"Outros" },
    en: { pharmacy:"Pharmacies", clinic:"Clinics", physiotherapy:"Physiotherapy", gym:"Gyms", dental:"Dental", laboratory:"Laboratories", nutrition:"Nutrition", psychology:"Psychology", beauty:"Beauty", education:"Education", restaurants:"Restaurants", retail:"Retail", services:"Services", technology:"Technology", other:"Other" },
    es: { pharmacy:"Farmacias", clinic:"Clínicas", physiotherapy:"Fisioterapia", gym:"Gimnasios", dental:"Odontología", laboratory:"Laboratorios", nutrition:"Nutrición", psychology:"Psicología", beauty:"Belleza", education:"Educación", restaurants:"Restaurantes", retail:"Comercio", services:"Servicios", technology:"Tecnología", other:"Otros" },
    ru: { pharmacy:"Аптеки", clinic:"Клиники", physiotherapy:"Физиотерапия", gym:"Фитнес", dental:"Стоматология", laboratory:"Лаборатории", nutrition:"Питание", psychology:"Психология", beauty:"Красота", education:"Образование", restaurants:"Рестораны", retail:"Магазины", services:"Услуги", technology:"Технологии", other:"Другое" },
  }[lang];

  const el = (id) => document.getElementById(id);
  const state = { page: 1, hasMore: false, loading: false, items: [], reportCompanyId: "", reportSending: false };

  function setText(id, value) { const node = el(id); if (node) node.textContent = value; }
  function escapeHtml(value) { return String(value || "").replace(/[&<>'"]/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c])); }
  function initials(name) { return String(name || "E").trim().split(/\s+/).slice(0,2).map((part) => part[0] || "").join("").toUpperCase() || "E"; }
  function locationText(item) { return [item.city, item.state, item.country].filter(Boolean).join(" · ") || copy.noLocation; }
  function typeText(type) { return type === "physical" ? copy.physical : type === "both" ? copy.both : copy.online; }
  function segmentText(segment) { return segmentLabels[segment] || segmentLabels.other; }

  function renderReportReasons() {
    const select = el("reportReason");
    if (!select) return;
    select.innerHTML = `<option value="">${escapeHtml(copy.reportSelect)}</option>` + Object.entries(copy.reasons).map(([value, label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`).join("");
  }

  function applyCopy() {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;
    setText("eyebrow", copy.eyebrow); setText("marketTitle", copy.title); setText("marketSubtitle", copy.subtitle);
    setText("searchLabel", copy.search); el("searchInput").placeholder = copy.searchPlaceholder;
    setText("categoryLabel", copy.category); setText("locationLabel", copy.locality); el("locationInput").placeholder = copy.localityPlaceholder;
    setText("filterButton", copy.searchButton); setText("clearButton", copy.clear); setText("emptyTitle", copy.emptyTitle); setText("emptyText", copy.emptyText);
    setText("errorTitle", copy.errorTitle); setText("errorText", copy.errorText); setText("retryButton", copy.retry);
    setText("previousText", copy.previous); setText("nextText", copy.next); setText("detailBackText", copy.back);
    setText("reportTitle", copy.reportTitle); setText("reportIntro", copy.reportIntro); setText("reportReasonLabel", copy.reportReason); setText("reportDetailsLabel", copy.reportDetails); setText("reportCancel", copy.reportCancel); setText("reportSubmit", copy.reportSend);
    renderReportReasons();
  }

  function renderSegments(segments) {
    const select = el("segmentSelect");
    const current = select.value;
    select.innerHTML = `<option value="">${escapeHtml(copy.all)}</option>` + (segments || Object.keys(segmentLabels)).map((segment) => `<option value="${escapeHtml(segment)}">${escapeHtml(segmentText(segment))}</option>`).join("");
    select.value = current;
  }

  function cacheKey(params) { return `educashpro:marketplace:v1:${params.toString()}`; }
  function readCache(params) {
    try {
      const raw = localStorage.getItem(cacheKey(params)); if (!raw) return null;
      const parsed = JSON.parse(raw); if (!parsed?.savedAt || Date.now() - parsed.savedAt > CACHE_TTL) return null;
      return parsed.data || null;
    } catch { return null; }
  }
  function writeCache(params, data) { try { localStorage.setItem(cacheKey(params), JSON.stringify({ savedAt: Date.now(), data })); } catch {} }

  function currentParams() {
    const params = new URLSearchParams();
    const q = el("searchInput").value.trim(); const segment = el("segmentSelect").value; const locationValue = el("locationInput").value.trim();
    if (q) params.set("q", q); if (segment) params.set("segment", segment); if (locationValue) params.set("location", locationValue);
    params.set("page", String(state.page)); params.set("pageSize", "20");
    return params;
  }

  function showSkeleton() {
    el("companyGrid").innerHTML = `<div class="loadingCards"><div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div></div>`;
    el("emptyState").classList.add("hidden"); el("errorState").classList.add("hidden"); setText("resultStatus", copy.loading);
  }

  function companyCard(item) {
    const logo = item.logoUrl ? `<img src="${escapeHtml(item.logoUrl)}" alt="" loading="lazy" referrerpolicy="no-referrer" />` : escapeHtml(initials(item.companyName));
    const coverClass = item.coverUrl ? "companyCover hasImage" : "companyCover";
    const coverStyle = item.coverUrl ? ` style="background-image:url('${escapeHtml(item.coverUrl)}')"` : "";
    return `<article class="companyCard">
      <div class="${coverClass}"${coverStyle}><div class="companyLogo">${logo}</div></div>
      <div class="companyBody">
        <h2><button type="button" data-company="${escapeHtml(item.id)}">${escapeHtml(item.companyName)}</button></h2>
        <div class="companyMeta"><span class="pill">${escapeHtml(segmentText(item.segment))}</span><span class="pill">📍 ${escapeHtml(locationText(item))}</span></div>
        <p class="companyDescription">${escapeHtml(item.description || copy.noDescription)}</p>
        <div class="cardAction"><button type="button" data-company="${escapeHtml(item.id)}">${escapeHtml(copy.view)}</button></div>
      </div>
    </article>`;
  }

  function renderList(data) {
    state.items = Array.isArray(data.items) ? data.items : []; state.hasMore = !!data.hasMore;
    renderSegments(data.segments);
    el("companyGrid").innerHTML = state.items.map(companyCard).join("");
    el("emptyState").classList.toggle("hidden", state.items.length > 0); el("errorState").classList.add("hidden");
    setText("resultStatus", copy.results(state.items.length)); setText("pageLabel", copy.page(state.page));
    el("previousButton").disabled = state.page <= 1; el("nextButton").disabled = !state.hasMore;
  }

  async function loadCompanies({ useCache = true } = {}) {
    if (state.loading) return; state.loading = true;
    const params = currentParams(); const cached = useCache ? readCache(params) : null;
    if (cached) renderList(cached); else showSkeleton();
    try {
      const response = await fetch(`${API_BASE}/api/public/marketplace?${params.toString()}`, { headers: { Accept: "application/json" } });
      const data = await response.json(); if (!response.ok || !data?.ok) throw new Error(data?.reason || "marketplace_failed");
      writeCache(params, data); renderList(data);
    } catch (error) {
      console.error("[Marketplace]", error);
      if (!cached) { el("companyGrid").innerHTML = ""; el("emptyState").classList.add("hidden"); el("errorState").classList.remove("hidden"); setText("resultStatus", ""); }
    } finally { state.loading = false; }
  }

  function detailMarkup(item) {
    const logo = item.logoUrl ? `<img src="${escapeHtml(item.logoUrl)}" alt="" />` : escapeHtml(initials(item.companyName));
    const coverStyle = item.coverUrl ? ` style="background-image:url('${escapeHtml(item.coverUrl)}')"` : "";
    const gallery = Array.isArray(item.galleryUrls) && item.galleryUrls.length ? `<div class="detailBlock"><h3>${escapeHtml(copy.gallery)}</h3><div class="gallery">${item.galleryUrls.map((url) => `<img src="${escapeHtml(url)}" alt="" loading="lazy" />`).join("")}</div></div>` : "";
    const destination = item.destinationUrl ? `<a class="detailCta" href="${escapeHtml(item.destinationUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(copy.website)} ↗</a>` : "";
    const benefit = item.discountRange ? `<div class="benefitBadge"><strong>${escapeHtml(copy.benefit)}</strong><br>${escapeHtml(copy.benefitText(item.discountRange))}</div>` : "";
    return `<div class="detailCover"${coverStyle}></div><div class="detailContent">
      <div class="detailIdentity"><div class="detailLogo">${logo}</div><div class="detailTitle"><h1>${escapeHtml(item.companyName)}</h1><p>${escapeHtml(segmentText(item.segment))}</p></div></div>
      <div class="detailGrid">
        <div class="detailBlock"><h3>${escapeHtml(copy.about)}</h3><p>${escapeHtml(item.description || copy.noDescription)}</p>${benefit}${destination}</div>
        <div class="detailBlock"><h3>${escapeHtml(copy.contact)}</h3><div class="detailList">
          <div class="detailRow"><span>${escapeHtml(copy.location)}</span><strong>${escapeHtml(locationText(item))}</strong></div>
          <div class="detailRow"><span>${escapeHtml(copy.type)}</span><strong>${escapeHtml(typeText(item.storeType))}</strong></div>
          ${item.contact ? `<div class="detailRow"><span>${escapeHtml(copy.contactField)}</span><strong>${escapeHtml(item.contact)}</strong></div>` : ""}
        </div></div>
      </div>${gallery}
      <footer class="companyReportFooter"><a class="reportTextLink" href="#" data-report-company="${escapeHtml(item.id)}">${escapeHtml(copy.reportLink)}</a></footer>
    </div>`;
  }

  async function openCompany(id, { push = true } = {}) {
    if (!id) return;
    closeReport();
    el("listView").classList.add("hidden"); el("detailView").classList.remove("hidden"); el("companyDetail").innerHTML = `<div class="skeleton" style="height:420px;border-radius:0"></div>`;
    if (push) { const url = new URL(location.href); url.searchParams.set("company", id); url.searchParams.set("lang", lang); history.pushState({ company: id }, "", url); }
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      const response = await fetch(`${API_BASE}/api/public/marketplace/${encodeURIComponent(id)}`, { headers: { Accept: "application/json" } });
      const data = await response.json(); if (!response.ok || !data?.ok) throw new Error(data?.reason || "not_found");
      el("companyDetail").innerHTML = detailMarkup(data.item);
    } catch (error) {
      console.error("[Marketplace detail]", error);
      el("companyDetail").innerHTML = `<div class="emptyState"><div>⚠️</div><strong>${escapeHtml(copy.errorTitle)}</strong><p>${escapeHtml(copy.errorText)}</p></div>`;
    }
  }

  function closeDetail({ push = true } = {}) {
    closeReport();
    el("detailView").classList.add("hidden"); el("listView").classList.remove("hidden");
    if (push) { const url = new URL(location.href); url.searchParams.delete("company"); url.searchParams.set("lang", lang); history.pushState({}, "", url); }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function setReportStatus(message, type = "") {
    const node = el("reportStatus");
    if (!node) return;
    node.textContent = message || "";
    node.className = `reportStatus${type ? ` ${type}` : ""}`;
  }

  function openReport(companyId) {
    if (!companyId || state.reportSending) return;
    state.reportCompanyId = String(companyId);
    el("reportForm").reset();
    renderReportReasons();
    setReportStatus("");
    setText("reportSubmit", copy.reportSend);
    el("reportSubmit").disabled = false;
    el("reportModal").classList.remove("hidden");
    setTimeout(() => el("reportReason")?.focus(), 30);
  }

  function closeReport() {
    if (!el("reportModal") || state.reportSending) return;
    el("reportModal").classList.add("hidden");
    state.reportCompanyId = "";
    setReportStatus("");
  }

  async function submitReport(event) {
    event.preventDefault();
    if (state.reportSending || !state.reportCompanyId) return;
    const reason = String(el("reportReason").value || "");
    if (!reason) { el("reportReason").focus(); return; }

    state.reportSending = true;
    el("reportSubmit").disabled = true;
    setText("reportSubmit", copy.reportSending);
    setReportStatus("");

    try {
      const response = await fetch(`${API_BASE}/api/public/moderation/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          entityType: "company",
          entityId: state.reportCompanyId,
          reason,
          details: String(el("reportDetails").value || "").trim(),
          website: String(el("reportWebsite").value || ""),
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.ok) {
        const err = new Error(data?.reason || "report_failed");
        err.status = response.status;
        throw err;
      }
      setReportStatus(copy.reportSuccess, "success");
      el("reportReason").disabled = true;
      el("reportDetails").disabled = true;
      setText("reportSubmit", copy.reportSend);
      setTimeout(() => {
        state.reportSending = false;
        el("reportReason").disabled = false;
        el("reportDetails").disabled = false;
        el("reportSubmit").disabled = false;
        closeReport();
      }, 2200);
      return;
    } catch (error) {
      console.error("[Marketplace report]", error);
      const limited = error?.status === 429 || error?.message === "report_rate_limited";
      setReportStatus(limited ? copy.reportLimited : copy.reportError, "error");
    } finally {
      if (!el("reportReason").disabled) {
        state.reportSending = false;
        el("reportSubmit").disabled = false;
        setText("reportSubmit", copy.reportSend);
      }
    }
  }

  let debounceTimer = null;
  function debouncedSearch() { clearTimeout(debounceTimer); debounceTimer = setTimeout(() => { state.page = 1; loadCompanies(); }, 450); }

  applyCopy(); renderSegments(Object.keys(segmentLabels));
  el("filterButton").addEventListener("click", () => { state.page = 1; loadCompanies(); });
  el("searchInput").addEventListener("input", debouncedSearch); el("locationInput").addEventListener("input", debouncedSearch);
  el("segmentSelect").addEventListener("change", () => { state.page = 1; loadCompanies(); });
  el("clearButton").addEventListener("click", () => { el("searchInput").value = ""; el("locationInput").value = ""; el("segmentSelect").value = ""; state.page = 1; loadCompanies(); });
  el("retryButton").addEventListener("click", () => loadCompanies({ useCache: false }));
  el("previousButton").addEventListener("click", () => { if (state.page <= 1) return; state.page -= 1; loadCompanies(); window.scrollTo({ top: 0, behavior: "smooth" }); });
  el("nextButton").addEventListener("click", () => { if (!state.hasMore) return; state.page += 1; loadCompanies(); window.scrollTo({ top: 0, behavior: "smooth" }); });
  el("companyGrid").addEventListener("click", (event) => { const button = event.target.closest("[data-company]"); if (button) openCompany(button.dataset.company); });
  el("companyDetail").addEventListener("click", (event) => { const link = event.target.closest("[data-report-company]"); if (!link) return; event.preventDefault(); openReport(link.dataset.reportCompany); });
  el("detailBack").addEventListener("click", () => closeDetail());
  el("reportForm").addEventListener("submit", submitReport);
  document.querySelectorAll("[data-close-report]").forEach((node) => node.addEventListener("click", closeReport));
  addEventListener("keydown", (event) => { if (event.key === "Escape" && !el("reportModal").classList.contains("hidden")) closeReport(); });
  addEventListener("popstate", () => { const id = new URLSearchParams(location.search).get("company"); if (id) openCompany(id, { push: false }); else closeDetail({ push: false }); });

  const initialCompany = qs.get("company");
  if (initialCompany) openCompany(initialCompany, { push: false }); else loadCompanies();
})();
