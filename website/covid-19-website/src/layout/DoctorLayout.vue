<template>
  <div class="doctor-layout">
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  name: "DoctorLayout",

  components: {},

  data: () => ({
    //
  }),
};
</script>
<style>
.doctor-layout {
  background-image: url("../assets/doctorImage2.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100%;
  min-width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
</style>