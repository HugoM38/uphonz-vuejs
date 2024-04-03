<template>
    <div>
      <v-subheader>Liste des Commandes en Attente</v-subheader>
      <v-data-table
        :headers="headers"
        :items="orders"
        class="elevation-1"
        :hide-default-footer="true"
      >
        <template v-slot:item.action="{ item }">
          <v-btn color="success" @click="acceptOrder(item.id)">Accepter</v-btn>
        </template>
      </v-data-table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'OrdersList',
    data() {
      return {
        orders: [
          { id: '1', description: 'Commande en attente A' },
          { id: '2', description: 'Commande en attente B' },
        ],
        headers: [
          { text: 'ID Commande', value: 'id' },
          { text: 'Description', value: 'description' },
          { text: 'Action', value: 'action', sortable: false },
        ],
      };
    },
    methods: {
      acceptOrder(orderId) {
        console.log(`Commande ${orderId} acceptée`);
        // Implémentez ici la logique pour marquer la commande comme acceptée
      },
    },
  };
  </script>  