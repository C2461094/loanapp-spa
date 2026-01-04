<script setup lang="ts">
import { useDevices } from "@/composables/use-devices";
import DeviceCard from "@/components/devices/DeviceCard.vue";

const { devices, isLoading, error, reload } = useDevices();
</script>

<template>
  <section class="page page grid-app">
    <header class="page__header">
      <h1>Devices</h1>
    </header>

    <aside class="btn-container btn-flex">
      <RouterLink to="/" class="btn btn--reload">Back to Home</RouterLink>
     <button class="btn btn--reload" @click="reload">Reload</button>

    </aside>

    <div v-if="isLoading" class="page__meta" aria-live="polite">
      <span v-if="devices.length" class="message message-success">
        {{ devices.length }} available
      </span>
      <span v-else class="message message-notice">No devices found</span>
    </div>

    <div v-if="isLoading" class="message message-loading">Loading...</div>

    <div v-else-if="error" class="message message-error">{{ error }}</div>

    <div v-else>
      <ul
        v-if="devices.length"
        class="grid-cards"
        role="list"
        
      >
        <li v-for="device in devices" :key="device.id" role="listitem" class="card-item">
          <RouterLink :to="{ name: 'DeviceDetail', params: { id: device.id } }">
            <DeviceCard :device="device" />
          </RouterLink>
        </li>
      </ul>
      <p v-else class="state message message-error">No devices yet.</p>
    </div>
  </section>
</template>
