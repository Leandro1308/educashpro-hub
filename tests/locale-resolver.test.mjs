import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const resolver = readFileSync(new URL('locale-resolver.js', root), 'utf8');
const auth = readFileSync(new URL('platform-web-auth.js', root), 'utf8');

function load({language, languages, telegram, hash = '', query = '', storage = new Map()} = {}) {
  const navigator = {language, languages};
  let redirect;
  const location = {href: 'https://go.educashpro.vip/app/' + query + hash, replace(url) { redirect = url; }};
  const document = {
    documentElement: {dataset: {}},
    readyState: 'loading',
    addEventListener() {},
  };
  const window = {location, navigator, Telegram: {WebApp: {initDataUnsafe: {user: {language_code: telegram}}}}};
  const context = vm.createContext({window, document, navigator, location, URL, URLSearchParams,
    localStorage: {
      getItem(key) { return storage.get(key) ?? null; },
      setItem(key, value) { storage.set(key, value); },
    }});
  vm.runInContext(resolver, context);
  return {locale: window.EduCashProLocale, document, context, window, redirect: () => redirect};
}

test('web detects the four supported languages and otherwise uses English', () => {
  for (const [language, expected] of [
    ['pt-BR','pt'], ['en-GB','en'], ['es-MX','es'], ['ru-RU','ru'],
    ['fr-FR','en'], ['de-DE','en'], ['it-IT','en'], ['ja-JP','en'], ['zh-CN','en'],
    ['eng-other','en'], ['esp','en'], ['', 'en'], [undefined, 'en'],
  ]) {
    const page = load({language});
    assert.equal(page.locale.resolve(), expected, language);
    assert.equal(page.document.documentElement.lang, expected === 'pt' ? 'pt-BR' : expected);
  }
  assert.equal(load({languages:['es-ES']}).locale.resolve(), 'es');
});

test('Telegram launch language has priority over the browser, even before the SDK', () => {
  const data = new URLSearchParams({user: JSON.stringify({id: 42, language_code: 'ru-RU'})});
  const hash = '#' + new URLSearchParams({tgWebAppData: data.toString()});
  assert.equal(load({language:'pt-BR', hash}).locale.resolve(), 'ru');
  assert.equal(load({language:'pt-BR', telegram:'es-ES'}).locale.resolve(), 'es');
  assert.equal(load({language:'pt-BR', telegram:'ja-JP'}).locale.resolve(), 'en');
  assert.equal(load({language:'es-ES', hash:'#tgWebAppData=user%3Dbroken'}).locale.resolve(), 'es');
});

test('manual selection survives a fresh load and preserves account language and affiliate link', () => {
  const storedAccount = JSON.stringify({profile: {language: 'pt'}});
  const storage = new Map([['educashpro:web-session', storedAccount]]);
  const page = load({language: 'en-GB', query: '?ref=ECP-TEST', storage});
  assert.equal(page.locale.resolve(), 'pt');
  page.locale.choose('es');
  const redirect = new URL(page.redirect());
  assert.equal(redirect.searchParams.get('ref'), 'ECP-TEST');
  assert.equal(redirect.searchParams.get('lang'), 'es');
  assert.equal(storage.get('educashpro:web-session'), storedAccount);
  assert.equal(load({telegram:'ru', query:'?lang=pt', storage}).locale.resolve({language:'en'}), 'es');
  assert.equal(load({language:'pt-BR'}).locale.normalize('fr-FR'), '');
});

test('email sign-in sends the resolved language with its request', async () => {
  for (const [language, expected] of [['fr-FR','en'], ['pt-BR','pt'], ['es-ES','es'], ['ru-RU','ru']]) {
    const page = load({language});
    let posted;
    page.context.fetch = async (_url, options) => {
      posted = JSON.parse(options.body);
      return {ok:true, json: async () => ({ok:true})};
    };
    vm.runInContext(auth, page.context);
    await page.window.EduCashProWebAuth.requestEmailCode('test@example.com');
    assert.equal(posted?.language, expected);
  }
});
