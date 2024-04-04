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
import Client from '../components/AccountClient.vue';
import Deliverer from "@/components/AccountDeliverer.vue";
import Supplier from "@/components/AccountSupplier.vue";
const user = localStorage.getItem('user') ?? "";
let role = "";
if (user !== "") {
  role = JSON.parse(user).role;
}
const isClient = role === "client";
const isDeliverer = role === "deliverer";
const isSupplier = role === "supplier";
</script>
