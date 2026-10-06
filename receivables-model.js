(function () {
  'use strict';
  const F = window.EduCashProFinanceModel;
  const currencies = ['USD','EUR','BRL','GBP','MXN','ARS','COP','RUB','USDT','CAD','AUD','CHF','JPY','CNY','INR','CLP','PEN'];
  const cents = n => Math.round(Number(n) * 100);
  const today = () => { const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
  function validDate(s) { if(!/^\d{4}-\d{2}-\d{2}$/.test(s))return false;const d=new Date(s+'T12:00:00Z');return Number.isFinite(+d)&&d.toISOString().slice(0,10)===s; }
  const id = () => window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  function normalize(x) {
    if(!x || typeof x!=='object'||Array.isArray(x))throw Error('invalid');
    const value=F.parseAmount(x.value),due=String(x.due||''),client=String(x.client||'').trim();
    if(!(value>0)||!validDate(due)||!client||client.length>120||!currencies.includes(x.currency||'USD'))throw Error('invalid');
    let payments=Array.isArray(x.payments)?x.payments.map(p=>{
      const amount=F.parseAmount(p.amount),date=String(p.date||'');
      if(!(amount>0)||!validDate(date))throw Error('invalid');
      return {id:String(p.id||id()),amount,date,note:String(p.note||'').slice(0,300)};
    }):[];
    // Keep fully received legacy records and their original received date.
    if(!Array.isArray(x.payments)&&x.status==='received') {const d=new Date(Number(x.receivedAt)||Date.now());payments=[{id:id(),amount:value,date:Number.isFinite(+d)?`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`:today(),note:''}];}
    if(payments.reduce((s,p)=>s+cents(p.amount),0)>cents(value))throw Error('invalid');
    return {id:String(x.id||id()),client,description:String(x.description||'').slice(0,500),value,due,currency:x.currency||'USD',payments,createdAt:Number(x.createdAt)||Date.now(),group:String(x.group||''),sequence:Number(x.sequence)||0,count:Number(x.count)||0,kind:['once','recurring','installments'].includes(x.kind)?x.kind:'once'};
  }
  function totals(x,day=today()) {const received=x.payments.reduce((s,p)=>s+cents(p.amount),0)/100,remaining=(cents(x.value)-cents(received))/100;return {received,remaining,status:remaining===0?'received':x.due<day?'overdue':received>0?'partial':'pending'};}
  function pay(x,amount,date=today(),note='') {amount=F.parseAmount(amount);if(!(amount>0)||cents(amount)>cents(totals(x).remaining)||!validDate(date))throw Error('invalid');return normalize({...x,payments:[...x.payments,{id:id(),amount,date,note}]});}
  function schedule(input,kind='once',count=1) {
    const x=normalize({...input,payments:[]});count=Number(count);
    if(!['once','recurring','installments'].includes(kind)||!Number.isInteger(count)||count<1||count>120)throw Error('invalid');
    if(kind==='once')count=1;
    const sum=cents(x.value),group=id();if(kind==='installments'&&sum<count)throw Error('invalid');
    return Array.from({length:count},(_,i)=>({...x,id:id(),value:kind==='installments'?(Math.floor(sum/count)+(i<sum%count?1:0))/100:x.value,due:F.dateInMonth(F.shiftMonth(x.due.slice(0,7),i),Number(x.due.slice(-2))),kind,group:count>1?group:'',sequence:i+1,count}));
  }
  function groups(list,day=today()) {const out={};for(const x of list){const s=totals(x,day),g=out[x.currency]||{received:0,remaining:0,overdue:0};g.received+=cents(s.received);g.remaining+=cents(s.remaining);if(s.status==='overdue')g.overdue+=cents(s.remaining);out[x.currency]=g;}return Object.entries(out).map(([currency,g])=>({currency,...Object.fromEntries(Object.entries(g).map(([k,v])=>[k,v/100]))}));}
  function restore(text) {const doc=JSON.parse(text);if(doc.type!=='educashpro-receivables'||doc.version!==1||!Array.isArray(doc.records))throw Error('invalid');const rows=doc.records.map(normalize);if(new Set(rows.map(x=>x.id)).size!==rows.length)throw Error('invalid');return rows;}
  window.EduCashProReceivablesModel={currencies,today,validDate,id,normalize,totals,pay,schedule,groups,restore};
})();
