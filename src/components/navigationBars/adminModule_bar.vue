<template>
  <div>
    <div class="search__bar">
      <v-btn
          outlined
          color="#393939"
          @click="$router.go(-1)"
      >
        <v-icon left>
          mdi-arrow-left
        </v-icon>
        Regresar
      </v-btn>
      <v-spacer/>
    </div>

    <v-divider/>
    <br/>
  </div>
</template>

<script>
export default {
  name: "adminModule_bar",
  data: () => ({

  }),
}
</script>

<style scoped>

.search__bar{
  display: flex;
  margin-bottom: .5rem;
}



</style>