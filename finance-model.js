(function () {
  "use strict";
  const cents = (v) => Math.round(Number(v || 0) * 100);
  const money = (v) => cents(v) / 100;
  function parseAmount(value) {
    let s = String(value ?? "")
      .trim()
      .replace(/[\s\u00a0\u202f]/g, "");
    if (!/^\d+[.,\d]*$/.test(s)) return NaN;
    if (s.includes(",") && s.includes(".")) {
      const decimal = s.lastIndexOf(",") > s.lastIndexOf(".") ? "," : ".";
      s = s
        .split(decimal === "." ? "," : ".")
        .join("")
        .replace(decimal, ".");
    } else if (s.includes(",")) s = s.replace(",", ".");
    return /^\d+(\.\d{1,2})?$/.test(s) && Number(s) <= 1e9
      ? money(Number(s))
      : NaN;
  }
  const validMonth = (m) => /^\d{4}-(0[1-9]|1[0-2])$/.test(String(m));
  function shiftMonth(m, n) {
    const [y, k] = m.split("-").map(Number);
    const d = new Date(Date.UTC(y, k - 1 + n, 1));
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
  }
  function dateInMonth(month, day) {
    const [y, m] = month.split("-").map(Number);
    const end = new Date(Date.UTC(y, m, 0)).getUTCDate();
    return `${month}-${String(Math.min(end, Math.max(1, Number(day) || 1))).padStart(2, "0")}`;
  }
  function normalize(record = {}) {
    return {
      ...record,
      income: money(record.income),
      expenses: Array.isArray(record.expenses) ? record.expenses : [],
      budgets: record.budgets || {},
      goals: Array.isArray(record.goals) ? record.goals : [],
    };
  }
  function totals(record) {
    record = normalize(record);
    const all = record.expenses.reduce((n, x) => n + cents(x.amount), 0);
    const paid = record.expenses
      .filter((x) => x.paid !== false)
      .reduce((n, x) => n + cents(x.amount), 0);
    return {
      spent: all / 100,
      paid: paid / 100,
      pending: (all - paid) / 100,
      balance: (cents(record.income) - all) / 100,
      cash: (cents(record.income) - paid) / 100,
    };
  }
  function byCategory(record) {
    const values = {};
    for (const x of normalize(record).expenses)
      values[x.category] = (values[x.category] || 0) + cents(x.amount);
    return Object.entries(values)
      .map(([id, value]) => ({ id, amount: value / 100 }))
      .sort((a, b) => b.amount - a.amount);
  }
  function schedule(item, { month, kind = "once", count = 1, day = 1 } = {}) {
    if (
      !validMonth(month) ||
      !["once", "recurring", "installments"].includes(kind)
    )
      throw Error("invalid_schedule");
    count = kind === "once" ? 1 : Number(count);
    if (!Number.isInteger(count) || count < 1 || count > 120)
      throw Error("invalid_count");
    const total = cents(item.amount),
      base = Math.floor(total / count),
      remainder = total % count;
    if (!(total > 0) || (kind === "installments" && base < 1))
      throw Error("invalid_amount");
    return Array.from({ length: count }, (_, i) => {
      const key = shiftMonth(month, i);
      return {
        month: key,
        item: {
          ...item,
          id: `${item.id}:${i}`,
          amount:
            kind === "installments"
              ? (base + (i < remainder ? 1 : 0)) / 100
              : item.amount,
          date: dateInMonth(key, day),
          kind,
          installment: kind === "installments" ? i + 1 : null,
          installments: kind === "installments" ? count : null,
        },
      };
    });
  }
  window.EduCashProFinanceModel = {
    parseAmount,
    shiftMonth,
    dateInMonth,
    normalize,
    totals,
    byCategory,
    schedule,
  };
})();
