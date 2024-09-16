<template>
    <div class="container mt-5">
      <h2 class="text-center">Rating Hub</h2>
      <div class="row">
        <div class="col-md-4 mb-4" v-for="course in courses" :key="course.id">
          <div class="card h-100">
            <img :src="course.imageUrl" class="card-img-top" alt="course image">
            <div class="card-body">
              <h5 class="card-title">{{ course.title }}</h5>
              <p class="card-text">{{ course.description }}</p>
    
              <div class="mb-3">
                <label class="form-label">Rate this course:</label>
                <div class="stars">
                  <span
                    v-for="n in 5"
                    :key="n"
                    class="star"
                    :class="{ filled: course.userRating >= n }"
                    @click="rateCourse(course, n)"
                  >
                    ★
                  </span>
                </div>
                <p>Average Rating: {{ formatRating(course.averageRating) }} ({{ course.totalRatings }} ratings)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
    
  <script>
  import { getFromLocalStorage, saveToLocalStorage } from '@/utils/storage';
    
  export default {
    name: 'RatingHubPage',
    data() {
      return {
        courses: [
          { id: 1, title: 'Vue.js for Beginners', description: 'Learn Vue.js from scratch.', imageUrl: '/images/vuejsforbeginners.jpg', category: 'Web Development', userRating: 0, averageRating: 0, totalRatings: 0 },
          { id: 2, title: 'Advanced Vue.js', description: 'Advanced techniques in Vue.js.', imageUrl: '/images/advancedvuejs.jpg', category: 'Web Development', userRating: 0, averageRating: 0, totalRatings: 0 },
          { id: 3, title: 'Full-Stack JavaScript', description: 'Master full-stack development.', imageUrl: '/images/fullstackjavascript.jpg', category: 'Web Development', userRating: 0, averageRating: 0, totalRatings: 0 },
          { id: 4, title: 'Guitar for Beginners', description: 'Learn to play the guitar from scratch.', imageUrl: '/images/guitarforbeginners.jpg', category: 'Music', userRating: 0, averageRating: 0, totalRatings: 0 },
          { id: 5, title: 'Piano Mastery', description: 'Master the piano with our advanced course.', imageUrl: '/images/pianomastery.jpg', category: 'Music', userRating: 0, averageRating: 0, totalRatings: 0 },
          { id: 6, title: 'Music Theory Essentials', description: 'Understand the fundamentals of music theory.', imageUrl: '/images/musictheoryessentials.jpg', category: 'Music', userRating: 0, averageRating: 0, totalRatings: 0 },
          { id: 7, title: 'Fitness Training for Beginners', description: 'Start your fitness journey with basic exercises.', imageUrl: '/images/fitnesstrainingforbeginners.jpg', category: 'Fitness', userRating: 0, averageRating: 0, totalRatings: 0 },
          { id: 8, title: 'Advanced Piano Techniques', description: 'Take your piano skills to the next level.', imageUrl: '/images/advancedpianotechniques.jpg', category: 'Music', userRating: 0, averageRating: 0, totalRatings: 0 },
          { id: 9, title: 'Introduction to Hardware and Electronics', description: 'Learn the basics of hardware and electronics.', imageUrl: '/images/hardwareandelectronics.jpg', category: 'Electronics', userRating: 0, averageRating: 0, totalRatings: 0 },
          { id: 10, title: 'Running Techniques', description: 'Improve your running techniques and endurance.', imageUrl: '/images/runningtechniques.jpg', category: 'Fitness', userRating: 0, averageRating: 0, totalRatings: 0 },
          { id: 11, title: 'Basics of Graphic Design', description: 'Learn the essentials of graphic design.', imageUrl: '/images/graphicdesignbasics.jpg', category: 'Design', userRating: 0, averageRating: 0, totalRatings: 0 },
          { id: 12, title: 'Advanced Photoshop Techniques', description: 'Master Photoshop with advanced techniques.', imageUrl: '/images/advancedphotoshop.jpg', category: 'Design', userRating: 0, averageRating: 0, totalRatings: 0 },
          { id: 13, title: 'UI/UX Design Fundamentals', description: 'Understand the fundamentals of UI/UX design.', imageUrl: '/images/uiuxdesign.jpg', category: 'Design', userRating: 0, averageRating: 0, totalRatings: 0 },
          { id: 14, title: 'Yoga for Beginners', description: 'Start your yoga journey with basic exercises.', imageUrl: '/images/yogaforbeginners.jpg', category: 'Fitness', userRating: 0, averageRating: 0, totalRatings: 0 },
          { id: 15, title: 'Bodybuilding Basics', description: 'Learn the basics of bodybuilding and strength training.', imageUrl: '/images/bodybuildingbasics.jpg', category: 'Fitness', userRating: 0, averageRating: 0, totalRatings: 0 }
        ],
        loggedInUser: null,
      };
    },
    mounted() {
      
      this.loggedInUser = getFromLocalStorage('loggedInUser');
      
      if (this.loggedInUser) {
        
        this.courses.forEach(course => {
          const storedData = getFromLocalStorage(`course-${course.id}-${this.loggedInUser.id}-rating`);
          if (storedData) {
            course.userRating = storedData.userRating || 0;
          }
  
          
          const globalRatingData = getFromLocalStorage(`course-${course.id}-ratings`);
          if (globalRatingData) {
            course.totalRatings = globalRatingData.totalRatings || 0;
            course.averageRating = globalRatingData.averageRating || 0;
          }
        });
      }
    },
    methods: {
      rateCourse(course, rating) {
        if (!this.loggedInUser) {
          alert('Please log in to rate this course.');
          return;
        }
  
        
        course.userRating = rating;
        saveToLocalStorage(`course-${course.id}-${this.loggedInUser.id}-rating`, {
          userRating: course.userRating,
        });
  
        
        let globalRatingData = getFromLocalStorage(`course-${course.id}-ratings`) || {
          totalRatings: 0,
          averageRating: 0,
        };
  
        
        globalRatingData.totalRatings++;
        globalRatingData.averageRating = ((globalRatingData.averageRating * (globalRatingData.totalRatings - 1)) + rating) / globalRatingData.totalRatings;
        
        course.totalRatings = globalRatingData.totalRatings;
        course.averageRating = globalRatingData.averageRating.toFixed(1); 
  
        
        saveToLocalStorage(`course-${course.id}-ratings`, globalRatingData);
      },
      formatRating(rating) {
        return parseFloat(rating).toFixed(1); 
      }
    }
  };
  </script>
    
  <style scoped>
  .stars {
    display: flex;
    cursor: pointer;
  }
  
  .star {
    font-size: 24px;
    color: #ddd;
    transition: color 0.3s;
  }
  
  .star.filled {
    color: #ffcc00; 
  }
  
  .star:hover {
    color: #ffcc00;
  }
  </style>
  