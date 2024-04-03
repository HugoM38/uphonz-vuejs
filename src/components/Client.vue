<template>
  <div>
    <!-- Première ligne -->
    <v-row>
      <v-col cols="6">
        <v-text-field v-model="nom" label="Nom"></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-btn @click="validerNom" color="primary">Valider</v-btn>
      </v-col>
    </v-row>

    <!-- Deuxième ligne -->
    <v-row>
      <v-col cols="6">
        <v-text-field v-model="prenom" label="Prénom"></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-btn @click="validerPrenom" color="primary">Valider</v-btn>
      </v-col>
    </v-row>

    <!-- Troisième ligne -->
    <v-row>
      <v-col cols="6">
        <v-text-field v-model="motDePasse" label="Mot de passe" type="password"></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-btn @click="validerMotDePasse" color="primary">Valider</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      nom: '',
      prenom: '',
      motDePasse: ''
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
    }
  }
});
</script>
