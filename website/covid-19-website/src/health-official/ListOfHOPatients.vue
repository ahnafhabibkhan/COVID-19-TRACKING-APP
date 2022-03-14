<template>
  <div class="health-off-patients-list">
    <ListOfPatients user="health-official" title="List of Patients" />
  </div>
</template>

<script>
import ListOfPatients from "../components/ListOfPatients.vue";
export default {
  name: "HealthOfficialListOfPatients",

  components: { ListOfPatients },
};
</script>

<style>
.health-off-patients-list {
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100%;
  min-width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: scroll;
}
</style>
