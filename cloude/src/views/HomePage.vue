<template>
  <div class="home text-center">
    <!-- Yükleme Ekranı -->
    <loading v-model:active="isLoading" :can-cancel="false" :is-full-page="true" />

    <!-- Ana İçerik -->
    <div v-if="!isLoading">
      <div class="jumbotron jumbotron-fluid bg-primary text-white py-5 mb-5">
        <div class="container">
          <h1 class="display-4">Welcome to Cloude</h1>
          <p class="lead">Be the Best of yourself!</p>
          <router-link to="/courses" class="btn btn-light btn-lg">Browse Courses</router-link>
        </div>
      </div>

      <div class="container mt-5">
        <h2 class="mb-4">Popular Courses</h2>
        <div class="row">
          <div class="col-md-4 mb-4" v-for="course in popularCourses" :key="course.id">
            <div class="card h-100">
              <img :src="`/images/${course.coverImage}`" class="card-img-top" alt="course image">
              <div class="card-body">
                <h5 class="card-title">{{ course.title }}</h5>
                <p class="card-text">{{ course.description }}</p>
                <p class="card-text">Average Rating: {{ course.averageRating.toFixed(1) }} ({{ course.totalRatings }} ratings)</p>
                <router-link :to="'/courses/' + course.id" class="btn btn-primary">View Course</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

export default {
  name: 'HomePage',
  components: {
    Loading
  },
  data() {
    return {
      courses: [],
      popularCourses: [],
      isLoading: true // Yükleme durumu
    };
  },
  async mounted() {
    await this.fetchCourses();
    this.updatePopularCourses();
    this.isLoading = false; // Yükleme tamamlandığında kapat
  },
  methods: {
    async fetchCourses() {
      try {
        const response = await fetch('https://66e7235817055714e58b908b.mockapi.io/courses');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.courses = data;
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    },
    updatePopularCourses() {
      const coursesWithRatings = this.courses.map(course => {
        const globalRatingData = JSON.parse(localStorage.getItem(`course-${course.id}-ratings`)) || {
          totalRatings: 0,
          averageRating: 0
        };

        return {
          ...course,
          averageRating: globalRatingData.averageRating,
          totalRatings: globalRatingData.totalRatings
        };
      });

      this.popularCourses = coursesWithRatings
        .sort((a, b) => b.averageRating - a.averageRating)
        .slice(0, 6);
    }
  }
};
</script>

<style scoped>
.jumbotron {
  background: linear-gradient(to right, #007bff, #00c6ff);
  color: #fff;
}
.card img {
  height: 200px;
  object-fit: cover;
}
.card {
  transition: transform 0.3s;
}
.card:hover {
  transform: translateY(-10px);
}
</style>
