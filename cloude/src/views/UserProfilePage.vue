<template>
  <div class="container mt-5">
    <h2>User Profile</h2>
    <p>Here you can see your liked videos and bookmarks.</p>
    <div>
      <h3>Liked Videos</h3>
      <ul>
        <li v-for="video in likedVideos" :key="video.id">
          {{ video.title }}
        </li>
      </ul>
    </div>
    <div>
      <h3>Bookmarks</h3>
      <ul>
        <li v-for="video in bookmarkedVideos" :key="video.id">
          {{ video.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfilePage',
  computed: {
    likedVideos() {
      return this.$store.state.courses.filter(course => this.$store.state.likes.includes(course.id));
    },
    bookmarkedVideos() {
      return this.$store.state.courses.filter(course => this.$store.state.bookmarks.includes(course.id));
    }
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
}

h2 {
  color: #343a40;
  margin-bottom: 20px;
}
</style>
