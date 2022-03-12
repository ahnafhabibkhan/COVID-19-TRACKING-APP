<template>
  <div class="health-layout">
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  name: "HealthOfficialLayout",

  components: {},

  data: () => ({
    //
  }),
};
</script>
<style>
.health-layout {
  background-image: url("../assets/HealthOfficial1.png");
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
