<template>
    <div class="video-player">
      <video
        ref="video"
        controls
        :src="videoUrl"
        @timeupdate="onTimeUpdate"
        @ended="onVideoEnded"
      ></video>
      <div class="video-controls">
        <button @click="togglePlayPause">
          {{ isPlaying ? 'Pause' : 'Play' }}
        </button>
        <button @click="bookmarkCurrentTime">Bookmark</button>
      </div>
      <div class="video-info">
        <p>Current Time: {{ currentTimeFormatted }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'VideoPlayerComponent',
    props: {
      videoUrl: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        isPlaying: false,
        currentTime: 0,
      };
    },
    computed: {
      currentTimeFormatted() {
        const minutes = Math.floor(this.currentTime / 60);
        const seconds = Math.floor(this.currentTime % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
      },
    },
    methods: {
      togglePlayPause() {
        const video = this.$refs.video;
        if (video.paused) {
          video.play();
          this.isPlaying = true;
        } else {
          video.pause();
          this.isPlaying = false;
        }
      },
      onTimeUpdate() {
        this.currentTime = this.$refs.video.currentTime;
      },
      bookmarkCurrentTime() {
        // This is where you could save the bookmark to the store
        alert(`Bookmark added at ${this.currentTimeFormatted}`);
      },
      onVideoEnded() {
        this.isPlaying = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .video-player {
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
  }
  
  .video-controls {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  
  button {
    background-color: #42b983;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #357a6b;
  }
  
  .video-info {
    margin-top: 10px;
    font-size: 14px;
    color: #333;
  }
  </style>
  