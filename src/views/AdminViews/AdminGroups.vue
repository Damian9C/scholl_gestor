<template>
  <div>
    <general/>

    <div class="adminGroups">
      <admin-module_bar/>

    </div>
  </div>
</template>

<script>
import General from "../../layouts/general";
import AdminModule_bar from "../../components/navigationBars/adminModule_bar";
import {validateUser} from "../../util/utilities";
import router from "../../router";
export default {
  name: "AdminGroups",
  components: {AdminModule_bar, General},
  mounted() {
    if (validateUser(this.$store.state.user.position)){
      router.push('/home')
    }
  }
}
</script>

<style scoped>

.adminGroups{
  width: 80%;
  margin: 1rem 0 0 10%;
}

</style>