<template>
  <div>
    <compHeader></compHeader>
    <div class="container flex flex-col">
      <div class="loader-container" v-if="isLoading === true">
        <div class="loader">
          <div class="loader__box"></div>
        </div>
        <div class="loader__circle-container" v-if="circles.length > 0">
          <div
            v-for="circle in circles"
            class="loader__circle"
            :key="circle"
            :style="{backgroundColor: circle.color}"
          ></div>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center mt-5 mb-5">
        <div class="mt-16" v-if="isLoading === false">
          <div class="flex flex-row flex-wrap">
            <redditCard
              v-for="(post, index) in posts"
              :key="index"
              v-bind:Author="post.author"
              v-bind:Title="post.title"
              v-bind:Image="post.image"
              v-bind:Subreddit="post.subreddit"
              v-bind:PostLink="post.postLink"
              v-bind:Text="post.text"
            ></redditCard>
          </div>
        </div>
        <div v-if="isLoading === false" class="pt-10">
          <span
            class="cursor-pointer p-3 bg-orange-400 font-bold text-white"
            @click="getPosts(10)"
          >Get Post</span>
        </div>
      </div>
    </div>
    <compFooter></compFooter>
  </div>
</template>

<script>
import redditCard from "~/components/redditCard.vue";
import compHeader from "~/components/header.vue";
import compFooter from "~/components/footer.vue";
import axios from "axios";

export default {
  components: {
    redditCard: () => import("~/components/redditCard.vue"),
    compHeader,
    compFooter
  },
  computed: {
    posts() {
      return this.$store.state.list;
    }
  },
  data: function() {
    return {
      isLoading: false,
      compsLoaded: 0,
      amount: 10,
      circles: [],
      subNames: []
    };
  },

  async mounted() {
    await axios.get("/PopularSubreddits").then(response => {
      this.subNames = response.data.subNames;
    });
  },

  methods: {
    async getPosts(amount) {
      var i = 0;
      var that = this;
      this.startLoading();
      this.circles = [];
      this.$store.state.list = [];
      while (i < amount) {
        await axios
          .post("/GetRandom", {
            subreddit: this.subNames[this.randomizer(100)]
          })
          .then(response => {
            this.$store.commit("showPost", {
              author: `u/${response.data.post.author}`,
              title: response.data.post.title,
              subreddit: `r/${response.data.post.subreddit}`,
              postLink: `https://www.reddit.com${response.data.post.permalink}`,
              image: this.checkImage(response.data.post.thumbnail),
              text: this.shortenText(response.data.post.selftext)
            });
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            i++;
            this.randomColorCircle(4);
          });
      }
      this.stopLoading();
    },
    startLoading() {
      return (this.isLoading = true);
    },
    stopLoading() {
      return (this.isLoading = false);
    },
    shortenText(text) {
      var newString = text;
      if (text.length > 100) {
        newString = text.split("", 100).join("") + "...";
      }
      return newString;
    },

    checkImage(imageUrl) {
      if (!imageUrl.startsWith("http")) {
        return "https://cdn.cultofmac.com/wp-content/uploads/2016/11/Reddit.png";
      }
      return imageUrl;
    },
    randomColorCircle(max) {
      var colors = ["#4285F4", "#DB4437", "#F4B400", "#0F9D58"];
      var num = this.randomizer(max);
      this.circles.push({
        color: colors[num]
      });
    },
    randomizer(limit) {
      var num = Math.floor(Math.random() * Math.floor(limit));
      return num;
    }
  }
};
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700&display=swap");

* {
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

body {
  background-color: rgba(0, 0, 0, 0.05);
  overflow-x: hidden;
}

.container {
  margin: 0 auto;
  min-height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 128px;
  height: 128px;
  position: relative;
  margin-bottom: 2rem;
}

.loader-container {
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.loader__circle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 0.3rem;
  animation-name: loaderCircle;
  animation-duration: 0.5s;
}

.loader__circle-container {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}

.loader__box {
  position: absolute;
  height: 50%;
  width: 50%;
  background: dodgerblue;
  animation-name: loaderBox;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  border-radius: 50%;
}

@keyframes loaderCircle {
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
}

@keyframes loaderBox {
  0% {
    left: 0px;
    top: 0px;
  }

  25% {
    left: 64px;
    top: 0px;
  }

  50% {
    left: 64px;
    top: 64px;
  }

  75% {
    left: 0px;
    top: 64px;
  }

  100% {
    left: 0px;
    top: 0px;
  }
}
</style>
