<template>
  <div>
    <div class="container__body--btn">
      <v-btn
          outlined
          color="#393939"
          :to="url"
      >
        <v-icon left>
          mdi-arrow-left
        </v-icon>
        Regresar
      </v-btn>
      <v-spacer/>
      <v-btn
          class="search__barBtn"
          outlined
          color="#393939"
      >
        Buscar
        <v-icon right>
          mdi-magnify
        </v-icon>
      </v-btn>
    </div>

    <v-divider/><br/>
  </div>
</template>

<script>
export default {
  name: "return_bar",
  props: ['url']
}
</script>

<style scoped>

.container__body--btn{
  display: flex;
  margin-bottom: .5rem;
}

</style>