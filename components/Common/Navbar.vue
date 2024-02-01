<template>
  <div class="card fixed top-0 z-40 w-full">
    <Toast
      group="pt"
      position="bottom-left"
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
    <Menubar
      :model="items"
      class="flex items-center justify-center !px-8"
      :pt="{
        root: {
          class: '!bg-navbar_bg_color  !border-0 ',
        },
      }"
    >
      <template #start>
        <div class="w-[50px]">
          <img
            class="w-full h-full object-cover"
            :src="isDark ? whiteLogo : blackLogo"
            alt="Image"
          />
        </div>
      </template>
      <template #item="{ item, props, root }">
        <NuxtLink
          class="flex justify-center items-center w-full text-primary_text_color hover:text-primary_blue_color rounded-2xl duration-500 ease-in-out mx-2"
          v-bind="props.action"
          :to="item.url"
        >
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <Badge
            v-if="item.badge"
            :class="{ 'ml-auto': !root, 'ml-2': root }"
            :value="item.badge"
          />
          <span
            v-if="item.shortcut"
            class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1"
            >{{ item.shortcut }}</span
          >
        </NuxtLink>
      </template>
      <template #end>
        <div class="flex align-items-center gap-2">
          <ToggleButton
            onLabel=""
            offLabel=""
            @click="isDark = !isDark"
            @change="toggleTheme()"
            class="group !transition-all !duration-700 !p-0 ease-in-out !rounded-full flex items-center justify-center opacity-25 hover:opacity-100"
            :class="
              isDark
                ? 'bg-primary_text_color hover:bg-primary_blue_color '
                : 'bg-primary_text_color hover:bg-primary_bg_color '
            "
          >
            <template #icon
              ><span
                class="m-4 !self-center"
                :class="
                  isDark
                    ? 'pi pi-sun text-black group-hover:text-white '
                    : 'pi pi-moon text-white group-hover:text-black'
                "
              />
            </template>
          </ToggleButton>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { usePostsStore } from "~/store/data";
import whiteLogo from "~/assets/imgs/15.png";
import blackLogo from "~/assets/imgs/16.png";
const allPostsStore = usePostsStore();
const toast = useToast();

// get theme mode from
const isDark = computed({
  get: () => allPostsStore.isDark,
  set: (value) => (allPostsStore.isDark = value),
});

// Navbar Links
const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
    url: "/#Home",
  },
  {
    label: "About",
    icon: "pi pi-user",
    url: "/#About",
  },
  {
    label: "Contact",
    icon: "pi pi-envelope",
    url: "/#Contact",
  },
  {
    label: "Recent",
    icon: "pi pi-history",
    url: "/#Recent",
  },
  {
    label: "Portfolio",
    icon: "pi pi-briefcase",
    url: "/#Portfolio",
  },
]);

// change current theme to next
const toggleTheme = () => {
  toast.add({
    severity: "info",
    summary: "Info",
    detail: isDark.value
      ? "Theme Has Changed To Light Mode"
      : "Theme Has Changed To Dark Mode",
    group: "pt",
    life: 3000,
  });
  const body = document.documentElement;
  if (isDark.value) {
    // Light theme
    body.style.setProperty("--primary-bg-color", "#E2EAFC");
    body.style.setProperty("--secondary-bg-color", "#B6CCFE");
    body.style.setProperty("--navbar-bg-color", "#aac9fa");
    body.style.setProperty("--primary-blue-color", "#104a8e");
    body.style.setProperty("--primary-text-color", "#1c1b22");
  } else {
    // Dark theme
    body.style.setProperty("--primary-bg-color", "#1c1b22");
    body.style.setProperty("--secondary-bg-color", "#212529");
    body.style.setProperty("--navbar-bg-color", "#17171a");
    body.style.setProperty("--primary-blue-color", "#60a5fa");
    body.style.setProperty("--primary-text-color", "#e2eafc");
  }
};
</script>
<style lang="scss">
@media screen and (min-width: 960px) {
  .p-menubar-root-list {
    text-align: center;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.p-menubar-button {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  &:hover {
    background-color: transparent !important;
  }
  &:focus {
    box-shadow: none !important;
  }
}
.p-menubar-end {
  margin: 0px !important;
}
.p-button {
  border: none !important;
  box-shadow: none !important;
}
.p-menuitem-content {
  background: none !important;
}
</style>
