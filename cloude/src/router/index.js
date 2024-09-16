import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import CourseListPage from '../views/CourseListPage.vue';
import CourseDetailPage from '../views/CourseDetailPage.vue';
import UserProfilePage from '../views/UserProfilePage.vue';
import LoginPage from '../views/LoginPage.vue';
import SignupPage from '../views/SignupPage.vue';
import AboutPage from '../views/AboutPage.vue';
import ContactPage from '../views/ContactPage.vue';
import MyProfilePage from '../views/MyProfilePage.vue';
import SettingsPage from '../views/SettingsPage.vue';
import AdminPage from '../views/AdminPage.vue';
import UploadVideoPage from '../views/UploadVideo.vue';
import RatingHubPage from '../views/RatingHubPage.vue'; // Import new page

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/courses',
    name: 'CourseList',
    component: CourseListPage,
  },
  {
    path: '/courses/:id',
    name: 'CourseDetail',
    component: CourseDetailPage,
  },
  {
    path: '/profile-page',
    name: 'Profile',
    component: MyProfilePage,
  },
  {
    path: '/user-profile',
    name: 'UserProfile',
    component: UserProfilePage,
  },
  {
    path: '/login-page',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/signup-page',
    name: 'Signup',
    component: SignupPage,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage,
  },
  {
    path: '/my-profile',
    name: 'MyProfile',
    component: MyProfilePage,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsPage,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
  },
  {
    path: '/upload-video',
    name: 'UploadVideo',
    component: UploadVideoPage,
  },
  {
    path: '/rating-hub',
    name: 'RatingHub',
    component: RatingHubPage, // Add new route
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
