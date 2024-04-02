<template>
    <v-container class="fill-height" fluid>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12" outlined>
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Connexion</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="login">
                <!-- Email Field -->
                <v-text-field
                  label="Adresse Email"
                  prepend-icon="mdi-email"
                  type="email"
                  v-model="email"
                  :rules="[(v: string) => !!v || 'E-mail est requis']"
                  required
                ></v-text-field>
  
                <!-- Password Field -->
                <v-text-field
                  label="Mot de passe"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="password"
                  :rules="[(v: string) => !!v || 'Mot de passe est requis']"
                  required
                ></v-text-field>
  
                <!-- Radio Buttons for Role Selection -->
                <v-radio-group v-model="role" row>
                  <v-radio label="Fournisseur" value="supplier"></v-radio>
                  <v-radio label="Client" value="client"></v-radio>
                  <v-radio label="Livreur" value="deliverer"></v-radio>
                </v-radio-group>
  
                <!-- Submit Button -->
                <v-btn
                  :disabled="isFormInvalid"
                  color="success"
                  class="mr-4"
                  type="submit"
                  block
                >
                  Connexion
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import axios from 'axios';
  
  const email = ref('');
  const password = ref('');
  const role = ref('');
  
  const isFormInvalid = computed(() => {
    return email.value.trim() === '' || password.value.trim() === '' || role.value === '';
  });
  
  async function login() {
    console.log(`Connexion en tant que ${role.value} avec ${email.value} et le mot de passe ${password.value}`);
    try {
      const response = await axios.post('http://localhost:3000/deliverers/login', {
        email: email.value,
        password: password.value,
      });
      console.log('Réponse du serveur :', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erreur de login :', error.response?.data);
      } else if (error instanceof Error) {
        console.error('Erreur :', error.message);
      } else {
        console.error('Erreur inattendue', error);
      }
    }
  }
  </script>
  
  <style scoped>
  /* Les styles spécifiques à Vuetify sont généralement inutiles ici, car Vuetify s'occupe déjà de la plupart des aspects de l'UI. */
  </style>
  