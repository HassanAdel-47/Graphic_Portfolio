<template>
  <div
    class="flex flex-col-reverse md:flex-row items-center justify-center w-screen mx-auto py-4 lg:min-h-[40rem] relative"
    id="About"
    ref="aboutSection"
  >
    <!-- Image -->
    <div class="Image w-0 lg:!w-3/4 flex items-center justify-center">
      <img class="w-3/4" :src="isDark ? whitePhoto : blackPhoto" alt="Image" />
    </div>
    <!-- Text -->
    <div class="Text md:w-full p-5 lg:mr-14">
      <h1
        class="text-center lg:text-start mt-5 text-3xl lg:text-5xl font-normal uppercase"
      >
        <span class="text-primary_blue_color">About</span> Me
      </h1>
      <p class="font-light mt-5 text-justify">
        As a graphic designer, I blend creativity and visual storytelling to
        craft compelling designs that resonate with audiences. I specialize in
        conceptualizing ideas and bringing them to life through engaging
        visuals, leveraging a blend of design principles and modern tools. My
        focus lies in creating impactful and aesthetically pleasing designs
        across various mediums, aiming to effectively communicate messages while
        staying attuned to client needs and industry trends.
      </p>
      <div
        class="w-full flex justify-center lg:justify-start items-center space-x-8 mt-5"
      >
        <a
          v-for="link in socialLinks"
          :key="link.url"
          :href="link.url"
          target="_blank"
          class="w-1/4 lg:w-8 link"
        >
          <i
            :class="`pi pi-${link.icon} text-primary_blue_color ${
              isDark ? 'hover:text-white' : 'hover:text-black'
            } duration-500 cursor-pointer`"
          />
        </a>
      </div>
    </div>

    <div class="magic-sparkles absolute top-[21%] left-0 hidden lg:block">
      <font-awesome-icon
        class="text-lg"
        :icon="['fas', 'wand-magic-sparkles']"
      />
    </div>
    <div class="code absolute -bottom-1 left-[5%] hidden lg:block">
      <font-awesome-icon :icon="['fas', 'code']" />
    </div>
    <div class="pen-nib absolute top-[11%] left-[37.5%] hidden lg:block">
      <font-awesome-icon class="text-lg" :icon="['fas', 'pen-nib']" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import blackPhoto from "../../assets/imgs/about black.png";
import whitePhoto from "../../assets/imgs/about white.png";
import { usePostsStore } from "~/store/data";
const aboutSection = ref<HTMLElement | null>(null);
const { $anime } = useNuxtApp();

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Image
          $anime({
            targets: ".Image",
            translateX: [-100, 0],
            opacity: [0, 1],
            easing: "easeInOutSine",
            duration: 1500,
          });
          // Text
          $anime({
            targets: ".Text",
            opacity: [0, 1],
            easing: "easeInOutQuart",
            duration: 1700,
          });
          // magic-sparkles code pen-nib icons
          $anime({
            targets: ".magic-sparkles",
            translateX: {
              value: [0, 150],
              duration: 1700,
              easing: "easeInOutSine",
            },
            rotate: {
              value: [0, 360],
              duration: 1700,
              easing: "easeInOutQuart",
            },
            scale: {
              value: [0, 1.5],
              duration: 1700,
              easing: "easeInOutQuart",
            },
          });
          $anime({
            targets: ".code",
            translateY: {
              value: [0, -120],
              duration: 1700,
              easing: "easeInOutSine",
            },
            scale: {
              value: [0, 1.5],
              duration: 1700,
              easing: "easeInOutQuart",
            },
          });
          $anime({
            targets: ".pen-nib",
            // translateX: {
            //   value: [0, "-50vh"],
            //   duration: 1700,
            //   easing: "easeInOutSine",
            // },
            translateY: {
              value: [0, 300],
              duration: 1700,
              easing: "easeInOutQuart",
            },
            scale: {
              value: [0, 1.5],
              duration: 1700,
              easing: "easeInOutQuart",
            },
          });
          $anime({
            targets: ".link",
            opacity: [0, 1],
            duration: 1700,
            delay: function (el, i, l) {
              return i * 400;
            },
            endDelay: function (el, i, l) {
              return (l - i) * 400;
            },
          });

          // Do not disconnect the observer to make this function fire every time scroll to this section
          // observer.disconnect();
        }
      });
    },
    {
      threshold: 0.1,
    }
  );
  if (aboutSection.value) {
    observer.observe(aboutSection.value);
  }
});
const allPostsStore = usePostsStore();
// get theme from store
const isDark = computed(() => allPostsStore.isDark);

// Social Links and Icons
const socialLinks = [
  { icon: "facebook", url: "https://www.facebook.com/hassanadel3886" },
  {
    icon: "instagram",
    url: "https://www.instagram.com/hassan_adel_47?igsh=d2JibjNnNG5rZ2Zv",
  },
  { icon: "linkedin", url: "https://www.linkedin.com/in/hassanadel3886/" },
  { icon: "telegram", url: "https://t.me/hassanadel3886" },
  { icon: "whatsapp", url: "https://wa.link/5oue7y" },
];
</script>
