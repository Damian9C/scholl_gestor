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
                :items="items"
                :item-height="60"
                height="450px"
            >
              <template v-slot:default="{ item }">
                <v-list-item>
                  <v-list-item-avatar>
                    <v-avatar
                        :color="item.color"
                        size="56"
                        class="white--text"
                    >
                      {{ item.initials }}
                    </v-avatar>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.fullName }}</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn
                        depressed
                        small
                    >
                      View User

                      <v-icon
                          color="orange darken-4"
                          right
                      >
                        mdi-open-in-new
                      </v-icon>
                    </v-btn>
                  </v-list-item-action>
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
import Search_bar from "../components/search_bar";
import Information from "../components/students/information";
import General from "../layouts/general";
import Return_bar from "../components/return_bar";
import {db} from "../util";

export default {
  name: "student",
  components: {Return_bar, General, Information, Search_bar},
  data: () => ({
    student:{},
    colors: ['#2196F3', '#90CAF9', '#64B5F6', '#42A5F5', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', '#82B1FF', '#448AFF', '#2979FF', '#2962FF'],
    names: ['Oliver', 'Jake', 'Noah', 'James', 'Jack', 'Connor', 'Liam', 'John', 'Harry', 'Callum', 'Mason', 'Robert', 'Jacob', 'Jacob', 'Jacob', 'Michael', 'Charlie', 'Kyle', 'William', 'William', 'Thomas', 'Joe', 'Ethan', 'David', 'George', 'Reece', 'Michael', 'Richard', 'Oscar', 'Rhys', 'Alexander', 'Joseph', 'James', 'Charlie', 'James', 'Charles', 'William', 'Damian', 'Daniel', 'Thomas', 'Amelia', 'Margaret', 'Emma', 'Mary', 'Olivia', 'Samantha', 'Olivia', 'Patricia', 'Isla', 'Bethany'],
    surnames: ['Smith', 'Anderson', 'Clark', 'Wright', 'Mitchell', 'Johnson', 'Thomas', 'Rodriguez', 'Lopez', 'Perez', 'Williams', 'Jackson', 'Lewis', 'Hill', 'Roberts', 'Jones', 'White', 'Lee', 'Scott', 'Turner', 'Brown', 'Harris', 'Walker', 'Green', 'Phillips', 'Davis', 'Martin', 'Hall', 'Adams', 'Campbell', 'Miller', 'Thompson', 'Allen', 'Baker', 'Parker', 'Wilson', 'Garcia', 'Young', 'Gonzalez', 'Evans', 'Moore', 'Martinez', 'Hernandez', 'Nelson', 'Edwards', 'Taylor', 'Robinson', 'King', 'Carter', 'Collins'],
  }),

  methods:{
    genRandomIndex (length) {
      return Math.ceil(Math.random() * (length - 1))
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
          };
        }
      });
    }
  },

  computed: {
    items () {
      const namesLength = this.names.length
      const surnamesLength = this.surnames.length
      const colorsLength = this.colors.length

      return Array.from({ length: 100 }, (k, v) => {
        const name = this.names[this.genRandomIndex(namesLength)]
        const surname = this.surnames[this.genRandomIndex(surnamesLength)]

        return {
          color: this.colors[this.genRandomIndex(colorsLength)],
          fullName: `${name} ${surname}`,
          initials: `${name[0]} ${surname[0]}`,
        }
      })
    },
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


</style>
