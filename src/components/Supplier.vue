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

<script lang="ts">
import {defineComponent, ref} from 'vue';
import axios from 'axios';
const user: string = localStorage.getItem('user') ?? "";
let nom = ""
let prenom = ""
let email = ""
if (user !== ""){
  nom = JSON.parse(user).firstname
  prenom = JSON.parse(user).lastname
  email = JSON.parse(user).email
  console.log(JSON.parse(user)._id)
}
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
export default defineComponent({
  // Propriétés du composant
  data() {
    return {
      nom: nom,
      prenom: prenom,
      password: '',
      snackbar: snackbar.value
    };
  },
  methods: {
    async validerNom() {
      const endpoint = 'http://localhost:3000/clients/'+email;
      const request = {
        "firstname": this.nom
      }
      if(await requete(endpoint, request)){
        const newUser = JSON.parse(user)
        newUser.firstname = this.nom
        localStorage.setItem('user',JSON.stringify(newUser))
      }
    },
    async validerPrenom() {
      const endpoint = 'http://localhost:3000/clients/' + email;
      const request = {
        "lastname": this.prenom
      }
      if (await requete(endpoint, request)) {
        const newUser = JSON.parse(user)
        newUser.lastname = this.prenom
        localStorage.setItem('user', JSON.stringify(newUser))
      }
    },
    validerMotDePasse() {
      const endpoint = 'http://localhost:3000/suppliers/change_password/'+email;
      const request = {
        "password": this.password
      }
      requete(endpoint,request)
    },
  },
});
</script>