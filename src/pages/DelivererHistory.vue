<template>
    <v-container>
        <DelivererHistoryList />
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DelivererHistoryList from '@/components/DelivererHistoryList.vue';

export default defineComponent({
    components: {
        DelivererHistoryList,
    }
});
</script>