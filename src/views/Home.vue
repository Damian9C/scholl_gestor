<template>
  <div>
    <general/>

    <div class="container__body">
      <search_bar/>

      <div class="container__body--cards">

        <div v-for="lesson in lessons">
          <card_item :lesson="lesson"/>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import General from "../layouts/general";
  import Card_item from "../components/Home/card_item";
  import Search_bar from "../components/search_bar";

  export default {
    name: 'Home',
    components: {
      Search_bar,
      Card_item,
      General,
    },

    data(){
      return{
        lessons: [
          {
            id: '1a',
            matter: 'Matematicas',
            group: '1.-A',
            color: '#3498DB',
          },
          {
            id: '2b',
            matter: 'Historia',
            group: '2.-B',
            color: '#FF6C1A'
          },
          {
            id: '3c',
            matter: 'Geografia',
            group: '3.-C',
            color: '#9A39C8'
          },
          {
            id: '2b',
            matter: 'Literarura',
            group: '2.-B',
            color: '#20CA5A'
          },
          {
            id: '3a',
            matter: 'Filosofia',
            group: '3.-A',
            color: '#D52645'
          },
          {
            id: '3b',
            matter: 'Algebra',
            group: '3.-B',
            color: '#eb9e34'
          },
          {
            id: '3c',
            matter: "Tic's",
            group: '3.-C',
            color: '#1d968a'
          }
        ]
      }
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
