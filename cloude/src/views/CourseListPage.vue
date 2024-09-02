<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">All Courses</h2>

    <div class="row">
      <div class="col-md-4 mb-4" v-for="course in filteredCourses" :key="course.id">
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
</template>

<script>
export default {
  name: 'CourseListPage',
  data() {
    return {
      courses: [
        { id: 1, title: 'Vue.js for Beginners', description: 'Learn Vue.js from scratch.', imageUrl: 'https://via.placeholder.com/400x200', category: 'Web Development' },
        { id: 2, title: 'Advanced Vue.js', description: 'Advanced techniques in Vue.js.', imageUrl: 'https://via.placeholder.com/400x200', category: 'Web Development' },
        { id: 3, title: 'Full-Stack JavaScript', description: 'Master full-stack development.', imageUrl: 'https://via.placeholder.com/400x200', category: 'Web Development' },
        { id: 4, title: 'Guitar for Beginners', description: 'Learn to play the guitar from scratch.', imageUrl: 'https://via.placeholder.com/400x200', category: 'Music' },
        { id: 5, title: 'Piano Mastery', description: 'Master the piano with our advanced course.', imageUrl: 'https://via.placeholder.com/400x200', category: 'Music' },
        { id: 6, title: 'Music Theory Essentials', description: 'Understand the fundamentals of music theory.', imageUrl: 'https://via.placeholder.com/400x200', category: 'Music' },
        { id: 7, title: 'Fitness Training for Beginners', description: 'Start your fitness journey with basic exercises.', imageUrl: 'https://via.placeholder.com/400x200', category: 'Fitness' },
        { id: 8, title: 'Advanced Piano Techniques', description: 'Take your piano skills to the next level.', imageUrl: 'https://via.placeholder.com/400x200', category: 'Music' },
        { id: 9, title: 'Introduction to Hardware and Electronics', description: 'Learn the basics of hardware and electronics.', imageUrl: 'https://via.placeholder.com/400x200', category: 'Electronics' },
        { id: 10, title: 'Running Techniques', description: 'Improve your running techniques and endurance.', imageUrl: 'https://via.placeholder.com/400x200', category: 'Fitness' },
        { id: 11, title: 'Basics of Graphic Design', description: 'Learn the essentials of graphic design.', imageUrl: 'https://via.placeholder.com/400x200', category: 'Design' },
        { id: 12, title: 'Advanced Photoshop Techniques', description: 'Master Photoshop with advanced techniques.', imageUrl: 'https://via.placeholder.com/400x200', category: 'Design' },
        { id: 13, title: 'UI/UX Design Fundamentals', description: 'Understand the fundamentals of UI/UX design.', imageUrl: 'https://via.placeholder.com/400x200', category: 'Design' },
        { id: 14, title: 'Yoga for Beginners', description: 'Start your yoga journey with basic exercises.', imageUrl: 'https://via.placeholder.com/400x200', category: 'Fitness' },
        { id: 15, title: 'Bodybuilding Basics', description: 'Learn the basics of bodybuilding and strength training.', imageUrl: 'https://via.placeholder.com/400x200', category: 'Fitness' }
      ],
      filteredCourses: []  
    };
  },
  methods: {
    filterCourses(query, category) {
      let searchTerm = query ? query.toLowerCase() : '';
      this.filteredCourses = this.courses.filter(course => {
        const titleLowerCase = course.title.toLowerCase();
        const matchesSearch = titleLowerCase.includes(searchTerm);
        const matchesCategory = category ? course.category === category : true;
        return matchesSearch && matchesCategory;
      });
    }
  },
  watch: {
    '$route.query.q'(newQuery) {
      const category = this.$route.query.category || '';
      this.filterCourses(newQuery, category);
    },
    '$route.query.category'(newCategory) {
      const query = this.$route.query.q || '';
      this.filterCourses(query, newCategory);
    }
  },
  created() {
    const query = this.$route.query.q || '';
    const category = this.$route.query.category || '';
    this.filterCourses(query, category);
  }
};
</script>

<style scoped>
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
