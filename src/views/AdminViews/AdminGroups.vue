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
              v-model="showPromote"
              width="35vw"
              persistent
          >
            <template v-slot:activator="{on, attrs}">
              <v-btn
                  outlined
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
                    @click="showPromote = false"
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
              Alumnos
            </th>
            <th class="text-left">
              Docentes
            </th>
            <th class="text-left">
              Generar Materias
            </th>
            <th class="text-left">

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
                  @click="selectedGroup = item; showStudent(true)"
                  color="#009127"
              >
                <v-icon>
                  mdi-account-multiple
                </v-icon>
              </v-btn>

              <v-btn
                  small
                  outlined
                  @click=""
                  color="#009127"
              >
                <v-icon>
                  mdi-folder-plus-outline
                </v-icon>
              </v-btn>
            </td>

            <td>
              <v-btn
                  small
                  outlined
                  @click="selectedGroup = item; showCrudTeacher = true; titleGroup = item.data.technicalName"
                  color="#2181ff"
              >
                <v-icon>
                  mdi-clipboard-account-outline
                </v-icon>
              </v-btn>
            </td>

            <td>
              <v-btn
                  small
                  outlined
                  @click=""
              >
                <v-icon>
                  mdi-vector-combine
                </v-icon>
              </v-btn>
            </td>

            <td>
              <v-btn
                  small
                  outlined
                  @click="selectedGroup = item; showConfirmDelete = true"
                  color="red"
              >
                <v-icon>
                  mdi-trash-can-outline
                </v-icon>
              </v-btn>
            </td>
          </tr>
          </tbody>
        </v-simple-table>
      </div>

      <studentPanel
          :group="selectedGroup"
          :showStudentComponent="showStudentComponent"
          @showStudent="showStudent($event)"
      />

      <v-dialog
          v-model="showConfirmDelete"
          width="35vw"
          persistent
      >
        <template v-slot:activator="{on, attrs}"/>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Borrar Grupo?
          </v-card-title><br/>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="red"
                text
                @click="showConfirmDelete = false"
            >
              Cancelar
            </v-btn>
            <v-btn
                dark
                color="#51B4E9"
                @click="deleteSelectedGroup(selectedGroup)"
            >
              Borrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
          v-model="showCrudTeacher"
          width="500"
          persistent
          scrollable
      >
        <template v-slot:activator="{on, attrs}"/>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Maestros del grupo {{titleGroup}}

            <v-spacer/>

            <v-dialog
                v-model="showAddTeacher"
                width="450"
            >
              <template v-slot:activator="{on, attrs}">
                <v-btn
                    outlined
                    small
                    color="#1F9FE3"
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                  <v-icon left>
                    mdi-plus
                  </v-icon>
                  Añadir Profesor
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  Añadir Profesor
                </v-card-title>
                <v-card-text><br/>

                  <v-select
                      :items="teachers"
                      item-text="name"
                      item-value="id"
                      label="Profesor"
                      v-model="teacherSelected"
                      :rules="[rules.required]"
                  >
                  </v-select>

                  <v-text-field
                      label="Materia"
                      v-model="matter"
                      :rules="[rules.required]"
                  ></v-text-field>

                  <v-select
                      :items="colorCards"
                      item-text="name"
                      item-value="id"
                      label="Color"
                      v-model="colorCard"
                      :rules="[rules.required]"
                  >
                  </v-select>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="red"
                        text
                        @click="showAddTeacher = false"
                    >
                      Cancelar
                    </v-btn>
                    <v-btn
                        dark
                        color="#51B4E9"
                        @click="addNewTeacher"
                    >
                      Guardar
                    </v-btn>
                  </v-card-actions>

                </v-card-text>
              </v-card>

            </v-dialog>
          </v-card-title><br/>

          <v-card-text>
            <div>
              <v-simple-table>
                <thead>
                <tr>
                  <th class="text-left">
                    Maestro
                  </th>
                  <th class="text-left">
                    Clase
                  </th>
                  <th class="text-left">
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="item in selectedGroup.data.currentTeachers"
                    class="staffTable__item"
                >
                  <td>{{ item.teacher }}</td>

                  <td>{{item.matter}}</td>

                  <td>
                    <v-btn
                        small
                        outlined
                        @click="teacherSelected = item.id;
                          newTeacherSelected = item.id
                          matter = item.matter;
                          newMatter = item.matter;
                          showEditTeacher = true;"
                        color="#edae00"
                    >
                      <v-icon>
                        mdi-pencil-outline
                      </v-icon>
                    </v-btn>

                  </td>
                </tr>
                </tbody>
              </v-simple-table>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                dark
                color="#51B4E9"
                @click="showCrudTeacher = false"
            >
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
          v-model="showEditTeacher"
          width="35vw"
          persistent
      >
        <template v-slot:activator="{on, attrs}"/>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Editar Maestro
          </v-card-title><br/>

          <v-card-text>
            <v-select
                :items="teachers"
                item-text="name"
                item-value="id"
                label="Profesor"
                v-model="newTeacherSelected"
                :rules="[rules.required]"
            >
            </v-select>

            <v-text-field
                label="Materia"
                v-model="newMatter"
                :rules="[rules.required]"
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="red"
                text
                @click="showEditTeacher = false"
            >
              Cancelar
            </v-btn>
            <v-btn
                dark
                color="#51B4E9"
                @click="editTeacherData(selectedGroup)"
            >
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <util-message
          :message-content="messageContent"
          :utility-message="utilityMessage"
          :show-utility-message="showUtilityMessage"
          @closeUtilMessage="closeDialogMessage($event)"
      />

      <loading-bar
          :stateCmp="loading"
      />

    </div>
  </div>
</template>

<script>
import General from "../../layouts/general";
import AdminModule_bar from "../../components/navigationBars/adminModule_bar";
import {validateUser} from "../../util/utilities";
import router from "../../router";
import {addGroup, dropGroup, getGroups, updateGroup, validateGroup} from "../../util/groups/groups";
import {getNameTeachers} from "../../util/staff";
import {addNewTeacherToGroup, modifySubjectToGroup} from "../../util/groups/addSubjectToGroup";
import LoadingBar from "../../components/loading/loadingBar";
import StudentPanel from "../../components/AdminModule/studentPanel/studentPanel";
import UtilMessage from "../../components/utility/utilMessage";
export default {
  name: "AdminGroups",
  components: {UtilMessage, StudentPanel, LoadingBar, AdminModule_bar, General},

  data: () => ({
    groups: null,

    showNewGroup: false,
    showPromote: false,
    showUtilityMessage: false,
    showConfirmDelete: false,
    showStudentComponent: false,

    showCrudTeacher: false,
    showAddTeacher: false,
    showEditTeacher: false,

    loading: false,

    teachers: [],
    teacherSelected: '',
    newTeacherSelected: '',
    matter: '',
    newMatter:'',

    titleGroup: '',

    grade: '',
    group: '',

    name: '',
    numControl: '',

    utilityMessage: '',
    messageContent: '',

    selectedGroup: {
      data:{
        currentTeachers: {
          teacher:'',
        },
      }
    },

    colorCard: '',

    colorCards: [
        'Azul',
        'Verde',
        'Naranja',
        'Morado',
        'Rosa',
    ],

    rules: {
      required: value => !!value || 'Obligatorio'
    },
  }),

  methods:{

    // FUNCIONES DE GRUPOS

    async saveGroup(){

      if (validateGroup(this.groups, `${this.grade}${this.group}`)){
        this.showDialogMessage('Error al crear el grupo', 'El grupo ya Existe');
      }else{
        this.loading = true;
        this.showNewGroup = false;
        await addGroup(this.grade, (this.group.toUpperCase()));
        this.groups = await getGroups();
        this.loading = false;

        this.showDialogMessage('Grupo Creado', '')
      }
    },

    async deleteSelectedGroup(item){
      this.loading = true;
      this.showConfirmDelete = false;

      await dropGroup(item.id);
      this.groups = await getGroups();

      this.loading = false;
      this.showDialogMessage('Grupo Borrado', '');
    },

    // FUNCIONES DE ALUMNOS

    showStudent(value){
      this.showStudentComponent = value;
    },

    // FUNCIONES DE MAESTROS

    async getTeachers(){
      this.teachers = await getNameTeachers();
    },

    async addNewTeacher(){
      if (this.matter !== '' && this.teacherSelected !== ''){
        this.loading = true;
        let exist = true;

        this.selectedGroup.data.currentTeachers.forEach( item => {
          if (item.matter === this.matter) exist = false;
        })

        if (exist){
          await addNewTeacherToGroup(this.selectedGroup, this.teacherSelected, this.matter, this.teachers, this.colorCard);

          this.showAddTeacher = false;
          this.teacherSelected = '';
          this.matter = '';
          this.showDialogMessage('Profesor Asignado', '');
        } else {
          this.teacherSelected = '';
          this.matter = '';
          this.showDialogMessage('La materia ya existe', 'Verifique el nombre de la materia');
        }

        this.loading = false;
      }else {
        this.showDialogMessage('Llene todos los campos', '');
      }
    },

    editTeacherData(data){
      if (this.newTeacherSelected !== undefined){
        this.loading = true;
        modifySubjectToGroup(
            data,
            this.teacherSelected,
            this.newTeacherSelected,
            this.matter,
            this.newMatter
        ).finally(() => {
          this.loading = false;
          this.showEditTeacher = false;
        });
      }else {
        alert('Seleccione un Maestro para continuar')
      }
    },

    // Cuadro de Dialogo

    showDialogMessage( title , content ){
      this.utilityMessage = title;
      this.messageContent = content;
      this.showUtilityMessage = true;
    },

    closeDialogMessage(event){
      this.showUtilityMessage = event
    },

  },

  async mounted() {
    if (validateUser(this.$store.state.user.position)){
      await router.push('/home')
    }

    await this.getTeachers();

    this.groups = await getGroups();
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
