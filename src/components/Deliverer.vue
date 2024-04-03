<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-5" outlined elevation="2">
          <v-card-title class="text-h5 mb-4">Informations Utilisateur</v-card-title>

          <!-- Lignes de Champ avec Validation -->
          <v-row align="center" class="mb-2">
            <v-col cols="12" md="6">
              <v-text-field v-model="nom" label="Nom" prepend-icon="mdi-account"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn @click="validerNom" color="primary" :disabled="!nom">Valider</v-btn>
            </v-col>
          </v-row>

          <!-- Autres lignes similaires pour prénom, mot de passe, etc. -->
          <!-- Exemple pour Prénom -->
          <v-row align="center" class="mb-2">
            <v-col cols="12" md="6">
              <v-text-field v-model="prenom" label="Prénom" prepend-icon="mdi-account"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn @click="validerPrenom" color="primary" :disabled="!prenom">Valider</v-btn>
            </v-col>
          </v-row>

          <!-- Mot de passe -->
          <v-row align="center" class="mb-2">
            <v-col cols="12" md="6">
              <v-text-field v-model="password" label="Mot de passe" prepend-icon="mdi-lock" type="password"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn @click="validerMotDePasse" color="primary" :disabled="!password">Valider</v-btn>
            </v-col>
          </v-row>

          <!-- Ville -->
          <v-row align="center" class="mb-2">
            <v-col cols="12" md="6">
              <v-text-field v-model="base" label="Ville" prepend-icon="mdi-city"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn @click="validerVille" color="primary" :disabled="!base">Valider</v-btn>
            </v-col>
          </v-row>

          <!-- Locomotion -->
          <v-row align="center" class="mb-4">
            <v-col cols="12" md="6">
              <v-text-field v-model="locomotion" label="Locomotion" prepend-icon="mdi-car"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn @click="validerLocomotion" color="primary" :disabled="!locomotion">Valider</v-btn>
            </v-col>
          </v-row>

          <!-- Localisation -->
          <v-row>
            <v-col cols="12">
              <v-switch v-model="localisable" label="Activer la localisation" prepend-icon="mdi-map-marker" @change="modifierLocalisation" ></v-switch>
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
let base = ""
let locomotion = ""
let localisable = false
if (user !== ""){
  nom = JSON.parse(user).firstname
  prenom = JSON.parse(user).lastname
  email = JSON.parse(user).email
  locomotion = JSON.parse(user).typeOfVehicle
  base = JSON.parse(user).base
  localisable = JSON.parse(user).localisable
  console.log(JSON.parse(user))
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

  data() {
    return {
      nom: nom,
      prenom: prenom,
      password: '',
      base: base,
      locomotion: locomotion,
      localisable: localisable,
      snackbar: snackbar.value
    };
  },
  methods: {
    async validerNom() {
      const endpoint = 'http://localhost:3000/deliverers/'+email;
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
      const endpoint = 'http://localhost:3000/deliverers/'+email;
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
      const endpoint = 'http://localhost:3000/deliverers/change_password/'+email;
      const request = {
        "password": this.password
      }
      requete(endpoint,request)
    },
    async validerVille() {
      const endpoint = 'http://localhost:3000/deliverers/'+email;
      const request = {
        "base": this.base
      }
      if (await requete(endpoint, request)) {
        const newUser = JSON.parse(user)
        newUser.base = this.base
        localStorage.setItem('user', JSON.stringify(newUser))
      }
    },
    async validerLocomotion() {
      const endpoint = 'http://localhost:3000/deliverers/'+email;
      const request = {
        "typeOfVehicle": this.locomotion
      }
      if (await requete(endpoint, request)) {
        const newUser = JSON.parse(user)
        newUser.typeOfVehicle = this.locomotion
        localStorage.setItem('user', JSON.stringify(newUser))
      }
    },
    async modifierLocalisation() {
      const endpoint = 'http://localhost:3000/deliverers/'+email;
      console.log(JSON.parse(user).localisable)
      console.log(this.localisable)
      const request = {
        "localisable": this.localisable
      }
      if (await requete(endpoint, request)) {
        const newUser = JSON.parse(user)
        newUser.localisable = this.localisable
        localStorage.setItem('user', JSON.stringify(newUser))
      }
    }
  },
});
</script>