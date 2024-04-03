<template>
  <v-app>
    <div id="app">
      <header>
        <Navbar />
      </header>
      <v-main>
        <router-view></router-view>
      </v-main>
    </div>
  </v-app>

</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue';

</script>

<style>
/* Styles globaux de l'application */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  text-align: center;
}
</style>
