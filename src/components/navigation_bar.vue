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

        <v-card
            class="mx-auto"
            max-width="500"
        >
          <v-list>
            <v-list-item-group>
              <v-list-item @click.prevent="logOut">
                <v-list-item-icon>
                  <v-icon>
                    mdi-logout
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    Salir
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu>

      <v-avatar
          :color="color"
          size="36"
      >
        <span class="white--text text-h7">{{ text }}</span>
      </v-avatar>
    </div>

  </v-app-bar>
</template>

<script>
import {auth} from "../util";

export default {
  name: "navigation_bar",

  data: () => ({
    text: '',
    colors:{
      admin: '#FF097F',
      executive: '#20CA5A',
      teacher: '#1B9FFF',
    },
    color: '',
  }),

  methods:{
    logOut (){
      auth.signOut().then(() => {
        this.$router.push('/')
      })
    },

    setNick (){
      let subData = this.$store.state.user.name.split(" ");


      this.text = `${subData[0].substr(0,1)}${subData[1].substr(0, 1)}`;

      let color = this.$store.state.user.position
      this.color = this.colors[color]
    },
  },
  beforeMount() {
    this.setNick()
  },
}
</script>

<style scoped>

</style>