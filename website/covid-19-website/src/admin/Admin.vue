<template>
  <div class="admin">
    <div class="left-side-admin">
      <v-row align="center">
        <v-col cols="12" sm="6">
          <div class="btn-container">
            <div class="my-6 mx-3">
              <v-btn
                class="white--text"
                style="font-size: 18px; opacity: 90%"
                color="blue lighten-2"
                width="400px"
                height="75px"
                >Dashboard</v-btn
              >
            </div>
            <div class="my-6 mx-3">
              <v-btn
                class="white--text"
                style="font-size: 18px; opacity: 90%"
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
                style="font-size: 18px; opacity: 90%"
                color="blue lighten-2"
                width="400px"
                height="75px"
                >List Of Doctors</v-btn
              >
            </div>
            <div class="my-6 mx-3">
              <v-btn
                class="white--text"
                style="font-size: 18px; opacity: 90%"
                color="blue lighten-2"
                width="400px"
                height="75px"
                >List Of Health Officials</v-btn
              >
            </div>
            <div class="my-6 mx-3">
              <v-btn
                class="white--text"
                style="font-size: 18px; opacity: 90%"
                color="blue lighten-2"
                width="400px"
                height="75px"
                >List Of Immigration Officials</v-btn
              >
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="right-side-admin">
      <SignUpDialog />
    </div>
  </div>
</template>

<script>
import SignUpDialog from "../components/SignUpDialog.vue";
export default {
  name: "Profile",
  components: { SignUpDialog },
  data() {},
  methods: {
    onPatientsClick() {
      this.$router.push("/admin-patients-list");
    },
  },
};
</script>

<style>
.admin {
}
.left-side-admin {
  width: 50%;
  height: 1000px;
  /* border: 5px solid red; */
  float: left;
}
.btn-container {
  /* border: 5px solid red; */
  padding-top: 25px;
  margin-top: 100px;
  margin-left: 45%;
  margin-right: auto;
  width: 58%;
  height: 40%;
}
.right-side-admin {
  margin-top: 100px;
  padding-right: 70px;
  float: right;
  height: 1000px;
  width: 50%;
}

.mx-auto {
  /* height: 65%;
  width: 85%;

  opacity: 80%; */

  /* border: 5px solid red; */
}
</style>
