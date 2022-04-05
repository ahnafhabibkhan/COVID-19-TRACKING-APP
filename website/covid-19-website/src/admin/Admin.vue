<template>
  <div class="admin">
    <v-dialog v-model="signUp_modal" width="500px">
      <SignUpDialog />
    </v-dialog>
    <v-row justify="center">
      <v-col cols="12" md="7">
        <div class="my-6 mx-3">
          <v-btn
            class="white--text"
            
            color="blue lighten-2"
           block
            height="75px"
            @click="onDashboardClick()"
            >Dashboard</v-btn
          >
        </div>
        <div class="my-6 mx-3">
          <v-btn
            class="white--text"
            
            color="blue lighten-2"
           block
            height="75px"
            @click="onPatientsClick()"
            >List Of Patients</v-btn
          >
        </div>
        <div class="my-6 mx-3">
          <v-btn
            class="white--text"
            
            color="blue lighten-2"
           block
            height="75px"
            @click="onPatientsClick()"
            >List Of Doctors</v-btn
          >
        </div>
        <div class="my-6 mx-3">
          <v-btn
            class="white--text"
            
            color="blue lighten-2"
           block
            height="75px"
            @click="onPatientsClick()"
            >List Of Health Officials</v-btn
          >
        </div>
        <div class="my-6 mx-3">
          <v-btn
            class="white--text"
            
            color="blue lighten-2"
           block
            height="75px"
            @click="onPatientsClick()"
            >List Of Immigration Officials</v-btn
          >
        </div>
        <div class="my-6 mx-3">
          <v-btn
            class="white--text"
            
            color="blue lighten-2"
           block
            height="75px"
            @click="signUp_modal = !signUp_modal"
            >Create an Account</v-btn
          >
        </div>
      </v-col>
    </v-row>
   
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
    onDashboardClick() {
      this.$router.push("/admin-dashboard");
    },
  },
  mounted() {
    this.$emit("img", "admin");
  },
};
</script>
