import { useUserStore } from "~/stores/user";
import { apiRoutes } from "~/utils/apiRoutes";

// Single-flight lock for refresh so concurrent 401s don't trigger multiple refresh calls
let tokenRefreshPromise: Promise<void> | null = null;

function refreshToken(baseURL: string) {
  if (!tokenRefreshPromise) {
    tokenRefreshPromise = $fetch(apiRoutes.auth.refresh, {
      method: "POST",
      baseURL,
      credentials: "include",
    })
      .then(() => {
        // no-op; just ensure the promise resolves for waiters
      })
      .finally(() => {
        tokenRefreshPromise = null;
      });
  }
  return tokenRefreshPromise;
}

function fetchCsrf(baseURL: string) {
  return $fetch(apiRoutes.auth.csrf, {
    baseURL,
    credentials: "include",
  });
}

function isCsrfError(err: any) {
  const status = err?.response?.status ?? err?.status;
  const detail = err?.response?.data?.detail ?? err?.data?.detail ?? "";
  return status === 403 && typeof detail === "string" && detail.toLowerCase().includes("csrf");
}

export async function useSafeFetch<T>(
  url: string,
  options: (RequestInit & { _csrfRetried?: boolean; _authRetried?: boolean }) | any = {}
) {
  const baseURL = useRuntimeConfig().public.apiBase;
  const userStore = useUserStore();

  try {
    return await $fetch<T>(url, {
      baseURL,
      credentials: "include",
      ...options,
    });
  } catch (err: any) {
    const status = err?.response?.status ?? err?.status;

    // ---- CSRF: retry once ----
    if (!options._csrfRetried && isCsrfError(err)) {
      try {
        console.warn("CSRF failed — refreshing token and retrying once…");
        await fetchCsrf(baseURL);
        return await useSafeFetch<T>(url, { ...options, _csrfRetried: true });
      } catch (e) {
        console.error("Failed to refresh CSRF. Logging out.");
        await userStore.logout();
        throw e;
      }
    }

    // ---- Auth: 401 -> refresh (single-flight) then retry once ----
    if (!options._authRetried && status === 401) {
      try {
        await refreshToken(baseURL);
        return await useSafeFetch<T>(url, { ...options, _authRetried: true });
      } catch (e) {
        console.error("Failed to refresh token. Logging out...");
        await userStore.logout();
        throw e;
      }
    }

    // Pass through unhandled errors
    throw err;
  }
}