<script setup lang="ts">
import { useDevices } from '@/composables/use-devices';
import DeviceCard from '@/components/devices/DeviceCard.vue';

const { devices, isLoading, error, reload } = useDevices();
</script>

<template>
  <section class="page">
    <header class="page__header">
      <h1>Devices</h1>
      
      <RouterLink to="/" class="btn btn--reload">Back to Home</RouterLink>
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


