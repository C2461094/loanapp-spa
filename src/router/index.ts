import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated, user, login } from '@/composables/use-auth';
import ListDevices from '@/views/devices/ListDevices.vue';
import DeviceDetail from '@/views/devices/DeviceDetail.vue';
import LandingPage from '@/views/LandingPage.vue';
import Login from '@/views/Login.vue';
import Callback from '@/views/Callback.vue';

/**
 * Application route definitions.
 */
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
    meta: { requiresAuth: true }, // Requires user authentication
  },
  {
    path: '/loan-records',
    name: 'LoanRecords',
    component: () => import('@/views/loanRecords/ListLoanRecords.vue'),
    meta: { requiresAuth: true, requiredRole: 'staff' }, // Staff-only access
  },
  {
    path: '/loan-records/:id',
    name: 'LoanRecordDetail',
    component: () => import('@/views/loanRecords/LoanRecordDetail.vue'),
    meta: { requiresAuth: true, requiredRole: 'staff' }, // Staff-only access
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

/**
 * Creates a Vue Router instance with route guards.
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

/**
 * Global navigation guard for authentication and role-based access control.
 */
router.beforeEach(async (to, from, next) => {
  // Wait briefly if authentication state isn't initialized
  if (typeof isAuthenticated.value === 'undefined') {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // Redirect to login if route requires authentication and user is not authenticated
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return login();
  }

  // If a specific role is required, verify the user has it
  const requiredRole = to.meta.requiredRole;
  if (requiredRole && isAuthenticated.value) {
    const roles = user.value?.['https://loanapp-api-dev-iv3/roles'] || [];
    if (!roles.includes(requiredRole)) {
      return next('/'); // Redirect unauthorized users to home
    }
  }

  // Allow navigation to proceed
  next();
});

export default router;
