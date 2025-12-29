import { createRouter, createWebHistory } from 'vue-router';
import ListDevices from '@/views/devices/ListDevices.vue';
import DeviceDetail from '@/views/devices/DeviceDetail.vue';
import LandingPage from '@/views/LandingPage.vue';
import Login from '@/views/Login.vue';
import Callback from '@/views/Callback.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/LandingPage.vue'),
  },
  {
    path: '/devices',
    name: 'Devices',
    component: () => import('@/views/devices/ListDevices.vue'),
  },
  {
    path: '/devices/:id',
    name: 'DeviceDetail',
    component: () => import('@/views/devices/DeviceDetail.vue'),
    meta: { requiresAuth: true }, // Only logged-in users can view device details
  },
  {
    path: '/loan-records',
    name: 'LoanRecords',
    component: () => import('@/views/loanRecords/ListLoanRecords.vue'),
    meta: { requiresAuth: true, requiredRole: 'staff' },
  },
  {
    path: '/loan-records/:id',
    name: 'LoanRecordDetail',
    component: () => import('@/views/loanRecords/LoanRecordDetail.vue'),
    meta: { requiresAuth: true, requiredRole: 'staff' },
  },
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
