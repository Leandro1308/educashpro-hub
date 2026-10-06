(function () {
  "use strict";
  let current = null,
    epoch = 0,
    replaying = false,
    restore = null,
    index = Number(history.state?.ecpIndex || 0);
  function urlFor(route) {
    const u = new URL(location.href);
    for (const k of ["view", "academy", "course", "section", "tool", "panel"])
      u.searchParams.delete(k);
    if (route.view !== "home") u.searchParams.set("view", route.view);
    if (route.view === "course" && route.detail)
      u.searchParams.set("course", route.detail);
    if (route.view === "learn" && route.detail)
      u.searchParams.set("academy", route.detail);
    if (route.view === "benefits" && route.detail)
      u.searchParams.set("section", route.detail);
    if (route.view === "tools" && route.detail)
      u.searchParams.set("tool", route.detail);
    if(route.view === "area" && route.detail)u.searchParams.set("panel",route.detail);
    return u;
  }
  function saveScroll() {
    if (!current) return;
    current = { ...current, scrollY: Math.max(0, window.scrollY || 0) };
    history.replaceState(
      { ...(history.state || {}), ecpRoute: current, ecpIndex: index },
      "",
      location.href,
    );
  }
  function record(route) {
    if (replaying) return epoch;
    if (
      current?.view === route.view &&
      current?.detail === String(route.detail || "")
    )
      return epoch;
    const hadCurrent = Boolean(current);
    saveScroll();
    current = {
      view: route.view,
      detail: String(route.detail || ""),
      scrollY: 0,
    };
    epoch++;
    if (hadCurrent) {
      index++;
      history.pushState(
        { ecpRoute: current, ecpIndex: index },
        "",
        urlFor(current),
      );
    } else
      history.replaceState(
        { ecpRoute: current, ecpIndex: index },
        "",
        urlFor(current),
      );
    const token = epoch;
    window.requestAnimationFrame?.(() => {
      if (isCurrent(token)) window.scrollTo({ top: 0, behavior: "auto" });
    });
    return epoch;
  }
  function stamp() {
    return epoch;
  }
  function isCurrent(value) {
    return value === epoch;
  }
  function back() {
    if (index <= 0) return false;
    history.back();
    return true;
  }
  function configure(fn) {
    restore = fn;
  }
  window.addEventListener("popstate", async (event) => {
    const route = event.state?.ecpRoute;
    if (!route || !restore) return;
    epoch++;
    const token = epoch;
    index = Number(event.state.ecpIndex) || 0;
    current = route;
    replaying = true;
    try {
      await restore(route);
      if (isCurrent(token))
        window.scrollTo({ top: Number(route.scrollY) || 0, behavior: "auto" });
    } catch (error) {
      console.warn("[EduCashPro] navigation restore:", error?.message || error);
    } finally {
      if (isCurrent(token)) replaying = false;
    }
  });
  document.addEventListener(
    "click",
    (event) => {
      const button = event.target?.closest?.("#content button, #content a");
      if (!button) return;
      const isBack =
        /back$/i.test(button.id || "") ||
        button.matches("[data-navigation-back]") ||
        (button.classList.contains("textButton") &&
          /^\s*←/.test(button.textContent || ""));
      if (isBack && index > 0) {
        event.preventDefault();
        event.stopImmediatePropagation();
        back();
        return;
      }
      // A newer interaction invalidates pending rendering from a previous click.
      epoch++;
      replaying = false;
    },
    true,
  );
  window.EduCashProNavigation = {
    record,
    stamp,
    isCurrent,
    back,
    configure,
    current: () => current,
    saveScroll,
  };
})();
