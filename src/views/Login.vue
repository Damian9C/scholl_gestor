<template>
  <div class="container">
    <div class="login">
      <div class="login__left">
        <p class="login__left--title Roboto-Black">Bienvenidos</p>

        <br/>

        <v-text-field
            v-model="user"
            label="Usuario"
            outlined
            :rules="[rules.required]"
            append-icon="mdi-account"
            re
        ></v-text-field>
        <v-text-field
            v-model="password"
            outlined
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Contraseña"
            @click:append="show1 = !show1"
        ></v-text-field>

        <br/>

        <v-btn
            block
            color="primary"
            elevation="2"
            x-large
            @click="logIn"
        >Acceder</v-btn>

      </div>

      <div class="login__right">
        <div class="login__right--img"/>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "../util";
import {mapActions} from "vuex";

export default {
  name: "Login",
  data:() => ({
    show1: false,
    rules: {
      required: value => !!value || 'Obligatorio'
    },

    password: '',
    user: '',
  }),

  methods:{

    async logIn () {
      try {
        if (this.user && this.password){
          await this.getUserActive();
          auth.signInWithEmailAndPassword(this.user, this.password).then(r => {
            this.$router.push('/home');
          })
        }else{
          this.error = 'Todos los campos son requeridos';
        }
      }catch (e) {
        alert(e)
      }
    },

    ...mapActions(['setUserData']),

    async getUserActive (){
      let data = await db.collection('staff').get();

      data.forEach(item => {
        if (this.user === item.data().email ){
          this.setUserData(item.data())
        }
      });
    },
  },

}
</script>

<style>

.container{
  display: flex;
  justify-content: center;
  margin-top: 8%;
}

.login{
  display: flex;
  justify-content: center;
  width: 55%;
  max-height: 50%;
  background: #FFFFFF;
  box-shadow: 0px 10px 10px rgba(85, 85, 85, 0.53);
}

.login__left{
  padding: 10% 7%;
  width: 50%;
}

.login__left--title{
  text-align: center;
  font-size: 2.5rem;
  color: #393939;
}

.login__right{
  width: 50%;
}

.login__right--img{
  background-image: url("../static/login.jpg");
  width: 100%;
  height: 100%;
  background-position: center;
}

@media screen and (max-width: 1200px) {
  .container{
    margin-top: 11%;
  }

  .login{
    width: 70%;
  }
}

@media screen and (max-width: 800px) {
  .container{
    margin-top: 12%;
  }

  .login{
    width: 85%;
  }
}

@media screen and (max-width: 650px) {
  .container{
    margin-top: 20%;
  }

  .login{
    width: 90%;
  }

  .login__left--title{
    text-align: center;
    font-size: 2rem;
    color: #393939;
  }

  .login__left{
    width: 100%;
  }

  .login__right{
    width: 0%;
  }
}

@media screen and (max-width: 500px) {
  .container{
    margin-top: 30%;
  }
}

</style>