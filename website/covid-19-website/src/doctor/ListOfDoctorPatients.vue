<template>
  <div class="doctor-patients-list">
    <ListOfPatients user="doctor" title="List of Patients" />
  </div>
</template>

<script>
import ListOfPatients from "../components/ListOfPatients.vue";
export default {
  name: "DoctorListOfPatients",

  components: { ListOfPatients },
  mounted() {
    this.$emit("img", "doctor");
  },
};
</script>
