<template>
  <div
    class="flex flex-col items-center justify-center relative w-screen"
    id="Portfolio"
  >
    <div
      @click="showOverlay = false"
      v-if="showOverlay && route.path === '/portfolio'"
      class="bg-black w-full h-full z-20 absolute opacity-90"
    >
      <div class="arrow w-60 absolute top-12 left-2 -rotate-6">
        <img src="~/assets/imgs/arrow.png" alt="arrow" />
      </div>
      <p class="absolute top-60 left-40 text-white capitalize">
        you can adjust images
        <span class="text-primary_blue_color">preview</span> size from here
      </p>
    </div>
    <!-- Title -->
    <h1
      class="text-center lg:text-start my-10 text-3xl lg:text-5xl font-normal uppercase"
    >
      Portfo<span class="text-primary_blue_color">lio</span>
    </h1>
    <!-- Toast to notify images preview size -->
    <Toast
      position="bottom-right"
      :pt="{
        container: {
          class:
            '! !text-primary_blue_color !border-primary_blue_color w-3/4 lg:w-full',
        },
        closeButton: {
          class: '!text-primary_blue_color',
        },
        icon: {
          class: '!text-primary_blue_color',
        },
      }"
    />

    <!-- Speed dial to set preview size -->
    <SpeedDial
      v-if="route.path === '/portfolio'"
      :model="items"
      :radius="120"
      @click="showOverlay = false"
      showIcon="pi pi-th-large"
      type="quarter-circle"
      direction="down-right"
      :transitionDelay="150"
      :class="showOverlay ? 'neon-effect' : ''"
      class="left-5 md:left-7 top-7 z-30"
    >
      <template #item="{ item }">
        <!-- Item -->
        <div
          @click="item.command"
          class="bg-white hover:bg-primary_blue_color group/item duration-100 rounded-full w-10 flex justify-center p-3 cursor-pointer relative right-6 bottom-6"
        >
          <font-awesome-icon
            :icon="['fas', item.icon]"
            class="text-slate-900 group-hover/item:text-white text-lg duration-700"
          />
          <p
            class="text-sm whitespace-nowrap opacity-0 group-hover/item:opacity-100 absolute top-10 left-10 text-white bg-primary_blue_color px-4 py-1 rounded-e rounded-bl transition-all duration-500"
          >
            {{ item.label }}
          </p>
        </div>
      </template>
    </SpeedDial>

    <!-- Cards -->
    <div class="flex flex-wrap justify-center w-full lg:justify-around">
      <div
        v-for="card in section === 'portfolio'
          ? allPosts
          : allPosts.slice(0, 3)"
        :key="card.id"
        class="m-4 relative"
      >
        <div v-if="card.isRecent" class="w-20 relative">
          <img
            class="w-full absolute z-10"
            src="~/assets/imgs/New.png"
            alt="New"
          />
        </div>
        <Card
          class="w-80 lg:w-96 !rounded-tr-[3rem] !rounded-bl-[3rem]"
          @click="
            showImg(getPreviewSize(card, previewSize));
            visible = !visible;
          "
          :pt="{
            body: {
              class: `rounded-bl-[3rem] bg-navbar_bg_color text-primary_blue_color`,
            },
          }"
        >
          <template #header>
            <Image alt="Image" class="w-full cursor-pointer group bg-red-500">
              <template #image>
                <div class="relative flex items-center justify-center">
                  <img
                    class="w-full h-[20rem] object-cover rounded-tl-lg rounded-tr-[3rem]"
                    :src="card.imageSmall"
                    alt="imageMedium"
                  />
                  <!-- Overlay -->
                  <div
                    class="absolute inset-0 bg-navbar_bg_color opacity-0 group-hover:opacity-50 rounded-tr-[3rem] overflow-hidden flex justify-center items-center transition-all duration-500"
                  ></div>
                  <!-- Eye icon -->
                  <font-awesome-icon
                    :icon="['fas', 'eye']"
                    class="text-4xl absolute top-[50%] opacity-0 group-hover:opacity-100 text-primary-text-color"
                  />
                </div>
              </template>
            </Image>
          </template>
          <template #title>
            <h1 class="text-xl">{{ card.title }}</h1>
          </template>
        </Card>
      </div>
    </div>
    <!-- Easy light box to show image on preview -->
    <VueEasyLightbox
      :zoomScale="1.8"
      :visible="visible"
      :imgs="imgs"
      @hide="visible = false"
      :maxZoom="5"
    />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { usePostsStore } from "~/store/data";
import { useToast } from "primevue/usetoast";
defineProps({
  section: String,
});
const route = useRoute();

const allPostsStore = usePostsStore();
const { storeAllposts, storeRecentPosts } = storeToRefs(allPostsStore);
const allPosts = ref<any>([]);
const recentPosts = ref();
const toast = useToast();

onMounted(async () => {
  allPosts.value = storeAllposts.value;
  recentPosts.value = storeRecentPosts.value;
});

// lightbox to preview image
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
const items = ref([
  {
    label: "Full Size Preview",
    icon: "f",
    command: () => {
      toast.add({
        life: 3000,
        severity: "info",
        summary: "Full Preview Size",
        detail: "Images will be displayed in a Full preview size.",
      });
      previewSize.value = "imageFull";
    },
  },
  {
    label: "Large Size Preview",
    icon: "l",
    command: () => {
      toast.add({
        life: 3000,
        severity: "info",
        summary: "Large Preview Size",
        detail: "Images will be displayed in a large preview size.",
      });
      previewSize.value = "imageLarge";
    },
  },
  {
    label: "Medium Size Preview",
    icon: "m",
    command: () => {
      toast.add({
        life: 3000,
        severity: "info",
        summary: "Medium Preview Size",
        detail: "Images will be displayed in a medium preview size.",
      });
      previewSize.value = "imageMedium";
    },
  },
  {
    label: "Small Size Preview",
    icon: "s",
    command: () => {
      toast.add({
        life: 3000,
        severity: "info",
        summary: "Small Preview Size",
        detail: "Images will be displayed in a small preview size.",
      });
      previewSize.value = "imageSmall";
    },
  },
]);

// get theme mode from
const isDark = computed(() => allPostsStore.isDark);

// Select preview size
const previewSize = ref("imageMedium");
const getPreviewSize = function (card: any, previewSize: any) {
  const imageSizes: any = {
    imageSmall: card.imageSmall,
    imageMedium: card.imageMedium,
    imageLarge: card.imageLarge,
    imageFull: card.imageFull,
  };

  return imageSizes[previewSize];
};

// show hide overlay instruction
const showOverlay = ref(true);
</script>

<style lang="scss">
.p-card-content {
  display: none;
}
.p-speeddial-button.p-button.p-button-icon-only {
  background: #60a5fa !important;
  color: white;
  &:hover {
    background: #95c4fd !important;
  }
}
@keyframes blink {
  0%,
  100% {
    text-shadow: 0 0 8px #fff, 0 0 10px #fff, 0 0 20px #60a5fa, 0 0 40px #60a5fa,
      0 0 80px #60a5fa, 0 0 90px #60a5fa;
    box-shadow: 0 0 5px #60a5fa, 0 0 25px #60a5fa, 0 0 50px #60a5fa,
      0 0 200px #60a5fa;
  }
  50% {
    text-shadow: none;
    box-shadow: none;
  }
}

.neon-effect {
  animation: blink 3s infinite;
  border-radius: 50px;
}
</style>
