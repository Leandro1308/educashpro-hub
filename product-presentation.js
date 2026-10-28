(function(){
  'use strict';
  const TEXT={
  "pt": {
    "eyebrow": "APRENDA. PRATIQUE. CONECTE.",
    "title": "Conhecimento para decidir. Conexões para crescer.",
    "lead": "Conheça o EduCashPro e explore seus recursos pelo site ou pelo bot do Telegram.",
    "earn": "Vantagens do Indique e Ganhe",
    "enter": "Acessar com e-mail e conhecer",
    "telegram": "Abrir no Telegram",
    "section": "O que você encontra no EduCashPro",
    "learn": "Aprender",
    "learnText": "Educação financeira, negócios e análise técnica, com conteúdos organizados para avançar no seu ritmo.",
    "practice": "Praticar",
    "practiceText": "Treine Price Action e acompanhe gráficos, Fibonacci e a direção dos pares da Binance.",
    "links": "Sua presença em um só link",
    "linksText": "Apresente seu trabalho em uma página personalizada, com foto de perfil e até quatro links seus.",
    "explore": "Conhecer",
    "program": "PROGRAMA DE AFILIADOS",
    "income": "Renda recorrente. Potencial de crescimento exponencial.",
    "incomeText": "Conheça o Indique e Ganhe e descubra como participar do Programa de Afiliados do EduCashPro, acompanhar sua rede e receber comissões pelas vendas e renovações elegíveis.",
    "programButton": "Conhecer o Programa de Afiliados",
    "conditions": "Resultados dependem de vendas válidas e das regras do programa. Não há garantia de ganhos.",
    "footer": "EduCashPro · Conhecimento, prática e conexões.",
    "back": "Voltar"
  },
  "en": {
    "eyebrow": "LEARN. PRACTICE. CONNECT.",
    "title": "Knowledge to decide. Connections to grow.",
    "lead": "Discover EduCashPro and explore its resources on the website or through the Telegram bot.",
    "earn": "Benefits of Refer and Earn",
    "enter": "Sign in with email and explore",
    "telegram": "Open in Telegram",
    "section": "What you can find in EduCashPro",
    "learn": "Learn",
    "learnText": "Financial education, business and technical analysis, organized so you can progress at your own pace.",
    "practice": "Practice",
    "practiceText": "Train Price Action and follow charts, Fibonacci and Binance pair direction.",
    "links": "Your presence in one link",
    "linksText": "Showcase your work on a personalized page with a profile photo and up to four links of your own.",
    "explore": "Explore",
    "program": "AFFILIATE PROGRAM",
    "income": "Recurring income. Potential for exponential growth.",
    "incomeText": "Discover Refer and Earn and learn how to join the EduCashPro Affiliate Program, follow your network and earn commissions on eligible sales and renewals.",
    "programButton": "Explore the Affiliate Program",
    "conditions": "Results depend on valid sales and program rules. Earnings are not guaranteed.",
    "footer": "EduCashPro · Knowledge, practice and connections.",
    "back": "Back"
  },
  "es": {
    "eyebrow": "APRENDE. PRACTICA. CONECTA.",
    "title": "Conocimiento para decidir. Conexiones para crecer.",
    "lead": "Conoce EduCashPro y explora sus recursos en el sitio web o mediante el bot de Telegram.",
    "earn": "Ventajas de Recomienda y Gana",
    "enter": "Acceder con correo y conocer",
    "telegram": "Abrir en Telegram",
    "section": "Qué encontrarás en EduCashPro",
    "learn": "Aprender",
    "learnText": "Educación financiera, negocios y análisis técnico, con contenidos organizados para avanzar a tu ritmo.",
    "practice": "Practicar",
    "practiceText": "Entrena Price Action y sigue gráficos, Fibonacci y la dirección de los pares de Binance.",
    "links": "Tu presencia en un solo enlace",
    "linksText": "Presenta tu trabajo en una página personalizada, con foto de perfil y hasta cuatro enlaces propios.",
    "explore": "Conocer",
    "program": "PROGRAMA DE AFILIADOS",
    "income": "Ingresos recurrentes. Potencial de crecimiento exponencial.",
    "incomeText": "Conoce Recomienda y Gana y descubre cómo participar en el Programa de Afiliados de EduCashPro, seguir tu red y recibir comisiones por ventas y renovaciones elegibles.",
    "programButton": "Conocer el Programa de Afiliados",
    "conditions": "Los resultados dependen de ventas válidas y de las reglas del programa. No hay garantía de ingresos.",
    "footer": "EduCashPro · Conocimiento, práctica y conexiones.",
    "back": "Volver"
  },
  "ru": {
    "eyebrow": "УЧИТЕСЬ. ПРАКТИКУЙТЕСЬ. ОБЩАЙТЕСЬ.",
    "title": "Знания для решений. Связи для развития.",
    "lead": "Познакомьтесь с EduCashPro и его возможностями на сайте или через бота Telegram.",
    "earn": "Преимущества программы рекомендаций",
    "enter": "Войти по e-mail и познакомиться",
    "telegram": "Открыть в Telegram",
    "section": "Что доступно в EduCashPro",
    "learn": "Обучение",
    "learnText": "Финансовое образование, бизнес и технический анализ: материалы для обучения в удобном темпе.",
    "practice": "Практика",
    "practiceText": "Тренируйте Price Action и следите за графиками, Фибоначчи и направлением пар Binance.",
    "links": "Всё о вас по одной ссылке",
    "linksText": "Представьте свою работу на личной странице с фото профиля и четырьмя своими ссылками.",
    "explore": "Подробнее",
    "program": "ПАРТНЁРСКАЯ ПРОГРАММА",
    "income": "Регулярный доход. Потенциал экспоненциального роста.",
    "incomeText": "Познакомьтесь с программой рекомендаций EduCashPro: узнайте условия участия, следите за своей сетью и получайте комиссии за подходящие продажи и продления.",
    "programButton": "Познакомиться с партнёрской программой",
    "conditions": "Результаты зависят от действительных продаж и правил программы. Доход не гарантирован.",
    "footer": "EduCashPro · Знания, практика и связи.",
    "back": "Назад"
  }
};
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icons={learn:'<path d="M4 5h6a3 3 0 0 1 3 3v13a4 4 0 0 0-4-3H4zM22 5h-6a3 3 0 0 0-3 3v13a4 4 0 0 1 4-3h5z"/>',practice:'<path d="M4 21h19M6 16l5-6 5 3 7-9M19 4h4v4"/>',links:'<path d="m10 16 6-6M8 18l-1 1a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0M18 8l1-1a4 4 0 0 0-6-6l-5 5a4 4 0 0 0 0 6" transform="translate(2 2)"/>'};
  function icon(name){return '<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+icons[name]+'</svg>';}
  function render(ctx,{bind}){
    const c=TEXT[ctx.language]||TEXT.pt;
    const email=()=>'<button class="ecpIntroButton ecpIntroPrimary" data-product-action="entry" data-educash-entry="account">'+esc(c.enter)+' <span aria-hidden="true">↗</span></button>';
    const feature=(key,title,description)=>'<article class="ecpIntroFeature"><div class="ecpIntroIcon">'+icon(key)+'</div><h3>'+esc(title)+'</h3><p>'+esc(description)+'</p><button class="ecpIntroText" data-product-action="'+key+'">'+esc(c.explore)+' <span aria-hidden="true">→</span></button></article>';
    ctx.root.innerHTML='<div class="ecpIntro">'+(ctx.profile?'<button class="textButton" data-product-action="home">← '+esc(c.back)+'</button>':'')+'<section class="ecpIntroHero"><div class="ecpIntroHeroCopy"><span class="ecpIntroEyebrow"><i></i>'+esc(c.eyebrow)+'</span><h1>'+esc(c.title)+'</h1><p class="ecpIntroLead">'+esc(c.lead)+'</p><button class="ecpIntroEarn" data-product-action="program"><span aria-hidden="true">✦</span> '+esc(c.earn)+' <span aria-hidden="true">→</span></button><div class="ecpIntroActions">'+email()+'<button class="ecpIntroText" data-product-action="telegram">'+esc(c.telegram)+' →</button></div></div></section><section class="ecpIntroProducts"><header><h2>'+esc(c.section)+'</h2></header><div class="ecpIntroGrid">'+feature('learn',c.learn,c.learnText)+feature('practice',c.practice,c.practiceText)+feature('links',c.links,c.linksText)+'</div></section><footer class="ecpIntroFooter"><section class="ecpIntroAffiliate"><span class="ecpIntroEyebrow">'+esc(c.program)+'</span><h2>'+esc(c.income)+'</h2><p>'+esc(c.incomeText)+'</p><button class="ecpIntroButton ecpIntroPrimary" data-product-action="program">'+esc(c.programButton)+' <span aria-hidden="true">→</span></button><small>'+esc(c.conditions)+'</small></section><div class="ecpIntroLegal"><b>EduCashPro</b><span>'+esc(c.footer)+'</span></div></footer></div>';
    bind(ctx);
  }
  window.EduCashProPresentation={render};
})();
