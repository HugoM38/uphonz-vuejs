<template>
    <v-container class="fill-height" fluid>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12" outlined>
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Inscription</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="signup">
                <!-- Firstname Field -->
                <v-text-field label="Prénom" prepend-icon="mdi-account" type="text" v-model="firstname"
                  :rules="[(v: string) => !!v || 'Le prénom est requis']" required></v-text-field>

                <!-- Lastname Field -->
                <v-text-field label="Nom" prepend-icon="mdi-account-outline" type="text" v-model="lastname"
                  :rules="[(v: string) => !!v || 'Le nom est requis']" required></v-text-field>

                <!-- Email Field -->
                <v-text-field label="Adresse Email" prepend-icon="mdi-email" type="email" v-model="email"
                  :rules="[(v: string) => !!v || 'L’e-mail est requis']" required></v-text-field>
  
                <!-- Password Field -->
                <v-text-field label="Mot de passe" prepend-icon="mdi-lock" type="password" v-model="password"
                  :rules="[(v: string) => !!v || 'Le mot de passe est requis']" required></v-text-field>
  
                <!-- Radio Buttons for Role Selection -->
                <v-radio-group v-model="role" row>
                  <v-radio label="Fournisseur" value="supplier"></v-radio>
                  <v-radio label="Client" value="client"></v-radio>
                </v-radio-group>
  
                <!-- Submit Button -->
                <v-btn :disabled="isFormInvalid" color="success" class="mr-4" type="submit" block>
                  S'inscrire
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

const firstname = ref('');
const lastname = ref('');
const email = ref('');
const password = ref('');
const role = ref('');
const snackbar = ref({ show: false, message: '', color: 'success' });

const isFormInvalid = computed(() => {
    return firstname.value.trim() === '' || lastname.value.trim() === '' ||
        email.value.trim() === '' || password.value.trim() === '' || role.value === '';
});

function showSnackbar(message: string, type: 'success' | 'error') {
    snackbar.value.show = true;
    snackbar.value.message = message;
    snackbar.value.color = type === 'error' ? 'error' : 'success';
}

async function signup() {
    let endpoint = '';
    switch (role.value) {
        case 'client':
            endpoint = 'http://localhost:3000/clients/';
            break;
        case 'supplier':
            endpoint = 'http://localhost:3000/suppliers/';
            break;
    }
    try {
        const response = await axios.post(endpoint, {
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            password: password.value
        });

        console.log(response.data);

        if (response.data.acknowledged === true) {
            showSnackbar('Inscription réussie! Vous allez maintenant être connecté.', 'success');
            let userData = { ...response.data.user };
            userData.role = role.value;
            localStorage.setItem('user', JSON.stringify(userData));
            router.push("/home");
        } else {
            showSnackbar('Échec de l’inscription!', 'error');
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorMessage = error.response.data || 'Erreur inattendue lors de l’inscription.';
            showSnackbar(errorMessage, 'error');
        } else if (error instanceof Error) {
            showSnackbar(error.message, 'error');
        } else {
            showSnackbar('Erreur inattendue!', 'error');
        }
    }
}
</script>