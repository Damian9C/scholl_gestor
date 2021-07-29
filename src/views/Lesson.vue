<template>
  <div>
    <general/>
    <div class="container__body">
      <return_bar url="/home"/>

      <div class="container__body--first">

        <div>
          <div class="container__body--tittle Roboto-Bold">
            {{ this.$route.query.lesson }}
          </div>
          <div class="container__body--group Roboto-Medium">
            {{ allDataLesson.technicalName }}
          </div>
        </div>

        <div class="btn">
          <v-btn
              class="btn--unique"
              color="#28ad2c"
              dark
          >
            Cargar
            <v-icon right> mdi-upload</v-icon>
          </v-btn>
          <br/>
          <v-btn
              class="btn--unique"
              color="#209fe3"
              dark
          >
            Descargar
            <v-icon right> mdi-download </v-icon>
          </v-btn>

        </div>
      </div>

      <br/>
      <table_component :students="lesson"/>
    </div>
  </div>
</template>

<script>
import Table_component from "../components/lesson/table_component";
import General from "../layouts/general";
import Return_bar from "../components/return_bar";
import {db} from "../util";
export default {
  name: "lesson",
  components: {Return_bar, General, Table_component},

  data:() => ({
    lesson: [],
    allDataLesson: {},
  }),

  methods: {

    async getDataClass() {
      let matter = this.$route.query.lesson;
      let data = await db.collection('groups').where('group','==', this.$route.params.id).get();

      data.forEach(e => {
        this.allDataLesson = e.data();
      });

      this.allDataLesson.students.forEach(e => {
        e.lessons.forEach(element => {
          if (element.lesson === matter){
            this.lesson.push({
              id: e.id,
              name: e.name,
              p1: element.partial1,
              p2: element.partial2,
              p3: element.partial3,
            })
          }
        })
      });
    }
  },

  mounted() {
    this.getDataClass();
  }
}
</script>

<style scoped>

.container__body--first{
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.container__body{
  width: 80%;
  margin: 1rem 0 0 10%;
}

.container__body--tittle{
  font-size: 2.5rem;
}

.btn--unique{
  margin-top: -10px;
}

.btn{
  display: grid;
  grid-template-columns: 100%;
}

@media screen and (max-width: 900px) {

}

</style>