<template>
  <div class="comment">
    <div class="comment-header">
      <img :src="comment.userImageUrl" alt="User Image" class="comment-user-image">
      <h5>{{ comment.username }}</h5>
    </div>
    <div class="comment-body">
      <p>{{ comment.text }}</p>
    </div>
    <div class="comment-footer">
      <button @click="toggleLike" class="btn btn-sm" :class="{ 'btn-success': liked }">
        <i class="fas" :class="liked ? 'fa-thumbs-up' : 'fa-thumbs-o-up'"></i>
        {{ likesCount }}
      </button>
      <button @click="toggleBookmark" class="btn btn-sm" :class="{ 'btn-warning': bookmarked }">
        <i class="fas" :class="bookmarked ? 'fa-bookmark' : 'fa-bookmark-o'"></i>
        Bookmark
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentComponent',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      liked: false,
      bookmarked: false,
      likesCount: this.comment.likes
    };
  },
  methods: {
    toggleLike() {
      this.liked = !this.liked;
      this.likesCount += this.liked ? 1 : -1;
    },
    toggleBookmark() {
      this.bookmarked = !this.bookmarked;
    }
  }
};
</script>

<style scoped>
.comment {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.comment-header {
  display: flex;
  align-items: center;
}

.comment-user-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.comment-footer {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.btn-success {
  color: white;
}

.btn-warning {
  color: white;
}
</style>
