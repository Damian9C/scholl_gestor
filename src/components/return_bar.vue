<template>
  <div>
    <div class="container__body--btn">
      <v-btn
          text
          :to="url"
      >
        <v-icon left>
          mdi-arrow-left
        </v-icon>
        <v-spacer/>
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