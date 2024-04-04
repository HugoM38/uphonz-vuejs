<template>
  <div>
    <v-subheader>Historique des Commandes</v-subheader>
    <v-container>
      <v-card class="mb-3" elevation="2" color="deep-purple darken-1" dark>
        <v-row class="py-2" align="center" justify="space-around">
          <v-col cols="6" class="text-center">Numéro de commande</v-col>
          <v-col cols="3" class="text-center">Statut</v-col>
          <v-col cols="3" class="text-center">Actions</v-col>
        </v-row>
      </v-card>
      <order-history-row v-for="order in orders" :key="order.id" :order="order"
        @deleteOrder="deleteOrder"></order-history-row>
    </v-container>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color">
      {{ snackbar.message }}
      <template v-slot:actions>
        <v-btn icon @click="snackbar.show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>


<script lang="ts">
import axios from 'axios';
import OrderHistoryRow from './OrderHistoryRow.vue';

export default {
  name: 'OrderHistory',
  components: {
    OrderHistoryRow
  },
  data() {
    return {
      orders: [],
      snackbar: {
        show: false,
        message: '',
        color: 'success'
      }
    };
  },
  methods: {
    deleteOrder(orderId) {
      // Implémentez la logique pour supprimer une commande
      console.log('Deleting order with ID:', orderId);
    },
    showSnackbar(message, type) {
      this.snackbar.show = true;
      this.snackbar.message = message;
      this.snackbar.color = type === 'error' ? 'error' : 'success';
    },
    async fetchOrderHistory(supplierId) {
      try {
        const response = await axios.get(`http://localhost:3000/suppliers/order_history/${supplierId}`);
        const ordersWithClients = await Promise.all(response.data.map(async order => {
          const basicOrderInfo = {
            ...order.order,
            id: order._id,
            status: order.order.status
          };

          try {
            const responseClient = await axios.get(`http://localhost:3000/clients/by_id/${basicOrderInfo.clientId}`);
            const responseDeliverer = await axios.get(`http://localhost:3000/deliverers/by_id/${basicOrderInfo.delivererId}`);
            this.showSnackbar('Historique des commandes récupéré avec succès', 'success');
            return {
              ...basicOrderInfo,
              clientName: responseClient.data.firstname + ' ' + responseClient.data.lastname,
              delivererName: responseDeliverer.data.firstname + ' ' + responseDeliverer.data.lastname
            };
          } catch (error) {
            return {
              ...basicOrderInfo,
              clientName: 'Inconnu',
              delivererName: 'Inconnu'
            };
          }
        }));

        this.orders = ordersWithClients;
      } catch (error) {
        let errorMessage = "Erreur inattendue lors de la récupération de l'historique";
        if (axios.isAxiosError(error) && error.response) {
          errorMessage = error.response.data.message || errorMessage;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
        this.showSnackbar(errorMessage, 'error');
      }
    }
    ,
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user._id) {
      this.fetchOrderHistory(user._id);
    } else {
      console.error('ID du fournisseur introuvable.');
      this.snackbarText = 'ID du fournisseur introuvable. Impossible de récupérer l\'historique des commandes.';
      this.snackbarColor = 'error';
      this.snackbar = true;
    }
  },
};
</script>