<template>
  <div>
    <div v-if="isClient">
      <Client/>
    </div>
    <div v-if="isDeliverer">
      <Deliverer/>
    </div>
    <div v-if="isSupplier">
      <Supplier/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Client from '../components/Client.vue';
import Deliverer from "@/components/Deliverer.vue";
import Supplier from "@/components/Supplier.vue";
const user = localStorage.getItem('user') ?? "";
let role = "";
if (user !== "") {
  role = JSON.parse(user).role;
}
const isClient = role === "client";
const isDeliverer = role === "deliverer";
const isSupplier = role === "supplier";
</script>
