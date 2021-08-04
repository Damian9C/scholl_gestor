<template>
  <div>
    <general/>
    <div class="studentCmp">
      <return_bar url="/home"/>

      <div>
        <information :student="student"/>
        <v-btn
            to=""
            color="red"
            dark
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Nueva Incidencia
        </v-btn>
      </div>

    </div>
  </div>
</template>

<script>
import Search_bar from "../components/search_bar";
import Information from "../components/students/information";
import General from "../layouts/general";
import Return_bar from "../components/return_bar";
import {getStudents} from "../util/utilities";

export default {
  name: "student",
  components: {Return_bar, General, Information, Search_bar},
  data: () => ({
    student:{},
  }),
  methods:{
    async getData(){
      let request = await getStudents( this.$route.query.lesson );
      let data;

      request.forEach(e => {
        data = e.data()
      });

      data.students.forEach(e => {
        if ( e.id === this.$route.params.id ){
          this.student = {
            name: e.name,
            group: "1.-A",
            numControl: e.id,
            medicalCondition: e.medicalCondition,
          };
        }
      });
    }
  },
  mounted() {
    this.getData();
  }
}
</script>

<style scoped>

.studentCmp{
  width: 80%;
  margin: 0 10%;
  margin-top: 1rem;
}

</style>
