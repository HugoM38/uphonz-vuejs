<template>
  <v-container>
    <PendingOrdersList />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PendingOrdersList from '@/components/PendingOrdersList.vue';

export default defineComponent({
  components: {
    PendingOrdersList,
  }
});
</script>