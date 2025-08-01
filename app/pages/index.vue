<template>
  <h1 class="text-4xl">Page index</h1>
</template>

<script lang="ts" setup>
definePageMeta({ layout: "default" });

const meta = ref({
  title: "Index",
  description: "Index Page",
  og_site_name: "Artisans Entry",
  og_type: "website",
});

// TODO
const { metaRes } = await useSafeFetch<any>("/api/page-meta/index");
if (metaRes.value) {
  meta.value = metaRes.value;
}

useHead({
  title: () => meta.value.title,
  meta: [
    { name: "description", content: () => meta.value.description },
    { property: "og:site_name", content: () => meta.value.og_site_name },
    { property: "og:type", content: () => meta.value.og_type },
    { property: "og:title", content: () => meta.value.title },
    {
      property: "og:description",
      content: () => meta.value.description,
    },
  ],
});
</script>
