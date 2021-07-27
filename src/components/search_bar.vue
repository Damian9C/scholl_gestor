<template>
  <div>
    <div class="search__bar">
      <v-spacer/>
      <v-btn
          class="search__barBtn"
          outlined
          color="#525252"
      >
        Buscar
        <v-icon right>
          mdi-magnify
        </v-icon>
      </v-btn>
    </div>

    <v-divider/>
    <br/>
  </div>
</template>

<script>
export default {
  name: "search_bar",
  data: () => ({

  }),
}
</script>

<style scoped>

.search__bar{
  display: flex;
}

.search__barBtn{
  margin-left: 1rem;
  margin-bottom: .5rem;
}

</style>