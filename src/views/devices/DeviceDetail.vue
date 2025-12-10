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

function reserveDevice() {
  alert(`You reserved ${device.value?.brand} ${device.value?.modelName}`);
  // TODO: POST to /reservations
}

function subscribeToNotifications() {
  alert(
    `Subscribed to updates for ${device.value?.brand} ${device.value?.modelName}`,
  );
  // TODO: POST to /subscriptions or call NotificationService
}
</script>

//<template>
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
      <button @click="reserveDevice" class="btn btn--primary">
        Reserve Device
      </button>
      <button @click="subscribeToNotifications" class="btn btn--secondary">
        Subscribe for Notifications
      </button>
    </div>
  </div>
</template>


