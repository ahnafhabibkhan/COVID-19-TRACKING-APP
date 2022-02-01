<template>
  <v-app>
  <div id="app">
    <router-view></router-view>
  </div>
  </v-app>
</template>

<script>
//import Doctor from "./doctor/Doctor"
import login from "./login/Login.vue"
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
