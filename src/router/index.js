import { createRouter, createWebHistory } from 'vue-router';
import WelcomePage from '../components/WelcomePage.vue';
import ClassmateList from '../components/ClassmateList.vue';

const routes = [
  { path: '/', component: WelcomePage },
  { path: '/ClassmateList', component: ClassmateList }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
