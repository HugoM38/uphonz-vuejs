<template>
    <div>
      <v-subheader>Liste des Fournisseurs</v-subheader>
      <v-data-table :headers="headers" :items="suppliers" class="elevation-1">
        <template v-slot:item.action="{ item }">
          <v-btn color="primary" @click="placeOrder(item._id)">Commander</v-btn>
        </template>
      </v-data-table>
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
    name: 'SuppliersList',
    data() {
        return {
            suppliers: [],
            headers: [
                { text: 'First Name', value: 'firstname', sortable: false },
                { text: 'Last Name', value: 'lastname', sortable: false },
                { text: 'Actions', value: 'action', sortable: false },
            ],
            snackbar: false,
            snackbarText: '',
            snackbarColor: '',
        };
    },
    methods: {
        async placeOrder(supplierId) {
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user?._id;

            if (!userId) {
                this.snackbarText = 'Client ID is missing. User must be logged in to place orders.';
                this.snackbarColor = 'error';
                this.snackbar = true;
                return;
            }

            try {
                const response = await axios.post('http://localhost:3000/clients/order', {
                    clientId: userId,
                    supplierId: supplierId,
                });
                this.snackbarText = 'Order placed successfully';
                this.snackbarColor = 'success';
                this.snackbar = true;
            } catch (error) {
                this.snackbarText = 'There was an error placing the order';
                this.snackbarColor = 'error';
                this.snackbar = true;
            }
        },
    },
    async mounted() {
        try {
            const response = await axios.get('http://localhost:3000/suppliers');
            this.suppliers = response.data;
        } catch (error) {
            console.error('There was an error fetching the suppliers:', error);
        }
    },
};
</script>