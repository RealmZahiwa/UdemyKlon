<template>
  <div class="container mt-5">
    <!-- Yükleme Ekranı -->
    <loading v-model:active="isLoading" :can-cancel="false" :is-full-page="true" />

    <!-- Ana İçerik -->
    <div v-if="!isLoading">
      <h2 class="text-center mb-4">All Courses</h2>
      <div class="row">
        <div class="col-md-4 mb-4" v-for="course in filteredCourses" :key="course.id">
          <div class="card h-100">
            <img :src="course.imageUrl" class="card-img-top" alt="course image" @error="handleImageError">
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
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

export default {
  name: 'CourseListPage',
  components: {
    Loading
  },
  data() {
    return {
      courses: [
        { id: 1, title: 'Vue.js for Beginners', description: 'Learn Vue.js from scratch.', imageUrl: '/images/vuejsforbeginners.jpg', category: 'Web Development' },
        { id: 2, title: 'Advanced Vue.js', description: 'Advanced techniques in Vue.js.', imageUrl: '/images/advancedvuejs.jpg', category: 'Web Development' },
        { id: 3, title: 'Full-Stack JavaScript', description: 'Master full-stack development.', imageUrl: '/images/fullstackjavascript.jpg', category: 'Web Development' },
        { id: 4, title: 'Guitar for Beginners', description: 'Learn to play the guitar from scratch.', imageUrl: '/images/guitarforbeginners.jpg', category: 'Music' },
        { id: 5, title: 'Piano Mastery', description: 'Master the piano with our advanced course.', imageUrl: '/images/pianomastery.jpg', category: 'Music' },
        { id: 6, title: 'Music Theory Essentials', description: 'Understand the fundamentals of music theory.', imageUrl: '/images/musictheoryessentials.jpg', category: 'Music' },
        { id: 7, title: 'Fitness Training for Beginners', description: 'Start your fitness journey with basic exercises.', imageUrl: '/images/fitnesstrainingforbeginners.jpg', category: 'Fitness' },
        { id: 8, title: 'Advanced Piano Techniques', description: 'Take your piano skills to the next level.', imageUrl: '/images/advancedpianotechniques.jpg', category: 'Music' },
        { id: 9, title: 'Introduction to Hardware and Electronics', description: 'Learn the basics of hardware and electronics.', imageUrl: '/images/hardwareandelectronics.jpg', category: 'Electronics' },
        { id: 10, title: 'Running Techniques', description: 'Improve your running techniques and endurance.', imageUrl: '/images/runningtechniques.jpg', category: 'Fitness' },
        { id: 11, title: 'Basics of Graphic Design', description: 'Learn the essentials of graphic design.', imageUrl: '/images/graphicdesignbasics.jpg', category: 'Design' },
        { id: 12, title: 'Advanced Photoshop Techniques', description: 'Master Photoshop with advanced techniques.', imageUrl: '/images/advancedphotoshoptechniques.jpg', category: 'Design' },
       ],
      filteredCourses: [],
      isLoading: true // Yükleme durumu
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
    },
    handleImageError(event) {
      console.log('Image failed to load:', event.target.src); 
      event.target.src = '/images/default.jpg'; 
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
  async created() {
    const query = this.$route.query.q || '';
    const category = this.$route.query.category || '';
    
    // Veriler yüklenmeden önce loading başlasın
    this.isLoading = true;

    // Verileri yükleyelim (yapay bir gecikme simülasyonu ekleyebiliriz)
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1 saniye bekleme

    this.filterCourses(query, category);

    // Veriler yüklendikten sonra loading kapatılsın
    this.isLoading = false;
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
