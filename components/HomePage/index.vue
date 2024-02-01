<template>
  <div class="Swiper relative" id="Home">
    <div
      class="absolute z-30 mx-auto flex flex-col items-center justify-center h-full w-full font-light"
    >
      <h4 class="text-2xl md:text-3xl">
        Hello, My <span class="text-primary_blue_color">Name</span> is
      </h4>
      <h1 class="text-5xl md:text-7xl font-normal py-3">
        <span class="text-primary_blue_color">Hassan</span> Adel
      </h1>
      <h3 class="typing-effect text-2xl mt-1">
        <span v-for="(word, index) in words" :key="index">
          <span v-if="activeIndex === index" class="typed-text">
            {{ typedWord }}
          </span>
          <span v-else class="hidden">_</span>
        </span>
      </h3>
    </div>
    <div
      :class="isDark ? 'bg-black opacity-60' : 'bg-primary_bg_color opacity-20'"
      class="overlay absolute w-full h-full z-20"
    ></div>
    <Swiper
      :modules="[SwiperAutoplay, EffectFade]"
      :slides-per-view="1"
      class="h-1/2 overflow-hidden relative"
      :loop="true"
      effect="fade"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: true,
      }"
      :speed="1500"
    >
      <SwiperSlide v-for="(slide, index) in photoArray" :key="index">
        <div class="relative w-full flex items-center justify-center">
          <img
            class="object-cover w-full h-[100vh] blur-[5px]"
            :src="slide"
            alt=""
          />
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
<script lang="ts" setup>
import { EffectFade } from "swiper/modules";
import slideOne from "~/assets/imgs/1.jpg";
import slideTwo from "~/assets/imgs/2.jpg";
import slideThree from "~/assets/imgs/3.jpg";
import { usePostsStore } from "~/store/data";
const allPostsStore = usePostsStore();
// get theme from store
const isDark = computed(() => allPostsStore.isDark);

// Array of photos in swiper
const photoArray = [slideOne, slideTwo, slideThree];
// Array of words in swiper caption
const words = ref([" Web Developer", " Graphic Designer"]);
// Active word in the Array of words
const activeIndex = ref(0);
const typedWord = ref("");

// Function to type words in swiper
const typeWriter = () => {
  let i = 0;
  const currentWord = words.value[activeIndex.value];

  const interval = setInterval(() => {
    typedWord.value += currentWord[i];
    i++;

    if (i === currentWord.length) {
      clearInterval(interval);
      setTimeout(() => {
        typedWord.value = "";
        activeIndex.value = (activeIndex.value + 1) % words.value.length;
        typeWriter();
      }, 2000); // Delay before typing next word (2000ms)
    }
  }, 150); // Typing speed (150ms)
};

onMounted(() => {
  typeWriter();
});
</script>

<style lang="scss">
.Swiper {
  .typing-effect {
    display: inline-block;
  }

  .typed-text::after {
    content: "|"; /* Cursor character */
    animation: blink-caret 0.75s infinite; /* Blink animation for cursor */
    color: #60a5fa;
  }

  @keyframes blink-caret {
    from,
    to {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }

  .hidden {
    visibility: hidden;
  }
}
</style>
