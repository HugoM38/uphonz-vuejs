import Login from '@/pages/Login.vue';
import ClientHome from '@/pages/ClientHome.vue';
import SupplierHome from '@/pages/SupplierHome.vue';
import DeliveryHome from '@/pages/DeliveryHome.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/client-home',
    name: 'ClientHome',
    component: ClientHome,
    meta: { requiresAuth: true, role: 'client' },
  },
  {
    path: '/supplier-home',
    name: 'SupplierHome',
    component: SupplierHome,
    meta: { requiresAuth: true, role: 'supplier' },
  },
  {
    path: '/delivery-home',
    name: 'DeliveryHome',
    component: DeliveryHome,
    meta: { requiresAuth: true, role: 'delivery' },
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

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : null;
  const isAuthenticated = !!userData;

  if (isAuthenticated) {
    const homePath = getHomePathForRole(userData.role);
    if (to.path === homePath) {
      return next();
    }
    if (to.path === '/') {
      return next(homePath);
    }
    if (requiresAuth && to.meta.role && userData.role !== to.meta.role) {
      return next(homePath);
    }
  } else {
    if (requiresAuth) {
      return next('/');
    }
  }
  return next();
});

function getHomePathForRole(role) {
  switch(role) {
    case 'supplier': return '/supplier-home';
    case 'client': return '/client-home';
    case 'deliverer': return '/delivery-home';
    default: return '/';
  }
}

export default router;