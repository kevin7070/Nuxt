<template>
  <section class="max-w-md p-6 mx-auto">
    <h1 class="mb-4 text-2xl font-bold">Login</h1>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          autocomplete="email"
          required
          class="w-full p-2 mt-1 border rounded"
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          autocomplete="current-password"
          required
          class="w-full p-2 mt-1 border rounded"
        />
      </div>

      <p v-if="errorMsg" class="text-sm text-red-600">{{ errorMsg }}</p>

      <button
        type="submit"
        :disabled="loading"
        class="px-4 py-2 text-white bg-blue-600 rounded disabled:opacity-50"
      >
        {{ loading ? "Logging in..." : "Login" }}
      </button>
    </form>
  </section>
</template>

<script lang="ts" setup>
// ──────────────────────────────────────────────────────────────────────────────
// Imports
// ──────────────────────────────────────────────────────────────────────────────
import { apiRoutes } from "#imports";

// ──────────────────────────────────────────────────────────────────────────────
// Composables
// ──────────────────────────────────────────────────────────────────────────────
const { toMessage } = useErrorMessage();

// ──────────────────────────────────────────────────────────────────────────────
// Page Meta
// ──────────────────────────────────────────────────────────────────────────────
definePageMeta({ layout: "default", middleware: "devonly" });

const meta = ref({
  title: "Index",
  description: "Index Page",
  og_site_name: "Artisans Entry",
  og_type: "website",
});

useHead({
  title: () => meta.value.title,
  meta: [
    { name: "description", content: () => meta.value.description },
    { property: "og:site_name", content: () => meta.value.og_site_name },
    { property: "og:type", content: () => meta.value.og_type },
    { property: "og:title", content: () => meta.value.title },
    { property: "og:description", content: () => meta.value.description },
  ],
});

// ──────────────────────────────────────────────────────────────────────────────
// State
// ──────────────────────────────────────────────────────────────────────────────
const email = ref("");
const password = ref("");
const errorMsg = ref("");
const loading = ref(false);

// ──────────────────────────────────────────────────────────────────────────────
// Actions
// ──────────────────────────────────────────────────────────────────────────────
async function handleLogin() {
  loading.value = true;
  errorMsg.value = "";
  try {
    await useSafeFetch(apiRoutes.auth.login, {
      method: "POST",
      body: { email: email.value, password: password.value },
    });
    console.log("Login successful");
    // TODO: navigateTo('/dashboard')
  } catch (err: any) {
    errorMsg.value = toMessage(err);
  } finally {
    loading.value = false;
  }
}
</script>
