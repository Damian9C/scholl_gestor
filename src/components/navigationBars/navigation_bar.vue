<template>
  <v-app-bar
      color="#393939"
      dense
      dark
  >
    <v-toolbar-title @click="$router.push('/home')" class="Roboto-Black">
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

        <v-card>
          <v-list>
            <v-list-item-group>
              <v-list-item @click.prevent="showChangePass = true">
                <v-list-item-content>
                  <v-list-item-title>
                    Cambiar Contraseña
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon>
                    mdi-lock-reset
                  </v-icon>
                </v-list-item-icon>
              </v-list-item>

              <v-list-item @click.prevent="logOut">
                <v-list-item-content>
                  <v-list-item-title>
                    Salir
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon>
                    mdi-logout
                  </v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu>

      <v-avatar
          :color="color"
          size="36"
          class="navBar__user"
      >
        <span class="white--text text-h7">{{ text }}</span>
      </v-avatar>
    </div>

    <div class="navBar__showChangePass">
      <v-dialog
          v-model="showChangePass"
          width="35vw"
          persistent
      >
        <template v-slot:activator="{on, attrs}"/>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Cambiar Contraseña
          </v-card-title><br/>

          <div class="navBar__showChangePass--content">
            <v-text-field
                v-model="password"
                outlined
                append-icon="mdi-lastpass"
                :rules="[rules.required]"
                type="password"
                name="input-10-1"
                label="Nueva Contraseña"
            ></v-text-field>

            <v-text-field
                v-model="repeatPassword"
                outlined
                append-icon="mdi-lastpass"
                :rules="[rules.required]"
                type="password"
                name="input-10-1"
                label="Repetir Contraseña"
            ></v-text-field>
          </div>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="red"
                text
                @click="showChangePass = false"
            >
              Cancelar
            </v-btn>
            <v-btn
                dark
                color="#51B4E9"
                @click="changePass"
            >
              Actualizar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
          v-model="showAlert"
          width="35vw"
          persistent
      >
        <template v-slot:activator="{on, attrs}"/>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Contraseña Guardada
          </v-card-title><br/>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                dark
                color="#51B4E9"
                @click="showAlert = false"
            >
              Ok
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

  </v-app-bar>
</template>

<script>
import {auth} from "../../util";
import {mapActions} from "vuex";
import {updatePass} from "../../util/utilities";

export default {
  name: "navigation_bar",

  data: () => ({
    showChangePass:'',
    showAlert:'',

    rules: {
      required: value => !!value || 'Obligatorio'
    },
    password: '',
    repeatPassword:'',

    text: '',
    colors:{
      admin: '#FF097F',
      executive: '#20CA5A',
      teacher: '#1B9FFF',
    },
    color: '',
  }),

  methods:{
    ...mapActions(['setUserData']),

    logOut (){
      this.setUserData(null)
      auth.signOut().then(() => {
        this.$router.push('/');
      })
    },

     async changePass(){
       if (this.password === this.repeatPassword){
         await updatePass(this.password);

         this.showChangePass = false;
         this.showAlert = true;
       }else {
         alert('Las Contraseñas no Coinciden')
       }
    },

    setNick (){
      let subData = this.$store.state.user.name.split(" ");


      this.text = `${subData[0].substr(0,1)}${subData[1].substr(0, 1)}`;

      let color = this.$store.state.user.position
      this.color = this.colors[color]
    },
  },
  mounted() {
    this.setNick()
  },
}
</script>

<style scoped>

.navBar__user{
  margin-left: .2rem;
}

.navBar__showChangePass--content{
  padding: 0 5%;
}

</style>