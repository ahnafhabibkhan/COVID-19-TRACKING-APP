<template>
  <v-row justify="center">
    <v-dialog v-model="signUp_modal" width="500px">
      <SignUpDialog />
    </v-dialog>
    <v-col cols="12" md="7">
      <div class="my-6 mx-3">
        <v-btn
          dark
          color="blue lighten-2"
          block
          height="75px"
          @click="onDashboardClick()"
          >Dashboard</v-btn
        >
      </div>
      <div class="my-6 mx-3">
        <v-btn
          dark
          color="blue lighten-2"
          block
          height="75px"
          @click="onPatientsClick()"
          >List Of Users</v-btn
        >
      </div>
      <div class="my-6 mx-3">
        <v-btn
          dark
          color="blue lighten-2"
          block
          height="75px"
          @click="onAccountRequestsClick()"
          >Account Requests</v-btn
        >
      </div>
      <div class="my-6 mx-3">
        <v-btn
          dark
          color="blue lighten-2"
          block
          height="75px"
          @click="signUp_modal = !signUp_modal"
          >Create an Account</v-btn
        >
      </div>
    </v-col>
  </v-row>
</template>

<script>
import SignUpDialog from "../components/SignUpDialog.vue";
export default {
  name: "Profile",
  components: { SignUpDialog },
  data() {
    return {
      signUp_modal: false,
    };
  },
  methods: {
    onPatientsClick() {
      this.$router.push("/admin-patients-list");
    },
    onDashboardClick() {
      this.$router.push("/admin-dashboard");
    },
    onAccountRequestsClick() {
      this.$router.push("/admin-account-requests-list");
    },
  },
  mounted() {
    this.$emit("img", "admin");
  },
};
</script>
