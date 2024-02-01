import { defineStore } from "pinia";
import { allPostsService } from "@/services/postsService";
const posts = ref<any>();
const pendingPosts = ref<any>();
const recentPosts = ref<any>([]);
const photoshopPreview = ref<any>([]);
const isDataFetched = ref(false);
// Get JWT from api
await allPostsService.getJSONWebToken();
// Get pending posts from api
pendingPosts.value = await allPostsService.getPendingPosts();

// Get all posts from api
posts.value = await allPostsService.getAllPosts();
if (posts.value !== null && posts.value !== "null") {
  isDataFetched.value = true;
}
// Loop through each object in posts to extract recent projects
posts.value.map((post: any) =>
  post.categories?.map((cat: any) =>
    cat === "Recent Project" ? recentPosts.value.push(post) : ""
  )
);
// Loop through each object in posts to extract Photoshop Preview
posts.value.map((post: any) =>
  post.categories?.map((cat: any) =>
    cat === "Photoshop Preview" ? photoshopPreview.value.push(post) : ""
  )
);

// Loop through each object in posts to add isRecent property
posts.value.forEach((post: any) => {
  // Check if the categories array contains 'recent project'
  if (post.categories.includes("Recent Project")) {
    // Add a new property 'isRecent' and set it to true
    post.isRecent = true;
  } else {
    // If 'recent project' is not present, set 'isRecent' to false
    post.isRecent = false;
  }
});

export const usePostsStore = defineStore("postsStore", {
  state: () => ({
    isDark: ref(true),
  }),
  getters: {
    storeAllposts: (state) => {
      return posts.value;
    },
    storeRecentPosts: (state) => {
      return recentPosts.value;
    },
    storePendingPosts: (state) => {
      return pendingPosts.value;
    },
    storePhotoshopPreview: (state) => {
      return photoshopPreview.value;
    },
    storedPowernumber: (state) => {
      return pendingPosts.value[0].content.rendered.replace(/<[^>]+>/g, "");
    },
    storeIsDataFetched: (state) => {
      return isDataFetched.value;
    },
  },
  actions: {},
});
