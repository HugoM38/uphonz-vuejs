<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-subheader>Historique des Commandes</v-subheader>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'SupplierHome',
    setup() {
      const orders = ref([
        { id: '1', description: 'Commande de 100 unités' },
        { id: '2', description: 'Commande de 50 unités' },
      ]);
      return { orders };
    },
  });
  </script>