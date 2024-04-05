<template>
    <v-container>
      <SuppliersList/>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import SuppliersList from '@/components/SuppliersList.vue';
  
  export default defineComponent({
    components: {
      SuppliersList,
    },
  });
  </script>  