<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <ClientList />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import ClientList from '@/components/ClientsList.vue';
  
  export default defineComponent({
    name: 'SupplierHome',
    components: {
      ClientList,
    },
  });
  </script>
  