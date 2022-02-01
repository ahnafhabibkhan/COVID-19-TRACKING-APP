<template>

    <v-dialog>
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
   </v-dialog>
 
</template>
<script>
// import ProfileInfo from '@/components/Profile/ProfileInfo.vue';
export default {
  // name: "Paitient",
  // computed: {
  //   ...mapGetters("auth", ["loggedIn"]),
  //   uid() {
  //     return this.$route.params.uid;
  //   },
  // },

  // watch: {
  //   uid(val) {
  //     this.getProfileInfo(val);
  //   },
  // },

  // methods: {
  //   ...mapActions("profileInfo", ["getProfileInfo"]),
  // },

  // created() {
  //   if (!this.loggedIn) {
  //     this.$router.replace({ name: "landing" });
  //     return;
  //   }
  //   this.getProfile(this.uid);
  // },

  // components: {
  //   appProfileInfo: ProfileInfo,
  // },
};
</script>
<style>
/* .up::before {
  content: "Next";
}
::before {
  content: "Next";
} */
td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}
th {
  padding: 5px;
  font-size: 0.6rem;
}
.bg-image {
    background-image: url("../assets/CovidTrackingApp.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
