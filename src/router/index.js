import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Dashboard,
  },
  {
    path: '/detail/:idActivity',
    name: 'detail',
    component: () => import('../views/TodoList.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
