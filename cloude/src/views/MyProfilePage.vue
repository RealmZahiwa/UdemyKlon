<template>
  <div class="container mt-5">
    <h2>My Profile</h2>
    <div class="card mx-auto" style="max-width: 600px;">
      <div class="card-body">
        <h5 class="card-title">{{ user.name }}</h5>
        <p class="card-text">Email: {{ user.email }}</p>
        <router-link to="/settings" class="btn btn-primary">Edit Profile</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    };
  },
  created() {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    } else {
      this.$router.push('/login-page');  // routing
    }
  },
};
</script>
