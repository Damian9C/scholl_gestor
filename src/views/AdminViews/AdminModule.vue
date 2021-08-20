<template>
  <div>
    <general/>

    <admin-module_bar class="adminModule__bar"/>

    <div class="container__body Roboto-Black">
      <div
          class="adminModule__target"
          @click="$router.push({
            path:`/AdminModule/AdminStaff`,
          })"
      >
        Personal
        <img src="../../static/people.png" class="adminModule__target--img"/></div>
      <div
          class="adminModule__target"
          @click="$router.push({
            path:`/AdminModule/AdminGroups`,
          })"
      >
        Grupos
        <img src="../../static/aula.png" class="adminModule__target--img"/></div>
    </div>
  </div>
</template>

<script>
import General from "../../layouts/general";
import AdminModule_bar from "../../components/navigationBars/adminModule_bar";
import {validateUser} from "../../util/utilities";
import router from "../../router";
export default {
  name: "AdminModule",
  components: {AdminModule_bar, General},

  mounted() {
    if (validateUser(this.$store.state.user.position)){
      router.push('/home')
    }
  }
}
</script>

<style scoped>
.adminModule__bar{
  width: 80%;
  margin: 1rem 0 0 10%;
}

.container__body{
  width: 60%;
  margin: 1rem 0 0 20%;
  display: grid;
}

.adminModule__target{
  color: rgba(255, 255, 255, .98);
  margin: 2rem;
  height: 20vh;
  padding: 3rem;

  background: #0974d9;
  color: #FFFFFF;

  font-size: 2.5rem;

  align-items: center;
  display: flex;
  justify-content: space-between;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;

  transition-property: opacity;
  transition-duration: .3s;
}

.adminModule__target--img{
  width: 100px;
}

.adminModule__target:hover{
  cursor: pointer;
  opacity: .85;
}
</style>