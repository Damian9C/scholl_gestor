<template>
  <div>
    <v-dialog
        v-model="showEditStudent"
        width="350px"
        persistent
    >
      <template v-slot:activator="{on, attrs}"/>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Editar Alumno
        </v-card-title><br/>

        <v-card-text>
          <v-text-field
              label="Nombre"
              v-model="student.name"
              :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
              label="Numero de Control"
              v-model="student.id"
              :rules="[rules.required]"
          ></v-text-field>
          <v-select
              :items="typeIntelligence"
              label="Tipo de Inteligencia"
              v-model="student.intelligenceType"
              :rules="[rules.required]"
          ></v-select>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="red"
              text
              @click="closeModal()"
          >
            Cancelar
          </v-btn>
          <v-btn
              dark
              color="#51B4E9"
              @click="updateStudentData()"
          >
            Actualizar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <loading-bar
        :state-cmp="loading"
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
import LoadingBar from "../../loading/loadingBar";
import utilMessage from "../../utility/utilMessage";

export default {
  name: "editStudent",
  components: {LoadingBar, utilMessage},
  props: [
      'group',
      'student',
      'showEditStudent'
  ],

  data:() => ({
    loading: false,
    showUtilityMessage: false,

    utilityMessage: '',
    messageContent: '',

    typeIntelligence: [
      'Lógico-matemática',
      'Lingüística',
      'Espacial',
      'Musical',
      'Kinestésico-corporal',
      'Intrapersonal',
      'Interpersonal',
      'Naturalista',
    ],

    rules: {
      required: value => !!value || 'Obligatorio'
    },
  }),

  methods: {
    async updateStudentData(){
      this.loading = true;

      await updateGroup(this.group).finally(() => {
        this.loading = false;

        this.closeModal();
        this.utilityMessage = 'Alumno Editado';
        this.showUtilityMessage = true;
      })
    },

    closeDialogMessage(event){
      this.showUtilityMessage = event;
    },

    closeModal(){
      this.$emit('closeEditStudent', false);
    },
  },

}
</script>

<style scoped>

</style>
