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
      <v-badge class="mx-6" color="red" content="7" overlap>
        <v-icon large color="blue darken-3">mdi-email</v-icon>
      </v-badge>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on" large color="blue darken-3"
            >mdi-account</v-icon
          >
        </template>
        <v-list>
          <v-list-item to="/profile">
            <v-list-item-title>profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>logOut</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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

  data: () => ({}),
  methods: {
    logout() {
      alert("you will be log out");
    },
  },
};
</script>