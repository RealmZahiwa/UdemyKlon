<template>
  <div class="home text-center">
    <div class="jumbotron jumbotron-fluid bg-primary text-white py-5 mb-5">
      <div class="container">
        <h1 class="display-4">Welcome to Cloude</h1>
        <p class="lead">Be the Best of yourself ! </p>
        <router-link to="/courses" class="btn btn-light btn-lg">Browse Courses</router-link>
      </div>
    </div>
    <div class="container mt-5">
      <h2 class="mb-4">Popular Courses</h2>
      <div class="row">
        <div class="col-md-4 mb-4" v-for="course in popularCourses" :key="course.id">
          <div class="card h-100">
            <img :src="course.imageUrl" class="card-img-top" alt="course image">
            <div class="card-body">
              <h5 class="card-title">{{ course.title }}</h5>
              <p class="card-text">{{ course.description }}</p>
              <router-link :to="'/courses/' + course.id" class="btn btn-primary">View Course</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      popularCourses: [
        { id: 1, title: 'Vue.js for Beginners', description: 'Start learning Vue.js from scratch.', imageUrl: 'https://via.placeholder.com/400x200' },
        { id: 2, title: 'Advanced Vue.js', description: 'Take your Vue.js skills to the next level.', imageUrl: 'https://via.placeholder.com/400x200' },
        { id: 3, title: 'Full-Stack JavaScript', description: 'Become a full-stack developer using JavaScript.', imageUrl: 'https://via.placeholder.com/400x200' },
        { id: 4, title: 'Guitar for Beginners', description: 'Learn to play the guitar from scratch.', imageUrl: 'https://via.placeholder.com/400x200' },
        { id: 5, title: 'Piano Mastery', description: 'Master the piano with our advanced course.', imageUrl: 'https://via.placeholder.com/400x200' },
        { id: 6, title: 'Music Theory Essentials', description: 'Understand the fundamentals of music theory.', imageUrl: 'https://via.placeholder.com/400x200' },
      ],
    };
  },
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
