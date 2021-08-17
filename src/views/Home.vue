<template>
  <div>
    <general/>

    <div class="container__body">
      <search_bar/>

      <div class="container__body--cards">

        <div v-for="lesson in lessons">
          <card_item :lesson="lesson"/>
        </div>
        <admin_item v-if="position === 'admin'"/>

      </div>
    </div>
  </div>
</template>

<script>
  import General from "../layouts/general";
  import Card_item from "../components/home/card_item";
  import Search_bar from "../components/search_bar";
  import Admin_item from "../components/home/admin_item";

  export default {
    name: 'Home',
    components: {
      Admin_item,
      Search_bar,
      Card_item,
      General,
    },

    data: () => ({
      lessons: [],
      position: null,
    }),

    methods:{
      getLessons (){
        this.lessons = this.$store.state.user.lessons
      }
    },

    async mounted() {
      this.getLessons();
      this.position = this.$store.state.user.position
    }
  }
</script>

<style scoped>

.container__body{
  width: 80%;
  margin: 1rem 0 0 10%;
}

.container__body--cards{
  display: grid;
  grid-template-columns: 50% 50%;
  justify-content: space-between;
}

@media screen and (max-width: 900px) {
  .container__body--cards{
    grid-template-columns: 100%;
  }
}

</style>
