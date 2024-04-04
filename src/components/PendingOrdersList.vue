<template>
  <div>
    <v-subheader>Liste des Commandes en Attente</v-subheader>
    <v-container>
      <v-card class="mb-3" elevation="2" color="deep-purple darken-1" dark>
        <v-row class="py-2" align="center" justify="space-around">
          <v-col cols="6" class="text-center">Numéro de commande</v-col>
          <v-col cols="3" class="text-center">Statut</v-col>
          <v-col cols="3" class="text-center">Actions</v-col>
        </v-row>
      </v-card>
      <pending-order-row v-for="order in orders" :key="order.id" :order="order" @acceptOrder="acceptOrder"></pending-order-row>
    </v-container>
    <v-snackbar v-model="snackbar" :color="snackbarColor">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">Fermer</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import PendingOrderRow from './PendingOrderRow.vue';

export default {
  name: 'PendingOrdersList',
  components: {
    PendingOrderRow
  },
  data() {
    return {
      orders: [],
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
        const ordersWithClients = await Promise.all(response.data.map(async order => {
          const basicOrderInfo = {
            ...order.order,
            id: order._id
          };

          try {
            const responseClient = await axios.get(`http://localhost:3000/clients/by_id/${basicOrderInfo.clientId}`);
            const responseSupplier = await axios.get(`http://localhost:3000/suppliers/by_id/${basicOrderInfo.supplierId}`);
            return {
              ...basicOrderInfo,
              clientName: responseClient.data.firstname+' '+responseClient.data.lastname,
              supplierName: responseSupplier.data.firstname+' '+responseSupplier.data.lastname
            };
          } catch (error) {
            console.error(`Erreur lors de la récupération des infos du client ${basicOrderInfo.clientId}:`, error);
            console.error(`Erreur lors de la récupération des infos du fournisseur ${basicOrderInfo.supplierId}:`, error);
            return {
              ...basicOrderInfo,
              clientName: 'Inconnu',
              supplierName: 'Inconnu'
            };
          }
        }));

        this.orders = ordersWithClients;
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