<template>
    <div>
      <v-subheader>Liste des Fournisseurs</v-subheader>
      <v-data-table
        :headers="headers"
        :items="suppliers"
        class="elevation-1"
      >
        <template v-slot:item.action="{ item }">
          <v-btn color="primary" @click="emitOrder(item._id)">Commander</v-btn>
        </template>
      </v-data-table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SuppliersList',
    data() {
      return {
        suppliers: [
          { _id: '3', firstname: 'Luc', lastname: 'Martin' },
          { _id: '4', firstname: 'Hélène', lastname: 'Garcia' },
        ],
        headers: [
          { text: 'ID Fournisseur', align: 'start', value: '_id' },
          { text: 'Prénom', value: 'firstname' },
          { text: 'Nom', value: 'lastname' },
          { text: 'Actions', value: 'action', sortable: false },
        ],
      };
    },
    methods: {
      emitOrder(supplierId) {
        this.$emit('order', supplierId);
      },
    },
  };
  </script>  