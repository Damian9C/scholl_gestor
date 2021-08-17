<template>
  <div>
    <div
        id="card__item"
        class="card__item"
        @click="$router.push({
          path:`/AdminModule`
        })"
    >
      <div>
        <div class="card__item--title Roboto-Bold">Modulo Administrativo</div><br/>
      </div>

      <img src="../../static/Imagen1.png" class="card__item--img"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "admin_item",
}
</script>

<style scoped>

.card__item{
  background-color: #0974d9;
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

.card__item--img{
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