(function () {
  "use strict";

  const API_BASE = "https://educashpro-all.onrender.com";
  const platform = window.EduCashProPlatform;
  if (!platform) return;

  const rawFetch = window.fetch.bind(window);
  let snapshot = null;
  let refreshPromise = null;
  let marketPatchTimer = null;

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
      const profile = { ...(session.profile || {}) };
      profile.active = snapshot.active;
      profile.activeUntil = snapshot.activeUntil;
      profile.subscription = {
        ...(profile.subscription || {}),
        active: snapshot.active,
        activeUntil: snapshot.activeUntil,
        source: snapshot.source,
      };
      platform.writeWebSession?.({ ...session, profile, storedAt: Date.now() });
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
          source: "platform_account",
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

  function isHubSessionUrl(input) {
    const url = typeof input === "string" ? input : String(input?.url || "");
    return /\/api\/platform-auth\/hub-session(?:\?|$)/.test(url);
  }

  function patchedJsonResponse(response, data) {
    const headers = new Headers(response.headers);
    headers.set("Content-Type", "application/json; charset=utf-8");
    headers.set("Cache-Control", "no-store");
    return new Response(JSON.stringify(data), {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  window.fetch = async function (input, options = {}) {
    const hubSessionRequest = isHubSessionUrl(input);
    if (hubSessionRequest) await refresh();

    const response = await rawFetch(input, options);
    if (!hubSessionRequest || !response.ok) return response;

    try {
      const data = await response.clone().json();
      const canonical = snapshot?.known ? snapshot : fromStoredSession();
      if (data?.profile && canonical.known) {
        data.profile.active = canonical.active === true;
        data.profile.activeUntil = canonical.activeUntil;
        data.profile.subscription = {
          ...(data.profile.subscription || {}),
          active: canonical.active === true,
          activeUntil: canonical.activeUntil,
          source: canonical.source,
        };
      }
      return patchedJsonResponse(response, data);
    } catch {
      return response;
    }
  };

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
    snapshot: () => ({ ...(snapshot?.known ? snapshot : fromStoredSession()) }),
  };

  snapshot = fromStoredSession();
  refresh().catch(() => {});

  if (!patchMarkets()) {
    marketPatchTimer = window.setInterval(() => {
      if (patchMarkets()) {
        window.clearInterval(marketPatchTimer);
        marketPatchTimer = null;
      }
    }, 100);
    window.setTimeout(() => {
      if (marketPatchTimer) {
        window.clearInterval(marketPatchTimer);
        marketPatchTimer = null;
      }
    }, 12000);
  }
})();
