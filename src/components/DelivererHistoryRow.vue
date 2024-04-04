<template>
    <v-card class="mb-2" @click="toggleDetails" elevation="2">
        <v-row align="center" no-gutters class="order-row">
            <v-col cols="6">
                {{ order.id }}
            </v-col>
            <v-col cols="3" class="d-flex justify-space-between align-center">
                <v-chip small :color="statusColor" dark>{{ statusText }}</v-chip>
            </v-col>
            <v-col cols="3" class="d-flex justify-end align-center">
                <v-btn icon color="red" @click.stop="deleteOrder(order.id)">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-btn v-if="order.status === 'accepted'" icon color="green" @click.stop="markAsDelivered(order.delivererId, order.id)">
                    <v-icon>mdi-check</v-icon>
                </v-btn>
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

<script>
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
                case 'pending':
                    return 'amber';
                case 'accepted':
                    return 'green';
                case 'delivered':
                    return 'blue';
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
        deleteOrder(orderId) {
            this.$emit('deleteOrder', orderId);
        },
        markAsDelivered(delivererId, orderId) {
            this.$emit('markAsDelivered', delivererId, orderId);
        }
    }
};
</script>

<style scoped>
.details {
    margin-top: 10px;
}
</style>