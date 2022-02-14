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
        v-for="(item, i) in filteredPatients"
        :key="i"
        :title="item.title"
        class="pa-2 mx-8 my-8"
        style="display: inline-table; opacity: 95%"
        width="25%"
        height="10%"
        @click="onPatientClick()"
        ><h2 class="my-2">{{ item.firstName }} {{ item.lastName }}</h2>
        <p>Covid: {{ item.covidStatus }} Age: {{ item.age }}</p>
        <p>Doctor assigned to patient: {{ item.assignedDoctor }}</p>
        <p>
          Traveled in the last 14 days:
          {{ item.traveledDuringLastCoupleOfDays }}
        </p>
        <p>Contact: {{ item.phoneNumber }} -- Email: {{ item.email }}</p>
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
      patientList: [
        {
          firstName: "John",
          lastName: "Doe",
          email: "john@doe.com",
          phoneNumber: "514-999-9999",
          covidStatus: true,
          age: 40,
          traveledDuringLastCoupleOfDays: false,
          assignedDoctor: "Elon Musk",
        },
        {
          firstName: "Naruto",
          lastName: "Uchiha",
          email: "naruto@uchiha.com",
          phoneNumber: "514-989-9099",
          covidStatus: false,
          age: 32,
          traveledDuringLastCoupleOfDays: true,
          assignedDoctor: "Nicolas Tesla",
        },
        {
          firstName: "Luffy",
          lastName: "Uzumaki",
          email: "luffy@uzumaki.com",
          phoneNumber: "514-599-9991",
          covidStatus: false,
          age: 19,
          traveledDuringLastCoupleOfDays: true,
          assignedDoctor: "Grisha Jaeger",
        },
        {
          firstName: "Zoro",
          lastName: "Roronoa",
          email: "zoro@roronoa.com",
          phoneNumber: "514-999-0000",
          covidStatus: true,
          age: 20,
          traveledDuringLastCoupleOfDays: true,
          assignedDoctor: "Elon Musk",
        },
        {
          firstName: "Mikasa",
          lastName: "Ackerman",
          email: "mikasa@ackerman.com",
          phoneNumber: "514-911-9239",
          covidStatus: true,
          age: 18,
          traveledDuringLastCoupleOfDays: false,
          assignedDoctor: "Tony-Tony Chopper",
        },
      ],
      search: "",
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
        console.log("$store null?: "+(this.$store == null));
        console.log("state null?: "+(this.$store.state == null));
        console.log("user null?: "+(this.user.state == null));
        let DID = this.$store.state.user.UserID;
        console.log("logged in doctor ID: "+DID);
        // Check if user with that email already exists
        this.patientList = await axios.get(`http://localhost:5000/users`,
                {
                  Doctor: DID,
                }
        );
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
          patient.firstName.toLowerCase().match(this.search.toLowerCase()) ||
          patient.lastName.toLowerCase().match(this.search.toLowerCase()) ||
          patient.email.toLowerCase().match(this.search.toLowerCase()) ||
          patient.phoneNumber.toLowerCase().match(this.search.toLowerCase())
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
