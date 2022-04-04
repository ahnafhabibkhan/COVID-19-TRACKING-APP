<template>
  <div >
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  name: "PatientLayout",

  components: {},

  data: () => ({
    //
  }),
};
</script>
<style>
.patient-layout {
  background-image: url("../assets/Patient.png");
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100%;
  min-width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
</style>