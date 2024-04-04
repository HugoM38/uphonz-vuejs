<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Page d'Accueil</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <ClientsList />
      </v-col>
      <v-col cols="12" md="6">
        <SuppliersList />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ClientsList from '@/components/ClientsList.vue';
import SuppliersList from '@/components/SuppliersList.vue';

export default {
  components: {
    ClientsList,
    SuppliersList,
  },
};
</script>