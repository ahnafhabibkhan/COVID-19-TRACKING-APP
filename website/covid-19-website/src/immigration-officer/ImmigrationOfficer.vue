<template>
  <div class="immigration-officer">
      <ListOfPatients user="immigration-officer" title="List of Patients"/>
  </div>
</template>

<script>
import ListOfPatients from '../components/ListOfPatients.vue'
export default {
  name: "ImmigrationOfficer",

  components: {ListOfPatients},

};
</script>

<style>
.immigration-officer {
  background-image: url("../assets/io.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100%;
  min-width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}

</style>
