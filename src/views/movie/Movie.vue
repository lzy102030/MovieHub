<template>
  <div>
    <span style="font-size: 60px">This is detail of movie!</span>
    <div style="display: flex">
      <img :src="this.movie.image" class="image">
    </div>
  </div>
</template>

<script>
export default {
  name: "Movie.vue",
  data() {
    return {
      movie: {
        image: require("@/assets/background.jpg")
      }
    }
  }
}
</script>

<style scoped>
.image {
  width: 60px;
  height: 100px;
}
</style>