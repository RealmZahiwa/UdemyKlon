<template>
    <div class="container mt-5">
      <h2>Contact Us</h2>
      <p class="lead">We'd love to hear from you! If you have any questions, feedbac </p>
      
      <form>
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" class="form-control" id="name" required>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email" required>
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">Message</label>
          <textarea class="form-control" id="message" rows="5" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ContactPage',
  };
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
  }
  
  h2 {
    color: #343a40;
    margin-bottom: 20px;
  }
  
  p.lead {
    font-size: 1.25rem;
    color: #6c757d;
  }
  
  .form-label {
    color: #495057;
  }
  
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
    border-color: #004085;
  }
  </style>
  