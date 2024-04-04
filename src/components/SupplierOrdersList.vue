<template>
  <div>
    <v-subheader>Historique des Commandes</v-subheader>
    <v-data-table
      :headers="headers"
      :items="orders"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.orderDate="{ item }">
        {{ new Date(item.order.orderDate).toLocaleDateString() }}
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn small color="primary">Détails</v-btn>
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
        snackbar: false,
        snackbarText: '',
        snackbarColor: '',
      };
    },
    methods: {
      async fetchOrderHistory(supplierId) {
        try {
          const response = await axios.get(`http://localhost:3000/suppliers/order_history/${supplierId}`);
          console.log('////' + response);
          this.orders = response.data;
          this.snackbarText = 'Order history fetched successfully';
          this.snackbarColor = 'success';
          this.snackbar = true;
        } catch (error) {
          console.error('There was an error fetching the order history:', error);
          this.snackbarText = 'Failed to fetch order history';
          this.snackbarColor = 'error';
          this.snackbar = true;
        }
      },
    },
    mounted() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
      const supplierId = user?._id;
      
      if (supplierId) {
        this.fetchOrderHistory(supplierId);
      } else {
        console.error('Supplier ID not found.');
        this.snackbarText = 'Supplier ID not found. Unable to fetch order history.';
        this.snackbarColor = 'error';
        this.snackbar = true;
      }
    } else {
      console.error('User not found in localStorage.');
      this.snackbarText = 'User information is missing. Unable to fetch order history.';
      this.snackbarColor = 'error';
      this.snackbar = true;
    }
  },
};
  </script>  