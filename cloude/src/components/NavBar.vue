<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <img src="@/assets/cloude-logo.png" alt="Cloude Logo" width="40" height="40" class="d-inline-block align-text-top me-2">
        Cloude
      </router-link>

      <form class="d-flex mx-auto search-bar" @submit.prevent="performSearch">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search courses"
          aria-label="Search"
          v-model="searchQuery"
        />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>

      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav">
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link class="nav-link btn btn-outline-primary text-white" to="/login-page">Login</router-link>
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link class="nav-link btn btn-outline-success text-white" to="/signup-page">Sign Up</router-link>
          </li>
          <li v-if="isLoggedIn" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle btn btn-outline-info text-white"
              href="#"
              id="profileDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Profile
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
              <li><router-link class="dropdown-item" to="/profile-page">My Profile</router-link></li>
              <li><router-link class="dropdown-item" to="/settings">Settings</router-link></li>
              <li><button class="dropdown-item" @click="logout">Logout</button></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="bg-dark py-2">
    <div class="container">
      <ul class="nav justify-content-center">
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/courses">All Courses</router-link>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle text-white"
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Categories
          </a>
          <ul class="dropdown-menu">
            <li><router-link class="dropdown-item" to="/courses?category=Web Development">Web Development</router-link></li>
            <li><router-link class="dropdown-item" to="/courses?category=Data Science">Data Science</router-link></li>
            <li><router-link class="dropdown-item" to="/courses?category=Design">Design</router-link></li>
            <li><router-link class="dropdown-item" to="/courses?category=Music">Music</router-link></li>
            <li><router-link class="dropdown-item" to="/courses?category=Fitness">Fitness</router-link></li>
          </ul>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/about">About Us</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/contact">Contact</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getFromLocalStorage } from '@/utils/storage';

export default {
  name: 'NavigationBar',
  data() {
    return {
      searchQuery: '', 
      isLoggedIn: false, 
    };
  },
  methods: {
    performSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({ name: 'CourseList', query: { q: this.searchQuery.trim() } });
      } else {
        this.$router.push({ name: 'CourseList' });
      }
    },
    logout() {
      
      localStorage.removeItem('loggedInUser');
     
      this.isLoggedIn = false;
      
      this.$router.push('/login-page');
    },
    checkLoginStatus() {
      const storedUser = getFromLocalStorage('loggedInUser');
      this.isLoggedIn = !!storedUser;
    }
  },
  created() {
    this.checkLoginStatus(); 
  },
  watch: {
    '$route'() {
      this.checkLoginStatus(); 
    }
  }
};
</script>

<style scoped>
.navbar-brand img {
  width: 40px;
  height: 40px;
}


.search-bar {
  flex: 1;
  max-width: 500px;
  margin-left: 20px;
  margin-right: 20px;
}

.nav-link.btn {
  margin-left: 10px;
  border-color: transparent;
  font-weight: bold;
  padding: 5px 10px;
}

.nav-link.btn-outline-primary {
  background-color: #007bff;
}

.nav-link.btn-outline-success {
  background-color: #28a745;
}

.nav-link.btn-outline-info {
  background-color: #17a2b8;
}

.nav-link.btn:hover {
  background-color: #0056b3;
  color: white;
}


.bg-dark {
  background-color: #343a40 !important;
}
.nav {
  font-size: 1rem;
}
.nav-link {
  color: #ffffff;
}
.nav-link:hover {
  color: #adb5bd;
}
</style>
