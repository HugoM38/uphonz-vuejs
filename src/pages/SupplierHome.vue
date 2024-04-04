<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <SupplierOrdersList />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import SupplierOrdersList from '@/components/SupplierOrdersList.vue';
  
  export default defineComponent({
    name: 'SupplierHome',
    components: {
        SupplierOrdersList,
    },
  });
  </script>
  