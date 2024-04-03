<template>
    <div>
      <v-subheader>Liste des Clients</v-subheader>
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
  export default {
    name: 'ClientsList',
    data() {
      return {
        clients: [
          { _id: '1', firstname: 'Jean', lastname: 'Dupont' },
          { _id: '2', firstname: 'Marie', lastname: 'Durand' },
        ],
      };
    },
  };
  </script>