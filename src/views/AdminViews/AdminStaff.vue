<template>
  <div>
    <general/>

    <div class="adminStaff">
      <admin-module_bar/>
      <h1 class="adminStaff__title Roboto-Black">
        Personal
      </h1>
      <br/>

      <staff-table :staff="staff"/>

    </div>
  </div>
</template>

<script>
import General from "../../layouts/general";
import AdminModule_bar from "../../components/navigationBars/adminModule_bar";
import {getAllStaff} from "../../util/staff";
import StaffTable from "../../components/adminCmp/staffTable";
export default {
  name: "AdminStaff",
  components: {StaffTable, AdminModule_bar, General},
  data: () => ({
    staff: [],
  }),

  methods:{
    async getStaff(){
      let data = await getAllStaff();

      data.forEach(e => {
        this.staff.push(e.data())
      });
      console.log(this.staff)

    },

  },

  mounted() {
    this.getStaff();
  }
}
</script>

<style scoped>

.adminStaff{
  width: 80%;
  margin: 1rem 0 0 10%;
}

.adminStaff__title{
  font-size: 2.5rem;
}
</style>