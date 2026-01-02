<script setup lang="ts">
import { useRouter } from "vue-router";
import { isAuthenticated, user } from "@/composables/use-auth";
import { computed } from "vue";


const router = useRouter();

function goTo(path: string) {
  router.push(path);
}

//Check if user has 'staff' role
const isStaff = computed(() => {
  const roles = user.value?.['https://loanapp-api-dev-iv3/roles'] || [];
  return roles.includes('staff');
});

</script>

<template>
  <section class="landing">
    <h1 class="title">Welcome to LoanApp</h1>

    <div class="buttons-landingPage">
      <button @click="goTo('/login')" class="btn">Login</button>
      <button @click="goTo('/devices')" class="btn">Devices Catalogue</button>
      <button v-if="isAuthenticated && isStaff" @click="goTo('/loan-records')" class="btn">Loan Records</button>
    </div>
  </section>
</template>
