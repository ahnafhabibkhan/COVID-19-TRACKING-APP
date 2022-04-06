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
      <v-btn
      
        v-for="(item, i) in nav"
        :key="i"
        :title="item.title"
        text
        color="white"
        x-large
        @click="onNavClick(item.text)"
        >{{ item.text }}</v-btn
      >
    </v-app-bar>

    <v-main class="bg-img">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "AuthLayout",

  components: {},

  data: () => ({
    nav: [
      {
        icon: "info",
        text: "About",
        title: "About this demo",
        active: true,
      },
      {
        icon: "email",
        text: "Contact",
        title: "Our Contact info",
        active: true,
      },
      {
        icon: "info",
        text: "Sign In",
        title: "Click to sign in",
        active: true,
      },
      {
        icon: "info",
        text: "Sign Up",
        title: "Click to sign up",
        active: true,
      },
    ],
  }),
};
</script>

<style>
.bg-img {
  background-image: url("../assets/CovidTrackingApp.png");
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100%;
  min-width: 100%;
  /* position: fixed; */
  /* top: 0;
  left: 0; */
}
</style>