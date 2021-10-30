<template>
  <v-dialog
      v-model="showUtilityMessage"
      width="350px"
      persistent
  >
    <template v-slot:activator="{on, attrs}"/>

    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        {{ utilityMessage }}
      </v-card-title><br/>

      <v-card-text>
        {{ messageContent }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            @click="closeUtilMessage"
        >
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "utilMessage",
  props: [
      'messageContent',
      'utilityMessage',
      'showUtilityMessage',
  ],

  methods:{
    closeUtilMessage(){
      this.$emit('closeUtilMessage', false);
    },
  }
}
</script>

<style scoped>

</style>
