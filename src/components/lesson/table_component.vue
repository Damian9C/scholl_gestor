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
          @click="$router.push(`/student/${item.id}`)"
          class="table__item"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.p1 }}</td>
        <td>{{ item.p2 }}</td>
        <td>{{ item.p3 }}</td>
      </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: "table_component",
  props: ['students'],
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
