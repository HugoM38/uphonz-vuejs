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
              <v-text-field label="Adresse Email" prepend-icon="mdi-email" type="email" v-model="email"
                :rules="[(v: string) => !!v || 'E-mail est requis']" required></v-text-field>

              <!-- Password Field -->
              <v-text-field label="Mot de passe" prepend-icon="mdi-lock" type="password" v-model="password"
                :rules="[(v: string) => !!v || 'Mot de passe est requis']" required></v-text-field>

              <!-- Radio Buttons for Role Selection -->
              <v-radio-group v-model="role" row>
                <v-radio label="Fournisseur" value="supplier"></v-radio>
                <v-radio label="Client" value="client"></v-radio>
                <v-radio label="Livreur" value="deliverer"></v-radio>
              </v-radio-group>

              <!-- Submit Button -->
              <v-btn :disabled="isFormInvalid" color="success" class="mr-4" type="submit" block>
                Connexion
              </v-btn>
              
              <!-- Signup Button -->
              <v-btn color="pink accent-3" dark depressed large @click="goToSignup"
                class="mt-5" :class="{ 'v-btn--is-elevated': isElevated }"
                @mouseover="isElevated = true" @mouseleave="isElevated = false"
                block>
                <v-icon left>mdi-account-plus</v-icon>
                Inscription
              </v-btn>
            </v-form>
          </v-card-text>
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
import { ref, computed } from 'vue';
import axios from 'axios';
import router from '@/router/router';
import { useAuthStore } from '@/stores/useAuthStore';

const email = ref('');
const password = ref('');
const role = ref('');
const snackbar = ref({ show: false, message: '', color: 'success' });
const isElevated = ref(false);

const isFormInvalid = computed(() => {
  return email.value.trim() === '' || password.value.trim() === '' || role.value === '';
});

function goToSignup() {
  router.push('/signup');
}

function showSnackbar(message: string, type: 'success' | 'error') {
  snackbar.value.show = true;
  snackbar.value.message = message;
  snackbar.value.color = type === 'error' ? 'error' : 'success';
}

async function login() {
  let endpoint = '';
  switch (role.value) {
    case 'supplier':
      endpoint = 'http://localhost:3000/suppliers/login';
      break;
    case 'client':
      endpoint = 'http://localhost:3000/clients/login';
      break;
    case 'deliverer':
      endpoint = 'http://localhost:3000/deliverers/login';
      break;
  }

  try {
    const response = await axios.post(endpoint, {
      email: email.value,
      password: password.value,
    });

    if (response.data.login === 'success') {
      showSnackbar('Connexion réussie!', 'success');
      let userData = {...response.data.client, ...response.data.supplier, ...response.data.deliverer};
      userData.role = role.value;
      useAuthStore().setUser(JSON.stringify(userData));
      let homePath = '/';
      switch (role.value) {
        case 'supplier':
          homePath = '/supplier-home';
          break;
        case 'client':
          homePath = '/client-home';
          break;
        case 'deliverer':
          homePath = '/delivery-home';
          break;
      }
      location.reload();
      await router.push(homePath);
    } else {
      showSnackbar('Échec de la connexion!', 'error');
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.message || 'Erreur inattendue lors de la connexion.';
      showSnackbar(errorMessage, 'error');
    } else if (error instanceof Error) {
      showSnackbar(error.message, 'error');
    } else {
      showSnackbar('Erreur inattendue!', 'error');
    }
  }
}
</script>


<style scoped>
</style>