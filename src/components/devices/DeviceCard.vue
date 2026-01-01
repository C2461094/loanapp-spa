<script setup lang="ts">
import type { Device } from '@/app/devices/device';
import { isAuthenticated } from '@/composables/use-auth';

defineProps<{
  device: Device;
}>();
</script>

<template>
  <div class="device-card">
    <h3>{{ device.brand }} {{ device.modelName }}</h3>
    <p><strong>Category:</strong> {{ device.category }}</p>
    <p v-if="device.description">
      <strong>Description:</strong> {{ device.description }}
    </p>
   <p v-if="isAuthenticated">Stock: {{ device.stock }}</p>
    <p><strong>Created:</strong> {{ new Date(device.createdAt) }}</p>
  </div>
</template>

<style scoped>
.device-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  background-color: #f9fafb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.device-card h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}
.device-card p {
  margin: 0.25rem 0;
  color: #374151;
  font-size: 0.875rem;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 0;
  margin: 0;
}
</style>
