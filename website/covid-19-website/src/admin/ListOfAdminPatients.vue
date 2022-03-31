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
};
</script>

<style>
.admin-patients-list {
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
