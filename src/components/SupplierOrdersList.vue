<template>
  <div>
    <v-subheader>Historique des Commandes</v-subheader>
    <v-data-table :headers="headers" :items="orders" :items-per-page="5" class="elevation-1">
      <template v-slot:item.orderDate="{ item }">
        {{ new Date(item.orderDate).toLocaleDateString() }}
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn small color="primary" @click="showDetails(item)">Détails</v-btn>
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
  name: 'OrderHistory',
  data() {
    return {
      orders: [],
      headers: [
        { text: 'Numéro de Commande', value: 'id' },
        { text: 'Prénom du client', value: 'clientName'},
        { text: 'Statut', value: 'status' },
      ],
      snackbar: false,
      snackbarText: '',
      snackbarColor: '',
    };
  },
  methods: {
    translateStatus(status) {
      const statusTranslations = {
        'accepted': 'Acceptée',
        'pending': 'En attente',
      };
      console.log(`Traduction du statut : ${status} -> ${statusTranslations[status] || status}`);
      return statusTranslations[status] || status;
    },
    async fetchOrderHistory(supplierId) {
      try {
        const response = await axios.get(`http://localhost:3000/suppliers/order_history/${supplierId}`);
        const ordersWithClients = await Promise.all(response.data.map(async order => {
          const basicOrderInfo = {
            ...order.order,
            id: order._id,
            status: this.translateStatus(order.order.status)
          };

          try {
            const responseClient = await axios.get(`http://localhost:3000/clients/by_id/${basicOrderInfo.clientId}`);
            return {
              ...basicOrderInfo,
              clientName: responseClient.data.firstname
            };
          } catch (error) {
            console.error(`Erreur lors de la récupération des infos du client ${basicOrderInfo.clientId}:`, error);
            return {
              ...basicOrderInfo,
              clientName: 'Inconnu'
            };
          }
        }));

        this.orders = ordersWithClients;
        this.snackbarText = 'Historique des commandes récupéré avec succès';
        this.snackbarColor = 'success';
        this.snackbar = true;
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique des commandes :', error);
        this.snackbarText = 'Échec de la récupération de l\'historique des commandes';
        this.snackbarColor = 'error';
        this.snackbar = true;
      }
    }
    ,
    showDetails(item) {
      console.log(item);
    },
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