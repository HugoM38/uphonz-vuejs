<template>
    <v-card class="mb-2" @click="toggleDetails" elevation="2">
        <v-row class="pending-order-row" no-gutters>
            <v-col cols="6">
                {{ order.id }}
            </v-col>
            <v-col cols="3" class="d-flex justify-space-between align-center">
                <v-chip small :color="statusColor" dark>{{ statusText }}</v-chip>
            </v-col>
            <v-col cols="3" class="d-flex justify-end align-center">
                <v-btn text @click.stop="toggleDetails">
                    <v-icon>{{ detailsVisible ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
                <v-btn color="success" @click.stop="acceptOrder">Accepter</v-btn>
            </v-col>
        </v-row>
        <v-expand-transition>
            <v-row v-if="detailsVisible" class="details py-2">
                <v-col cols="12">
                    <div><strong>Client:</strong> {{ order.clientName }}</div>
                    <div><strong>Fournisseur:</strong> {{ order.supplierName }}</div>
                </v-col>
            </v-row>
        </v-expand-transition>
    </v-card>
</template>


<script lang="ts">
export default {
    props: ['order'],
    data() {
        return {
            detailsVisible: false,
        };
    },
    computed: {
        statusColor() {
            switch (this.order.status) {
                case 'En attente':
                    return 'amber';
                case 'Accepté':
                    return 'green';
                case 'Refusé':
                    return 'red';
                default:
                    return 'grey';
            }
        },
        statusText() {
            switch (this.order.status) {
                case 'pending':
                    return 'En attente';
                case 'accepted':
                    return 'Accepté';
                case 'delivered':
                    return 'Livré';
                default:
                    return 'Inconnu';
            }
        }
    },
    methods: {
        toggleDetails() {
            this.detailsVisible = !this.detailsVisible;
        },
        acceptOrder() {
            this.$emit('acceptOrder', this.order.id);
        }
    }
};
</script>

<style scoped>
.details {
    margin-top: 10px;
}
</style>