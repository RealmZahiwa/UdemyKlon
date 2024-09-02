<template>
    <div class="container mt-5">
      <h2>Upload Video</h2>
      <form @submit.prevent="handleVideoUpload">
        <div class="mb-3">
          <label for="videoTitle" class="form-label">Video Title</label>
          <input type="text" class="form-control" v-model="videoTitle" required>
        </div>
        <div class="mb-3">
          <label for="videoDescription" class="form-label">Video Description</label>
          <input type="text" class="form-control" v-model="videoDescription" required>
        </div>
        <div class="mb-3">
          <label for="videoFile" class="form-label">Choose Video</label>
          <input type="file" class="form-control" @change="handleFileSelected" accept="video/*" required>
        </div>
        <button type="submit" class="btn btn-primary">Upload Video</button>
      </form>
      <p v-if="successMessage" class="text-success mt-3">{{ successMessage }}</p>
      <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        videoTitle: "",
        videoDescription: "",
        videoFile: null,
        successMessage: null,
        errorMessage: null,
      };
    },
    methods: {
      handleFileSelected(event) {
        this.videoFile = event.target.files[0];
      },
      handleVideoUpload() {
        if (!this.videoFile) {
          this.errorMessage = "Please select a video file.";
          return;
        }
  
        
        const videoUrl = URL.createObjectURL(this.videoFile);
  
        const newVideo = {
          id: Date.now(),
          title: this.videoTitle,
          description: this.videoDescription,
          url: videoUrl, 
        };
  
       
        console.log("Video uploaded:", newVideo);
  
        
        this.videoTitle = "";
        this.videoDescription = "";
        this.videoFile = null;
        this.successMessage = "Video uploaded successfully!";
        this.errorMessage = null;
      },
    },
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
  
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
    border-color: #004085;
  }
  
  .text-success {
    color: green;
  }
  
  .text-danger {
    color: red;
  }
  </style>
  