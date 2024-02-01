<template>
  <div
    ref="numberPower"
    class="flex flex-col items-center justify-center py-12 px-2 animation-duration-1000 animation-ease-in-out"
  >
    <h1
      class="title text-center lg:text-start mb-10 text-2xl lg:text-5xl font-normal uppercase"
    >
      My <span class="text-primary_blue_color">power</span> in numbers
    </h1>
    <p class="font-normal text-center text-xs lg:text-sm lg:mt-2">
      Projects statistics and years of success & experience in the labor market
    </p>
    <div
      class="grid grid-cols-2 md:grid-cols-4 gap-4 justify-around w-full font-semibold lg:mt-12"
    >
      <div
        class="text-center flex flex-col items-center justify-center mt-16 lg:mt-0 mx-10"
        v-for="item in items"
        :key="item.key"
      >
        <h1 class="text-3xl md:text-5xl font-normal" :class="item.class"></h1>
        <p
          class="text-primary_blue_color uppercase font-bold text-lg lg:text-xl mt-2 text-nowrap"
        >
          {{ item.label }}
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { usePostsStore } from "~/store/data";

const allPostsStore = usePostsStore();
const post = await allPostsStore.pendingPosts;
const projects = ref<number>(0);
const clients = ref<number>(0);
const countries = ref<number>(0);
const cupCoffee = ref<number>(0);
const powerNumbers = ref();
powerNumbers.value = post[0].content.rendered.replace(/<[^>]+>/g, "");
const numbers = powerNumbers.value.split(" ").map(Number);
projects.value = numbers[0];
clients.value = numbers[1];
countries.value = numbers[2];
cupCoffee.value = numbers[3];
//Animation
const { $anime } = useNuxtApp();
const numberPower = ref<HTMLElement | null>(null);
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          $anime({
            targets: ".clients",
            innerHTML: [0, clients.value + "+"],
            easing: "linear",
            round: 1,
            duration: 3000,
          });
          $anime({
            targets: ".projects",
            innerHTML: [0, projects.value + "+"],
            easing: "linear",
            round: 1,
            duration: 3000,
          });
          $anime({
            targets: ".countries",
            innerHTML: [0, countries.value + "+"],
            easing: "linear",
            round: 1,
            duration: 3000,
          });
          $anime({
            targets: ".cupCoffee",
            innerHTML: [0, cupCoffee.value + "+"],
            easing: "linear",
            round: 1,
            duration: 3000,
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

  if (numberPower.value) {
    observer.observe(numberPower.value);
  }
});

const items = [
  { key: "clients", class: " clients", label: "Clients" },
  { key: "projects", class: "projects", label: "Projects" },
  { key: "countries", class: "countries", label: "Countries" },
  { key: "cupCoffee", class: "cupCoffee", label: "Cup Of Coffee" },
];
</script>
