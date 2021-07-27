<template>
  <div>
    <div class="search__bar">
      <v-text-field
          label="Buscar Alumno"
          outlined
          color="rgba(0, 163, 255, 1)"
          background-color="rgba(0, 163, 255, .05)"
          append-icon="mdi-account-search"
          dense
          ref="student"
      ></v-text-field>
      <v-btn
          class="search__barBtn"
          color="#00A3FF"
          dark
      >
        Buscar
      </v-btn>
    </div>

    <v-divider/>
    <br/>
  </div>
</template>

<script>
export default {
  name: "search_bar",
  data(){
    return{

    }
  }
}
</script>

<style scoped>

.search__bar{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search__barBtn{
  margin-left: 1rem;
  margin-bottom: 1.65rem;
}

</style>