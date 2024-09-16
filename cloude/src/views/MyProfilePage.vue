<template>
  <div class="container mt-5">
    <h2>My Profile</h2>
    <div class="card mx-auto" style="max-width: 600px;">
      <div class="card-body text-center">
        <!-- Kullanıcının Fotoğrafı -->
        <img :src="user.profileImage || defaultProfileImage" class="rounded-circle mb-3" alt="Profile Image" style="width: 150px; height: 150px; object-fit: cover;">
        <h5 class="card-title">{{ user.name }}</h5>
        <p class="card-text">Email: {{ user.email }}</p>
        <p class="card-text">Bio: {{ user.bio }}</p>
        <hr>
        
        <!-- Profil Düzenleme Formu -->
        <h5>Edit Profile</h5>
        <form @submit.prevent="updateProfile">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" v-model="user.name" required>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" v-model="user.email" required>
          </div>
          <div class="mb-3">
            <label for="bio" class="form-label">Bio</label>
            <textarea class="form-control" id="bio" v-model="user.bio" rows="3"></textarea>
          </div>
          <div class="mb-3">
            <label for="profileImage" class="form-label">Profile Image URL</label>
            <input type="text" class="form-control" id="profileImage" v-model="user.profileImage">
          </div>
          <button type="submit" class="btn btn-success">Save Changes</button>
        </form>

        <!-- Başarı ve hata mesajları -->
        <p v-if="successMessage" class="text-success mt-3">{{ successMessage }}</p>
        <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { saveToLocalStorage, getFromLocalStorage } from '@/utils/storage';

export default {
  data() {
    return {
      user: {
        id: null,
        name: "",
        email: "",
        bio: "", 
        profileImage: "", 
      },
      defaultProfileImage: 'https://via.placeholder.com/150', 
      successMessage: null,
      errorMessage: null,
    };
  },
  created() {
    const storedUser = getFromLocalStorage('loggedInUser');
    if (storedUser) {
      this.user = storedUser;
    } else {
      this.$router.push('/login-page');
    }
  },
  methods: {
    updateProfile() {
      try {
        saveToLocalStorage('loggedInUser', this.user);
        this.successMessage = "Profile updated successfully!";
      } catch (error) {
        this.errorMessage = "An error occurred while updating the profile.";
      }
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

.card-body img {
  border: 2px solid #343a40;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.text-success {
  color: green;
}

.text-danger {
  color: red;
}
</style>
