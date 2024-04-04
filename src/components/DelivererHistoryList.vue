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
      <deliverer-history-row v-for="order in orders" :key="order.id" :order="order" @deleteOrder="deleteOrder"
        @markAsDelivered="markOrderAsDelivered"></deliverer-history-row>
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
import DelivererHistoryRow from './DelivererHistoryRow.vue';

export default {
  name: 'DelivererHistoryList',
  components: {
    DelivererHistoryRow
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
      try {
        axios.patch(`http://localhost:3000/deliverers/delete_history/${orderId}`);
        this.orders = this.orders.filter(order => order.id !== orderId);
        this.showSnackbar('Commande supprimée avec succès', 'success');
      } catch (error) {
        let errorMessage = "Erreur inattendue lors de la suppression de la commande";
        if (axios.isAxiosError(error) && error.response) {
          errorMessage = error.response.data.message || errorMessage;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
        this.showSnackbar(errorMessage, 'error');
      }
    },
    showSnackbar(message, type) {
      this.snackbar.show = true;
      this.snackbar.message = message;
      this.snackbar.color = type === 'error' ? 'error' : 'success';
    },
    async fetchOrderHistory(delivererId) {
      try {
        const response = await axios.get(`http://localhost:3000/deliverers/order_history/${delivererId}`);
        const ordersWithClients = await Promise.all(response.data.map(async order => {
          const basicOrderInfo = {
            ...order.order,
            id: order._id,
            status: order.order.status
          };

          try {
            const responseClient = await axios.get(`http://localhost:3000/clients/by_id/${basicOrderInfo.clientId}`);
            const responseSupplier = await axios.get(`http://localhost:3000/suppliers/by_id/${basicOrderInfo.supplierId}`);
            return {
              ...basicOrderInfo,
              clientName: responseClient.data.firstname + ' ' + responseClient.data.lastname,
              supplierName: responseSupplier.data.firstname + ' ' + responseSupplier.data.lastname
            };
          } catch (error) {
            return {
              ...basicOrderInfo,
              clientName: 'Inconnu',
              supplierName: 'Inconnu'
            };
          }
        }));

        this.orders = ordersWithClients;
        this.showSnackbar('Commandes en attente récupérées avec succès', 'success');
      } catch (error) {
        let errorMessage = "Erreur inattendue lors de la récupération des commandes";
        if (axios.isAxiosError(error) && error.response) {
          errorMessage = error.response.data.message || errorMessage;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
        this.showSnackbar(errorMessage, 'error');
      }
    },
    async markOrderAsDelivered(delivererId, orderId) {
      axios.patch(`http://localhost:3000/deliverers/delivered_order/${orderId}`)
        .then(async () => {
          this.showSnackbar('Commande marquée comme livrée', 'success');
          await this.fetchOrderHistory(delivererId);
        })
        .catch(error => {
          let errorMessage = "Erreur inattendue lors de la mise à jour du statut de la commande";
          if (axios.isAxiosError(error) && error.response) {
            errorMessage = error.response.data.message || errorMessage;
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }
          this.showSnackbar(errorMessage, 'error');
        });
    }
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user._id) {
      this.fetchOrderHistory(user._id);
    } else {
      this.showSnackbar('Utilisateur non authentifié', 'error');
    }
  },
};
</script>