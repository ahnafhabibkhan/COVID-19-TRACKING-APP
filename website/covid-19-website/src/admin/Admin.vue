<template>
  <div class="admin">
    <v-dialog v-model="signUp_modal" width="500px">
      <SignUpDialog />
    </v-dialog>
    <div class="btn-container-admin" style="text-align: center">
      <div class="my-6 mx-3">
        <v-btn
          class="white--text"
          style="font-size: 18px;"
          color="blue lighten-2"
          width="400px"
          height="75px"
          >Dashboard</v-btn
        >
      </div>
      <div class="my-6 mx-3">
        <v-btn
          class="white--text"
          style="font-size: 18px;"
          color="blue lighten-2"
          width="400px"
          height="75px"
          @click="onPatientsClick()"
          >List Of Patients</v-btn
        >
      </div>
      <div class="my-6 mx-3">
        <v-btn
          class="white--text"
          style="font-size: 18px;"
          color="blue lighten-2"
          width="400px"
          height="75px"
          >List Of Doctors</v-btn
        >
      </div>
      <div class="my-6 mx-3">
        <v-btn
          class="white--text"
          style="font-size: 18px;"
          color="blue lighten-2"
          width="400px"
          height="75px"
          >List Of Health Officials</v-btn
        >
      </div>
      <div class="my-6 mx-3">
        <v-btn
          class="white--text"
          style="font-size: 18px;"
          color="blue lighten-2"
          width="400px"
          height="75px"
          >List Of Immigration Officials</v-btn
        >
      </div>
      <div class="my-6 mx-3">
        <v-btn
          class="white--text"
          style="font-size: 18px;"
          color="blue lighten-2"
          width="400px"
          height="75px"
          @click="signUp_modal = !signUp_modal"
          >Create an Account</v-btn
        >
      </div>
    </div>
  </div>
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
  },
};
</script>
