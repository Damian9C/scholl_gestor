<template>
  <div>
    <general/>
    <div class="studentCmp">
      <return_bar url="/home"/>

      <search_bar/>

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
export default {
  name: "student",
  components: {Return_bar, General, Information, Search_bar},
  data: () => ({
    student:{
      name: "Carlos Damian",
      lastNameA: "Chavez",
      lastNameB: "Gonzalez",
      group: "1.-A",
      numControl: "AAAAAAAAAA",
      medicalCondition:[ 'Alergias', 'Asma', 'Diabetes', 'Alergias', 'Asma', 'Diabetes', 'Alergias' ]
    },
  }),
  methods:{

  },
  mounted() {

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
