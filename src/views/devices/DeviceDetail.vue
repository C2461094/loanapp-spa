<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Device } from '@/app/devices/device';
import { useDevices } from '@/composables/use-devices';

const route = useRoute();
const { devices, isLoading } = useDevices();
const device = ref<Device | undefined>();
const isReserving = ref(false);
const error = ref<string | null>(null);

onMounted(() => {
  const deviceId = route.params.id as string;
  device.value = devices.value.find((d) => d.id === deviceId);
});

async function reserveDevice() {
  if (!device.value) return;

  isReserving.value = true;
  error.value = null;

  try {
    const response = await fetch('/api/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId: device.value.id }),
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }

    const record = await response.json();
    alert(`Success! Reserved ${device.value.brand} ${device.value.modelName} until ${record.dueDate}`);

    // Optional: update device stock in local state (optimistic)
    device.value = {
      ...device.value,
      stock: device.value.stock - 1,
    };
  } catch (err: any) {
    console.error('Reservation failed:', err);
    error.value = err.message || 'Failed to reserve device';
  } finally {
    isReserving.value = false;
  }
}

function subscribeToNotifications() {
  alert(
    `Subscribed to updates for ${device.value?.brand} ${device.value?.modelName}`,
  );
  // TODO: POST to /subscriptions or call NotificationService
}
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

    <div class="actions">
      <button @click="$router.back()" class="btn btn--back">
        Back to Devices
      </button>

      <button
        @click="reserveDevice"
        class="btn btn--primary"
        :disabled="isReserving || !device || device.stock <= 0"
      >
        Reserve Device
      </button>

      <button @click="subscribeToNotifications" class="btn btn--secondary">
        Subscribe for Notifications
      </button>
    </div>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>
