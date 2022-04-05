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
            :content="newCount"
            :value="newCount"
            overlap
          >
            <v-icon large color="blue darken-3" v-bind="attrs" v-on="on"
              >mdi-email</v-icon
            >
          </v-badge>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, i) in notifs"
            :key="i"
            @mousemove="update(item)"
          >
            <v-list-item-title
              >{{ item.Message }}
              <span
                style="font-size: 10px"
                class="error--text"
                v-if="item.Read == 0"
                >(new)</span
              >
            </v-list-item-title>
            <v-list-item-action>
              <v-btn icon small color="redpull" @click="del(item.ID)">
                <v-icon> mdi-close </v-icon>
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
    <v-main
      class=" bg-img"
      :class="img"
    >
      <v-container>
        <router-view @img="img = $event"></router-view>
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
    img: null,
    notifs: [],
    pending: false,
  }),
  methods: {
    logout() {
      alert("you will be log out");
    },
    // get notifs
    async getNotifs() {
      try {
        const res = await axios.post(`http://localhost:5000/notifications`, {
          Recipient: this.userId,
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
    async del(id) {
      try {
        await axios.post(`http://localhost:5000/deletenotifications`, {
          ID: id,
        });
        //delete imiidate notifications
        const i = this.notifs.findIndex((item) => {
          return item.ID == id;
        });
        this.notifs.splice(i, 1);
      } catch (err) {
        console.log(err);
      }
    },
    async update(item) {
      if (item.Read === 1) {
        return;
      }
      if (this.pending) {
        return;
      }
      this.pending = true;
      try {
        await axios.put(`http://localhost:5000/notification/${item.ID}`, {
          ID: item.ID,
          Read: 1,
        });

        const i = this.notifs.findIndex((item) => {
          return item.ID == item.ID;
        });
        this.notifs[i].Read = 1;
      } catch (err) {
        console.log(err);
      }
      this.pending = false;
    },
  },
  computed: {
    userId() {
      // return 3;
      return this.$store.state.user.UserID;
    },
    newCount() {
      return this.notifs.filter((item) => {
        return item.Read == 0;
      }).length;
    },
    background() {
      return `../assets/${this.img}`;
    },
  },
  mounted() {
    this.getNotifs();
    // setInterval(() => {
    //   this.getNotifs();
    // }, 5000);
  },
};
</script>

<style>
.bg-img {
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100%;
  min-width: 100%;
}
.patient{
  background-image: url('../assets/Patient.png');
}
.doctor{
  background-image: url('../assets/docimage.png');
}
.healthOfficial{
  background-image: url('../assets/HealthOfficial1.png');
}
.officer{
  background-image: url('../assets/io1.png');
}
.admin{
  background-image: url('../assets/Admin1.png');
}
.profile{
  background-image: url('../assets/profilepage.png');
}
</style>