import Login from '@/pages/Login.vue';
import Account from "@/pages/Account.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
