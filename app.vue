<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { usePostsStore } from "~/store/data";
const allPostsStore = usePostsStore();
// get theme mode from
allPostsStore.initialStore();
</script>
