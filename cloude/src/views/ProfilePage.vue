<template>
    <div class="container mt-5">
      <h2 class="text-center">My Profile</h2>
      <div class="card mx-auto" style="max-width: 400px;">
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
        user: {
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
      };
    },
  };
  </script>
  