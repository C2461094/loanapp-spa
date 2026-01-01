<script setup lang="ts">
import { isAuthenticated, user, logout } from '@/composables/use-auth';
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <nav class="nav">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/devices" class="nav-link">Devices</router-link>
        <template
          v-if="
            isAuthenticated &&
            user?.['https://your-namespace/roles']?.includes('staff')
          "
        >
          <RouterLink to="/loan-records" class="btn btn--primary">
            Loan Records
          </RouterLink>
        </template>

        <template v-if="isAuthenticated">
          <span class="user-info">Logged in as {{ user?.email }}</span>
          <button @click="logout" class="btn btn--logout">Logout</button>
        </template>
        <template v-else>
          <router-link to="/login" class="btn btn--login">Login</router-link>
        </template>
      </nav>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1f2937;
  color: white;
  padding: 1rem;
}

.nav {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.nav-link:hover {
  text-decoration: underline;
}

.user-info {
  margin-left: auto;
  margin-right: 1rem;
  font-size: 0.9rem;
}

.btn {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.btn--login {
  background: #2563eb;
  color: white;
}

.btn--logout {
  background: #ef4444;
  color: white;
}
</style>
