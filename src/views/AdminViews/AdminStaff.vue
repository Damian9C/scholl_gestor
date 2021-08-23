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

      <div class="staffTable">
        <v-simple-table>
          <thead>
          <tr>
            <th class="text-left">
              Nombre
            </th>
            <th class="text-left">
              Email
            </th>
            <th class="text-left">
              Id
            </th>
            <th class="text-left">
              Cargo
            </th>
            <th class="text-left">
              Opciones
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="item in staff"
              :key="item.name"
              class="staffTable__item"
          >
            <td>{{ item.data.name }}</td>
            <td>{{ item.data.email }}</td>
            <td>{{ item.data.id }}</td>
            <td>{{ positionText(item.data.position) }}</td>
            <td>
              <v-btn
                  small
                  outlined
                  @click="showWindow(item)"
                  color="#edae00"
              >
                <v-icon>
                  mdi-pencil-outline
                </v-icon>
              </v-btn>

              <v-btn
                  small
                  outlined
                  @click="restartPass(item.data.email)"
                  color="#2181ff"
              >
                <v-icon>
                  mdi-lock-reset
                </v-icon>
              </v-btn>

              <v-btn
                  small
                  outlined
                  @click="dropUser(item.id)"
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

      <div class="adminStaff--banner">
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

      <div class="adminStaff--banner">
        <v-dialog
            v-model="showEditStaff"
            width="35vw"
            persistent
        >
          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              Editar
            </v-card-title><br/>

            <v-card-text>
              <v-text-field
                  label="Nombre"
                  v-model="selectedUser.data.name"
                  :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                  label="Email"
                  v-model="selectedUser.data.email"
                  :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                  label="Id"
                  v-model="selectedUser.data.id"
                  :rules="[rules.required]"
              ></v-text-field>

              <v-select
                  :items="positions"
                  label="Cargo"
                  v-model="selectedUser.data.position"
                  :rules="[rules.required]"
              ></v-select>

            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="red"
                  text
                  @click="showEditStaff = false"
              >
                Cancelar
              </v-btn>
              <v-btn
                  dark
                  color="#51B4E9"
                  @click="updateUser()"
              >
                Actualizar
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
import {deleteSelectedUser, getAllStaff, newStaff, sendMailRecovery, updateSelectedUser} from "../../util/staff";
import {validateUser} from "../../util/utilities";
import router from "../../router";
export default {
  name: "AdminStaff",
  components: {AdminModule_bar, General},
  data: () => ({
    staff: [],
    selectedUser: {
      id: '',
      data:{
        name: '',
        email: '',
        user: '',
        position: '',
      }
    },

    showAddStaff: false,
    showUtilityMessage: false,
    showEditStaff: false,

    utilityMessage: '',
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
    restartPass(mail){
      this.utilityMessage = 'Correo para restablecer contraseña enviado';
      this.showUtilityMessage = true;

      sendMailRecovery(mail);
    },

    showWindow(item){
      this.selectedUser = item;
      this.showEditStaff = true;
    },

    async getStaff(){
      this.staff = []
      let data = await getAllStaff();

      data.forEach(e => {
        this.staff.push({
          data: e.data(),
          id: e.id,
        })
      });
    },

    async saveNewUser(){
      this.showAddStaff = false;

      this.utilityMessage = 'Usuario Creado';
      this.showUtilityMessage = true;

      if (this.name !== '' && this.email !== '' && this.userId !== '' && this.positionUser !== '' && this.password !== ''){
        let position = 'teacher';
        if (this.positionUser === 'Administrador'){
          position = 'admin';
        }

        let member = {
          email: this.email,
          name: this.name,
          id: this.userId,
          position: position,
          lessons: [],
        };

        await newStaff(member, this.password);

        await this.getStaff()

      }else{
        alert('LLene los campos para continuar');
      }
    },

    async updateUser(){
      this.showEditStaff = false;
      await updateSelectedUser(this.selectedUser);

      await this.getStaff();

      this.utilityMessage = 'Datos Guardados'
      this.showUtilityMessage = true
    },

    async dropUser(user){
      await deleteSelectedUser(user);
      await this.getStaff();

      this.utilityMessage = 'Borrado Exitoso'
      this.showUtilityMessage = true
    },

    positionText(position){
      if (position === "admin"){
        return 'Administrador'
      }else {
        return 'Docente'
      }
    },
  },

  async mounted() {
    await this.getStaff();
    if (validateUser(this.$store.state.user.position)){
      router.push('/home')
    }
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

.staffTable{
  box-shadow: 0 10px 14px 0 rgba(163,163,163,.5);
}
</style>