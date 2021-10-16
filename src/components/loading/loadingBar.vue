<template>
  <v-dialog
      v-model="stateCmp"
      persistent
      width="200px"
  >
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Cargando
      </v-card-title>

      <v-card-text>
        <br/>
        <v-progress-linear
            indeterminate
            color="primary"
            rounded
            height="6"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "loadingBar",
  props: [
      'stateCmp',
  ],
}
</script>

<style scoped>

.loader{
  padding: 1rem;
}

</style>
