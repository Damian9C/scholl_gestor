<template>
  <div>
    <v-dialog
        v-model="showStudentComponent"
        persistent
        width="600"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Grupo {{group.data.technicalName}}
        </v-card-title>

        <v-card-text>
          <div>
            <v-simple-table>
              <thead>
              <tr>
                <th class="text-left">
                  Alumno
                </th>
                <th class="text-left">
                  Num Control
                </th>
                <th>
                  Inteligencia
                </th>
                <th>
                  Acciones
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="item in group.data.students"
                  class="staffTable__item"
              >
                <td>{{ item.name }}</td>

                <td>{{item.id}}</td>

                <td>
                  {{item.intelligenceType}}
                </td>

                <td>
                  <v-btn
                      small
                      outlined
                      @click=""
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
              @click="closeCmp"
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
  </div>
</template>

<script>
import {updateGroup} from "../../../util/groups/groups";

export default {
  name: "studentPanel",
  props: [
      'group',
      'showStudentComponent'
  ],

  data: () => ({
    showAddStudent: false,

    numControl: '',
    name: '',

    rules: {
      required: value => !!value || 'Obligatorio'
    },
  }),

  methods:{
    async addNewStudent(item){

      this.showAddStudent = false;

      item.data.students.push({
        id: this.numControl,
        lessons: [],
        medicalCondition: [],
        name: this.name,
        reports: [],
        intelligenceType: '',
      });

      await updateGroup(item);

      this.showDialogMessage('Alumno Guardado', '');

      this.numControl = '';
      this.name = '';
    },


    closeCmp(){
      this.showStudentComponent = false;

      this.$emit('showStudentComponent', this.showStudentComponent)
    },
  },
}
</script>

<style scoped>

</style>
