(function () {
  "use strict";

  const API_BASE = "https://educashpro-all.onrender.com";
  const platform = window.EduCashProPlatform;
  if (!platform) return;

  const rawFetch = window.fetch.bind(window);
  let snapshot = null;
  let refreshPromise = null;

  function normalizeUntil(value) {
    const raw = Number(value || 0);
    if (!Number.isFinite(raw) || raw <= 0) return null;
    return raw;
  }

  function fromStoredSession() {
    const session = platform.readWebSession?.() || null;
    const profile = session?.profile || null;
    if (!profile) return { known: false, active: false, activeUntil: null, source: "none" };

    if (profile?.subscription && typeof profile.subscription.active === "boolean") {
      return {
        known: true,
        active: profile.subscription.active === true,
        activeUntil: normalizeUntil(profile.subscription.activeUntil),
        source: "web_session_subscription",
      };
    }

    if (typeof profile.active === "boolean") {
      return {
        known: true,
        active: profile.active === true,
        activeUntil: normalizeUntil(profile.activeUntil),
        source: "hub_profile",
      };
    }

    return { known: false, active: false, activeUntil: null, source: "none" };
  }

  function writeCanonicalStatus(status) {
    snapshot = {
      known: true,
      active: status?.active === true,
      activeUntil: normalizeUntil(status?.activeUntil),
      source: status?.source || "platform_account",
    };

    const session = platform.readWebSession?.() || null;
    if (session?.token) {
      const account = status?.account || {};
      const profile = { ...(session.profile || {}), ...account };
      profile.active = snapshot.active;
      profile.isActive = snapshot.active;
      profile.activeUntil = snapshot.activeUntil;
      profile.subscription = {
        ...(profile.subscription || {}),
        active: snapshot.active,
        activeUntil: snapshot.activeUntil,
        source: snapshot.source,
      };
      const membershipCredential = snapshot.active ? String(status?.membershipCredential || "") : "";
      const canonicalSession = { ...session, profile, permissions: status?.permissions || session.permissions || {}, membershipCredential, storedAt: Date.now() };
      platform.writeWebSession?.(canonicalSession);
      window.__EDUCASHPRO_SESSION__ = canonicalSession;
      if (membershipCredential) localStorage.setItem("educashpro:membership-credential", membershipCredential);
      else localStorage.removeItem("educashpro:membership-credential");
    }

    window.dispatchEvent(new CustomEvent("educashpro:subscription-synced", { detail: { ...snapshot } }));
    return snapshot;
  }

  async function refresh() {
    if (!platform.isWeb?.()) {
      snapshot = fromStoredSession();
      return snapshot;
    }
    if (refreshPromise) return refreshPromise;

    refreshPromise = (async () => {
      const session = platform.readWebSession?.() || null;
      if (!session?.token) {
        snapshot = fromStoredSession();
        return snapshot;
      }

      try {
        const response = await rawFetch(`${API_BASE}/api/platform-account/overview`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.token}`,
          },
          body: "{}",
          cache: "no-store",
        });
        const data = await response.json().catch(() => null);
        if (!response.ok || !data?.subscription || typeof data.subscription.active !== "boolean") {
          snapshot = fromStoredSession();
          return snapshot;
        }
        return writeCanonicalStatus({
          active: data.subscription.active === true,
          activeUntil: data.subscription.activeUntil,
          source: data.subscription.source || "platform_account",
          account: data.account || {},
          permissions: data.permissions || {},
          membershipCredential: data.membershipCredential || "",
        });
      } catch {
        snapshot = fromStoredSession();
        return snapshot;
      } finally {
        refreshPromise = null;
      }
    })();

    return refreshPromise;
  }

  function isActive() {
    const current = snapshot?.known ? snapshot : fromStoredSession();
    return current.active === true;
  }

  function activeUntil() {
    const current = snapshot?.known ? snapshot : fromStoredSession();
    return current.activeUntil || null;
  }

  function patchMarkets() {
    const markets = window.EduCashProMarkets;
    if (!markets?.render || markets.__subscriptionCoherencePatched) return false;
    const original = markets.render.bind(markets);
    markets.render = function (args = {}) {
      const canonicalActive = isActive();
      return original({ ...args, active: canonicalActive || args.active === true });
    };
    markets.__subscriptionCoherencePatched = true;
    return true;
  }

  window.EduCashProAccess = {
    isActive,
    activeUntil,
    refresh,
    patchMarkets,
    snapshot: () => ({ ...(snapshot?.known ? snapshot : fromStoredSession()) }),
  };

  snapshot = fromStoredSession();
  refresh().then(()=>patchMarkets()).catch(() => {});
  window.addEventListener("educashpro:web-session-ready",()=>void refresh().then(()=>patchMarkets()).catch(()=>{}));
  window.addEventListener("educashpro:app-ready",()=>patchMarkets());
  window.addEventListener("educashpro:markets-ready",()=>patchMarkets());
})();
