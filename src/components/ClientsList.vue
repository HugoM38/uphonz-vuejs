<template>
    <div>
      <v-subheader>Order History</v-subheader>
      <v-list>
        <v-list-item v-for="(order, index) in orders" :key="index">
          <v-list-item-content>
            <div>Client ID: {{ order.clientId }}</div>
            <div>Supplier ID: {{ order.supplierId }}</div>
            <div>Deliverer ID: {{ order.delivererId }}</div>
            <div>Date: {{ new Date(order.orderDate).toLocaleDateString() }}</div>
            <div>Status: {{ order.status }}</div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-snackbar v-model="snackbar" :color="snackbarColor">
        {{ snackbarText }}
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
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
      const supplierId = 'YOUR_SUPPLIER_ID';
      this.fetchOrderHistory(supplierId);
    },
  };
  </script>  