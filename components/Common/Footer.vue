<template>
  <footer
    class="p-14 bg-navbar_bg_color flex flex-col lg:flex-row w-full px-2 items-center justify-around space-y-10 lg:!space-y-0"
  >
    <!-- Logo -->
    <div class="Logo">
      <div class="w-40 flex flex-col items-center">
        <img :src="isDark ? whiteLogo : blackLogo" alt="Logo" class="mb-3" />
        <div
          class="text-base font-normal text-center w-full uppercase space-y-1"
        >
          <h1>Web Developer</h1>
          <h1>&</h1>
          <h1>graphic designer</h1>
        </div>
      </div>
    </div>
    <!-- Quick Links -->
    <div class="links">
      <div class="flex flex-col text-center h-full font-normal">
        <h1 class="text-2xl uppercase">
          <span class="text-primary_blue_color">Quick</span> Links
        </h1>
        <div class="w-full h-full grid grid-cols-3 gap-10 mt-5 lg:mt-8">
          <a v-for="link in quickLinks" :key="link.url" :href="link.url">
            {{ link.name }}
          </a>
        </div>
      </div>
    </div>
    <!-- Contact -->
    <div class="contact flex flex-col items-center justify-center">
      <h1 class="text-2xl uppercase">
        <span class="text-primary_blue_color">contact</span> me
      </h1>
      <div class="grid gap-10 lg:gap-4 text-center h-full font-normal mt-5">
        <p>Hassanadel3886@gmail.com</p>
        <div class="w-full h-full flex justify-center items-center space-x-8">
          <a
            v-for="link in socialLinks"
            :key="link.url"
            :href="link.url"
            target="_blank"
          >
            <i
              :class="`pi pi-${link.icon} text-primary_blue_color ${
                isDark ? 'hover:text-white' : 'hover:text-black'
              } duration-500 cursor-pointer`"
            />
          </a>
        </div>
        <p>+963 985-942-976</p>
      </div>
    </div>
  </footer>
</template>
<script lang="ts" setup>
import whiteLogo from "~/assets/imgs/15.png";
import blackLogo from "~/assets/imgs/16.png";
import { usePostsStore } from "~/store/data";
const allPostsStore = usePostsStore();
// get theme mode from
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
const quickLinks = [
  { name: "Home", url: "/" },
  { name: "About", url: "/#About" },
  {
    name: "Contact",
    url: "/#Contact",
  },
  { name: "Recent", url: "/#recent" },
  { name: "portfolio", url: "/#portfolio" },
];
</script>
