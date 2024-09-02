<template>
    <div class="container mt-5">
      <h2>Admin Panel - Video Management</h2>
      <h3>Video List</h3>
      <ul class="list-group mb-4">
        <li v-for="video in videos" :key="video.id" class="list-group-item">
          {{ video.title }} ({{ video.description }})
          <button class="btn btn-danger btn-sm float-end" @click="deleteVideo(video.id)">Delete</button>
        </li>
      </ul>
  
      <h3>Add New Video</h3>
      <form @submit.prevent="addVideo">
        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input type="text" class="form-control" v-model="newVideo.title" required>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <input type="text" class="form-control" v-model="newVideo.description" required>
        </div>
        <div class="mb-3">
          <label for="url" class="form-label">Video URL</label>
          <input type="text" class="form-control" v-model="newVideo.url" required>
        </div>
        <button type="submit" class="btn btn-success">Add Video</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        videos: [],
        newVideo: {
          title: "",
          description: "",
          url: "",
        },
      };
    },
    async created() {
      const response = await fetch("/videos.json");
      this.videos = await response.json();
    },
    methods: {
      async addVideo() {
        const newVideo = { ...this.newVideo, id: Date.now() };
        this.videos.push(newVideo);
  
        // JSON dosyasını güncelleyin
        await fetch("/path/to/videos.json", {
          method: "POST", // Gerçekte bir backend ile bu şekilde güncellenebilir.
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.videos),
        });
      },
      async deleteVideo(videoId) {
        this.videos = this.videos.filter((video) => video.id !== videoId);
  
        // JSON dosyasını güncelleyin
        await fetch("/path/to/videos.json", {
          method: "POST", // Gerçekte bir backend ile bu şekilde güncellenebilir.
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.videos),
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
  }
  
  h2, h3 {
    color: #343a40;
    margin-bottom: 20px;
  }
  </style>
  