<template>
  <v-app>
  <div id="app">
    <router-view></router-view>
  </div>
  </v-app>
</template>

<script>
import Doctor from "./doctor/Doctor"

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
