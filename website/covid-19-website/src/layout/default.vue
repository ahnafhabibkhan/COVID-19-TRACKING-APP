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
      <!-- notification dropdown -->
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-badge
            class="mx-6 white--text"
            color="red"
            dark
            :content="notifs.length"
            overlap
          >
            <v-icon large color="blue darken-3" v-bind="attrs" v-on="on"
              >mdi-email</v-icon
            >
          </v-badge>
        </template>
        <v-list>
          <v-list-item v-for="(item, i) in notifs" :key="i">
            <v-list-item-title>{{ item.Text }}</v-list-item-title>
            <v-list-item-action>
              <v-btn icon small color="redpull" @click="del(item)">
                <v-icon>
                  mdi-close
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- account dropdown -->
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
import axios from "axios";
export default {
  name: "DefaultLayout",

  components: {},

  data: () => ({
    notifs: [],
  }),
  methods: {
    logout() {
      alert("you will be log out");
    },
    // get notifs
    async getNotifs() {
      try {
        const res = await axios.post(`http://localhost:5000/notifications`, {
          PID: this.userId,
        });
        this.notifs = res.data;
        // we send recived data to store to be saved there
        // this.$store.commit('setNotifs',res.data)
        // this.$store.commit('setNotifs',['notif1','notif2'])
      } catch (err) {
        console.log(err);
      }
    },
    // delete notifs
    async del() {
      
      try {
        const res = await axios.delete(`http://localhost:5000/notifications`);
        
       console.log(res)
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    userId() {
      // return 3;
      return this.$store.state.user.UserID;
    },
  },
  mounted() {
    this.getNotifs();
  },
};
</script>