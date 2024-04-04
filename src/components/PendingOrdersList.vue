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
      <v-snackbar v-model="snackbar" :color="snackbarColor">
        {{ snackbarText }}
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="snackbar = false">Fermer</v-btn>
        </template>
      </v-snackbar>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'PendingOrdersList',
    data() {
      return {
        orders: [],
        headers: [
          { text: 'Command ID', value: 'id' },
          { text: 'Description', value: 'description' },
          { text: 'Action', value: 'action', sortable: false },
        ],
        snackbar: false,
        snackbarText: '',
        snackbarColor: '',
        delivererId: '',
      };
    },
    methods: {
      async fetchPendingOrders() {
        try {
          const response = await axios.get('http://localhost:3000/deliverers/pending_orders');
          this.orders = response.data.map(order => ({
            id: order._id,
            description: order.description
          }));
          this.snackbarText = 'Commandes en attente récupérées avec succès';
          this.snackbarColor = 'success';
          this.snackbar = true;
        } catch (error) {
          console.error("Erreur lors de la récupération des commandes en attente :", error);
          this.snackbarText = 'Échec de la récupération des commandes en attente';
          this.snackbarColor = 'error';
          this.snackbar = true;
        }
      },
      async acceptOrder(orderId) {
        try {
          await axios.patch(`http://localhost:3000/deliverers/take_order/${orderId}`, {
            delivererId: this.delivererId
          });
          this.snackbarText = `Commande ${orderId} acceptée avec succès`;
          this.snackbarColor = 'success';
          this.snackbar = true;
          this.fetchPendingOrders();
        } catch (error) {
          console.error("Erreur lors de l'acceptation de la commande :", error);
          this.snackbarText = `Échec de l'acceptation de la commande ${orderId}`;
          this.snackbarColor = 'error';
          this.snackbar = true;
        }
      },
    },
    mounted() {
        const user = localStorage.getItem('user');
        if (user) {
      const parsedUser = JSON.parse(user);
      this.delivererId = parsedUser._id;
    }
      this.fetchPendingOrders();
    },
  };
  </script>