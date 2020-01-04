 <template>
  <a :href="PostLink" target="_blank" class="redditCards">
    <div class="redditCard__postDetails">
      <span>Posted by {{Author}} on {{Subreddit}}</span>
    </div>
    <div class="redditCard__image-container">
      <img :src="Image" alt />
    </div>

    <div class="redditCard__content">
      <span>{{Title}}</span>

      <p>{{Text}}</p>
    </div>
  </a>
</template>

<script>
export default {
  name: "redditCard",
  props: ["Author", "Text", "Title", "PostLink", "Image", "Subreddit"]
};
</script>

<style>
.redditCards {
  display: flex;
  flex-flow: column;
  width: 300px;
  align-items: center;
  border-radius: 16px;
  box-shadow: 9px 9px 15px 0 gray, -9px -9px 15px 0 white;
}

.redditCard__postDetails {
  display: flex;
  flex-flow: row nowrap;
  padding: 1rem 0rem;
}

.redditCard__postDetails span {
  font-size: small;
  opacity: 0.6;
}

.redditCard__image-container {
  height: 200px;
  width: 100%;
}

.redditCard__image-container img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.redditCard__content {
  display: flex;
  flex-flow: column;
  padding: 1rem;
}

.redditCard__content span {
  font-weight: bold;
  margin-bottom: 1rem;
}

.redditCard__content p {
  font-size: smaller;
  padding-bottom: 1rem;
  text-overflow: ellipsis;
}
</style>