<template>
  <div id="app">
    <header>
      <!-- Vous pouvez ajouter ici une barre de navigation ou un menu si nécessaire -->
    </header>
    <!-- Le composant de la route actuelle sera rendu ici -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
// Le script setup est optionnel dans ce cas, car il n'y a pas de logique spécifique
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
