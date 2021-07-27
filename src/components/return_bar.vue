<template>
  <div>
    <div class="container__body--btn">
      <v-btn
          outlined
          color="#525252"
          :to="url"
      >
        <v-icon left>
          mdi-arrow-left
        </v-icon>
        Regresar
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
  margin-bottom: .5rem;
}

</style>