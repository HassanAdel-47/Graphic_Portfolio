<template>
  <div
    class="py-10 px-4 lg:px-20 flex flex-col w-full text-center justify-center items-center navbar_bg_color"
    :class="isDark ? 'bg-navbar_bg_color' : 'bg-[#d6e2fe]'"
  >
    <!-- title -->
    <h1
      class="text-center lg:text-start mt-5 text-2xl text-nowrap lg:text-5xl font-normal uppercase"
    >
      <span class="text-primary_blue_color">Inspiration</span> Gallery
    </h1>
    <!-- text & photoshop -->
    <div class="text mt-10 flex flex-col lg:flex-row w-full justify-between">
      <!-- text -->
      <div
        class="text flex flex-col w-full lg:w-auto justify-center mr-10 space-y-4 lg:space-y-8"
      >
        <h1
          class="text-xl lg:text-3xl text-primary_blue_color uppercase text-center"
        >
          Have a project?
        </h1>
        <h1 class="text-base font-light mt-10 text-center">
          Are you seeking a
          <span class="text-secondaryBlue">professional design</span> that
          aligns with your aspirations?
        </h1>
        <NuxtLink
          to="/contact-me"
          class="border-2 self-center text-center shadow-primary_blue_color shadow border-primary_blue_color px-5 hover:px-9 py-3 rounded-xl hover:bg-primary_blue_color duration-700 transition-all"
          :class="isDark ? '' : 'hover:text-white'"
        >
          Okay Then, Contact Me
        </NuxtLink>
      </div>
      <!-- Photoshop -->
      <CommonPhotoshop class="mt-10 lg:mt-0" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { usePostsStore } from "~/store/data";
const allPostsStore = usePostsStore();
// get theme mode from
const isDark = computed(() => allPostsStore.isDark);
</script>
