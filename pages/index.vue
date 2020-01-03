<template>
  <div class="container flex flex-col ">
 
 <div v-if="loaded != true" class="flex flex-row justify-center align-middle"><span>Loading</span></div>
 <div v-show="loading == false" class="flex flex-row">
   <redditCard 
   v-for="(post, index) in posts"
   :key="index"
   v-bind:Author="post.author" 
   v-bind:Title="post.title"
   v-bind:Image="post.image"
   v-bind:Subreddit="post.subreddit"
   v-bind:PostLink="post.postLink"
   v-bind:Text="post.text"
   >
   </redditCard>
   </div>
   <div class=" pt-10">
   <span class=" cursor-pointer p-3 bg-orange-400 font-bold text-white" @click="testMethod(10)">Get Post</span>
  </div>
  </div>
</template>

<script>
import redditCard from '~/components/redditCard.vue'
import axios from "axios";
import { mapMutations } from 'vuex';

export default {
  components: {
    redditCard
  },

  computed: {
    posts() {
      return this.$store.state.list;
    },
  
  },
  data: function () {
    return {
        loading: false,
        loaded: true,
    }
  },

  methods: {
    testMethod(amount) {
      
      this.loading = true;
      this.loaded = false;
      var i = 0;
      this.$store.state.list = [];
      while(i < amount) {
        axios.post('0.0.0.0:3000/GetRandom').then((response) => {
          console.log(response);      
        this.$store.commit("showPost", { 
        author: `u/${response.data.list.author}`,
        title: response.data.list.title,
        subreddit: `r/${response.data.list.subreddit}`,
        postLink: `https://www.reddit.com${response.data.list.permalink}`,
        image: this.checkImage(response.data.list.thumbnail),
        text: this.shortenText(response.data.list.selftext),
        });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(i++);
        if(i == amount) {
       this.loading = false;
      }
  }
   
    this.loaded = true;
  },

    shortenText(text) {
       var newString = text;
       if(text.length > 100) {
         newString = text.split('', 100).join("") + "...";
       }
       return newString;
    },

    checkImage(imageUrl) {
        if(imageUrl === "self") {
          return "https://cdn.cultofmac.com/wp-content/uploads/2016/11/Reddit.png"
        }
        return imageUrl
    }
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

*{
 box-sizing: border-box;
}

body {
 background-color: rgba(0, 0, 0, 0.05);
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
</style>
