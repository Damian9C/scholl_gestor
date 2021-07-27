<template>
  <div class="table">
    <v-simple-table>
      <thead>
      <tr>
        <th class="text-left">
          Nombre
        </th>
        <th class="text-left">
          Parcial 1
        </th>
        <th class="text-left">
          Parcial 2
        </th>
        <th class="text-left">
          Parcial 3
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="item in students"
          :key="item.name"
          @click="$router.push(`/student/${item.il}`)"
          class="table__item"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.p1 }}</td>
        <td>{{ item.p1 }}</td>
        <td>{{ item.p1 }}</td>
      </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: "table_component",
  data(){
    return{
      students: [
        {
          il: 'a1',
          name: 'Carlos Manuel Guisado',
          p1: 10
        },
        {
          il: 'a2',
          name: 'Juan-Carlos Soriano',
          p1: 9
        },
        {
          id: 'a3',
          name: 'Maria Jose Giron',
          p1: 8
        },
        {
          id: 'a4',
          name: 'Maria Angela Quero',
          p1: 7
        },
        {
          id: 'a5',
          name: 'Pablo Jose Pedraza',
          p1: 6
        },
        {
          id: 'a6',
          name: 'Maria-Ines Arribas',
          p1: 5
        },
        {
          id: 'a7',
          name: 'Miguel Angel Lora',
          p1: 4
        }
      ]
    }
  }
}
</script>

<style scoped>

.table{
  box-shadow: 0px 10px 14px 0px rgba(163,163,163,.5);
}

.table__item :hover{
  cursor: pointer;
}

</style>
