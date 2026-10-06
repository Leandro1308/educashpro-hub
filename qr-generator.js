(function () {
  "use strict";
  const COPY = {
    pt: { title: "Gerador de QR Code", sub: "Transforme um link em uma imagem pronta para compartilhar.", back: "Voltar às ferramentas", link: "Cole seu link", generate: "Gerar QR Code", download: "Baixar PNG", clear: "Limpar", how: "Como usar", help: "1. Cole o endereço completo, começando com https:// ou http://. 2. Toque em Gerar QR Code. 3. Baixe a imagem e use em mensagens, materiais ou impressos.", hint: "No celular, você também pode tocar e segurar a imagem para salvá-la ou compartilhá-la.", invalid: "Informe um link válido começando com https:// ou http://.", long: "Este link é muito longo. Use um endereço menor.", error: "Não foi possível gerar o QR Code. Tente novamente.", ready: "QR Code pronto.", alt: "QR Code do link informado", free: "ACESSO LIVRE" },
    en: { title: "QR Code Generator", sub: "Turn a link into an image ready to share.", back: "Back to tools", link: "Paste your link", generate: "Generate QR Code", download: "Download PNG", clear: "Clear", how: "How to use", help: "1. Paste the full address starting with https:// or http://. 2. Tap Generate QR Code. 3. Download the image for messages, materials or print.", hint: "On your phone, you can also touch and hold the image to save or share it.", invalid: "Enter a valid link starting with https:// or http://.", long: "This link is too long. Use a shorter address.", error: "Could not generate the QR code. Try again.", ready: "QR code ready.", alt: "QR code for the entered link", free: "FREE ACCESS" },
    es: { title: "Generador de QR", sub: "Convierte un enlace en una imagen lista para compartir.", back: "Volver a herramientas", link: "Pega tu enlace", generate: "Generar código QR", download: "Descargar PNG", clear: "Limpiar", how: "Cómo usar", help: "1. Pega la dirección completa, comenzando con https:// o http://. 2. Toca Generar código QR. 3. Descarga la imagen para mensajes, materiales o impresos.", hint: "En el móvil, también puedes mantener pulsada la imagen para guardarla o compartirla.", invalid: "Introduce un enlace válido que comience con https:// o http://.", long: "Este enlace es demasiado largo. Usa una dirección más corta.", error: "No se pudo generar el QR. Inténtalo de nuevo.", ready: "Código QR listo.", alt: "Código QR del enlace introducido", free: "ACCESO LIBRE" },
    ru: { title: "Генератор QR-кода", sub: "Превратите ссылку в изображение для отправки.", back: "Назад к инструментам", link: "Вставьте ссылку", generate: "Создать QR-код", download: "Скачать PNG", clear: "Очистить", how: "Как пользоваться", help: "1. Вставьте полный адрес, начинающийся с https:// или http://. 2. Нажмите Создать QR-код. 3. Скачайте изображение для сообщений, материалов или печати.", hint: "На телефоне можно также нажать и удерживать изображение, чтобы сохранить его или поделиться им.", invalid: "Введите корректную ссылку, начинающуюся с https:// или http://.", long: "Ссылка слишком длинная. Используйте более короткий адрес.", error: "Не удалось создать QR-код. Попробуйте снова.", ready: "QR-код готов.", alt: "QR-код введённой ссылки", free: "БЕСПЛАТНЫЙ ДОСТУП" }
  };
  const esc = value => String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  function render({ language = "pt", back } = {}) {
    const copy = COPY[language] || COPY.pt;
    const root = document.getElementById("content");
    root.innerHTML = `<main class="toolsUtilityPage qrGenerator"><button id="qrBack" class="textButton">← ${esc(copy.back)}</button><section class="toolsHubHero"><span class="eyebrow">${esc(copy.free)}</span><h1>▦ ${esc(copy.title)}</h1><p>${esc(copy.sub)}</p></section><section class="qrPanel"><form id="qrForm" novalidate><label for="qrLink">${esc(copy.link)}</label><input id="qrLink" type="url" inputmode="url" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="https://" maxlength="2400" required><div class="qrActions"><button type="submit" class="wideButton">${esc(copy.generate)}</button><button type="button" id="qrClear" class="secondaryButton">${esc(copy.clear)}</button></div></form><p id="qrStatus" role="status" aria-live="polite"></p><div id="qrResult" hidden><img id="qrImage" alt="${esc(copy.alt)}"><a id="qrDownload" class="wideButton" download="educashpro-qrcode.png">${esc(copy.download)}</a><p class="qrHint">${esc(copy.hint)}</p></div></section><details class="qrPanel"><summary>${esc(copy.how)}</summary><p class="qrHint">${esc(copy.help)}</p></details></main>`;
    const input = document.getElementById("qrLink");
    const result = document.getElementById("qrResult");
    const image = document.getElementById("qrImage");
    const download = document.getElementById("qrDownload");
    const status = document.getElementById("qrStatus");
    function reset() {
      result.hidden = true;
      image.removeAttribute("src");
      download.removeAttribute("href");
      status.textContent = "";
    }
    document.getElementById("qrBack").onclick = () => back?.();
    input.oninput = reset;
    document.getElementById("qrClear").onclick = () => { input.value = ""; reset(); input.focus(); };
    document.getElementById("qrForm").onsubmit = event => {
      event.preventDefault();
      reset();
      let url;
      try {
        url = new URL(input.value.trim());
        if (!["https:", "http:"].includes(url.protocol) || !url.hostname) throw new Error("invalid_url");
      } catch { status.textContent = copy.invalid; input.focus(); return; }
      if (new TextEncoder().encode(url.href).length > 1800) { status.textContent = copy.long; return; }
      try {
        // The detached QRCode drawing supplies the encoded matrix. Render it
        // with integer pixels and a four-module quiet zone for clear scanning.
        const holder = document.createElement("div");
        const qr = new window.QRCode(holder, { text: url.href, width: 256, height: 256, correctLevel: window.QRCode.CorrectLevel.M });
        const matrix = qr._oQRCode;
        const count = matrix.getModuleCount(), scale = 8, border = 4;
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = (count + border * 2) * scale;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#000000";
        for (let row = 0; row < count; row++) for (let col = 0; col < count; col++) {
          if (matrix.isDark(row, col)) ctx.fillRect((col + border) * scale, (row + border) * scale, scale, scale);
        }
        const png = canvas.toDataURL("image/png");
        image.src = png;
        download.href = png;
        result.hidden = false;
        status.textContent = copy.ready;
      } catch { status.textContent = copy.error; }
    };
  }
  window.EduCashProQrGenerator = { render };
})();
