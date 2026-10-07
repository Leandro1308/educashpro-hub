// Shared browser/server rules. Money is stored in integer minor units.
export const CURRENCIES = [
  "BRL",
  "USD",
  "EUR",
  "GBP",
  "RUB",
  "MXN",
  "ARS",
  "CLP",
  "COP",
  "PEN",
  "CAD",
  "AUD",
  "CHF",
  "JPY",
  "CNY",
  "INR",
  "USDT",
];
export const STATUSES = [
  "requested",
  "confirmed",
  "attended",
  "rescheduled",
  "cancelled",
];
export const minorDigits = (c) =>
  c === "USDT"
    ? 2
    : new Intl.NumberFormat("en", {
        style: "currency",
        currency: c,
      }).resolvedOptions().maximumFractionDigits;
export function minor(value, currency = "BRL") {
  const s = String(value ?? "")
    .trim()
    .replace(",", ".");
  if (!/^\d+(?:\.\d+)?$/.test(s)) throw Error("invalid_amount");
  if (s.length > 128) throw Error("invalid_amount");
  const digits = minorDigits(currency),
    [whole, fraction = ""] = s.split("."),
    fractionPadded = fraction.padEnd(digits, "0"),
    scale = 10n ** BigInt(digits);
  const units =
    BigInt(whole) * scale +
    BigInt(fractionPadded.slice(0, digits) || "0") +
    (Number(fraction[digits] || 0) >= 5 ? 1n : 0n);
  const n = Number(units);
  if (!Number.isSafeInteger(n) || n < 0 || n > 1e12)
    throw Error("invalid_amount");
  return n;
}
export function percentBps(value) {
  const n = Number(String(value ?? 0).replace(",", "."));
  if (!Number.isFinite(n) || n < 0 || n > 100) throw Error("invalid_percent");
  return Math.round(n * 100);
}
export function split(received, bps) {
  if (
    !Number.isSafeInteger(received) ||
    received < 0 ||
    !Number.isInteger(bps) ||
    bps < 0 ||
    bps > 10000
  )
    throw Error("invalid_amount");
  const professional = Number(
    (BigInt(received) * BigInt(bps) + 5000n) / 10000n,
  );
  return { professional, company: received - professional };
}
export function paymentSummary(a, now = new Date()) {
  const received = (a.payments || []).reduce((n, p) => n + p.amount, 0),
    due = Math.max(0, (a.amount ?? 0) - received),
    shares = split(received, a.shareBps ?? 0),
    paidOut = (a.payouts || []).reduce((n, p) => n + p.amount, 0);
  return {
    received,
    due,
    ...shares,
    paidOut,
    payoutDue: Math.max(0, shares.professional - paidOut),
    paymentStatus:
      due === 0
        ? "paid"
        : a.dueDate && a.dueDate < dateKey(now, a.timeZone || "UTC")
          ? "overdue"
          : received > 0
            ? "partial"
            : "pending",
  };
}
export function zoneValid(zone) {
  try {
    new Intl.DateTimeFormat("en", { timeZone: zone }).format();
    return true;
  } catch {
    return false;
  }
}
const formatters = new Map();
export function localParts(value, zone) {
  if (!formatters.has(zone))
    formatters.set(
      zone,
      new Intl.DateTimeFormat("en-CA", {
        timeZone: zone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      }),
    );
  return Object.fromEntries(
    formatters
      .get(zone)
      .formatToParts(new Date(value))
      .filter((x) => x.type !== "literal")
      .map((x) => [x.type, x.value]),
  );
}
export function localInput(value, zone) {
  const p = localParts(value, zone);
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}
export const dateKey = (value, zone) => localInput(value, zone).slice(0, 10);
export function utcCandidates(local, zone) {
  if (!/^\d{4}-\d\d-\d\dT\d\d:\d\d$/.test(local) || !zoneValid(zone)) return [];
  const target = Date.parse(local + "Z");
  if (!Number.isFinite(target)) return [];
  const offsets = new Set();
  for (const delta of [-86400000, 0, 86400000]) {
    const instant = target + delta,
      p = localInput(instant, zone);
    offsets.add(Date.parse(p + "Z") - Math.floor(instant / 60000) * 60000);
  }
  return [...offsets]
    .map((offset) => target - offset)
    .filter((n) => localInput(n, zone) === local)
    .sort((a, b) => a - b)
    .map((n) => new Date(n).toISOString());
}
export function utcLocal(local, zone) {
  const candidates = utcCandidates(local, zone);
  if (candidates.length !== 1)
    throw Error(candidates.length ? "ambiguous_time" : "invalid_time");
  return candidates[0];
}
export const defaultWeekly = () =>
  Array.from({ length: 7 }, (_, day) => ({
    day,
    ranges:
      day === 0 || day === 6
        ? []
        : [
            { start: "09:00", end: "12:00" },
            { start: "13:00", end: "18:00" },
          ],
  }));
export function validateSettings(input = {}) {
  const timeZone = String(input.timeZone || "UTC");
  if (!zoneValid(timeZone)) throw Error("invalid_timezone");
  const currency = input.currency || "BRL";
  if (!CURRENCIES.includes(currency)) throw Error("invalid_currency");
  const weekly = input.weekly || defaultWeekly();
  if (!Array.isArray(weekly) || weekly.length !== 7)
    throw Error("invalid_schedule");
  const clean = weekly.map((x, day) => {
    if (x.day !== day || !Array.isArray(x.ranges) || x.ranges.length > 4)
      throw Error("invalid_schedule");
    let previous = "00:00";
    const ranges = x.ranges.map((r) => {
      if (
        !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(r.start) ||
        !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(r.end) ||
        r.end <= r.start ||
        r.start < previous
      )
        throw Error("invalid_schedule");
      previous = r.end;
      return { start: r.start, end: r.end };
    });
    return { day, ranges };
  });
  const blocks = input.blocks || [];
  if (!Array.isArray(blocks) || blocks.length > 100)
    throw Error("invalid_schedule");
  const integer = (v, max) => {
    v = Number(v ?? 0);
    if (!Number.isInteger(v) || v < 0 || v > max)
      throw Error("invalid_schedule");
    return v;
  };
  return {
    timeZone,
    currency,
    weekly: clean,
    bufferMinutes: integer(input.bufferMinutes, 240),
    minNoticeMinutes: integer(input.minNoticeMinutes, 43200),
    maxDays: Math.max(1, integer(input.maxDays ?? 90, 730)),
    blocks: blocks.map((b) => {
      const start = new Date(b.start),
        end = new Date(b.end);
      if (!Number.isFinite(+start) || !Number.isFinite(+end) || end <= start)
        throw Error("invalid_schedule");
      return {
        start: start.toISOString(),
        end: end.toISOString(),
        reason: String(b.reason || "").slice(0, 120),
      };
    }),
  };
}
export function scheduleAllows(start, duration, settings, now = Date.now()) {
  const ms = +new Date(start),
    end = ms + duration * 60000,
    zone = settings.timeZone;
  if (
    ms < now + (settings.minNoticeMinutes || 0) * 60000 ||
    ms > now + (settings.maxDays || 90) * 86400000
  )
    return false;
  if (
    settings.blocks?.some(
      (b) => ms < +new Date(b.end) && end > +new Date(b.start),
    )
  )
    return false;
  const key = dateKey(ms, zone);
  if (dateKey(end, zone) !== key) return false;
  const day = new Date(key + "T12:00:00Z").getUTCDay(),
    time = localInput(ms, zone).slice(11),
    endTime = localInput(end, zone).slice(11);
  return (settings.weekly?.[day]?.ranges || []).some(
    (r) => time >= r.start && endTime <= r.end && endTime > time,
  );
}
export function overlaps(a, b, buffer = 0) {
  if (a.status === "cancelled" || b.status === "cancelled") return false;
  return (
    +new Date(a.startsAt) <
      +new Date(b.startsAt) + (b.durationMinutes + buffer) * 60000 &&
    +new Date(b.startsAt) <
      +new Date(a.startsAt) + (a.durationMinutes + buffer) * 60000
  );
}
export function slots(
  day,
  duration,
  settings,
  appointments = [],
  providerId = "",
  now = Date.now(),
) {
  if (!/^\d{4}-\d\d-\d\d$/.test(day)) throw Error("invalid_date");
  const weekday = new Date(day + "T12:00Z").getUTCDay(),
    result = [];
  for (const r of settings.weekly[weekday].ranges) {
    const n = (t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
    for (let m = n(r.start); m + duration <= n(r.end); m += 15) {
      const local =
        day +
        "T" +
        String(Math.floor(m / 60)).padStart(2, "0") +
        ":" +
        String(m % 60).padStart(2, "0");
      for (const startsAt of utcCandidates(local, settings.timeZone)) {
        const a = { startsAt, durationMinutes: duration, status: "confirmed" };
        if (
          scheduleAllows(startsAt, duration, settings, now) &&
          !appointments.some(
            (b) =>
              String(b.providerId || "") === String(providerId) &&
              overlaps(a, b, settings.bufferMinutes),
          )
        )
          result.push(startsAt);
      }
    }
  }
  return result;
}
export function financialReport(
  rows,
  {
    month,
    timeZone = "UTC",
    providerId = "",
    serviceId = "",
    now = new Date(),
  } = {},
) {
  const groups = new Map(),
    professionals = new Map(),
    daily = new Map();
  const group = (c) => {
    if (!groups.has(c))
      groups.set(c, {
        currency: c,
        services: 0,
        received: 0,
        due: 0,
        overdue: 0,
        company: 0,
        professional: 0,
        payouts: 0,
        payoutDue: 0,
      });
    return groups.get(c);
  };
  for (const a of rows) {
    if (
      (providerId && String(a.providerId) !== providerId) ||
      (serviceId && String(a.serviceId) !== serviceId)
    )
      continue;
    const c = a.currency || "BRL",
      g = group(c),
      s = paymentSummary(a, now),
      key = `${a.providerId || ""}:${c}`;
    if (!professionals.has(key))
      professionals.set(key, {
        providerId: String(a.providerId || ""),
        name: a.providerName || "",
        currency: c,
        attended: 0,
        paidAppointments: 0,
        partialAppointments: 0,
        unpaidAppointments: 0,
        received: 0,
        company: 0,
        professional: 0,
        payouts: 0,
        payoutDue: 0,
      });
    const p = professionals.get(key);
    if (
      a.status === "attended" &&
      dateKey(a.startsAt, timeZone).startsWith(month)
    ) {
      g.services += a.amount || 0;
      p.attended++;
      if (s.due === 0) p.paidAppointments++;
      else if (s.received) p.partialAppointments++;
      else p.unpaidAppointments++;
    }
    if (a.status !== "cancelled") {
      g.due += s.due;
      if (s.paymentStatus === "overdue") g.overdue += s.due;
    }
    g.payoutDue += s.payoutDue;
    p.payoutDue += s.payoutDue;
    let cumulative = 0;
    for (const payment of a.payments || []) {
      const before = split(cumulative, a.shareBps || 0);
      cumulative += payment.amount;
      const after = split(cumulative, a.shareBps || 0);
      if (dateKey(payment.date, timeZone).startsWith(month)) {
        const professional = after.professional - before.professional,
          company = payment.amount - professional;
        g.received += payment.amount;
        g.company += company;
        g.professional += professional;
        p.received += payment.amount;
        p.company += company;
        p.professional += professional;
        const dk = dateKey(payment.date, timeZone);
        daily.set(`${dk}:${c}`, {
          date: dk,
          currency: c,
          amount: (daily.get(`${dk}:${c}`)?.amount || 0) + payment.amount,
        });
      }
    }
    for (const payout of a.payouts || []) {
      if (dateKey(payout.date, timeZone).startsWith(month)) {
        g.payouts += payout.amount;
        p.payouts += payout.amount;
      }
    }
  }
  return {
    currencies: [...groups.values()],
    professionals: [...professionals.values()],
    daily: [...daily.values()].sort((a, b) => a.date.localeCompare(b.date)),
  };
}
