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
                  @click="selectedGroup = item; showAddStudent = true"
                  color="#009127"
              >
                <v-icon>
                  mdi-account-plus-outline
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
            Grupo {{titleGroup}}

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
                          showEditTeacher = true;
                          matter = item.matter;"
                        color="#edae00"
                    >
                      <v-icon>
                        mdi-pencil-outline
                      </v-icon>
                    </v-btn>

                    <v-btn
                        outlined
                        color="red"
                        small
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
          v-model="showAddStudent"
          width="35vw"
          persistent
      >
        <template v-slot:activator="{on, attrs}"/>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Nuevo Alumno
          </v-card-title><br/>

          <v-card-text>
            <v-text-field
                label="Nombre"
                v-model="name"
                :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
                label="Numero de Control"
                v-model="numControl"
                :rules="[rules.required]"
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="red"
                text
                @click="showAddStudent = false"
            >
              Cancelar
            </v-btn>
            <v-btn
                dark
                color="#51B4E9"
                @click="addNewStudent(selectedGroup)"
            >
              Guardar
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
                v-model="teacherSelected"
                :rules="[rules.required]"
            >
            </v-select>

            <v-text-field
                label="Materia"
                v-model="matter"
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

      <v-dialog
          v-model="showUtilityMessage"
          width="350px"
          persistent
      >
        <template v-slot:activator="{on, attrs}"/>

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
</template>

<script>
import General from "../../layouts/general";
import AdminModule_bar from "../../components/navigationBars/adminModule_bar";
import {validateUser} from "../../util/utilities";
import router from "../../router";
import {addGroup, dropGroup, getGroups, updateGroup, validateGroup} from "../../util/groups/groups";
import {getNameTeachers} from "../../util/staff";
import {addNewTeacherToGroup} from "../../util/groups/addSubjectToGroup";
export default {
  name: "AdminGroups",
  components: {AdminModule_bar, General},

  data: () => ({
    groups: null,

    showNewGroup: false,
    showPromote: false,
    showUtilityMessage: false,
    showConfirmDelete: false,
    showAddStudent: false,
    showCrudTeacher: false,
    showAddTeacher: false,
    showEditTeacher: false,

    teachers: [],
    teacherSelected: '',
    matter: '',

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
        this.showNewGroup = false;
        await addGroup(this.grade, (this.group.toUpperCase()));
        this.groups = await getGroups();
      }
    },

    async deleteSelectedGroup(item){
      this.showConfirmDelete = false;

      await dropGroup(item.id);
      this.groups = await getGroups();

      this.showDialogMessage('Grupo Borrado', '');
    },

    // FUNCIONES DE ALUMNOS

    async addNewStudent(item){
      this.showAddStudent = false;

      item.data.students.push({
        id: this.numControl,
        lessons: [],
        medicalCondition: [],
        name: this.name,
        reports: [],
      });

      this.showDialogMessage('Alumno Guardado', '');

      this.numControl = '';
      this.name = '';

      await updateGroup(item);
    },

    // FUNCIONES DE MAESTROS

    async getTeachers(){
      this.teachers = await getNameTeachers();
    },

    async addNewTeacher(){
      if (this.matter !== '' && this.teacherSelected !== ''){
        let exist = true;

        this.selectedGroup.data.currentTeachers.forEach( item => {
          if (item.matter === this.matter) exist = false;
        })

        if (exist){
          await addNewTeacherToGroup(this.selectedGroup, this.teacherSelected, this.matter, this.teachers);

          this.showAddTeacher = false;
          this.teacherSelected = '';
          this.matter = '';
          this.showDialogMessage('Profesor Asignado', '');
        } else {
          this.teacherSelected = '';
          this.matter = '';
          this.showDialogMessage('La materia ya existe', 'Verifique el nombre de la materia');
        }

      }else {
        this.showDialogMessage('Llene todos los campos', '');
      }
    },

    // Cuadro de Dialogo

    showDialogMessage( title , content ){
      this.utilityMessage = title;
      this.messageContent = content;
      this.showUtilityMessage = true;
    },

  },

  async mounted() {
    if (validateUser(this.$store.state.user.position)){
      await router.push('/home')
    }

    this.getTeachers();

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