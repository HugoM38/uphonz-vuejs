<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-switch v-model="locationEnabled" label="Activer la localisation"></v-switch>
        </v-col>
      </v-row>
      <OrdersList />
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, watch, onMounted, onUnmounted } from 'vue';
  import OrdersList from '@/components/OrdersList.vue';
  
  export default defineComponent({
    components: {
      OrdersList,
    },
    setup() {
      const locationEnabled = ref(false);
  
      const sendLocation = () => {
        if (locationEnabled.value) {
          console.log("Localisation envoyée");
        }
      };
  
      let locationInterval;
      onMounted(() => {
        locationInterval = setInterval(sendLocation, 120000); // 120000 ms = 2 minutes
      });
  
      onUnmounted(() => {
        clearInterval(locationInterval);
      });
  
      return { locationEnabled };
    },
  });
  </script>  