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
              <v-text-field v-model="password" label="Mot de passe" type="password"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-btn @click="validerMotDePasse" color="primary" block>Valider</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color">
      {{ snackbar.message }}
      <template v-slot:actions>
        <v-btn icon @click="snackbar.show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import {onMounted, ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/useAuthStore';

let user = null;
let email = ""
const nom = ref("")
const prenom = ref("")
const password = ref("")
const snackbar = ref({ show: false, message: '', color: 'success' });

function showSnackbar(message: string, type: 'success' | 'error') {
  snackbar.value.show = true;
  snackbar.value.message = message;
  snackbar.value.color = type === 'error' ? 'error' : 'success';
}
async function requete(endpoint: string, request: any) {
  try {
    const response = await axios.patch(endpoint, request);
    if (response.data.acknowledged) {
      showSnackbar('Modification appliquée!', 'success');
      return true
    } else {
      showSnackbar('Échec de la modification!', 'error');
      return false
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data || 'Erreur lors de la modification.';
      showSnackbar(errorMessage, 'error');
    } else if (error instanceof Error) {
      showSnackbar(error.message, 'error');
    } else {
      showSnackbar('Erreur inattendue!', 'error');
    }
  }
}

// Propriétés du composant

async function validerNom() {
  const endpoint = 'http://localhost:3000/clients/' + email;
  const request = {
    "lastname": nom.value
  }
  if (await requete(endpoint, request)) {
    const newUser = user!
    newUser.lastname = nom.value
    useAuthStore().setUser(JSON.stringify(newUser))
  }
}
async function validerPrenom() {
  const endpoint = 'http://localhost:3000/clients/' + email;
  const request = {
    "firstname": prenom.value
  }
  if (await requete(endpoint, request)) {
    const newUser = user!
    newUser.firstname = prenom.value
    useAuthStore().setUser(JSON.stringify(newUser))
  }
}
function validerMotDePasse() {
  const endpoint = 'http://localhost:3000/suppliers/change_password/' + email;
  const request = {
    "password": password.value
  }
  requete(endpoint, request)
}

onMounted( () => {
  const store = useAuthStore();
  user = store.getUser;
  if (user) {
    nom.value = user.lastname
    prenom.value = user.firstname
    email = user.email
  }
})

</script>