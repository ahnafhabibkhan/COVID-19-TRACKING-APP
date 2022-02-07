<template>
  <v-app>
    <v-app-bar
      dark
      app
      color="transparent"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <v-spacer></v-spacer>

      <v-tab>
        <v-badge class="mx-6" color="red" content="7" overlap>
          <v-icon large color="blue darken-3">mdi-email</v-icon></v-badge
        >
        <v-icon class="mx-6" large color="blue darken-3">mdi-account</v-icon>
      </v-tab>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",

  components: {},

  data: () => ({
    //
  }),
};
</script>
