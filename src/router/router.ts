import Account from "@/pages/Account.vue";
import Signup from '@/pages/Signup.vue';
import Login from '@/pages/Login.vue';
import ClientHome from '@/pages/ClientHome.vue';
import SupplierHome from '@/pages/SupplierHome.vue';
import DeliveryHome from '@/pages/DeliveryHome.vue';
import DelivererHistory from '@/pages/DelivererHistory.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/account/:role',
    name: 'Account',
    component: Account,
    beforeEnter: (to, _from, next) => {
      const allowedRoles = ['client', 'supplier', 'deliverer'];
      const role = to.params.role;

      // Vérifier si le rôle est autorisé
      if (allowedRoles.includes(<string>role)) {
        next();
      } else {
        // Rediriger vers une page appropriée si le rôle n'est pas autorisé
        next({ name: 'Login' }); // Ou toute autre redirection que vous préférez
      }
    }
  },
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
    path: '/deliverer-history',
    name: 'DelivererHistory',
    component: DelivererHistory,
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : null;
  const isAuthenticated = !!userData;


  if (isAuthenticated) {
    const homePath = getHomePathForRole(userData.role);
    if (to.path === homePath) {
      return next();
    }
    if (to.path === '/' || to.path === '/signup') {
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

function getHomePathForRole(role: string) {
  switch(role) {
    case 'supplier': return '/supplier-home';
    case 'client': return '/client-home';
    case 'deliverer': return '/delivery-home';
    default: return '/';
  }
}

export default router;