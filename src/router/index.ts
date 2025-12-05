import { createRouter, createWebHistory } from 'vue-router';
import ListDevices from '@/views/devices/ListDevices.vue';
import DeviceDetail from '@/views/devices/DeviceDetail.vue';

const routes = [
  {
    path: '/',
    redirect: '/devices',
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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
