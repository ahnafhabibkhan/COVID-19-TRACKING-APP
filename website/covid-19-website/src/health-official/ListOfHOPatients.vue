<template>
  <div class="health-off-patients-list">
      <ListOfPatients user="health-official" title="List of Patients"/>
  </div>
</template>

<script>
import ListOfPatients from '../components/ListOfPatients.vue'
export default {
  name: "HealthOfficialListOfPatients",

  components: {ListOfPatients},

};
</script>

<style>

</style>