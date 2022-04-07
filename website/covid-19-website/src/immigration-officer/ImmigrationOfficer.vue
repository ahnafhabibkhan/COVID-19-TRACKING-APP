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
  mounted() {
   
    this.$emit('img','officer')
  },
};
</script>


