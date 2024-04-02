<template>
    <div class="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <div class="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
            <div class="text-center">
                <h2 class="mt-6 text-3xl font-bold text-gray-900">
                    Connexion
                </h2>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="login">
                <div class="rounded-md shadow-sm -space-y-px">
                    <!-- Email Field -->
                    <div>
                        <label for="email-address" class="sr-only">Adresse Email</label>
                        <input id="email-address" name="email" type="email" autocomplete="email" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Adresse Email" v-model="email">
                    </div>
                    <!-- Password Field -->
                    <div>
                        <label for="password" class="sr-only">Mot de passe</label>
                        <input id="password" name="password" type="password" autocomplete="current-password" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Mot de passe" v-model="password">
                    </div>
                </div>
                <!-- Radio Buttons for Role Selection -->
                <div class="space-y-2">
                    <div>
                        <label class="inline-flex items-center">
                            <input type="radio" class="form-radio" name="role" value="supplier" v-model="role">
                            <span class="ml-2">Fournisseur</span>
                        </label>
                    </div>
                    <div>
                        <label class="inline-flex items-center">
                            <input type="radio" class="form-radio" name="role" value="client" v-model="role">
                            <span class="ml-2">Client</span>
                        </label>
                    </div>
                    <div>
                        <label class="inline-flex items-center">
                            <input type="radio" class="form-radio" name="role" value="deliverer" v-model="role">
                            <span class="ml-2">Livreur</span>
                        </label>
                    </div>
                </div>
                <div>
                    <button type="submit" :disabled="isFormInvalid"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Connexion
                    </button>
                </div>
            </form>
        </div>
    </div>
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
            password: password.value
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

<style>
/* Ajoutez ici les styles supplémentaires si nécessaire */
</style>