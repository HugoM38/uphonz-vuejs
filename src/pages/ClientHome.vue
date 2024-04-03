<template>
    <v-container>
      <SuppliersList @order="order" />
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import SuppliersList from '@/components/SuppliersList.vue';
  
  export default defineComponent({
    components: {
      SuppliersList,
    },
    setup() {
      const order = (supplierId: string) => {
        console.log(`Commande passée auprès du fournisseur ${supplierId}`);
      };
  
      return { order };
    },
  });
  </script>  