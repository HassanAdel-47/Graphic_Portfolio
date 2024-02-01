<template>
  <div class="relative" v-if="showBlack">
    <CommonNavbar />
    <div class="mt-[4rem]">
      <slot />
      <ScrollTop
        class="group bg-primary_blue_color hover:bg-secondary_bg_color opacity-50 hover:opacity-100 duration-700 ease-in-out"
        :pt="{
          icon: 'text-secondary_bg_color group-hover:text-primary_blue_color',
        }"
      />
    </div>
    <CommonFooter />
  </div>
  <CommonPreloader v-else />
</template>
<script lang="ts" setup>
import { usePostsStore } from "~/store/data";
const allPostsStore = usePostsStore();
const showBlack = ref(false);
onMounted(async () => {
  setTimeout(async () => {
    showBlack.value = await allPostsStore.isDataFetched;
  }, 2000);
});
</script>
<style lang="scss">
.p-link:focus {
  box-shadow: none !important;
}
.white-path {
  fill: none;
  stroke: var(--primary-text-color);
  stroke-width: 1;
}
.blue-path {
  fill: none;
  stroke: var(--primary-blue-color);
  stroke-width: 1;
}
</style>
