const baseUrl =
  "https://dev-hassanadel3886.pantheonsite.io/wp-json/wp/v2/posts";
const randomNumber = Math.floor(Math.random() * 100000) + 1;
const username = "Hassanadel3886";
const password = "sniperHassan3886";
export const allPostsService = {
  // function to get all posts from api
  getAllPosts: async function (): Promise<any> {
    const cards = ref<any>([]);
    const stringResponse = ref("");
    const parsedResponse = ref();
    cards.value = [];
    stringResponse.value = "";
    parsedResponse.value = [];
    try {
      const response = await fetch(
        `${baseUrl}?_embed=&${randomNumber}&per_page=100`
      );
      if (response.ok) {
        // get string response
        stringResponse.value = await response.text();
        // convert string response to an object
        parsedResponse.value = JSON.parse(stringResponse.value);
        //loop on all posts and extract wanted data
        parsedResponse.value.forEach((post: any) => {
          if (post._embedded["wp:featuredmedia"][0].code) {
            console.error("error", post._embedded["wp:featuredmedia"][0]);
          } else {
            const card = {
              id: post.id,
              title: post.title.rendered,
              // fetch image thumbnail resolution
              imageThumbnail: post._embedded["wp:featuredmedia"]
                ? post._embedded["wp:featuredmedia"][0].media_details.sizes
                    .thumbnail.source_url
                : "",
              // fetch image small resolution
              imageSmall: post._embedded["wp:featuredmedia"]
                ? post._embedded["wp:featuredmedia"][0].media_details.sizes
                    .medium.source_url
                : "",
              // fetch image small resolution
              imageMedium: post._embedded["wp:featuredmedia"]
                ? post._embedded["wp:featuredmedia"][0].media_details.sizes
                    .medium_large.source_url
                : "",
              // fetch image large resolution
              imageLarge: post._embedded["wp:featuredmedia"]
                ? post._embedded["wp:featuredmedia"][0].media_details.sizes
                    .large.source_url
                : "",
              // fetch image high resolution
              imageFull: post._embedded["wp:featuredmedia"]
                ? post._embedded["wp:featuredmedia"][0].media_details.sizes.full
                    .source_url
                : "",
              // fetch post content
              content: post?.content?.rendered,
              // fetch post categories
              categories: post._embedded["wp:term"]?.flatMap(
                (innerArray: any) =>
                  innerArray.map((category: any) => category.name)
              ),
            };
            // put all post in one array
            cards.value.push(card);
          }
        });
        return cards.value;
      } else {
        throw new Error("Failed to fetch HTML");
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  },
  getJSONWebToken: async function (): Promise<any> {
    try {
      const response = await fetch(
        `https://dev-hassanadel3886.pantheonsite.io/wp-json/jwt-auth/v1/token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      localStorage.setItem("JWT", data.token);
    } catch (error) {
      console.error("Error", error);
    }
  },
  // function to get pending posts only from api
  getPendingPosts: async function (): Promise<any> {
    try {
      const response = await fetch(
        `${baseUrl}?_embed=&${randomNumber}&status=pending`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          },
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error", error);
    }
  },
  // function to get pending posts only from api
  updatePendingPost: async function (): Promise<any> {
    try {
      const response = await fetch(`${baseUrl}/145`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("JWT")}`,
        },
        body: JSON.stringify({
          content: "415 212 20 32",
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error", error);
    }
  },
};
