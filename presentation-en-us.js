(function () {
  "use strict";

  const CONTENT_ID = "content";
  const VERSION = "20260910.1";
  let restoring = false;

  function isEnglish() {
    return /^en(?:-|$)/i.test(document.documentElement.lang || "");
  }

  function esc(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function benefitCard(icon, title, description) {
    return `<article><span>${esc(icon)}</span><div><h3>${esc(title)}</h3><p>${esc(description)}</p></div></article>`;
  }

  function section(title, body) {
    return `<section class="presentationSection enUsPresentationSection"><h2>${esc(title)}</h2>${body}</section>`;
  }

  function applyEnglishPresentation() {
    const content = document.getElementById(CONTENT_ID);
    if (!content || !content.querySelector(".presentationHero")) return;

    if (!isEnglish()) {
      if (content.dataset.enUsPresentation === VERSION && !restoring && window.EduCashProApp?.renderPresentation) {
        restoring = true;
        delete content.dataset.enUsPresentation;
        window.EduCashProApp.renderPresentation();
        queueMicrotask(() => { restoring = false; });
      }
      return;
    }

    if (content.dataset.enUsPresentation === VERSION) return;
    content.dataset.enUsPresentation = VERSION;

    const hero = content.querySelector(".presentationHero");
    const heroEyebrow = hero?.querySelector(".eyebrow");
    const heroTitle = hero?.querySelector("h1");
    const heroLead = hero?.querySelector("p");
    if (heroEyebrow) heroEyebrow.textContent = "One membership. Multiple possibilities.";
    if (heroTitle) heroTitle.textContent = "Learn. Connect. Save. Grow.";
    if (heroLead) heroLead.textContent = "EduCashPro brings education, digital tools, member benefits, useful resources and optional affiliate opportunities together in one digital ecosystem.";

    const originalSections = Array.from(content.querySelectorAll(":scope > section.presentationSection"));
    const includedSection = originalSections[0];
    const finalSection = content.querySelector(":scope > section.presentationFinal");
    if (!includedSection || !finalSection) return;

    const includedTitle = includedSection.querySelector("h2");
    const benefits = includedSection.querySelector(".presentationBenefits");
    if (includedTitle) includedTitle.textContent = "What you get with EduCashPro";
    if (benefits) {
      benefits.innerHTML = [
        ["🎓", "Learn", "Explore financial education, digital entrepreneurship, network marketing, AI for business, Telegram, Web3 and other digital skills."],
        ["🛠️", "Use digital tools", "Access practical tools designed to support organization, communication, promotion and everyday digital activities."],
        ["🌎", "Discover resources and communities", "Explore groups, channels, bots, pages, courses, tools, partner businesses, benefits and digital resources."],
        ["🏷️", "Access member benefits", "Discover discounts, special services and partner offers when available in your region."],
        ["🎮", "Enjoy free resources", "Use selected tools, games and resources even before subscribing, while active members unlock additional experiences."],
        ["❤️", "Keep everything in one place", "Manage your membership, referral link, support, community access, projects and other EduCashPro resources from one environment."],
      ].map((item) => benefitCard(...item)).join("");
    }

    const directChildren = Array.from(content.children);
    const start = directChildren.indexOf(includedSection);
    const end = directChildren.indexOf(finalSection);
    if (start >= 0 && end > start) {
      directChildren.slice(start + 1, end).forEach((node) => {
        if (node.id !== "enUsPresentationV2") node.hidden = true;
      });
    }

    document.getElementById("enUsPresentationV2")?.remove();
    const wrapper = document.createElement("div");
    wrapper.id = "enUsPresentationV2";
    wrapper.innerHTML = [
      section("Education for the digital economy", `
        <div class="presentationBenefits">
          ${benefitCard("💰", "Financial education", "Build a clearer understanding of money, financial decisions and the digital economy.")}
          ${benefitCard("🚀", "Digital entrepreneurship", "Learn concepts that can help you create, organize and promote digital projects.")}
          ${benefitCard("🤖", "AI for business", "Understand practical ways artificial intelligence can support communication, marketing and productivity.")}
          ${benefitCard("📱", "Telegram and automation", "Learn how groups, channels, bots and digital automation can support communities and businesses.")}
          ${benefitCard("🌐", "Web3 and digital assets", "Understand wallets, USDT, exchanges and the technologies shaping new digital ecosystems.")}
          ${benefitCard("🤝", "Network marketing", "Learn the principles of relationship-based distribution, duplication and responsible network development.")}
        </div>`),

      section("More than courses", `
        <p>EduCashPro is designed as a growing ecosystem. A single membership can provide access to courses, tools, organized directories, partner benefits, professional resources, communities and new features added over time.</p>
        <div class="goalGrid">
          <span>🎓 Courses</span><span>🛠️ Tools</span><span>🔎 Directories</span><span>🏷️ Benefits</span><span>🤝 Communities</span><span>🚀 Digital resources</span>
        </div>`),

      section("Affiliate Program — an additional benefit for active members", `
        <p>The Affiliate Program is optional. You can use EduCashPro without referring anyone. Active members who choose to share the platform receive a personal referral link.</p>
        <p>When an eligible new membership is completed through that link, the referral is identified and the current Affiliate Program rules apply.</p>
        <div class="networkHighlight">
          <span>💰</span><h2>60% commission on an eligible new direct membership</h2>
          <p>At the current US$12 membership price, a 60% direct commission equals <strong>US$7.20</strong> for an eligible new direct membership.</p>
          <p>No commission is paid simply for registering people. Commissions are connected to eligible membership transactions under the program rules.</p>
        </div>`),

      section("Commissions on eligible renewals", `
        <p>The program may also distribute commissions on eligible membership renewals within the affiliate network according to the current rules.</p>
        <div class="planGrid">
          <span>Level 1 · 30%</span><span>Level 2 · 20%</span><span>Level 3 · 10%</span><span>Level 4 · 5%</span><span>Level 5 · 5%</span>
        </div>
        <p>Access to each level follows the qualification and activity rules currently established by the program.</p>`),

      section("Grow through duplication", `
        <p>You do not need to reach thousands of people by yourself. The principle of a network is duplication: you can introduce EduCashPro to a few people, and some of them may choose to share it with others.</p>
        <p>Over time, a small number of direct referrals can develop into a larger network. Growth depends on real member activity, completed memberships and renewals. Earnings are never guaranteed.</p>`),

      section("Use EduCashPro your way", `
        <div class="presentationBenefits">
          ${benefitCard("👤", "Use the platform", "Access the content, tools, resources and benefits available to you.")}
          ${benefitCard("📣", "Use and share", "Enjoy the platform and share your personal referral link when it makes sense for you.")}
          ${benefitCard("🌐", "Build a network", "Learn about network marketing, communication and digital promotion and develop your own strategy.")}
        </div>
        <p>The choice is yours. Participation in the Affiliate Program is not required to use EduCashPro.</p>`),

      section("Affiliate benefits require an active membership", `
        <p>The Affiliate Program is a benefit associated with active membership. When a membership becomes inactive, the rules for inactive members apply. After reactivation, the member may participate again in future eligible results according to the current program rules.</p>`),

      section("Built for the digital economy", `
        <p>Technology is changing how people learn, work, communicate, promote businesses and create new opportunities. EduCashPro brings different resources from this environment together so you can learn gradually without needing to be a technology expert.</p>`),

      section("Membership", `
        <div class="networkHighlight">
          <span>💳</span><h2>US$12 per month</h2>
          <p>One membership unlocks the resources available to active EduCashPro members. You decide whether the education, tools and benefits available in the platform make sense for you.</p>
        </div>`),

      section("Start with the product", `
        <p>Before thinking about the Affiliate Program, explore EduCashPro. Learn from the content, try the tools, discover the resources and understand how the platform works.</p>
        <p>If you like what you find, you can then choose to share EduCashPro with other people through your personal referral link.</p>`),

      section("Important information", `
        <p>EduCashPro is an educational and digital-services platform. The Affiliate Program is optional and available under the applicable membership rules. Financial results vary by participant and are not guaranteed. Commissions depend on eligible transactions completed under the current program rules.</p>`)
    ].join("");

    finalSection.before(wrapper);

    const finalTitle = finalSection.querySelector("h2");
    const finalText = finalSection.querySelector("p");
    const finalSmall = finalSection.querySelector("small");
    if (finalTitle) finalTitle.textContent = "EduCashPro — Learn. Connect. Save. Grow.";
    if (finalText) finalText.textContent = "More than a membership. A digital ecosystem of possibilities.";
    if (finalSmall) finalSmall.textContent = "Payment and activation are completed through the EduCashPro bot.";
  }

  function scheduleApply() {
    window.requestAnimationFrame(applyEnglishPresentation);
  }

  const observer = new MutationObserver(scheduleApply);
  const content = document.getElementById(CONTENT_ID);
  if (content) observer.observe(content, { childList: true, subtree: true });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleApply, { once: true });
  } else {
    scheduleApply();
  }
})();
