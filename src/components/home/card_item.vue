<template>
  <div>
    <div
        id="card__item"
        class="card__item"
        :style="cardBackgroundColor"
        @click="$router.push('/lesson/' + lesson.id)"
    >

      <div>
        <div class="card__item--title Roboto-Black">{{ lesson.matter }}</div><br/>
        <div class="card__item--txt Roboto-Medium">Grupo: {{ lesson.group }}</div>
      </div>

      <img src="../../static/arrow.png" class="card__item--img"/>


    </div>
  </div>
</template>

<script>
export default {
  name: "card_item",
  props:{
    lesson: {}
  },
  data(){
    return{
      cardBackgroundColor: {
        backgroundColor: this.lesson.color
      },

    }
  },
  mounted() {

  }
}
</script>

<style scoped>

.card__item{
  width: 98%;
  height: 16vh;
  display: flex;
  justify-content: space-between;
  align-content: center;

  margin: 1%;
  padding: 4%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  transition-property: opacity;
  transition-duration: .3s;
}

.card__item:hover{
  cursor: pointer;
  opacity: .85;
}

.card__item--title{
  font-size: 2.5rem;
  color: rgba(255, 255, 255, .98);
  margin-bottom: 0;
  line-height: 1em;
}

.card__item--txt{
  line-height: 0;
  color: rgba(255, 255, 255, 0.98);
  margin-top: 0;
}

.card__item--img{
  mix-blend-mode: overlay;
  margin-right: 0;
}

@media screen and (max-width: 900px) {
  .card__item{
    padding: 2%;
    height: 13vh;
  }

  .card__item--title{
    font-size: 2rem;
  }
}


@media screen and (max-width: 500px) {
  .card__item{
    padding: 4%;
  }

  .card__item--title{
    font-size: 1.5rem;
  }
}


</style>