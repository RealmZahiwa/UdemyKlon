<template>
  <div class="container mt-5">
    <h2>Settings</h2>
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
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" v-model="user.password">
      </div>
      <button type="submit" class="btn btn-success">Save Changes</button>
    </form>
    <p v-if="successMessage" class="text-success mt-3">{{ successMessage }}</p>
    <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
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
        password: "",
      },
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

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

.text-success {
  color: green;
}

.text-danger {
  color: red;
}
</style>
