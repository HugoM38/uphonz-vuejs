<template>
    <v-app-bar app dense>
        <v-toolbar-title>
            <router-link to="/" class="black--text">Uphonz</router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <template v-if="useAuthStore().isUserLoggedIn">
            <v-btn text="true"@click="gotoArgument('Account',role)">Profil</v-btn>
            <v-btn text="true"  v-if="userRole() === 'deliverer'" @click="goto('DelivererHistory')">Historique</v-btn>
            <v-btn text="true" @click="logout">Déconnexion</v-btn>
        </template>
    </v-app-bar>
</template>

<script setup lang="ts">
import router from '@/router/router';
import { useAuthStore } from '@/stores/useAuthStore';

let role =''
if(useAuthStore().isUserLoggedIn){
  const user =  useAuthStore().getUser;
  role = user.role
}

const goto = (path: string) => {
    router.push({ name: path });
};

const gotoArgument = (path: string, role: string) => {
  router.push({ name: path, params:{role: role} });
};

const logout = () => {
    useAuthStore().setUser(null);
    router.push("/");
};

const userRole = () => {
    return useAuthStore().isUserLoggedIn ? useAuthStore().getUser.role : '';
};

</script>

<style scoped>
.black--text {
    color: black !important;
    text-decoration: none !important;
}
</style>