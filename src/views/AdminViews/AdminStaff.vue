<template>
  <div>
    <general/>

    <div class="adminStaff">
      <admin-module_bar/>
      <div class="adminStaff--banner">
        <h1 class="adminStaff__title Roboto-Black">
          Personal
        </h1>
        <v-spacer/>
        <v-dialog
            v-model="showAddStaff"
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
              Añadir
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              Añadir Personal
            </v-card-title><br/>

            <v-card-text>
              <v-text-field
                  label="Nombre"
                  v-model="name"
                  :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                  label="Email"
                  v-model="email"
                  :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                  label="Id"
                  v-model="userId"
                  :rules="[rules.required]"
              ></v-text-field>

              <v-select
                  :items="positions"
                  label="Cargo"
                  v-model="positionUser"
                  :rules="[rules.required]"
              ></v-select>

              <v-text-field
                  label="Contraseña"
                  v-model="password"
                  hint="Contraseña temporal"
                  :rules="[rules.required]"
              ></v-text-field>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="red"
                  text
                  @click="showAddStaff = false"
              >
                Cancelar
              </v-btn>
              <v-btn
                  dark
                  color="#51B4E9"
                  @click="saveNewUser()"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <br/>

      <staff-table :staff="staff"/>

    </div>
  </div>
</template>

<script>
import General from "../../layouts/general";
import AdminModule_bar from "../../components/navigationBars/adminModule_bar";
import {getAllStaff, newStaff} from "../../util/staff";
import StaffTable from "../../components/adminCmp/staffTable";
import {auth, db} from "../../util";
export default {
  name: "AdminStaff",
  components: {StaffTable, AdminModule_bar, General},
  data: () => ({
    staff: [],
    showAddStaff: false,

    positions: ['Administrador','Docente'],

    name: '',
    email: '',
    userId: '',
    positionUser: '',
    password: '',

    rules: {
      required: value => !!value || 'Obligatorio'
    },
  }),

  methods:{
    async getStaff(){
      let data = await getAllStaff();

      data.forEach(e => {
        this.staff.push(e.data())
      });
    },

    async saveNewUser(){

      if (this.name !== '' && this.email !== '' && this.userId !== '' && this.positionUser !== '' && this.password !== ''){
        let position = 'teacher';

        if (this.positionUser === 'Administrador'){
          position = 'admin'
        }

        let member = {
          email: this.email,
          name: this.name,
          id: this.userId,
          position: position,
          lessons: [],
        };

        await newStaff(member);
        this.staff.push(member);

        this.showAddStaff = false;
      }else{
        alert('LLene los campos para continuar')
      }
    }
  },

  mounted() {
    this.getStaff();
  }
}
</script>

<style scoped>
.adminStaff--banner{
  display: flex;
  justify-content: space-between;
}

.adminStaff{
  width: 80%;
  margin: 1rem 0 0 10%;
}

.adminStaff__title{
  font-size: 2.5rem;
}
</style>