<template>
  <div
    class="flex flex-col items-center justify-center my-4 min-h-[40rem]"
    id="Portfolio"
  >
    <CommonPortfolioCards section="homepage" />
    <NuxtLink
      to="/portfolio"
      class="w-80 hover:text-white hover:w-96 border-2 border-primary_blue_color shadow-primary_blue_color shadow my-10 py-3 rounded-xl hover:bg-primary_blue_color duration-700 transition-all text-center"
      >Visit Portfolio</NuxtLink
    >
  </div>
</template>

<script lang="ts" setup></script>
