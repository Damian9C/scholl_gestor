<template>
  <div class="staffTable">
    <v-simple-table>
      <thead>
      <tr>
        <th class="text-left">
          Nombre
        </th>
        <th class="text-left">
          Email
        </th>
        <th class="text-left">
          Id
        </th>
        <th class="text-left">
          Cargo
        </th>
        <th class="text-left">
          Opciones
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="item in staff"
          :key="item.name"
          class="staffTable__item"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.id }}</td>
        <td>{{ item.position }}</td>
        <td>
          <v-btn
              small
              outlined
          >
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn
              small
              outlined
          >
            <v-icon>
              mdi-trash-can
            </v-icon>
          </v-btn>
        </td>
      </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: "staffTable",
  props:['staff'],
}
</script>

<style scoped>
.staffTable{
  box-shadow: 0 10px 14px 0 rgba(163,163,163,.5);
}

</style>