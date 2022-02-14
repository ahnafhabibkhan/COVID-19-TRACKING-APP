<template>
  <div>
    <h1
      style="
        margin-top: 50px;
        font-size: 50px;
        text-align: center;
        color: black;
      "
    >
      {{ title }}
    </h1>
    <v-text-field style="width: 50%; margin-left: auto; margin-right: auto;" v-model="search" placeholder="Search Patients"></v-text-field>
    <v-card class="patients-list-container" outlined color="transparent">
      <v-card
        v-for="(item, UserID) in filteredPatients"
        :key="UserID"
        :title="item.title"
        class="pa-2 mx-8 my-8"
        style="display: inline-table; opacity: 95%"
        width="25%"
        height="10%"
        @click="onPatientClick()"
        ><h2 class="my-2">{{ item.FirstName }} {{ item.LastName }}</h2>
        <p>Contact:<br/> Phone: {{ item.Telephone }} <br/> Email: {{ item.Email }}</p>
      </v-card>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "ListOfPatients",

  components: {},
  props: {
    user: String,
    title: String,
  },
  data() {
    return {
      patientList: [],
      search: "",
      userRole: this.user,
    };
  },
  created() { // Call all these on page creation
    this.getPatients();
  },
  methods: {
    // Get all patients assigned to this doctor
    async getPatients() {
      console.log("getPatients called");
      try {
        if(this.userRole == "doctor"){
          const DID = this.$store.state.user.UserID;
          console.log("logged in doctor ID: "+DID);
          // Check if user with that email already exists
          const response = await axios.post(`http://localhost:5000/users`, {
            Doctor: DID,
          });
          this.patientList = response.data;
        }else{ // Health official and Immigration officer
          const response = await axios.get(`http://localhost:5000/users`);
          this.patientList = response.data;
        }
      } catch (err) {
        console.log(err);
      }
    },

    onPatientClick() {
      this.$router.push("/");
    },
  },
  computed: {
    filteredPatients: function () {
      return this.patientList.filter((patient) => {
        return (
          patient.FirstName.toLowerCase().match(this.search.toLowerCase()) ||
          patient.LastName.toLowerCase().match(this.search.toLowerCase()) ||
          patient.Email.toLowerCase().match(this.search.toLowerCase()) ||
          patient.Telephone.toLowerCase().match(this.search.toLowerCase())
        );
      });
    },
  },
};
</script>
<style>
.patients-list-container {
  margin-top: 90px;
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
