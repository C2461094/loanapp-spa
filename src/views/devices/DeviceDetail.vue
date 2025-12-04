<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Device } from '@/app/devices/device';
import { useDevices } from '@/composables/use-devices';

const route = useRoute();
const { devices, isLoading } = useDevices();
const device = ref<Device | undefined>();

onMounted(() => {
  const deviceId = route.params.id as string;
  device.value = devices.value.find((d) => d.id === deviceId);
});
</script>

<template>
  <div class="page">
    <h1>Device Details</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="device">
      <h2>{{ device.brand }} {{ device.modelName }}</h2>
      <p>Category: {{ device.category }}</p>
      <p>Description: {{ device.description }}</p>
      <p>Stock: {{ device.stock }}</p>
      <p>Created At: {{ device.createdAt }}</p>
    </div>
    <div v-else>
      <p>Device not found.</p>
    </div>
  </div>
</template>
