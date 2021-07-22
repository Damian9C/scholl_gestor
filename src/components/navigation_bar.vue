<template>
  <v-app-bar
      color="#393939"
      dense
      dark
  >
    <v-toolbar-title @click="$router.push('/')" class="Roboto-Black">
      <v-btn
          class="my-1"
          text
          x-large
      >
        Gestor
      </v-btn>
    </v-toolbar-title>

    <v-spacer/>

    <div>
      <v-menu
          left
          bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              fab
              v-bind="attrs"
              v-on="on"
              small
              text
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="">
            <v-list-item-title>Salir</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-avatar
          color="primary"
          size="36"
      >
        <span class="white--text text-h7">JC</span>
      </v-avatar>
    </div>

  </v-app-bar>
</template>

<script>
export default {
  name: "navigation_bar"
}
</script>

<style scoped>

</style>