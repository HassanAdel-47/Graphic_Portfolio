<template>
  <div
    class="Contact flex flex-col relative md:flex-row items-center justify-center w-screen p-5 min-h-[35rem] bg-[url(~/assets/imgs/2.jpg)] bg-fixed bg-cover bg-bottom bg-no-repeat"
    id="Contact"
    ref="conactSection"
  >
    <div
      :class="isDark ? 'bg-black opacity-65' : 'bg-white opacity-50'"
      class="absolute w-full h-full z-10"
    ></div>
    <div class="el relative z-20 flex flex-col items-center justify-center">
      <h1 class="text-primary_blue_color text-2xl lg:text-4xl uppercase">
        Let's craft something extraordinary just for you
      </h1>
      <p class="el text-base font-light mt-10 text-justify">
        I'm here and ready to engage in discussions, brainstorming, and idea
        sharing to help elevate your business or aspirations
      </p>
      <NuxtLink
        to="/contact-me"
        :class="isDark ? '' : 'hover:text-white'"
        class="el border-2 border-primary_blue_color shadow-primary_blue_color shadow mt-14 px-5 hover:px-9 py-3 rounded-xl hover:bg-primary_blue_color duration-700 transition-all"
      >
        Contact Me
      </NuxtLink>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { usePostsStore } from "~/store/data";
const allPostsStore = usePostsStore();
// Get theme from store
const isDark = computed(() => allPostsStore.isDark);

//Animation
const { $anime } = useNuxtApp();
const conactSection = ref<HTMLElement | null>();
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          $anime({
            targets: ".Contact .el",
            easing: "easeInQuint",
            opacity: [0, 1],
            duration: 1200,
            delay: $anime.stagger(200),
          });
        }
      });
    },
    {
      threshold: 0.1,
    }
  );
  if (conactSection.value) {
    observer.observe(conactSection.value);
  }
});
</script>
