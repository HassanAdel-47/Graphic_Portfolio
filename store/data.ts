import { defineStore } from "pinia";
import { allPostsService } from "@/services/postsService";

export const usePostsStore = defineStore("postsStore", {
  state: () => ({
    isDark: ref(true),
    posts: ref<any>(),
    pendingPosts: ref<any>(),
    recentPosts: ref<any>([]),
    photoshopPreview: ref<any>([]),
    isDataFetched: ref(false),
  }),
  actions: {
    initialStore: async function () {
      // Get JWT from api
      await allPostsService.getJSONWebToken();
      // Get pending posts from api
      this.pendingPosts = await allPostsService.getPendingPosts();
      // Get all posts from api
      this.posts = await allPostsService.getAllPosts();

      if (this.posts !== null && this.posts !== "null") {
        this.isDataFetched = true;
      }
      // Loop through each object in posts to extract recent projects
      this.posts.map((post: any) =>
        post.categories?.map((cat: any) =>
          cat === "Recent Project" ? this.recentPosts.push(post) : ""
        )
      );
      // Loop through each object in posts to extract Photoshop Preview
      this.posts.map((post: any) =>
        post.categories?.map((cat: any) =>
          cat === "Photoshop Preview" ? this.photoshopPreview.push(post) : ""
        )
      );

      // Loop through each object in posts to add isRecent property
      this.posts.forEach((post: any) => {
        // Check if the categories array contains 'recent project'
        if (post.categories.includes("Recent Project")) {
          // Add a new property 'isRecent' and set it to true
          post.isRecent = true;
        } else {
          // If 'recent project' is not present, set 'isRecent' to false
          post.isRecent = false;
        }
      });
    },
  },
});
