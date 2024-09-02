<template>
  <div class="container mt-5">
    <h2>{{ course.title }}</h2>
    <p class="lead">{{ course.description }}</p>
    
    
    <div class="mt-4">
      <h4>Instructor</h4>
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img :src="course.instructorImageUrl" class="img-fluid rounded-start" alt="Instructor Image">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ course.instructor }}</h5>
              <p class="card-text">{{ course.instructorBio }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    <div class="mt-4">
      <h4>What you'll learn</h4>
      <ul>
        <li v-for="(learningPoint, index) in course.learningPoints" :key="index">{{ learningPoint }}</li>
      </ul>
    </div>

    
    <div class="mt-4">
      <h4>Course Information</h4>
      <p><strong>Level:</strong> {{ course.level }}</p>
      <p><strong>Expected Outcomes:</strong> {{ course.expectations }}</p>
    </div>

    
    <div class="mt-4">
      <h4>Course Content</h4>
      <ul class="list-group">
        <li v-for="lesson in course.lessons" :key="lesson.id" class="list-group-item">
          <h5>{{ lesson.title }}</h5>
          <p>{{ lesson.description }}</p>
          <video controls :src="lesson.videoUrl" class="w-100"></video>

          
          <div class="mt-2 d-flex align-items-center">
            <button @click="toggleLike(lesson.id)" class="btn btn-outline-primary me-2 d-flex align-items-center">
              <i class="bi bi-hand-thumbs-up me-1"></i>
              {{ likedLessons.includes(lesson.id) ? 'Unlike' : 'Like' }}
            </button>
            <span class="badge bg-primary me-3">{{ globalLikeCount(lesson.id) }}</span>

            <button @click="toggleBookmark(lesson.id)" class="btn btn-outline-warning d-flex align-items-center">
              <i class="bi bi-bookmark me-1"></i>
              {{ bookmarkedLessons.includes(lesson.id) ? 'Remove Bookmark' : 'Bookmark' }}
            </button>
            <span class="badge bg-warning text-dark">{{ globalBookmarkCount(lesson.id) }}</span>
          </div>

         
          <div class="mt-4">
            <h6>Comments</h6>
            <ul>
              <li v-for="comment in lesson.comments" :key="comment.id">
                <strong>{{ comment.author }}</strong>: {{ comment.text }}

                
                <button v-if="comment.author === currentUser.name" @click="deleteComment(lesson.id, comment.id)" class="btn btn-sm btn-danger ms-2">Delete</button>

                
                <ul class="mt-2">
                  <li v-for="reply in comment.replies" :key="reply.id">
                    <strong>{{ reply.author }}</strong>: {{ reply.text }}

                    
                    <button v-if="reply.author === currentUser.name" @click="deleteReply(lesson.id, comment.id, reply.id)" class="btn btn-sm btn-danger ms-2">Delete</button>
                  </li>
                </ul>
                
                
                <div class="input-group mt-2">
                  <input v-model="newReplies[comment.id]" type="text" class="form-control" placeholder="Reply to this comment...">
                  <button @click="addReply(lesson.id, comment.id)" class="btn btn-secondary">Reply</button>
                </div>
              </li>
            </ul>
            <div class="input-group mt-2">
              <input v-model="newComment" type="text" class="form-control" placeholder="Add a comment...">
              <button @click="addComment(lesson.id)" class="btn btn-primary">Post</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { saveToLocalStorage, getFromLocalStorage } from '@/utils/storage';

export default {
  data() {
    return {
      course: {},
      likedLessons: [],  
      bookmarkedLessons: [],  
      newComment: "",  
      newReplies: {},  //yorum
      currentUser: null,  
    };
  },
  async created() {
    const response = await fetch("/courses.json");
    const courses = await response.json();
    const courseId = this.$route.params.id;

    this.course = courses.find((course) => course.id === parseInt(courseId));

    // vuejs local storeççekme
    const storedUser = getFromLocalStorage('loggedInUser');
    if (storedUser) {
      this.currentUser = storedUser;
      this.loadLikesAndBookmarks();
    }

    // öncekileri yükle
    this.course.lessons = this.course.lessons.map(lesson => {
      const comments = this.loadComments(lesson.id);
      if (comments.length === 0) {
        comments.push({ id: 1, author: "Example User", text: "Bu örnek yorumdur.", replies: [] });
        saveToLocalStorage('comments', { ...getFromLocalStorage('comments'), [lesson.id]: comments });
      }
      
      // bokmark -begenme
      lesson.likeCount = this.globalLikeCount(lesson.id);
      lesson.bookmarkCount = this.globalBookmarkCount(lesson.id);

      return {
        ...lesson,
        comments
      };
    });
  },
  methods: {
    addComment(lessonId) {
      const storedComments = getFromLocalStorage('comments') || {};
      const lessonComments = storedComments[lessonId] || [];

      if (this.newComment.trim() !== "" && this.currentUser) {
        const newCommentObj = {
          id: Date.now(),
          author: this.currentUser.name,  
          text: this.newComment.trim(),
          replies: []
        };
        lessonComments.push(newCommentObj);
        storedComments[lessonId] = lessonComments;
        saveToLocalStorage('comments', storedComments);
        this.course.lessons.find(l => l.id === lessonId).comments = lessonComments;
        this.newComment = "";  // yorum 0
      }
    },
    addReply(lessonId, commentId) {
      const storedComments = getFromLocalStorage('comments') || {};
      const lessonComments = storedComments[lessonId] || [];
      const comment = lessonComments.find(c => c.id === commentId);

      if (this.newReplies[commentId]?.trim() !== "" && this.currentUser) {
        const newReplyObj = {
          id: Date.now(),
          author: this.currentUser.name,  // 
          text: this.newReplies[commentId].trim()
        };
        comment.replies.push(newReplyObj);
        storedComments[lessonId] = lessonComments;
        saveToLocalStorage('comments', storedComments);
        this.newReplies[commentId] = "";  // uyorum sıfılacan
      }
    },
    deleteComment(lessonId, commentId) {
      const storedComments = getFromLocalStorage('comments') || {};
      let lessonComments = storedComments[lessonId] || [];
      lessonComments = lessonComments.filter(comment => comment.id !== commentId);
      storedComments[lessonId] = lessonComments;
      saveToLocalStorage('comments', storedComments);
      this.course.lessons.find(l => l.id === lessonId).comments = lessonComments;
    },
    deleteReply(lessonId, commentId, replyId) {
      const storedComments = getFromLocalStorage('comments') || {};
      const lessonComments = storedComments[lessonId] || [];
      const comment = lessonComments.find(c => c.id === commentId);
      comment.replies = comment.replies.filter(reply => reply.id !== replyId);
      storedComments[lessonId] = lessonComments;
      saveToLocalStorage('comments', storedComments);
      this.course.lessons.find(l => l.id === lessonId).comments = lessonComments;
    },
    loadComments(lessonId) {
      const storedComments = getFromLocalStorage('comments') || {};
      return storedComments[lessonId] || [];
    },
    toggleLike(lessonId) {
      const storedLikes = this.loadUserLikes();
      let globalLikes = this.globalLikeCount(lessonId);

      if (storedLikes.includes(lessonId)) {
        const index = storedLikes.indexOf(lessonId);
        storedLikes.splice(index, 1);
        globalLikes = Math.max(0, globalLikes - 1); 
      } else {
        storedLikes.push(lessonId);
        globalLikes += 1;
      }

      this.saveUserLikes(storedLikes);
      this.setGlobalLikeCount(lessonId, globalLikes);

      this.likedLessons = storedLikes;
    },
    toggleBookmark(lessonId) {
      const storedBookmarks = this.loadUserBookmarks();
      let globalBookmarks = this.globalBookmarkCount(lessonId);

      if (storedBookmarks.includes(lessonId)) {
        const index = storedBookmarks.indexOf(lessonId);
        storedBookmarks.splice(index, 1);
        globalBookmarks = Math.max(0, globalBookmarks - 1); 
      } else {
        storedBookmarks.push(lessonId);
        globalBookmarks += 1;
      }

      this.saveUserBookmarks(storedBookmarks);
      this.setGlobalBookmarkCount(lessonId, globalBookmarks);

      this.bookmarkedLessons = storedBookmarks;
    },
    loadLikesAndBookmarks() {
      this.likedLessons = this.loadUserLikes();
      this.bookmarkedLessons = this.loadUserBookmarks();
    },
    loadUserLikes() {
      return getFromLocalStorage(`likes_${this.currentUser.id}`) || [];
    },
    saveUserLikes(likes) {
      saveToLocalStorage(`likes_${this.currentUser.id}`, likes);
    },
    loadUserBookmarks() {
      return getFromLocalStorage(`bookmarks_${this.currentUser.id}`) || [];
    },
    saveUserBookmarks(bookmarks) {
      saveToLocalStorage(`bookmarks_${this.currentUser.id}`, bookmarks);
    },
    globalLikeCount(lessonId) {
      const globalLikes = getFromLocalStorage('global_likes') || {};
      return globalLikes[lessonId] || 0;
    },
    setGlobalLikeCount(lessonId, count) {
      const globalLikes = getFromLocalStorage('global_likes') || {};
      globalLikes[lessonId] = count;
      saveToLocalStorage('global_likes', globalLikes);
    },
    globalBookmarkCount(lessonId) {
      const globalBookmarks = getFromLocalStorage('global_bookmarks') || {};
      return globalBookmarks[lessonId] || 0;
    },
    setGlobalBookmarkCount(lessonId, count) {
      const globalBookmarks = getFromLocalStorage('global_bookmarks') || {};
      globalBookmarks[lessonId] = count;
      saveToLocalStorage('global_bookmarks', globalBookmarks);
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

.card-body {
  padding: 15px;
}

.list-group-item {
  margin-bottom: 10px;
}

.img-fluid {
  max-height: 200px;
  object-fit: cover;
}

button i {
  font-size: 1.2em;
}
</style>
