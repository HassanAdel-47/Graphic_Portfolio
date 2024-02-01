<template>
  <div
    class="w-[80%] lg:w-[40%] h-[40%] mx-auto relative group bg-contain bg-no-repeat cursor-pointer"
  >
    <img :src="isDark ? Body : BodyLight" class="w-full" />
    <img
      :src="isDark ? Tools : ToolsLight"
      class="w-1/12 absolute top-[20%] -left-[5%] group-hover:-left-[12%] duration-200 transition-all z-20"
    />
    <img
      :src="isDark ? Adjustment : AdjustmentLight"
      class="w-4/12 absolute bottom-0 left-[10%] group-hover:-bottom-[12%] duration-300 transition-all z-10"
    />
    <img
      :src="isDark ? Healing : HealingLight"
      class="w-2/12 absolute bottom-[2%] left-[50%] group-hover:-bottom-[6%] duration-500 transition-all z-10"
    />
    <img
      :src="isDark ? Switcher : SwitcherLight"
      class="w-2/12 absolute bottom-[27%] -right-[5%] group-hover:-right-[12%] duration-500 transition-all z-10"
    />
    <img
      :src="isDark ? Eraser : EraserLight"
      class="w-1/12 absolute -top-[0%] right-[37%] group-hover:-top-[12%] duration-1000 transition-all z-10"
    />
    <img
      :src="isDark ? Text : TextLight"
      class="w-1/12 absolute top-[8%] right-[24%] group-hover:-top-[6%] duration-700 transition-all z-10"
    />
    <img
      src="~/assets/imgs/photoshop/Shadow.png"
      class="w-full absolute bottom-[2%] opacity-50 duration-700 transition-all"
    />

    <div class="absolute top-[27%] -left-[19.5%] w-full h-full mx-auto">
      <Galleria
        :circular="true"
        :autoPlay="true"
        :transitionInterval="2000"
        v-model:activeIndex="activeIndex"
        :value="images"
        :responsiveOptions="responsiveOptions"
        :numVisible="8"
        :showThumbnails="false"
      >
        <template #item="slotProps">
          <img
            :src="slotProps.item?.itemImageSrcSmall"
            :alt="slotProps.item?.alt"
            @click="
              showImg(slotProps.item?.itemImageSrcMedium);
              visible = !visible;
            "
            class="rounded w-5/12"
          />
          <img
            :src="slotProps.item?.itemImageSrcSmall"
            :alt="slotProps.item?.alt"
            class="w-1/12 absolute left-[81%] top-[59.5%]"
          />
        </template>
      </Galleria>
      <VueEasyLightbox
        :zoomScale="1.8"
        :visible="visible"
        :imgs="imgs"
        @hide="visible = false"
        :maxZoom="5"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Body from "~/assets/imgs/photoshop/Layer.png";
import Tools from "~/assets/imgs/photoshop/Layer (5).png";
import Eraser from "~/assets/imgs/photoshop/Layer (4).png";
import Text from "~/assets/imgs/photoshop/Layer (3).png";
import Adjustment from "~/assets/imgs/photoshop/Layer (2).png";
import Switcher from "~/assets/imgs/photoshop/Layer (6).png";
import Healing from "~/assets/imgs/photoshop/Layer (1).png";
import BodyLight from "~/assets/imgs/photoshopLight/Layer.png";
import ToolsLight from "~/assets/imgs/photoshopLight/Layer (5).png";
import EraserLight from "~/assets/imgs/photoshopLight/Layer (4).png";
import TextLight from "~/assets/imgs/photoshopLight/Layer (3).png";
import AdjustmentLight from "~/assets/imgs/photoshopLight/Layer (2).png";
import SwitcherLight from "~/assets/imgs/photoshopLight/Layer (6).png";
import HealingLight from "~/assets/imgs/photoshopLight/Layer (1).png";
import { storeToRefs } from "pinia";
import { usePostsStore } from "~/store/data";
const allPostsStore = usePostsStore();
const { storePhotoshopPreview } = storeToRefs(allPostsStore);
// get theme mode from
const isDark = computed(() => allPostsStore.isDark);

const photoshopPreview = ref();
const activeIndex = ref(0);
const responsiveOptions = ref([
  {
    breakpoint: "1300px",
    numVisible: 8,
  },
  {
    breakpoint: "575px",
    numVisible: 3,
  },
]);
const images = ref<any>([]);
onMounted(async () => {
  photoshopPreview.value = storePhotoshopPreview.value;

  // Convert the array to the Primevue array shape
  photoshopPreview.value.forEach((item: any) => {
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

// lightbox
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
</script>
