<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-5" outlined>
          <v-card-title class="text-h5">Informations personnelles</v-card-title>

          <!-- Première ligne : Nom -->
          <v-row class="my-3">
            <v-col cols="12" md="8">
              <v-text-field v-model="nom" label="Nom"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-btn @click="validerNom" color="primary" block>Valider</v-btn>
            </v-col>
          </v-row>

          <!-- Deuxième ligne : Prénom -->
          <v-row class="my-3">
            <v-col cols="12" md="8">
              <v-text-field v-model="prenom" label="Prénom"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-btn @click="validerPrenom" color="primary" block>Valider</v-btn>
            </v-col>
          </v-row>

          <!-- Troisième ligne : Mot de passe -->
          <v-row class="my-3">
            <v-col cols="12" md="8">
              <v-text-field v-model="motDePasse" label="Mot de passe" type="password"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-btn @click="validerMotDePasse" color="primary" block>Valider</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      nom: '',
      prenom: '',
      motDePasse: '',
    };
  },
  methods: {
    validerNom() {
      // Logique de validation du nom
    },
    validerPrenom() {
      // Logique de validation du prénom
    },
    validerMotDePasse() {
      // Logique de validation du mot de passe
    },
  },
});
</script>