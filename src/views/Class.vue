<template>
  <div>
    <div class="container__body">

      <div class="container__body--btn">
        <v-btn
            color="#F7F9FA"
            depressed
            to="/home"
        >
          <v-icon left>
            mdi-arrow-left
          </v-icon>
          <v-spacer/>
          Regresar
        </v-btn>
      </div>

      <v-divider/><br/>

      <div class="container__body--first">

        <div>
          <div class="container__body--tittle Roboto-Bold">
            Matematicas
          </div>
          <div class="container__body--group Roboto-Medium">
            1.-A
          </div>
        </div>

        <div class="btn">
          <v-btn
              class="btn--unique"
              color="#28ad2c"
              dark
          >
            Cargar
            <v-icon right> mdi-upload</v-icon>
          </v-btn>
          <br/>
          <v-btn
              class="btn--unique"
              color="#209fe3"
              dark
          >
            Descargar
            <v-icon right> mdi-download </v-icon>
          </v-btn>

        </div>
      </div>

      <br/>
      <table_component/>
    </div>
  </div>
</template>

<script>
export default {
  name: "class",
  mounted() {
    console.log(this.$route.params.id)
  }
}
</script>

<style scoped>

.container__body--first{
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.container__body{
  width: 80%;
  margin: 1rem 0 0 10%;
}

.container__body--btn{
  margin-bottom: .5rem;
}

.container__body--tittle{
  font-size: 2.5rem;
}

.btn--unique{
  margin-top: -10px;
}

.btn{
  display: grid;
  grid-template-columns: 100%;
}

@media screen and (max-width: 900px) {

}

</style>