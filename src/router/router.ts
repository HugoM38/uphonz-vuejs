import Account from "@/pages/Account.vue";
import Login from '@/pages/Login.vue';
import ClientHome from '@/pages/ClientHome.vue';
import SupplierHome from '@/pages/SupplierHome.vue';
import DeliveryHome from '@/pages/DeliveryHome.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/client-home',
    name: 'ClientHome',
    component: ClientHome,
    //meta: { requiresAuth: true, role: 'client' },
  },
  {
    path: '/supplier-home',
    name: 'SupplierHome',
    component: SupplierHome,
    //meta: { requiresAuth: true, role: 'supplier' },
  },
  {
    path: '/delivery-home',
    name: 'DeliveryHome',
    component: DeliveryHome,
    //meta: { requiresAuth: true, role: 'delivery' },
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

router.beforeEach((to) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = localStorage.getItem("user");
  const isLoginPage = to.path === "/";

  if (isAuthenticated && isLoginPage) {
    return { path: "/home" };
  }

  if (requiresAuth && !isAuthenticated) {
    return { path: "/" };
  }
});

export default router;
