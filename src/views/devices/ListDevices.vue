<script setup lang="ts">
import { useDevices } from '@/composables/use-devices';
import DeviceCard from '@/components/devices/DeviceCard.vue';

const { devices, isLoading, error, reload } = useDevices();
import { isAuthenticated, login } from '@/composables/use-auth';
import { useRouter } from 'vue-router';

const router = useRouter();

function goToDevice(deviceId: string) {
  if (!isAuthenticated.value) {
    // Redirect to Auth0 login and return to the device detail
    login(); // will redirect to Auth0 login with current window.location
  } else {
    router.push({ name: 'DeviceDetail', params: { id: deviceId } });
  }
}

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


