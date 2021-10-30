<template>
  <div>
    <v-dialog
        v-model="showStudentComponent"
        persistent
        width="600"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          <div>
            Grupo {{group.data.technicalName}}
          </div>

          <v-spacer/>

          <v-btn
              outlined
              small
              color="#1F9FE3"
              dark
              @click="showAddStudent = true"
          >
            <v-icon left>
              mdi-plus
            </v-icon>
            Nuevo Alumno
          </v-btn>
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
              @click="addNewStudent()"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <loading-bar
        :stateCmp="loading"
    />

    <util-message
        :message-content="messageContent"
        :utility-message="utilityMessage"
        :show-utility-message="showUtilityMessage"
        @closeUtilMessage="closeDialogMessage($event)"
    />
  </div>
</template>

<script>
import {updateGroup} from "../../../util/groups/groups";
import UtilMessage from "../../utility/utilMessage";
import LoadingBar from "../../loading/loadingBar";

export default {
  name: "studentPanel",
  components: {LoadingBar, UtilMessage},
  props: [
      'group',
      'showStudentComponent'
  ],

  data: () => ({
    showAddStudent: false,

    messageContent: '',
    utilityMessage: '',
    showUtilityMessage: false,

    loading: false,

    numControl: '',
    name: '',

    rules: {
      required: value => !!value || 'Obligatorio'
    },
  }),

  methods:{
    async addNewStudent(){

      this.loading = true;

      this.group.data.students.push({
        id: this.numControl,
        lessons: [],
        medicalCondition: [],
        name: this.name,
        reports: [],
        intelligenceType: 'espacial',
      });

      await updateGroup(this.group);

      this.numControl = '';
      this.name = '';

      this.showAddStudent = false;
      this.loading = false;

      this.showDialogMessage('Alumno Guardado', '');
    },

    showDialogMessage( title , content ){
      this.utilityMessage = title;
      this.messageContent = content;
      this.showUtilityMessage = true;
    },

    closeDialogMessage(event){
      this.showUtilityMessage = event
    },

    closeCmp(){
      this.$emit('showStudent', false)
    },
  },
}
</script>

<style scoped>

</style>
