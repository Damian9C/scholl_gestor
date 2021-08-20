<template>
  <div>
    <general/>

    <div class="adminGroups">
      <admin-module_bar/>

      <div class="adminGroups__banner">
        <h1 class="adminGroups__banner--title Roboto-Black">
          Grupos
        </h1>

        <v-spacer/>

        <div class="adminGroups__banner--btn">
          <v-dialog
              v-model="showNewGroup"
              width="35vw"
              persistent
          >
            <template v-slot:activator="{on, attrs}">
              <v-btn
                  color="#1F9FE3"
                  dark
                  v-bind="attrs"
                  v-on="on"
              >
                <v-icon left>
                  mdi-plus
                </v-icon>
                Añadir Grupo
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                Añadir Grupo
              </v-card-title><br/>

              <v-card-text>
                <v-text-field
                    label="Grupo"
                    v-model="group"
                ></v-text-field>
                <v-text-field
                    label="Grado"
                    v-model="grade"
                    type="number"
                ></v-text-field>

              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="red"
                    text
                    @click="showNewGroup = false"
                >
                  Cancelar
                </v-btn>
                <v-btn
                    dark
                    color="#51B4E9"
                    @click="saveGroup"
                >
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog
              v-model="promote"
              width="35vw"
              persistent
          >
            <template v-slot:activator="{on, attrs}">
              <v-btn
                  color="#1F9FE3"
                  outlined
                  disabled
                  small
                  v-bind="attrs"
                  v-on="on"
                  class="adminGroups__banner--btn2"
              >
                <v-icon left>
                  mdi-account-arrow-right
                </v-icon>
                Subir de Año
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                Añadir Personal
              </v-card-title><br/>

              <v-card-text>
                <v-text-field
                    label="Nombre"
                ></v-text-field>

              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="red"
                    text
                    @click="promote = false"
                >
                  Cancelar
                </v-btn>
                <v-btn
                    dark
                    color="#51B4E9"
                    @click=""
                >
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>

      <br/>

      <div class="adminGroups__table">
        <v-simple-table>
          <thead>
          <tr>
            <th class="text-left">
              Grupo
            </th>
            <th class="text-left">
              Opciones
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="item in groups"
              :key="item.id"
              class="staffTable__item"
          >
            <td>{{ item.data.technicalName }}</td>
            <td>
              <v-btn
                  small
                  outlined
                  @click=""
              >
                <v-icon>
                  mdi-eye
                </v-icon>
              </v-btn>

              <v-dialog
                  v-model="confirmDelete"
                  width="35vw"
                  persistent
              >
                <template v-slot:activator="{on, attrs}">
                  <v-btn
                      small
                      outlined
                      v-bind="attrs"
                      v-on="on"
                  >
                    <v-icon>
                      mdi-trash-can
                    </v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title class="text-h5 grey lighten-2">
                    Borrar Grupo?
                  </v-card-title><br/>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="red"
                        text
                        @click="confirmDelete = false"
                    >
                      Cancelar
                    </v-btn>
                    <v-btn
                        dark
                        color="#51B4E9"
                        @click="deleteSelectedGroup(item)"
                    >
                      Borrar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </td>
          </tr>
          </tbody>
        </v-simple-table>
      </div>

      <div>
        <v-dialog
            v-model="showUtilityMessage"
            width="35vw"
            persistent
        >
          <template v-slot:activator="{on, attrs}">

          </template>

          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              {{ utilityMessage }}
            </v-card-title><br/>

            <v-card-text>
              {{ messageContent }}
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="primary"
                  @click="showUtilityMessage = false"
              >
                Cerrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

    </div>
  </div>
</template>

<script>
import General from "../../layouts/general";
import AdminModule_bar from "../../components/navigationBars/adminModule_bar";
import {validateUser} from "../../util/utilities";
import router from "../../router";
import {addGroup, dropGroup, getGroups, validateGroup} from "../../util/groups";
export default {
  name: "AdminGroups",
  components: {AdminModule_bar, General},

  data: () => ({
    groups: null,

    showNewGroup: false,
    promote: false,
    showUtilityMessage: false,
    confirmDelete: false,

    grade: '',
    group: '',

    utilityMessage: '',
    messageContent: '',
  }),

  methods:{
    async saveGroup(){

      if (validateGroup(this.groups, `${this.grade}${this.group}`)){
        this.utilityMessage = 'Error al crear el grupo';
        this.messageContent = 'El grupo ya Existe';
        this.showUtilityMessage = true;
      }else{
        this.showNewGroup = false;
        await addGroup(this.grade, (this.group.toUpperCase()));
        this.groups = await getGroups();
      }
    },

    async deleteSelectedGroup(item){
      this.confirmDelete = false;

      await dropGroup(item.id);
      this.groups = await getGroups();

      this.utilityMessage = 'Grupo Borrado';
      this.messageContent = '';
      this.showUtilityMessage = true;
    },
  },

  async mounted() {
    if (validateUser(this.$store.state.user.position)){
      await router.push('/home')
    }

    this.groups = await getGroups();
    console.log(this.groups)
  }
}
</script>

<style scoped>

.adminGroups{
  width: 80%;
  margin: 1rem 0 0 10%;
}

.adminGroups__banner{
  display: flex;
}

.adminGroups__banner--title{
  font-size: 2.5rem;
}

.adminGroups__banner--btn{
  display: grid;
}

.adminGroups__banner--btn2{
  margin-top: 1rem;
}

.adminGroups__table{
  box-shadow: 0 10px 14px 0 rgba(163,163,163,.5);
}

</style>