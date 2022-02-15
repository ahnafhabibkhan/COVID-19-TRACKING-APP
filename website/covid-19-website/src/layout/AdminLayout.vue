<template>
  <div class="admin-layout">
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  name: "AdminLayout",

  components: {},

  data: () => ({
    //
  }),
};
</script>
<style>
.admin-layout {
  background-image: url("../assets/Admin.png");
  min-height: 100%;
  min-width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
</style>