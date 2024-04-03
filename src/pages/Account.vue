<template>
  <div>
    <p>Test de merde</p>
    <!-- Condition pour afficher le composant Client ou Deliverer -->
    <div v-if="isClient">
      <Client/>
    </div>
    <div v-else-if="isDeliverer">
      <Deliverer/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Client from '../components/Client.vue';
import Deliverer from '../components/Deliverer.vue'; // Assurez-vous que le chemin est correct

export default defineComponent({
  data() {
    return {
      isClient: true,
      isDeliverer: false
    };
  },
  components: {
    Client,
    Deliverer
  }
});
</script>
