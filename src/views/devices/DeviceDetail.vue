<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Device } from '@/app/devices/device';
import { useDevices } from '@/composables/use-devices';
import { getAccessToken, user } from '@/composables/use-auth';

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
    const token = await getAccessToken();

    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/records`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ deviceId: device.value.id }),
      },
    );

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }

    const record = await response.json();
    alert(
      `Success! Reserved ${device.value.brand} ${device.value.modelName} until ${record.dueDate}`,
    );

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

async function subscribeToNotifications() {
  if (!device.value || !device.value.id || !user.value?.email) {
    alert('Device or user info is missing.');
    return;
  }

  try {
    const token = await getAccessToken();

    if (!token) {
      throw new Error('Not authenticated');
    }

    const payload = {
      deviceId: device.value.id,
      userId: user.value.id, //the issue is here, the user has no value email, just id which is the email
    };

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Subscription failed');
    }

    alert(
      `Subscribed to updates for ${device.value.brand} ${device.value.modelName}`,
    );
  } catch (error) {
    console.error('Failed to subscribe:', error);
    alert('Failed to subscribe to notifications. Try again later.');
  }
}
</script>

<template>
  <div class="page">
    <h1>Device Details</h1>
    <div v-if="isLoading" class="message message-loading">Loading...</div>

    <div v-else-if="device" class="device-card device-details">
      <h2 class="card-title">{{ device.brand }} {{ device.modelName }}</h2>
      <p><span>Category</span>: {{ device.category }}</p>
      <p><span>Description</span>: {{ device.description }}</p>
      <p><span>Stock</span>: {{ device.stock }}</p>
      <p><span>Created At</span>: {{ device.createdAt }}</p>
    </div>

    <div v-else class="message message-notice">
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

      <button
        @click="subscribeToNotifications"
        class="btn btn--secondary"
        :disabled="!device || device.stock > 0"
        :title="
          !device || device.stock > 0
            ? 'You can only subscribe when the device is out of stock'
            : 'Get email notification when device becomes available'
        "
      >
        Subscribe for Notifications
      </button>
    </div>

    <p v-if="error" class="message message-error">{{ error }}</p>
  </div>
</template>
