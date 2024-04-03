<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-5" outlined elevation="2">
          <v-card-title class="text-h5 mb-4">Informations Utilisateur</v-card-title>

          <!-- Lignes de Champ avec Validation -->
          <v-row align="center" class="mb-2">
            <v-col cols="12" md="6">
              <v-text-field v-model="nom" label="Nom" prepend-icon="mdi-account" :rules="[rules.required]"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn @click="validerNom" color="primary" :disabled="!nom">Valider</v-btn>
            </v-col>
          </v-row>

          <!-- Autres lignes similaires pour prénom, mot de passe, etc. -->
          <!-- Exemple pour Prénom -->
          <v-row align="center" class="mb-2">
            <v-col cols="12" md="6">
              <v-text-field v-model="prenom" label="Prénom" prepend-icon="mdi-account" :rules="[rules.required]"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn @click="validerPrenom" color="primary" :disabled="!prenom">Valider</v-btn>
            </v-col>
          </v-row>

          <!-- Mot de passe -->
          <v-row align="center" class="mb-2">
            <v-col cols="12" md="6">
              <v-text-field v-model="motDePasse" label="Mot de passe" prepend-icon="mdi-lock" type="password" :rules="[rules.required]"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn @click="validerMotDePasse" color="primary" :disabled="!motDePasse">Valider</v-btn>
            </v-col>
          </v-row>

          <!-- Ville -->
          <v-row align="center" class="mb-2">
            <v-col cols="12" md="6">
              <v-text-field v-model="ville" label="Ville" prepend-icon="mdi-city" :rules="[rules.required]"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn @click="validerVille" color="primary" :disabled="!ville">Valider</v-btn>
            </v-col>
          </v-row>

          <!-- Locomotion -->
          <v-row align="center" class="mb-4">
            <v-col cols="12" md="6">
              <v-text-field v-model="locomotion" label="Locomotion" prepend-icon="mdi-car" :rules="[rules.required]"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn @click="validerLocomotion" color="primary" :disabled="!locomotion">Valider</v-btn>
            </v-col>
          </v-row>

          <!-- Localisation -->
          <v-row>
            <v-col cols="12">
              <v-switch v-model="localisation" label="Activer la localisation" prepend-icon="mdi-map-marker"></v-switch>
            </v-col>
          </v-row>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const nom = ref('');
    const prenom = ref('');
    const motDePasse = ref('');
    const ville = ref('');
    const locomotion = ref('');
    const localisation = ref(false);

    const rules = {
      required: value => !!value || 'Ce champ est requis',
    };

    const validerNom = () => console.log(nom.value);
    const validerPrenom = () => console.log(prenom.value);
    const validerMotDePasse = () => console.log(motDePasse.value);
    const validerVille = () => console.log(ville.value);
    const validerLocomotion = () => console.log(locomotion.value);

    return { nom, prenom, motDePasse, ville, locomotion, localisation, validerNom, validerPrenom, validerMotDePasse, validerVille, validerLocomotion, rules };
  },
});
</script>