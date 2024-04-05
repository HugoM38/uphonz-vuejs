<template>
  <div>
    <div v-if="isUserAllowed">
      <component :is="currentComponent" />
    </div>
    <div v-else>
      <p>Compte non reconnu</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch} from 'vue';
import Client from '../components/AccountClient.vue';
import Deliverer from "@/components/AccountDeliverer.vue";
import Supplier from "@/components/AccountSupplier.vue";
import { useRouter } from 'vue-router';
import {useAuthStore} from "@/stores/useAuthStore.ts";

const router = useRouter();
const userRole = useAuthStore().isUserLoggedIn() ? JSON.parse(localStorage.getItem("user") ?? "").role : '';
const userType = ref(userRole);
const userTypeParam = computed(() => router.currentRoute.value.params.role);

const isUserAllowed = computed(() => {
  return userType.value === userTypeParam.value;
});

const currentComponent = computed(() => {
  switch (userType.value) {
    case 'client':
      return Client;
    case 'deliverer':
      return Deliverer;
    case 'supplier':
      return Supplier;
    default:
      return null;
  }
});

// Observer les changements dans le paramètre de l'URL
watch(userTypeParam, (newRole) => {
  if (newRole !== userType.value) {
    // Rediriger vers la page du compte avec le bon rôle
    router.push({ name: 'Account', params: { role: userType.value } });
  }
});
</script>
