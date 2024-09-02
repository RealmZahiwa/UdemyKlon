<template>
    <div class="container mt-5">
      <h2>Sign Up</h2>
      <form @submit.prevent="signup">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" class="form-control" v-model="name" required>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" class="form-control" v-model="email" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" v-model="password" required>
        </div>
        <button type="submit" class="btn btn-success">Sign Up</button>
      </form>
      <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: "",
        email: "",
        password: "",
        errorMessage: null,
      };
    },
    methods: {
      async signup() {
        const newUser = {
          id: Date.now(),
          name: this.name,
          email: this.email,
          password: this.password,
        };
  
        
        const response = await fetch("/users.json");
        const users = await response.json();
  
        
        users.push(newUser);
  
       
        await fetch("/path/to/users.json", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(users),
        });
  
        this.$router.push("/login-page"); 
      },
    },
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
  
  .text-danger {
    color: red;
  }
  </style>
  