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
export default {
  name: "AdminGroups",
  components: {AdminModule_bar, General}
}
</script>

<style scoped>

.adminGroups{
  width: 80%;
  margin: 1rem 0 0 10%;
}

</style>