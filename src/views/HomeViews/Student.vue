<template>
  <div>
    <general/>
    <div class="studentCmp">
      <return_bar/>

      <div class="studentCmp--principal">
        <information :student="student"/>
        <v-card
            shaped
            outlined
            class="studentCmp__reports"
            elevation="12"
        >
          <div class="studentCmp__reports--title">
            <h2>
              Reportes
            </h2>
            <v-spacer/>
            <v-btn
                to=""
                color="red"
                dark
                small
            >
              <v-icon left>
                mdi-plus
              </v-icon>
              Nuevo Reporte
            </v-btn>
          </div>

          <div class="studentCmp__reports--content">
            <v-virtual-scroll
                :items="student.reports"
                :item-height="120"
                height="450px"
            >
              <template v-slot:default="{ item }">
                <v-divider/>
                <v-list-item>
                  <v-list-item-content>
                    <div class="studentCmp__reports--contentItem">
                      <div class="studentCmp__reports--contentTitle">{{item.teacher}}</div>
                      <div class="studentCmp__reports--contentDate">{{generateDate(item.date)}}</div>
                    </div><br/><br/>
                    <p class="studentCmp__reports--contentTxt">{{item.incident}}</p>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-virtual-scroll>
          </div>
        </v-card>
      </div>

    </div>
  </div>
</template>

<script>
import Search_bar from "../../components/navigationBars/search_bar";
import Information from "../../components/students/information";
import General from "../../layouts/general";
import Return_bar from "../../components/navigationBars/return_bar";
import {db} from "../../util";

export default {
  name: "student",
  components: {Return_bar, General, Information, Search_bar},
  data: () => ({
    student:{},
  }),

  methods:{
    generateDate(date){
      let dateFormat = new Date(Number(date.seconds + "000"))
      let dateConstructor = `${dateFormat.getDay()}/${dateFormat.getMonth()}/${dateFormat.getFullYear()}`

      return dateConstructor
    },

    async getData(){
      let request = await db.collection('groups')
          .where('group','==', this.$route.query.lesson).get()

      let data;
      request.forEach(e => {
        data = e.data();
      })

      data.students.forEach(e => {
        if ( e.id === this.$route.params.id ){
          this.student = {
            name: e.name,
            group: "1.-A",
            numControl: e.id,
            medicalCondition: e.medicalCondition,
            reports: e.reports,
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

.studentCmp--principal{
  display: flex;
  justify-content: space-between;
}

.studentCmp__reports{
  width: 50%;
  padding: 1rem;
}

.studentCmp__reports--title{
  display: flex;
  justify-content: space-between;
}

.studentCmp__reports--contentItem{
  display: flex;
}

.studentCmp__reports--contentTitle{
  margin-top: .5rem;
  font-size: 1.1rem;
}

.studentCmp__reports--contentDate{
  font-size: .8rem;
}

.studentCmp__reports--contentTxt{
  font-size: .95rem;
}


</style>
