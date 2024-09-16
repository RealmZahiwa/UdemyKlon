<template>
  <div class="container mt-5">
    <h2>Settings</h2>
    
    <!-- Tema Ayarları -->
    <div class="mb-4">
      <h5>Theme Settings</h5>
      <select v-model="settings.theme" class="form-select">
        <option value="light">Light Mode</option>
        <option value="dark">Dark Mode</option>
        <option value="system">System Default</option>
      </select>
    </div>
    
    <!-- Dil Ayarları -->
    <div class="mb-4">
      <h5>Language Settings</h5>
      <select v-model="settings.language" class="form-select">
        <option value="en">English</option>
        <option value="tr">Turkish</option>
        <option value="es">Spanish</option>
      </select>
    </div>
    
    <!-- Bildirim Ayarları -->
    <div class="mb-4">
      <h5>Notification Settings</h5>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" v-model="settings.notifications" id="notifications">
        <label class="form-check-label" for="notifications">
          Enable email notifications
        </label>
      </div>
    </div>

    <button @click="saveSettings" class="btn btn-success">Save Settings</button>
    <p v-if="successMessage" class="text-success mt-3">{{ successMessage }}</p>
    <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { saveToLocalStorage, getFromLocalStorage } from '@/utils/storage';

export default {
  data() {
    return {
      settings: {
        theme: 'light', 
        language: 'en', 
        notifications: true, 
      },
      successMessage: null,
      errorMessage: null,
    };
  },
  created() {
    const storedSettings = getFromLocalStorage('appSettings');
    if (storedSettings) {
      this.settings = storedSettings;
    }
  },
  methods: {
    saveSettings() {
      try {
        saveToLocalStorage('appSettings', this.settings);
        this.successMessage = "Settings updated successfully!";
      } catch (error) {
        this.errorMessage = "An error occurred while saving the settings.";
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

.form-select {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
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
