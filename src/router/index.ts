import { createRouter, createWebHistory } from 'vue-router';
import ListDevices from '@/views/devices/ListDevices.vue';
import DeviceDetail from '@/views/devices/DeviceDetail.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/LandingPage.vue'),
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
    props: true,
  },
  {
    path: '/loan-records',
    name: 'LoanRecords',
    component: () => import('@/views/loanRecords/ListLoanRecords.vue'),
  },
  {
    path: '/loan-records/:id',
    name: 'LoanRecordDetail',
    component: () => import('@/views/loanRecords/LoanRecordDetail.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
