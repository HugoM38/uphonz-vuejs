<template>
    <v-app-bar app dense>
        <v-toolbar-title>
            <router-link to="/" class="black--text">Uphonz</router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <template v-if="isUserLoggedIn()">
            <v-btn text="true" @click="goto('profile')">Profil</v-btn>
            <v-btn text="true" @click="goto('history')">Historique</v-btn>
            <v-btn text="true" @click="logout">Déconnexion</v-btn>
        </template>
    </v-app-bar>
</template>

<script setup lang="ts">
import router from '@/router/router';
import { useAuthStore } from '@/stores/useAuthStore';

const { isUserLoggedIn, setUser } = useAuthStore();

const goto = (path: string) => {
    router.push({ name: path });
};

const logout = () => {
    setUser(null);
    router.push("/");
};

</script>

<style scoped>
.black--text {
    color: black !important;
    text-decoration: none !important;
}
</style>