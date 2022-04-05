<template>
  <div class="admin-patients-list">
    <ListOfPatients user="admin" title="List of Patients" />
  </div>
</template>

<script>
import ListOfPatients from "../components/ListOfPatients.vue";
export default {
  name: "AdminListOfPatients",

  components: { ListOfPatients },
      mounted() {
  
    this.$emit('img','admin')
  },
};
</script>


