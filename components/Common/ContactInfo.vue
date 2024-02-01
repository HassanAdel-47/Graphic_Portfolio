<template>
  <div class="flex">
    <div class="icon">
      <div class="bg-primary_blue_color px-5 py-4 rounded-xl">
        <font-awesome-icon
          :icon="['fas', props.icon]"
          class="text-primary_bg_color"
        />
      </div>
    </div>
    <div class="text ml-8 space-y-3">
      <h1>{{ props.title }}</h1>
      <p v-if="text !== undefined" class="font-light">
        <a v-if="email" :href="'mailto:' + props.text">
          {{ props.text }}
        </a>
        <a v-else :href="'tel:' + props.text">
          {{ props.text }}
        </a>
      </p>
      <div v-if="text === undefined" class="flex space-x-8">
        <a
          v-for="link in socialLinks"
          :key="link.url"
          :href="link.url"
          target="_blank"
        >
          <i
            class="!text-xl"
            :class="`pi pi-${link.icon} text-primary_blue_color ${
              isDark ? 'hover:text-white' : 'hover:text-black'
            } duration-500 cursor-pointer`"
          />
        </a>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { usePostsStore } from "~/store/data";
const allPostsStore = usePostsStore();
// get theme from store
const isDark = computed(() => allPostsStore.isDark);
const props = defineProps({
  icon: String,
  title: String,
  text: String || undefined,
  email: Boolean,
});

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
