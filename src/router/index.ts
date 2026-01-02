import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated, user, login } from '@/composables/use-auth';
import ListDevices from '@/views/devices/ListDevices.vue';
import DeviceDetail from '@/views/devices/DeviceDetail.vue';
import LandingPage from '@/views/LandingPage.vue';
import Login from '@/views/Login.vue';
import Callback from '@/views/Callback.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LandingPage,
  },
  {
    path: '/devices',
    name: 'Devices',
    component: ListDevices,
  },
  {
    path: '/devices/:id',
    name: 'DeviceDetail',
    component: DeviceDetail,
    // Require login to view details
    meta: { requiresAuth: true }, 
  },
  {
    path: '/loan-records',
    name: 'LoanRecords',
    component: () => import('@/views/loanRecords/ListLoanRecords.vue'),
    meta: { requiresAuth: true, requiredRole: 'staff' }, // Staff only
  },
  {
    path: '/loan-records/:id',
    name: 'LoanRecordDetail',
    component: () => import('@/views/loanRecords/LoanRecordDetail.vue'),
    meta: { requiresAuth: true, requiredRole: 'staff' }, // Staff only
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/callback',
    name: 'Callback',
    component: Callback,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // 1. Wait a moment if auth hasn't fully loaded yet
  if (typeof isAuthenticated.value === 'undefined') {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // 2. If route requires login and user is not authenticated
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return login();
  }

  // 3. Role-based access control
  const requiredRole = to.meta.requiredRole;

  if (requiredRole && isAuthenticated.value) {
    const roles = user.value?.['https://loanapp-api-dev-iv3/roles'] || [];
 // Redirect to home if missing role
    if (!roles.includes(requiredRole)) {
      return next('/');
    }
  }

  // 4. Allow navigation
  next();
});

export default router;
