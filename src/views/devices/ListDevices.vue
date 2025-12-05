<script setup lang="ts">
import { useDevices } from '@/composables/use-devices';
import DeviceCard from '@/components/devices/DeviceCard.vue';

const { devices, isLoading, error, reload } = useDevices();
</script>

<template>
  <section class="page">
    <header class="page__header">
      <h1>Devices</h1>
      <button @click="reload" class="btn btn--reload" :disabled="isLoading">
        Reload
      </button>
    </header>

    <div v-if="isLoading" class="page__meta" aria-live="polite">
      <span v-if="devices.length">{{ devices.length }} available</span>
      <span v-else>No devices found</span>
    </div>

    <div v-if="isLoading" class="state">Loading...</div>
    <div v-else-if="error" class="state state--error">{{ error }}</div>
    <div v-else>
      <ul v-if="devices.length" class="grid" role="list">
        <li v-for="device in devices" :key="device.id" role="listitem">
          <RouterLink :to="{ name: 'DeviceDetail', params: { id: device.id } }">
            <DeviceCard :device="device" />
          </RouterLink>
        </li>
      </ul>
      <p v-else class="state">No devices yet.</p>
    </div>
  </section>
</template>

<style scoped>
.page {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}
.page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}
.page__meta {
  color: #6b7280;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
}

.btn {
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:disabled {
  opacity: 0.5;
  color: white;
}

.btn--reload {
  background-color: #3b82f6;
  color: white;
}
.btn--reload:hover:not(:disabled) {
  background-color: #2563eb;
}

.state {
  color: #374151;
}
.state--error {
  color: #b91c1c;
}

.grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}
.grid__item {
  display: block;
}
</style>
