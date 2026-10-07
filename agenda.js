import { COPY } from "./agenda-copy.js?v=20261007.2";
import {
  CURRENCIES,
  defaultWeekly,
  validateSettings,
  localInput,
  utcLocal,
  dateKey,
  minorDigits,
  paymentSummary,
} from "./agenda-model.js?v=20261007.2";
import { encryptNote, decryptNote } from "./agenda-crypto.js?v=20261007.2";
const root = document.getElementById("content"),
  toast = document.getElementById("toast"),
  escape = (v) =>
    String(v ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
const state = {
  language: window.EduCashProLocale?.resolve?.() || "pt",
  token: "",
  profile: null,
  access: null,
  data: { appointments: [], services: [], clients: [], staff: [] },
  agendas: [],
  view: "agenda",
  mode: "list",
  date: new Date().toISOString().slice(0, 10),
  agendaId: "",
  query: "",
  provider: "",
  service: "",
  publicId: "",
  setupStep: 0,
  setupDraft: {},
  loadedRange: "",
  busy: false,
};
let navigationEpoch = 0,
  password = "",
  financialCache = null;
const detailAppointments = new Map();
const t = (k) => COPY[state.language]?.[k] || COPY.pt[k] || k,
  $ = (id) => document.getElementById(id),
  zone = () =>
    state.access?.agenda.settings.timeZone ||
    Intl.DateTimeFormat().resolvedOptions().timeZone ||
    "UTC",
  currency = () => state.access?.agenda.settings.currency || "BRL",
  p = () => state.access?.permissions || {},
  uid = () =>
    state.profile?.userId
      ? `u:${state.profile.userId}`
      : `t:${state.profile?.tgId || state.profile?.telegramId || ""}`;
const money = (n, c = currency()) =>
  c === "USDT"
    ? new Intl.NumberFormat(state.language, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(n / 100) + " USDT"
    : new Intl.NumberFormat(
        state.language === "pt" ? "pt-BR" : state.language,
        { style: "currency", currency: c },
      ).format(n / 10 ** minorDigits(c));
const dateText = (v) =>
  new Intl.DateTimeFormat(state.language === "pt" ? "pt-BR" : state.language, {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: zone(),
  }).format(new Date(v));
function show(key) {
  toast.textContent = t(key);
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 4500);
}
function button(id, label, cls = "secondary") {
  return `<button type="button" id="${id}" class="button ${cls}">${escape(t(label))}</button>`;
}
function input(id, label, value = "", type = "text", extra = "") {
  return `<label class="field">${escape(t(label))}<input id="${id}" type="${type}" value="${escape(value)}" ${extra}></label>`;
}
const option = (v, label, selected) =>
  `<option value="${escape(v)}" ${String(v) === String(selected) ? "selected" : ""}>${escape(label)}</option>`;
function select(id, label, items, value = "", empty = false) {
  return `<label class="field">${escape(t(label))}<select id="${id}">${empty ? option("", t("all"), value) : ""}${items.map((x) => option(x.id, x.name, value)).join("")}</select></label>`;
}
function check(id, label, checked = false) {
  return `<label class="check"><input id="${id}" type="checkbox" ${checked ? "checked" : ""}>${escape(t(label))}</label>`;
}
function noteTextarea(id, label, value = "", max = 1000) {
  return `<label class="field">${escape(t(label))}<textarea id="${id}" maxlength="${max}">${escape(value)}</textarea></label>`;
}
const val = (id) => $(id)?.value || "",
  checked = (id) => $(id)?.checked === true;
const API_BASE =
  window.EDUCASHPRO_API_BASE || "https://educashpro-all.onrender.com";
const pending = new Map();
async function api(path, payload = {}) {
  const body = { token: state.token, agendaId: state.agendaId, ...payload },
    key = path + JSON.stringify(body);
  if (pending.has(key)) return pending.get(key);
  const task = (async () => {
    const controller = new AbortController(),
      timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(`${API_BASE}/api/agenda/${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(state.token ? { Authorization: `Bearer ${state.token}` } : {}),
        },
        body: JSON.stringify(body),
        signal: controller.signal,
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok || data.ok === false)
        throw Error(data.reason || "error");
      return data;
    } finally {
      clearTimeout(timer);
      pending.delete(key);
    }
  })();
  pending.set(key, task);
  return task;
}
async function action(fn) {
  if (state.busy) return;
  state.busy = true;
  document.body.classList.add("is-loading");
  try {
    await fn();
  } catch (e) {
    show(COPY.pt[e.message] ? e.message : "error");
    console.warn("Agenda action failed:", e.message);
  } finally {
    state.busy = false;
    document.body.classList.remove("is-loading");
  }
}
function download(content, name, type) {
  const blob =
      content instanceof Blob ? content : new Blob([content], { type }),
    url = URL.createObjectURL(blob),
    a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
function range() {
  const d = new Date(state.date + "T12:00Z"),
    start = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() - 1, 1)),
    end = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 2, 1));
  return {
    from: start.toISOString(),
    to: end.toISOString(),
    appointmentLimit: 500,
  };
}
function route() {
  const url = new URL(location.href);
  url.searchParams.set("view", state.view);
  url.searchParams.set("date", state.date);
  if (state.agendaId) url.searchParams.set("agendaId", state.agendaId);
  return url;
}
function remember(push = true) {
  const url = route();
  if (url.href !== location.href) {
    if (push) history.pushState({ agenda: true }, "", url);
    else history.replaceState({ agenda: true }, "", url);
  }
}
async function load(force = false) {
  const bounds = range(),
    key = state.agendaId + JSON.stringify(bounds);
  if (!force && state.loadedRange === key && state.data) return render();
  const epoch = ++navigationEpoch;
  const data = await api("bootstrap", bounds);
  if (epoch !== navigationEpoch) return;
  state.data = data;
  detailAppointments.clear();
  state.access = data.access;
  state.agendas = data.agendas || [];
  state.agendaId = data.access?.agenda.id || "";
  state.loadedRange = state.agendaId + JSON.stringify(bounds);
  financialCache = null;
  if (!state.access) return setup();
  render();
}
function shell(body) {
  const a = state.access,
    tabs = [
      ["agenda", "agenda"],
      ...(p().schedule || p().manage ? [["clients", "clients"]] : []),
      ...(p().manage
        ? [
            ["services", "services"],
            ["team", "team"],
            ["settings", "settings"],
          ]
        : []),
      ...(p().finance || p().ownFinance ? [["finance", "finance"]] : []),
    ];
  root.innerHTML = `${
    state.agendas.length > 1
      ? select(
          "agendaChooser",
          "selectAgenda",
          state.agendas.map((x) => ({ id: x.id, name: x.displayName })),
          state.agendaId,
        )
      : ""
  }<header class="agendaHero"><div><span class="eyebrow">${escape(t(a.role === "professional" ? "professional" : "title"))}</span><h1>${escape(a.agenda.displayName)}</h1><small>${escape(a.agenda.settings.timeZone)}</small></div>${p().manage ? button("shareAgenda", "share") : ""}</header>${!a.ownerActive ? `<div class="notice">${escape(t("inactiveHelp"))}</div>` : ""}<nav class="agendaTabs" aria-label="${escape(t("title"))}">${tabs.map(([v, label]) => `<button data-view="${v}" aria-current="${state.view === v ? "page" : "false"}">${escape(t(label))}</button>`).join("")}</nav>${body}`;
  document
    .querySelectorAll("[data-view]")
    .forEach((b) => (b.onclick = () => navigate(b.dataset.view)));
  $("agendaChooser")?.addEventListener("change", () =>
    action(async () => {
      state.agendaId = val("agendaChooser");
      state.loadedRange = "";
      await load(true);
      remember();
    }),
  );
  $("shareAgenda")?.addEventListener("click", () =>
    action(async () => {
      const url = new URL(location.pathname, location.origin);
      url.searchParams.set("agenda", a.agenda.publicId);
      if (navigator.share)
        await navigator.share({ title: a.agenda.displayName, url: url.href });
      else {
        await navigator.clipboard.writeText(url.href);
        show("copied");
      }
    }),
  );
}
function navigate(view, push = true) {
  state.view = view;
  remember(push);
  if (
    view === "agenda" &&
    state.loadedRange !== state.agendaId + JSON.stringify(range())
  ) {
    void action(() => load());
    return;
  }
  render();
}
function render() {
  if (!state.access) return setup();
  if (state.view === "services") return renderServices();
  if (state.view === "clients") return renderClients();
  if (state.view === "team") return renderTeam();
  if (state.view === "settings") return renderSettings();
  if (state.view === "finance")
    return void renderFinance().catch(() => show("error"));
  renderAgenda();
}
function dialog(title, html) {
  $("agendaDialog")?.remove();
  const layer = document.createElement("dialog");
  layer.id = "agendaDialog";
  layer.className = "agendaDialog";
  layer.innerHTML = `<header><h2>${escape(t(title))}</h2>${button("closeDialog", "close")}</header><div class="dialogBody">${html}</div>`;
  document.body.append(layer);
  layer.showModal();
  $("closeDialog").onclick = () => layer.close();
  layer.addEventListener("close", () => layer.remove());
  return layer;
}
function closeDialog() {
  $("agendaDialog")?.close();
}
const professionals = () =>
    state.data.staff.filter(
      (x) => x.role === "professional" && x.active !== false,
    ),
  providers = () =>
    professionals().length
      ? professionals()
      : [{ id: "", name: t("unassigned") }];
function appointmentCard(a) {
  const fin = p().finance || p().ownFinance ? paymentSummary(a) : null;
  return `<button class="appointmentCard ${escape(a.status)}" data-appointment="${escape(a.id)}"><span class="appointmentTime">${escape(new Intl.DateTimeFormat(state.language, { hour: "2-digit", minute: "2-digit", timeZone: zone() }).format(new Date(a.startsAt)))}</span><span><strong>${escape(a.clientName)}</strong><small>${escape(a.serviceName)} · ${escape(a.providerName || t("unassigned"))}</small></span><span class="status">${escape(t(a.status))}${fin ? `<small>${escape(t(fin.paymentStatus))}</small>` : ""}</span></button>`;
}
function renderAgenda() {
  const rows = state.data.appointments.filter(
      (a) =>
        (!state.provider || a.providerId === state.provider) &&
        (!state.service || String(a.serviceId) === state.service) &&
        (!state.query ||
          `${a.clientName} ${a.serviceName}`
            .toLowerCase()
            .includes(state.query.toLowerCase())),
    ),
    today = dateKey(new Date(), zone()),
    next = rows.filter(
      (a) => a.startsAt >= new Date().toISOString() && a.status !== "cancelled",
    ),
    day = state.date;
  let list = "";
  if (state.mode === "month") {
    const base = new Date(day + "T12:00Z"),
      y = base.getUTCFullYear(),
      m = base.getUTCMonth(),
      offset = (new Date(Date.UTC(y, m, 1)).getUTCDay() + 6) % 7,
      last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
    list = `<div class="monthGrid">${[1, 2, 3, 4, 5, 6, 0].map((i) => `<small class="weekdayLabel">${escape(weekdays()[i].slice(0, 3))}</small>`).join("")}${Array.from({ length: offset }, () => "<span></span>").join("")}${Array.from(
      { length: last },
      (_, i) => {
        const key = `${y}-${String(m + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`,
          items = rows.filter((a) => dateKey(a.startsAt, zone()) === key);
        return `<button class="monthDay ${key === today ? "isToday" : ""}" data-day="${key}"><strong>${i + 1}</strong><small>${items.length}</small>${items
          .slice(0, 2)
          .map((a) => `<span>${escape(a.clientName)}</span>`)
          .join("")}</button>`;
      },
    ).join("")}</div>`;
  } else {
    let dates = [day];
    if (state.mode === "week") {
      const start = new Date(day + "T12:00Z");
      start.setUTCDate(start.getUTCDate() - ((start.getUTCDay() + 6) % 7));
      dates = Array.from({ length: 7 }, (_, i) =>
        new Date(+start + i * 86400000).toISOString().slice(0, 10),
      );
    }
    list = dates
      .map((key) => {
        const items = rows.filter((a) => dateKey(a.startsAt, zone()) === key);
        return `<section class="daySection"><h2>${escape(new Intl.DateTimeFormat(state.language, { dateStyle: "full", timeZone: "UTC" }).format(new Date(key + "T12:00Z")))}</h2>${items.length ? items.map(appointmentCard).join("") : `<p class="empty">${escape(t("empty"))}</p>`}</section>`;
      })
      .join("");
  }
  shell(
    `<section class="summary"><article><small>${escape(t("today"))}</small><strong>${rows.filter((a) => dateKey(a.startsAt, zone()) === today && a.status !== "cancelled").length}</strong></article><article><small>${escape(t("requested"))}</small><strong>${rows.filter((a) => a.status === "requested").length}</strong></article><article><small>${escape(t("upcoming"))}</small><strong>${next.length}</strong></article></section><section class="toolbar">${input("agendaDate", "date", day, "date")}${p().schedule ? button("newAppointment", "newAppointment", "primary") : ""}${button("todayButton", "today")}<div class="segmented">${["list", "day", "week", "month"].map((mode) => `<button data-mode="${mode}" aria-pressed="${state.mode === mode}">${escape(t(mode))}</button>`).join("")}</div></section><section class="filters">${input("searchAgenda", "search", state.query)}${state.access.role !== "professional" ? select("providerFilter", "professional", providers(), state.provider, true) : ""}${select("serviceFilter", "serviceFilter", state.data.services, state.service, true)}</section>${list}${state.data.appointments.length < (state.data.appointmentTotal || 0) ? button("loadMore", "loadMore") : ""}${p().notes ? `<section class="card"><h2>${escape(t("privateNote"))}</h2><p>${escape(t("recoveryHelp"))}</p><div class="actions">${button("notesBackup", "backupNotes")}${button("notesRestore", "restoreNotes")}</div></section>` : ""}`,
  );
  $("agendaDate").onchange = () =>
    action(async () => {
      state.date = val("agendaDate");
      await load();
      remember();
    });
  $("todayButton").onclick = () =>
    action(async () => {
      state.date = today;
      await load();
      remember();
    });
  document.querySelectorAll("[data-mode]").forEach(
    (b) =>
      (b.onclick = () => {
        state.mode = b.dataset.mode;
        renderAgenda();
      }),
  );
  document.querySelectorAll("[data-day]").forEach(
    (b) =>
      (b.onclick = () => {
        state.date = b.dataset.day;
        state.mode = "day";
        remember();
        renderAgenda();
      }),
  );
  $("searchAgenda").oninput = () => {
    state.query = val("searchAgenda");
    const focus = $("searchAgenda").selectionStart;
    renderAgenda();
    $("searchAgenda").focus();
    $("searchAgenda").setSelectionRange(focus, focus);
  };
  for (const id of ["providerFilter", "serviceFilter"])
    $(id)?.addEventListener("change", () => {
      state[id === "providerFilter" ? "provider" : "service"] = val(id);
      renderAgenda();
    });
  document
    .querySelectorAll("[data-appointment]")
    .forEach(
      (b) => (b.onclick = () => appointmentDetail(b.dataset.appointment)),
    );
  $("newAppointment")?.addEventListener("click", newAppointment);
  $("loadMore")?.addEventListener("click", () =>
    action(async () => {
      const data = await api("data", {
        ...range(),
        appointmentOffset: state.data.appointments.length,
      });
      const known = new Set(state.data.appointments.map((x) => x.id));
      state.data.appointments.push(
        ...data.appointments.filter((x) => !known.has(x.id)),
      );
      state.data.appointmentTotal = data.appointmentTotal;
      renderAgenda();
    }),
  );
  $("notesBackup")?.addEventListener("click", backupNotes);
  $("notesRestore")?.addEventListener("click", restoreNotes);
}
function appointmentDetail(id) {
  const a =
    state.data.appointments.find((x) => x.id === id) ||
    detailAppointments.get(id);
  if (!a) return;
  const finance = p().finance || p().ownFinance ? paymentSummary(a) : null;
  const html = `<p><strong>${escape(a.clientName)}</strong><br>${escape(a.serviceName)} · ${escape(a.providerName)}<br>${escape(dateText(a.startsAt))}<br>${escape(t(a.status))}</p>${a.administrativeNote ? `<section><h3>${escape(t("adminNote"))}</h3><p>${escape(a.administrativeNote)}</p></section>` : ""}${finance ? `<section class="summary"><article><small>${escape(t("amount"))}</small><strong>${escape(money(a.amount, a.currency))}</strong></article><article><small>${escape(t("received"))}</small><strong>${escape(money(finance.received, a.currency))}</strong></article><article><small>${escape(t("balance"))}</small><strong>${escape(money(finance.due, a.currency))}</strong></article></section><p>${escape(t(finance.paymentStatus))} · ${escape(t("dueDate"))}: ${escape(a.dueDate)}</p><p>${escape(t("professionalShare"))}: ${escape(money(finance.professional, a.currency))} · ${escape(t("payoutDue"))}: ${escape(money(finance.payoutDue, a.currency))}</p>` : ""}<div class="actions">${p().schedule ? button("editAppointment", "edit") : ""}${p().finance && a.status !== "cancelled" ? button("addPayment", "payment", "primary") : ""}${p().notes && (state.access.role === "professional" || !a.providerId) ? button("openPrivateNote", "privateNote", "primary") : ""}${button("downloadCalendar", "calendar")}</div><p class="hint">${escape(t("calendarHelp"))}</p>${finance ? `<h3>${escape(t("payments"))}</h3>${(a.payments || []).map((x) => `<p>${escape(dateText(x.date))} · ${escape(money(x.amount, a.currency))} · ${escape(x.method)} · ${escape(x.note)}</p>`).join("")}<h3>${escape(t("payouts"))}</h3>${(a.payouts || []).map((x) => `<p>${escape(dateText(x.date))} · ${escape(money(x.amount, a.currency))} · ${escape(x.method)}</p>`).join("")}` : ""}<h3>${escape(t("history"))}</h3>${(a.history || []).map((x) => `<p>${escape(dateText(x.date))} · ${escape(t(x.status))}${x.previousStart ? `<br>${escape(dateText(x.previousStart))} → ${escape(dateText(x.newStart))}` : ""}</p>`).join("")}`;
  dialog("details", html);
  $("editAppointment")?.addEventListener("click", () => editAppointment(a));
  $("addPayment")?.addEventListener("click", () => moneyDialog(a));
  $("openPrivateNote")?.addEventListener("click", () => privateNote(a));
  $("downloadCalendar").onclick = () => calendarFile(a);
}
function editAppointment(a) {
  dialog(
    "edit",
    `${select(
      "appointmentStatus",
      "agenda",
      ["requested", "confirmed", "attended", "rescheduled", "cancelled"].map(
        (id) => ({ id, name: t(id) }),
      ),
      a.status,
    )}${input("editStart", "date", localInput(a.startsAt, zone()), "datetime-local")}${noteTextarea("adminNote", "adminNote", a.administrativeNote)}<p class="hint">${escape(t("snapshotHelp"))}</p>${button("saveAppointment", "save", "primary")}`,
  );
  $("saveAppointment").onclick = () =>
    action(async () => {
      const local = val("editStart"),
        startsAt =
          local === localInput(a.startsAt, zone())
            ? a.startsAt
            : utcLocal(local, zone());
      await api("appointment/update", {
        appointmentId: a.id,
        status: val("appointmentStatus"),
        startsAt,
        administrativeNote: val("adminNote"),
      });
      closeDialog();
      await load(true);
      show("saved");
    });
}
function newAppointment() {
  if (!state.access.ownerActive) return show("owner_subscription_inactive");
  if (!state.data.services.length || !state.data.clients.length) {
    show("firstService");
    return;
  }
  dialog(
    "newAppointment",
    `${select("newClient", "client", state.data.clients)}${select("newService", "service", state.data.services)}${select("newProvider", "professional", providers())}${input("slotDay", "date", state.date, "date")}<div id="availableSlots"></div>${p().finance ? input("newAmount", "amount", "", "text", 'inputmode="decimal"') : ""}${input("newDue", "dueDate", state.date, "date")}${check("subscriberPrice", "subscriberPrice")}${noteTextarea("newAdminNote", "adminNote")}${button("bookAppointment", "save", "primary")}`,
  );
  let selected = "",
    requestId = crypto.randomUUID(),
    seq = 0;
  const refresh = async () => {
    const ticket = ++seq;
    const service = state.data.services.find((s) => s.id === val("newService"));
    if ($("newAmount"))
      $("newAmount").value = String(
        checked("subscriberPrice")
          ? service.subscriberPrice
          : service.regularPrice,
      );
    $("newDue").value = val("slotDay");
    selected = "";
    const d = await api("availability", {
      day: val("slotDay"),
      serviceId: val("newService"),
      providerId: val("newProvider"),
    });
    if (ticket !== seq || !$("availableSlots")) return;
    slotButtons(d.slots, "availableSlots", (v) => (selected = v));
  };
  for (const id of ["newService", "newProvider", "slotDay", "subscriberPrice"])
    $(id).onchange = () => action(refresh);
  void action(refresh);
  $("bookAppointment").onclick = () =>
    action(async () => {
      if (!selected) throw Error("selectSlot");
      await api("appointment", {
        clientId: val("newClient"),
        serviceId: val("newService"),
        providerId: val("newProvider"),
        startsAt: selected,
        ...(p().finance ? { amount: val("newAmount") } : {}),
        dueDate: val("newDue"),
        administrativeNote: val("newAdminNote"),
        requestId,
      });
      closeDialog();
      await load(true);
      show("saved");
    });
}
function slotButtons(slots, id, choose, timeZone = zone()) {
  $(id).innerHTML =
    `<p>${escape(t(slots.length ? "selectSlot" : "noSlots"))}</p><div class="slots">${slots.map((v) => `<button type="button" data-slot="${escape(v)}">${escape(new Intl.DateTimeFormat(state.language, { hour: "2-digit", minute: "2-digit", timeZone: timeZone, timeZoneName: "short" }).format(new Date(v)))}</button>`).join("")}</div>`;
  $(id)
    .querySelectorAll("[data-slot]")
    .forEach(
      (b) =>
        (b.onclick = () => {
          $(id)
            .querySelectorAll("[data-slot]")
            .forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
          choose(b.dataset.slot);
        }),
    );
}
function paymentDate(day) {
  return day === dateKey(new Date(), zone())
    ? new Date().toISOString()
    : utcLocal(day + "T12:00", zone());
}
function moneyDialog(a) {
  dialog(
    "payment",
    `${input("payAmount", "amount", "", "text", 'inputmode="decimal"')}${input("payDate", "date", dateKey(new Date(), zone()), "date")}${input("payMethod", "method")}${input("payNote", "note")}<p class="hint">${escape(t("ledgerWarning"))}</p>${button("savePayment", "save", "primary")}`,
  );
  const requestId = crypto.randomUUID();
  $("savePayment").onclick = () =>
    action(async () => {
      await api("payment", {
        appointmentId: a.id,
        amount: val("payAmount"),
        date: paymentDate(val("payDate")),
        method: val("payMethod"),
        note: val("payNote"),
        requestId,
      });
      closeDialog();
      await load(true);
      show("saved");
    });
}
function renderServices() {
  if (!p().manage) return navigate("agenda");
  shell(
    `<section class="card"><div class="sectionHeader"><h2>${escape(t("services"))}</h2>${button("newServiceButton", "services", "primary")}</div><p class="hint">${escape(t("futurePercent"))}</p>${state.data.services.map((x) => `<article class="catalogItem"><div><strong>${escape(x.name)}</strong><small>${x.durationMinutes} min · ${escape(money(x.regularAmount ?? Math.round(x.regularPrice * 100), x.currency || currency()))}</small></div><button data-service="${escape(x.id)}" class="button secondary">${escape(t("edit"))}</button></article>`).join("")}</section>`,
  );
  $("newServiceButton").onclick = () => serviceForm();
  document
    .querySelectorAll("[data-service]")
    .forEach(
      (b) =>
        (b.onclick = () =>
          serviceForm(
            state.data.services.find((x) => x.id === b.dataset.service),
          )),
    );
}
function serviceForm(x = {}) {
  dialog(
    "services",
    `${input("serviceName", "name", x.name)}${input("serviceDuration", "duration", x.durationMinutes || 30, "number", 'min="5" max="720"')}${input("regularPrice", "price", x.regularPrice ?? 0, "text", 'inputmode="decimal"')}${input("serviceSubscriberPrice", "subscriberPrice", x.subscriberPrice ?? 0, "text", 'inputmode="decimal"')}${input("serviceShare", "sharePercent", x.shareBps == null ? "" : x.shareBps / 100, "text", 'inputmode="decimal"')}<p class="hint">${escape(t("futurePercent"))}</p><div class="actions">${button("saveService", "save", "primary")}${x.id ? button("archiveService", "archive") : ""}</div>`,
  );
  const payload = () => ({
    serviceId: x.id,
    name: val("serviceName"),
    durationMinutes: Number(val("serviceDuration")),
    regularPrice: val("regularPrice"),
    subscriberPrice: val("serviceSubscriberPrice"),
    sharePercent: val("serviceShare"),
  });
  $("saveService").onclick = () =>
    action(async () => {
      await api("service", payload());
      closeDialog();
      await load(true);
      show("saved");
    });
  $("archiveService")?.addEventListener("click", () =>
    action(async () => {
      if (!confirm(t("archiveConfirm"))) return;
      await api("service", { ...payload(), active: false });
      closeDialog();
      await load(true);
    }),
  );
}
function renderClients() {
  if (!p().schedule) return navigate("agenda");
  shell(
    `<section class="card"><div class="sectionHeader"><h2>${escape(t("clients"))}</h2>${button("newClientButton", "client", "primary")}</div>${input("clientSearch", "search")}<div id="clientCatalog"></div></section>`,
  );
  const update = () => {
    $("clientCatalog").innerHTML = state.data.clients
      .filter((x) =>
        `${x.name} ${x.contact}`
          .toLowerCase()
          .includes(val("clientSearch").toLowerCase()),
      )
      .map(
        (x) =>
          `<article class="catalogItem"><div><strong>${escape(x.name)}</strong><small>${escape(x.contact)}</small></div><button data-client="${escape(x.id)}" class="button secondary">${escape(t("edit"))}</button></article>`,
      )
      .join("");
    document
      .querySelectorAll("[data-client]")
      .forEach(
        (b) =>
          (b.onclick = () =>
            clientForm(
              state.data.clients.find((x) => x.id === b.dataset.client),
            )),
      );
  };
  update();
  $("clientSearch").oninput = update;
  $("newClientButton").onclick = () => clientForm();
}
function clientForm(x = {}) {
  dialog(
    "client",
    `${input("clientName", "name", x.name)}${input("clientContact", "contact", x.contact)}<div class="actions">${button("saveClient", "save", "primary")}${x.id ? button("archiveClient", "archive") : ""}</div>`,
  );
  const payload = () => ({
    clientId: x.id,
    name: val("clientName"),
    contact: val("clientContact"),
  });
  $("saveClient").onclick = () =>
    action(async () => {
      await api("client", payload());
      closeDialog();
      await load(true);
      show("saved");
    });
  $("archiveClient")?.addEventListener("click", () =>
    action(async () => {
      if (!confirm(t("archiveConfirm"))) return;
      await api("client", { ...payload(), active: false });
      closeDialog();
      await load(true);
    }),
  );
}
function renderTeam() {
  if (!p().manage) return navigate("agenda");
  shell(
    `<section class="card"><div class="sectionHeader"><h2>${escape(t("team"))}</h2>${button("newMember", "invite", "primary")}</div><p>${escape(t("inviteHelp"))}</p>${state.data.staff.map((x) => `<article class="catalogItem"><div><strong>${escape(x.name)}</strong><small>${escape(t(x.role))} ${x.role === "professional" ? `· ${x.shareBps / 100}%` : ""}</small></div><button data-member="${escape(x.id)}" class="button secondary">${escape(t("edit"))}</button></article>`).join("")}</section>`,
  );
  $("newMember").onclick = () => teamForm();
  document
    .querySelectorAll("[data-member]")
    .forEach(
      (b) =>
        (b.onclick = () =>
          teamForm(state.data.staff.find((x) => x.id === b.dataset.member))),
    );
}
function teamForm(x = {}) {
  dialog(
    "team",
    `${input("memberName", "name", x.name)}${select(
      "memberRole",
      "team",
      ["professional", "editor", "viewer"].map((id) => ({ id, name: t(id) })),
      x.role || "professional",
    )}${input("memberShare", "sharePercent", (x.shareBps || 0) / 100, "text", 'inputmode="decimal"')}${check("memberSchedule", "schedulePermission", x.role === "editor" && x.permissions?.schedule !== false)}${check("memberFinance", "financePermission", x.permissions?.finance === true)}${check("memberOwnFinance", "ownFinancePermission", x.permissions?.ownFinance === true)}${check("memberInherit", "inheritSchedule", !x.settings)}<details id="memberHours"><summary>${escape(t("ownSchedule"))}</summary>${hoursFields(x.settings || state.access.agenda.settings)}</details><p class="hint">${escape(t("futurePercent"))}</p><div class="actions">${button("saveMember", x.id ? "save" : "invite", "primary")}${x.id && !x.userId && !x.tgId ? button("renewInvite", "invite") : ""}${x.id ? button("archiveMember", "archive") : ""}</div><div id="memberInvite"></div>`,
  );
  const adjust = () => {
    const role = val("memberRole");
    $("memberSchedule").disabled = role !== "editor";
    $("memberFinance").disabled = role !== "editor";
    $("memberOwnFinance").disabled = role !== "professional";
    $("memberShare").disabled = role !== "professional";
    $("memberHours").hidden =
      role !== "professional" || checked("memberInherit");
  };
  adjust();
  bindHours(zone());
  $("memberRole").onchange = adjust;
  $("memberInherit").onchange = adjust;
  const payload = () => ({
    staffId: x.id,
    name: val("memberName"),
    role: val("memberRole"),
    sharePercent: val("memberShare"),
    settings:
      val("memberRole") === "professional" && !checked("memberInherit")
        ? readHours({ ...state.access.agenda.settings })
        : null,
    permissions: {
      schedule: checked("memberSchedule"),
      finance: checked("memberFinance"),
      ownFinance: checked("memberOwnFinance"),
    },
  });
  $("saveMember").onclick = () =>
    action(async () => {
      const data = await api("staff", payload());
      if (data.inviteToken) {
        const url = new URL(location.pathname, location.origin);
        url.searchParams.set("invite", data.inviteToken);
        $("memberInvite").innerHTML =
          `<div class="success"><p>${escape(t("inviteHelp"))}</p><a href="${escape(url.href)}">${escape(url.href)}</a>${button("copyInvite", "share")}</div>`;
        $("copyInvite").onclick = () =>
          action(async () => {
            await navigator.clipboard.writeText(url.href);
            show("copied");
          });
        $("saveMember").disabled = true;
        state.loadedRange = "";
      } else {
        closeDialog();
        await load(true);
        show("saved");
      }
    });
  $("renewInvite")?.addEventListener("click", () => {
    $("saveMember").onclick = () =>
      action(async () => {
        const data = await api("staff", {
          ...payload(),
          regenerateInvite: true,
        });
        const url = new URL(location.pathname, location.origin);
        url.searchParams.set("invite", data.inviteToken);
        $("memberInvite").innerHTML =
          `<div class="success"><p>${escape(t("inviteHelp"))}</p><a href="${escape(url.href)}">${escape(url.href)}</a>${button("copyInvite", "share")}</div>`;
        $("copyInvite").onclick = () =>
          action(async () => {
            await navigator.clipboard.writeText(url.href);
            show("copied");
          });
        $("saveMember").disabled = true;
        state.loadedRange = "";
      });
    $("saveMember").click();
  });
  $("archiveMember")?.addEventListener("click", () =>
    action(async () => {
      if (!confirm(t("archiveConfirm"))) return;
      await api("staff", { ...payload(), active: false });
      closeDialog();
      await load(true);
    }),
  );
}
function profileFields(a = {}) {
  return `${input("agendaName", "name", a.displayName)}${noteTextarea("agendaDescription", "description", a.description, 240)}${input("agendaTelegram", "telegram", a.telegramContact || "")}<div class="formGrid">${select(
    "agendaCurrency",
    "currency",
    CURRENCIES.map((id) => ({ id, name: id })),
    a.settings?.currency ||
      { pt: "BRL", en: "USD", es: "EUR", ru: "RUB" }[state.language],
  )}${input("agendaZone", "timezone", a.settings?.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC", "text", 'list="timeZones"')}<datalist id="timeZones">${(Intl.supportedValuesOf?.("timeZone") || ["UTC"]).map((z) => option(z, z)).join("")}</datalist></div>`;
}
const weekdays = () =>
  Array.from({ length: 7 }, (_, i) =>
    new Intl.DateTimeFormat(state.language, {
      weekday: "long",
      timeZone: "UTC",
    }).format(new Date(Date.UTC(2026, 0, 4 + i))),
  );
let blocks = [];
function hoursFields(cfg = {}) {
  const weekly = cfg.weekly || defaultWeekly();
  blocks = [...(cfg.blocks || [])];
  return `<h3>${escape(t("weekly"))}</h3><div class="weeklyEditor">${weekly.map((d, i) => `<fieldset><legend>${escape(weekdays()[i])}</legend>${check("workDay" + i, "day", !!d.ranges.length)}<div class="workRanges">${[0, 1].map((n) => `${input(`start${i}_${n}`, "start", d.ranges[n]?.start || "", "time")}${input(`end${i}_${n}`, "end", d.ranges[n]?.end || "", "time")}`).join("")}</div></fieldset>`).join("")}</div><div class="formGrid">${input("bufferMinutes", "buffer", cfg.bufferMinutes || 0, "number", 'min="0" max="240"')}${input("noticeMinutes", "notice", cfg.minNoticeMinutes || 0, "number", 'min="0" max="43200"')}${input("maxDays", "maxDays", cfg.maxDays || 90, "number", 'min="1" max="730"')}</div><h3>${escape(t("blocks"))}</h3><div id="blockList"></div><div class="formGrid">${input("blockStart", "start", "", "datetime-local")}${input("blockEnd", "end", "", "datetime-local")}${input("blockReason", "note")}</div>${button("addBlock", "addBlock")}`;
}
function bindHours(timeZone) {
  const update = () => {
    $("blockList").innerHTML = blocks
      .map(
        (b, i) =>
          `<article class="catalogItem"><span>${escape(localInput(b.start, timeZone))} → ${escape(localInput(b.end, timeZone))}<br>${escape(b.reason)}</span><button class="button secondary" data-remove-block="${i}">${escape(t("remove"))}</button></article>`,
      )
      .join("");
    document.querySelectorAll("[data-remove-block]").forEach(
      (b) =>
        (b.onclick = () => {
          blocks.splice(Number(b.dataset.removeBlock), 1);
          update();
        }),
    );
  };
  update();
  $("addBlock").onclick = () =>
    action(async () => {
      const start = utcLocal(val("blockStart"), timeZone),
        end = utcLocal(val("blockEnd"), timeZone);
      if (end <= start) throw Error("invalid_date");
      blocks.push({ start, end, reason: val("blockReason") });
      update();
    });
}
function readHours(base = {}) {
  return validateSettings({
    ...base,
    weekly: Array.from({ length: 7 }, (_, day) => ({
      day,
      ranges: checked("workDay" + day)
        ? [0, 1]
            .map((n) => ({
              start: val(`start${day}_${n}`),
              end: val(`end${day}_${n}`),
            }))
            .filter((r) => r.start || r.end)
        : [],
    })),
    bufferMinutes: Number(val("bufferMinutes")),
    minNoticeMinutes: Number(val("noticeMinutes")),
    maxDays: Number(val("maxDays")),
    blocks,
  });
}
function renderSettings() {
  if (!p().manage) return navigate("agenda");
  const a = state.access.agenda;
  shell(
    `<section class="card"><h2>${escape(t("settings"))}</h2>${profileFields(a)}${hoursFields(a.settings)}<div class="actions">${button("saveSettings", "save", "primary")}${button("archiveAgenda", "archive")}</div></section>`,
  );
  bindHours(a.settings.timeZone);
  $("saveSettings").onclick = () =>
    action(async () => {
      const settings = readHours({
        timeZone: val("agendaZone"),
        currency: val("agendaCurrency"),
      });
      await api("settings", {
        displayName: val("agendaName"),
        description: val("agendaDescription"),
        telegram: val("agendaTelegram"),
        settings,
      });
      state.loadedRange = "";
      await load(true);
      show("saved");
    });
  $("archiveAgenda").onclick = () =>
    action(async () => {
      if (!confirm(t("archiveConfirm"))) return;
      await api("delete");
      state.access = null;
      state.agendaId = "";
      state.loadedRange = "";
      await load(true);
    });
}
function setup() {
  if (!state.data.subscriberActive) {
    root.innerHTML = `<section class="card"><h1>${escape(t("title"))}</h1><p>${escape(t("activeOnly"))}</p>${button("subscribe", "subscribe", "primary")}</section>`;
    $("subscribe").onclick = () => location.assign("./?checkout=monthly");
    return;
  }
  const draft = state.setupDraft;
  root.innerHTML = `<section class="card"><h1>${escape(t("create"))}</h1><nav class="steps">${["profileStep", "servicesStep", "hoursStep"].map((k, i) => `<span aria-current="${state.setupStep === i ? "step" : "false"}">${i + 1}. ${escape(t(k))}</span>`).join("")}</nav>${state.setupStep === 0 ? profileFields(draft) : state.setupStep === 1 ? `${input("firstName", "service", draft.first?.name)}${input("firstDuration", "duration", draft.first?.durationMinutes || 30, "number", 'min="5" max="720"')}${input("firstPrice", "price", draft.first?.regularPrice ?? 0, "text", 'inputmode="decimal"')}${input("firstSubscriber", "subscriberPrice", draft.first?.subscriberPrice ?? 0, "text", 'inputmode="decimal"')}` : hoursFields(draft.settings)}<div class="actions">${state.setupStep ? button("setupPrevious", "previous") : ""}${button("setupNext", state.setupStep === 2 ? "create" : "next", "primary")}</div></section>`;
  if (state.setupStep === 2) bindHours(draft.settings.timeZone);
  $("setupPrevious")?.addEventListener("click", () => {
    state.setupStep--;
    setup();
  });
  $("setupNext").onclick = () =>
    action(async () => {
      if (state.setupStep === 0) {
        if (!val("agendaName")) throw Error("name_required");
        Object.assign(draft, {
          displayName: val("agendaName"),
          description: val("agendaDescription"),
          telegram: val("agendaTelegram"),
          settings: validateSettings({
            timeZone: val("agendaZone"),
            currency: val("agendaCurrency"),
          }),
        });
        state.setupStep = 1;
        setup();
      } else if (state.setupStep === 1) {
        if (!val("firstName")) throw Error("invalid_service");
        draft.first = {
          name: val("firstName"),
          durationMinutes: Number(val("firstDuration")),
          regularPrice: val("firstPrice"),
          subscriberPrice: val("firstSubscriber"),
        };
        state.setupStep = 2;
        setup();
      } else {
        draft.settings = readHours(draft.settings);
        const data = await api("create", draft);
        state.agendaId = data.agenda.id;
        state.view = "agenda";
        state.date = dateKey(new Date(), draft.settings.timeZone);
        await load(true);
        remember(false);
        show("setupComplete");
      }
    });
}
async function renderFinance() {
  if (!p().finance && !p().ownFinance) return navigate("agenda");
  const month = state.date.slice(0, 7),
    key = state.agendaId + month + state.provider + state.service;
  const ticket = ++navigationEpoch;
  const data =
    financialCache?.key === key
      ? financialCache.data
      : await api("financial", {
          month,
          providerId: state.provider,
          serviceId: state.service,
        });
  if (ticket !== navigationEpoch || state.view !== "finance") return;
  financialCache = { key, data };
  shell(
    `<section class="card"><h2>${escape(t("finance"))}</h2><div class="filters">${input("financeMonth", "month", month, "month")}${state.access.role !== "professional" ? select("financeProvider", "professional", providers(), state.provider, true) : ""}${select("financeService", "serviceFilter", state.data.services, state.service, true)}</div><p class="hint">${escape(t("financialHelp"))}</p>${data.currencies
      .map(
        (g) =>
          `<h3>${escape(g.currency)}</h3><section class="summary financeSummary">${[
            ["totalServices", "services"],
            ["monthReceived", "received"],
            ["clientsDue", "due"],
            ["pastDue", "overdue"],
            ["company", "company"],
            ["professionalShare", "professional"],
            ["monthPayouts", "payouts"],
            ["payoutDue", "payoutDue"],
          ]
            .filter(
              ([k]) =>
                state.access.role !== "professional" ||
                ["professionalShare", "monthPayouts", "payoutDue"].includes(k),
            )
            .map(
              ([k, v]) =>
                `<article><small>${escape(t(k))}</small><strong>${escape(money(g[v], g.currency))}</strong></article>`,
            )
            .join("")}</section><div class="financeChart">${data.daily
            .filter((x) => x.currency === g.currency)
            .map(
              (x) =>
                `<div><small>${escape(x.date.slice(8))}</small><span style="--bar:${Math.max(2, (100 * x.amount) / Math.max(1, ...data.daily.filter((d) => d.currency === g.currency).map((d) => d.amount)))}%"></span><small>${escape(money(x.amount, g.currency))}</small></div>`,
            )
            .join("")}</div>`,
      )
      .join(
        "",
      )}<h3>${escape(t("professional"))}</h3>${data.professionals.map((x, i) => `<button class="professionalRow" data-finance-professional="${i}"><strong>${escape(x.name || t("unassigned"))}</strong><span>${escape(t("attendances"))}: ${x.attended}</span><span>${escape(t("paidAppointments"))}: ${x.paidAppointments}</span><span>${escape(t("payoutDue"))}: ${escape(money(x.payoutDue, x.currency))}</span></button>`).join("")}</section>`,
  );
  $("financeMonth").onchange = () => {
    state.date = val("financeMonth") + "-01";
    financialCache = null;
    remember();
    void action(renderFinance);
  };
  for (const id of ["financeProvider", "financeService"])
    $(id)?.addEventListener("change", () => {
      state[id === "financeProvider" ? "provider" : "service"] = val(id);
      financialCache = null;
      void action(renderFinance);
    });
  document
    .querySelectorAll("[data-finance-professional]")
    .forEach(
      (b) =>
        (b.onclick = () =>
          action(() =>
            professionalFinance(
              data.professionals[Number(b.dataset.financeProfessional)],
            ),
          )),
    );
}
async function professionalFinance(x) {
  const detail = await api("financial/details", {
    providerId: x.providerId,
    currency: x.currency,
  });
  const rows = detail.appointments;
  for (const a of rows) detailAppointments.set(a.id, a);
  dialog(
    "details",
    `<h3>${escape(x.name || t("unassigned"))}</h3><p>${escape(t("attendances"))}: ${x.attended}<br>${escape(t("paidAppointments"))}: ${x.paidAppointments}<br>${escape(t("partialAppointments"))}: ${x.partialAppointments}<br>${escape(t("unpaidAppointments"))}: ${x.unpaidAppointments}</p><section class="summary">${[
      ["received", "received"],
      ["company", "company"],
      ["professionalShare", "professional"],
      ["payouts", "payouts"],
      ["payoutDue", "payoutDue"],
    ]
      .filter(
        ([k]) =>
          state.access.role !== "professional" ||
          ["professionalShare", "payouts", "payoutDue"].includes(k),
      )
      .map(
        ([k, v]) =>
          `<article><small>${escape(t(k))}</small><strong>${escape(money(x[v], x.currency))}</strong></article>`,
      )
      .join(
        "",
      )}</section><div id="professionalDetailRows">${rows.map(appointmentCard).join("")}</div>${rows.length < detail.total ? button("moreFinancialRows", "loadMore") : ""}${p().finance && x.payoutDue > 0 ? `${input("payoutAmount", "amount", "", "text", 'inputmode="decimal"')}${input("payoutDate", "date", dateKey(new Date(), zone()), "date")}${input("payoutMethod", "method")}${input("payoutNote", "note")}${button("savePayout", "payout", "primary")}` : ""}`,
  );
  document
    .querySelectorAll("#agendaDialog [data-appointment]")
    .forEach(
      (b) => (b.onclick = () => appointmentDetail(b.dataset.appointment)),
    );
  $("moreFinancialRows")?.addEventListener("click", () =>
    action(async () => {
      const next = await api("financial/details", {
        providerId: x.providerId,
        currency: x.currency,
        offset: rows.length,
      });
      rows.push(...next.appointments);
      for (const a of next.appointments) detailAppointments.set(a.id, a);
      $("professionalDetailRows").innerHTML = rows
        .map(appointmentCard)
        .join("");
      $("moreFinancialRows").hidden = rows.length >= detail.total;
      document
        .querySelectorAll("#agendaDialog [data-appointment]")
        .forEach(
          (b) => (b.onclick = () => appointmentDetail(b.dataset.appointment)),
        );
    }),
  );
  const requestId = crypto.randomUUID();
  $("savePayout")?.addEventListener("click", () =>
    action(async () => {
      await api("payout", {
        providerId: x.providerId,
        currency: x.currency,
        amount: val("payoutAmount"),
        date: paymentDate(val("payoutDate")),
        method: val("payoutMethod"),
        note: val("payoutNote"),
        requestId,
      });
      closeDialog();
      await load(true);
      show("saved");
    }),
  );
}
async function privateNote(a) {
  dialog(
    "privateNote",
    `<p>${escape(t("noteHelp"))}</p><p class="hint">${escape(t("recoveryHelp"))}</p>${input("notePassword", "password", "", "password", 'autocomplete="off" minlength="12"')}${button("unlockNote", "unlock", "primary")}<div id="noteEditor"></div>`,
  );
  $("notePassword").value = password;
  $("unlockNote").onclick = () =>
    action(async () => {
      password = val("notePassword");
      if (password.length < 12) throw Error("noteFailure");
      const data = await api("note/get", { appointmentId: a.id });
      let plain = "";
      try {
        if (data.note)
          plain = await decryptNote(
            data.note.encrypted,
            password,
            `${uid()}:${a.id}`,
          );
      } catch {
        throw Error("noteFailure");
      }
      $("noteEditor").innerHTML =
        `${noteTextarea("privateNoteText", "privateNote", plain, 20000)}${button("saveNote", "save", "primary")}`;
      let version = data.note?.version || 0;
      $("saveNote").onclick = () =>
        action(async () => {
          const encrypted = await encryptNote(
            val("privateNoteText"),
            password,
            `${uid()}:${a.id}`,
          );
          const saved = await api("note/save", {
            appointmentId: a.id,
            encrypted: { ...encrypted, expectedVersion: version },
          });
          version = saved.version;
          show("saved");
        });
    });
}
async function backupNotes() {
  return action(async () => {
    const data = await api("note/backup");
    download(
      JSON.stringify(
        { format: "educashpro-private-notes-v1", ...data },
        null,
        2,
      ),
      "educashpro-private-notes.json",
      "application/json",
    );
    show("recoveryHelp");
  });
}
function restoreNotes() {
  dialog(
    "restoreNotes",
    `<p>${escape(t("restoreHelp"))}</p><input id="notesFile" type="file" accept="application/json">${button("restoreNotesButton", "restoreNotes", "primary")}`,
  );
  $("restoreNotesButton").onclick = () =>
    action(async () => {
      const file = $("notesFile").files[0];
      if (!file || file.size > 5e6) throw Error("invalid_note");
      const data = JSON.parse(await file.text());
      if (
        data.format !== "educashpro-private-notes-v1" ||
        data.authorKey !== uid() ||
        !Array.isArray(data.notes)
      )
        throw Error("invalid_note");
      for (const note of data.notes)
        await api("note/restore", {
          backup: {
            format: data.format,
            authorKey: data.authorKey,
            notes: [note],
          },
        });
      closeDialog();
      show("restoreSuccess");
    });
}
function foldCalendarLine(line) {
  let out = "",
    part = "",
    bytes = 0;
  for (const char of line) {
    const n = new TextEncoder().encode(char).length;
    if (bytes + n > 73) {
      out += part + "\r\n ";
      part = "";
      bytes = 1;
    }
    part += char;
    bytes += n;
  }
  return out + part;
}
function calendarFile(a) {
  const compact = (v) =>
      new Date(v)
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}/, ""),
    safe = (s) =>
      String(s || "")
        .replace(/\\/g, "\\\\")
        .replace(/\r?\n/g, "\\n")
        .replace(/,/g, "\\,")
        .replace(/;/g, "\\;"),
    lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//EduCashPro//Agenda//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:${a.id}@educashpro.vip`,
      `DTSTAMP:${compact(new Date())}`,
      `DTSTART:${compact(a.startsAt)}`,
      `DTEND:${compact(+new Date(a.startsAt) + a.durationMinutes * 60000)}`,
      `SUMMARY:${safe(a.serviceName)}`,
      `DESCRIPTION:${safe(a.providerName || "")}`,
      `STATUS:${a.status === "cancelled" ? "CANCELLED" : "CONFIRMED"}`,
      "BEGIN:VALARM",
      "TRIGGER:-PT30M",
      "ACTION:DISPLAY",
      `DESCRIPTION:${safe(t("reminder"))}`,
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ];
  download(
    lines.map((l) => foldCalendarLine(l)).join("\r\n") + "\r\n",
    "educashpro-appointment.ics",
    "text/calendar;charset=utf-8",
  );
}
async function publicPage() {
  const data = await api("public", { publicId: state.publicId });
  if (
    ["pt", "en", "es", "ru"].includes(
      new URL(location.href).searchParams.get("lang"),
    )
  )
    state.language = new URL(location.href).searchParams.get("lang");
  else if (data.agenda.language) state.language = data.agenda.language;
  document.documentElement.lang = state.language;
  $("subtitle").textContent = t("title");
  const z = data.agenda.settings.timeZone;
  root.innerHTML = `<header class="agendaHero"><h1>${escape(data.agenda.displayName)}</h1><p>${escape(data.agenda.description || t("publicLead"))}</p></header><section class="card"><h2>${escape(t("request"))}</h2><p>${escape(t("publicLead"))}</p>${!data.acceptingAppointments ? `<div class="notice">${escape(t("inactive"))}</div>` : ""}${select(
    "publicService",
    "service",
    data.services.map((s) => ({
      id: s.id,
      name: `${s.name} · ${s.durationMinutes} min · ${t("price")}: ${money(s.regularAmount ?? Math.round(s.regularPrice * 100), s.currency || data.agenda.settings.currency)} · ${t("subscriberPrice")}: ${money(s.subscriberAmount ?? Math.round(s.subscriberPrice * 100), s.currency || data.agenda.settings.currency)}`,
    })),
  )}${select("publicProvider", "professional", data.providers.length ? data.providers : [{ id: "", name: data.agenda.displayName }])}${input("publicDay", "date", dateKey(new Date(), z), "date")}<p class="hint">${escape(z)}</p><div id="publicSlots"></div>${input("publicName", "name")}${input("publicContact", "contact")}${button("requestPublic", "request", "primary")}<div id="publicResult"></div></section><section class="card"><h2>${escape(t("lookup"))}</h2>${input("lookupCode", "code")}${button("lookupButton", "lookup")}<div id="lookupResult"></div></section>`;
  let selected = "",
    seq = 0,
    requestId = crypto.randomUUID();
  $("requestPublic").disabled =
    !data.acceptingAppointments || !data.services.length;
  const refresh = async () => {
    selected = "";
    if (!data.services.length) return;
    const ticket = ++seq,
      d = await api("availability", {
        publicId: state.publicId,
        day: val("publicDay"),
        serviceId: val("publicService"),
        providerId: val("publicProvider"),
      });
    if (ticket !== seq || !$("publicSlots")) return;
    slotButtons(d.slots, "publicSlots", (v) => (selected = v), z);
  };
  for (const id of ["publicService", "publicProvider", "publicDay"])
    $(id).onchange = () => action(refresh);
  if (data.acceptingAppointments) await refresh();
  $("requestPublic").onclick = () =>
    action(async () => {
      if (!selected) throw Error("selectSlot");
      const result = await api("request", {
        publicId: state.publicId,
        serviceId: val("publicService"),
        providerId: val("publicProvider"),
        startsAt: selected,
        clientName: val("publicName"),
        contact: val("publicContact"),
        requestId,
      });
      const url = new URL(location.pathname, location.origin);
      url.searchParams.set("appointment", result.appointment.lookupToken);
      $("publicResult").innerHTML =
        `<div class="success"><p>${escape(t("requestSent"))}</p><a href="${escape(url.href)}">${escape(url.href)}</a>${button("publicCalendar", "calendar")}</div>`;
      $("publicCalendar").onclick = () => calendarFile(result.appointment);
      $("requestPublic").disabled = true;
    });
  $("lookupButton").onclick = () => action(() => lookup(val("lookupCode")));
}
async function lookup(token) {
  const parsed =
      String(token).match(/[?&]appointment=([^&]+)/)?.[1] ||
      String(token).trim(),
    data = await api("lookup", { lookupToken: decodeURIComponent(parsed) }),
    a = data.appointment;
  const container = $("lookupResult") || root;
  container.innerHTML = `<section class="card"><h2>${escape(data.agenda.displayName)}</h2><p>${escape(a.serviceName)} · ${escape(a.providerName)}<br>${escape(new Intl.DateTimeFormat(state.language, { dateStyle: "short", timeStyle: "short", timeZone: a.timeZone || data.agenda.settings?.timeZone || "UTC" }).format(new Date(a.startsAt)))}<br>${escape(t(a.status))}</p>${button("lookupCalendar", "calendar")}${a.status === "requested" ? button("clientConfirm", "confirm", "primary") : ""}</section>`;
  $("lookupCalendar").onclick = () => calendarFile(a);
  $("clientConfirm")?.addEventListener("click", () =>
    action(async () => {
      await api("lookup/confirm", { lookupToken: parsed });
      await lookup(parsed);
    }),
  );
}
async function init() {
  try {
    await Promise.race([
      window.__EDUCASHPRO_TELEGRAM_SDK_PROMISE__ || Promise.resolve(),
      new Promise((resolve) => setTimeout(resolve, 3000)),
    ]);
    try {
      window.Telegram?.WebApp?.ready();
      window.Telegram?.WebApp?.expand();
    } catch {}
    const query = new URL(location.href).searchParams;
    state.publicId = query.get("agenda") || "";
    const stored = window.EduCashProPlatform?.readWebSession?.();
    if (stored?.token) {
      state.token = stored.token;
      state.profile = stored.profile;
      state.language = stored.profile?.language || state.language;
      try { sessionStorage.removeItem("educashpro:agenda-return"); } catch {}
    }
    if (!COPY[state.language]) state.language = "pt";
    $("subtitle").textContent = t("title");
    $("back").ariaLabel = t("back");
    $("close").ariaLabel = t("close");
    $("back").onclick = () =>
      history.length > 1 ? history.back() : location.assign("./");
    $("close").onclick = () => window.EduCashProPlatform?.close?.();
    document.documentElement.lang = state.language;
    if (state.publicId) {
      await publicPage();
      return;
    }
    if (query.get("appointment")) {
      await lookup(query.get("appointment"));
      return;
    }
    if (!state.token) {
      const initData =
        window.EduCashProPlatform?.telegramInitData?.() ||
        window.Telegram?.WebApp?.initData;
      if (!initData) {
        if (query.get("invite"))
          try {
            const key = "educashpro:agenda-return";
            const path = location.pathname + location.search;
            const now = Date.now();
            let previous = null;
            try { previous = JSON.parse(sessionStorage.getItem(key) || "null"); } catch {}
            const same =
              previous?.path === path &&
              now - Number(previous?.createdAt || 0) >= 0 &&
              now - Number(previous?.createdAt || 0) < 60 * 60 * 1000;
            const attempts = same
              ? Math.max(1, Number(previous?.attempts || 1)) + 1
              : 1;
            sessionStorage.setItem(
              key,
              JSON.stringify({
                path,
                createdAt: same ? Number(previous.createdAt) : now,
                attempts,
              }),
            );
          } catch {}
        location.assign("./");
        return;
      }
      const response = await fetch(`${API_BASE}/api/hub/session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ initData }),
        }),
        s = await response.json();
      if (!s.token) throw Error("session_required");
      state.token = s.token;
      state.profile = s.profile;
      state.language = s.profile.language || "pt";
    }
    state.date = /^\d{4}-\d\d-\d\d$/.test(query.get("date") || "")
      ? query.get("date")
      : dateKey(new Date(), Intl.DateTimeFormat().resolvedOptions().timeZone);
    state.agendaId = query.get("agendaId") || "";
    const requestedView =
      { appointments: "agenda", staff: "team" }[query.get("view")] ||
      query.get("view");
    state.view = [
      "agenda",
      "services",
      "clients",
      "team",
      "finance",
      "settings",
    ].includes(requestedView)
      ? requestedView
      : "agenda";
    if (query.get("invite")) {
      root.innerHTML = `<section class="card"><h1>${escape(t("acceptInvite"))}</h1><p>${escape(t("acceptInviteHelp"))}</p>${button("acceptInvite", "acceptInvite", "primary")}</section>`;
      $("acceptInvite").onclick = () =>
        action(async () => {
          const d = await api("invite/accept", {
            inviteToken: query.get("invite"),
          });
          state.agendaId = d.agendaId;
          history.replaceState(
            {},
            "",
            location.pathname + "?agendaId=" + encodeURIComponent(d.agendaId),
          );
          await load(true);
          show("accepted");
        });
      return;
    }
    await load();
  } catch (e) {
    root.innerHTML = `<section class="card"><h2>${escape(t("error"))}</h2>${button("retry", "loading")}</section>`;
    $("retry").onclick = () => location.reload();
    console.warn("Agenda start failed", e.message);
  }
}
window.addEventListener("popstate", () => {
  const query = new URL(location.href).searchParams;
  state.view = query.get("view") || "agenda";
  state.date = query.get("date") || state.date;
  state.agendaId = query.get("agendaId") || state.agendaId;
  closeDialog();
  void action(() => load());
});
window.addEventListener("pagehide", () => {
  password = "";
});
window.EduCashProAgenda = { state, init };
void init();
