<template>
    <div>
      <v-subheader>List of Clients</v-subheader>
      <v-list>
        <v-list-item v-for="client in clients" :key="client._id">
          <v-list-item-content>
            {{ client.firstname }} {{ client.lastname }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ClientsList',
    data() {
      return {
        clients: [],
      };
    },
    methods: {
      async fetchClients() {
        try {
          const response = await axios.get('http://localhost:3000/clients'); // Use the actual endpoint
          this.clients = response.data;
        } catch (error) {
          console.error('There was an error fetching the clients:', error);
          // Handle the error appropriately in your UI
        }
      },
    },
    mounted() {
      this.fetchClients(); // Load clients when the component mounts
    },
  };
  </script>  