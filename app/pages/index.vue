<template>
  <h1 class="text-4xl">Page index</h1>
</template>

<script lang="ts" setup>
definePageMeta({ layout: "default" });

const title = ref("Page Index");
const description = ref("Page Index Description");

useSeoMeta({
  title,
  description: () => `This is ${description.value}`,
});
</script>
