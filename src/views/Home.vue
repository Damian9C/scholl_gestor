<template>
  <div>
    <general/>

    <div class="container__body">
      <search_bar/>

      <div class="container__body--cards">

        <div v-for="lesson in lessons">
          <card_item :lesson="lesson"/>
        </div>

        {{ this.$store.state.user }}

      </div>
    </div>

  </div>
</template>

<script>
  import General from "../layouts/general";
  import Card_item from "../components/home/card_item";
  import Search_bar from "../components/search_bar";
  import { db } from "../util";

  export default {
    name: 'Home',
    components: {
      Search_bar,
      Card_item,
      General,
    },

    data(){
      return{
        lessons: []
      }
    },
    async mounted() {
      let data = await db.collection('staff').where( 'email', '==', 'carlos_dami12@live.com' ).get();

      data.forEach(request => {
        this.lessons = request.data().lessons
      });
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
