<template>
  <div class="bg-navbar_bg_color py-16" id="Recent" ref="recentSection">
    <h1
      class="flex items-center justify-center mx-auto lg:text-start text-3xl lg:text-5xl font-normal uppercase"
    >
      Recent <span class="text-primary_blue_color">Projects</span>
    </h1>
    <swiper
      :spaceBetween="10"
      :centeredSlides="true"
      :loop="true"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :effect="'coverflow'"
      :grabCursor="true"
      :slidesPerView="2"
      :coverflowEffect="{
        rotate: 30,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }"
      :breakpoints="{
        '640': {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        '768': {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        '1024': {
          slidesPerView: 3,
          spaceBetween: 10,
        },
      }"
      :modules="modules"
      class="mySwiper mt-16 w-full"
    >
      <swiper-slide v-for="(image, index) in images" :key="index"
        ><img
          class="w-full md:w-3/4"
          :src="image.itemImageSrcSmall"
          @click="
            showImg(image.itemImageSrcHigh);
            visible = !visible;
          "
      /></swiper-slide>
    </swiper>
    <VueEasyLightbox
      :zoomScale="1.8"
      :visible="visible"
      :imgs="imgs"
      @hide="visible = false"
      :maxZoom="5"
    />
  </div>
</template>

<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { storeToRefs } from "pinia";
import { usePostsStore } from "~/store/data";
const allPostsStore = usePostsStore();
const modules = [Autoplay, EffectCoverflow, Pagination];

const recentPosts = ref();
const images = ref<any>([]);
onMounted(async () => {
  recentPosts.value = await allPostsStore.recentPosts;

  // Convert the array to the Primevue array shape
  recentPosts.value.forEach((item: any) => {
    const imageObject = {
      itemImageSrcSmall: item.imageSmall,
      itemImageSrcMedium: item.imageMedium,
      itemImageSrcHigh: item.imageFull,
      thumbnailImageSrc: item.imageThumbnail,
      alt: item.title,
      title: item.title,
    };
    images.value.push(imageObject);
  });
});

// lightbox to preview selected p-galleria-ite
const visible = ref(false);
const imgs = ref([]);
const showImg = (index: any) => {
  imgs.value = index;
};
// Watch the `visible` property to toggle body scroll
watch(visible, (newValue) => {
  if (newValue === true) {
    document.documentElement.style.setProperty(
      "overflow-y",
      "hidden",
      "important"
    );
  } else {
    document.documentElement.style.setProperty(
      "overflow-y",
      "scroll",
      "important"
    );
  }
});

//Animation
const { $anime } = useNuxtApp();
const recentSection = ref<HTMLElement | null>();
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          $anime({
            targets: ".swiper-slide",
            opacity: [0, 1],
            duration: 1500,
            delay: function (el, i, l) {
              return i * 150;
            },
            endDelay: function (el, i, l) {
              return (l - i) * 150;
            },
          });
        }
      });
    },
    {
      threshold: 0.1,
    }
  );
  if (recentSection.value) {
    observer.observe(recentSection.value);
  }
});
</script>
