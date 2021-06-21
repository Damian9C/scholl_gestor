<template>
  <div>
    <h1 class="Roboto-Bold">Nombre:</h1>
    <p class="info__txt Roboto-Regular"> {{student.name}} {{ student.lastNameA }} {{ student.lastNameB }} </p>

    <h1 class="Roboto-Bold">Grupo:</h1>
    <p class="info__txt Roboto-Regular"> {{ student.group }}</p>

    <h1 class="Roboto-Bold">Numero de Control:</h1>
    <p class="info__txt Roboto-Regular"> {{student .numControl}} </p>

    <h1 class="Roboto-Bold">Padecimientos Medicos:</h1>

    <div class="info__MC">
      <v-chip
          v-for="tag in student.medicalCondition"
          :key="tag"
          class="md-5"
          outlined
          color="blue"
      >
        <strong>{{ tag }}</strong>
      </v-chip>
    </div>

  </div>
</template>

<script>
export default {
  name: "information",
  props:['student']
}
</script>

<style scoped>

.info__txt{
  font-size: 1.5rem;
}

.info__MC{
  width: 50%;
  margin-right: 0;
  padding-right: 0;
}

.md-5{
  margin: 5px 10px 5px 0;
}

</style>