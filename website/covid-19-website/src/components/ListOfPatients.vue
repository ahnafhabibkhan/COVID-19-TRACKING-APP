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
    <v-text-field
      style="width: 50%; margin-left: auto; margin-right: auto"
      v-model="search"
      placeholder="Search Patients"
      filled
      rounded
      dense
      outlined
    ></v-text-field>
    <v-card
      v-if="userRole == 'immigration-officer'"
      class="patients-list-container"
      outlined
      color="transparent"
    >
      <v-card
        v-for="(item, UserID) in filteredPatients"
        :key="UserID"
        :title="item.title"
        class="pa-2 mx-8 my-8"
        style="display: inline-table"
        width="30%"
        height="10%"
        @click="onPatientClick()"
        ><h2 class="my-2">{{ item.FirstName }} {{ item.LastName }}</h2>
        <p>
          Contact:<br />
          Phone: {{ item.Telephone }} <br />
          Email: {{ item.Email }}
        </p>
      </v-card>
    </v-card>
    <v-card
      v-if="userRole == 'health-official' || userRole == 'doctor'"
      class="patients-list-container"
      outlined
      color="transparent"
    >
      <v-card
        v-for="(item, UserID) in filteredPatients"
        :key="UserID"
        :title="item.title"
        class="pa-2 mx-8 my-8"
        style="display: inline-table"
        width="350px"
        height="100px"
        @click="onPatientClick()"
        :color="item.covidStatus === 'Positive' ? '#FF4933' : 'white'"
        ><h2 class="my-2">
          {{ item.patientsList.FirstName }} {{ item.patientsList.LastName }}
        </h2>
        <p>
          Contact:<br />
          Phone: {{ item.patientsList.Telephone }} <br />
          Email: {{ item.patientsList.Email }} <br />
          Covid Status: {{ item.covidStatus }}
        </p>
      </v-card>
    </v-card>
    <v-card
      v-if="userRole == 'admin'"
      class="patients-list-container"
      outlined
      color="transparent"
    >
      <v-card
        v-for="(item, UserID) in filteredPatients"
        :key="UserID"
        :title="item.title"
        class="pa-2 mx-8 my-8"
        style="display: inline-table"
        width="350px"
        height="100px"
        @click="onPatientClick()"
        :color="item.covidStatus === 'Positive' ? '#FF4933' : 'white'"
        ><h2 class="my-2">
          {{ item.patientsList.FirstName }} {{ item.patientsList.LastName }}
        </h2>
        <p>
          Contact:<br />
          Phone: {{ item.patientsList.Telephone }} <br />
          Email: {{ item.patientsList.Email }} <br />
          Covid Status: {{ item.covidStatus }}
        </p>
        <v-btn>Delete</v-btn>
        <v-btn class="mx-3">Assign Doctor</v-btn>
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
      covidPatientsList: [],
    };
  },
  created() {
    // Call all these on page creation
    this.getPatients();
  },
  methods: {
    // Get all patients assigned to this doctor
    async getPatients() {
      console.log("getPatients called");
      try {
        // Display a different list depending on user's role
        if (this.userRole == "doctor") {
          const DID = this.$store.state.user.UserID;
          console.log("logged in doctor ID: " + DID);
          // Get users assigned to this doctor ID
          const response = await axios.post(`http://localhost:5000/users`, {
            Doctor: DID,
          });
          this.patientList = response.data;
          this.listOfCovidPatients(this.patientList);
        } else if (
          this.userRole == "health-official" ||
          this.userRole == "admin"
        ) {
          console.log("HELLOO ADMIN");
          // Get all patients
          const response = await axios.get(`http://localhost:5000/users`);
          this.patientList = response.data;
          this.listOfCovidPatients(this.patientList);
        } else if (this.userRole == "immigration-officer") {
          // Get all patients who were covid positive in their latest health status
          const response = await axios.get(
            `http://localhost:5000/usersByCovid`
          );
          var pList = response.data;
          const travelResponse = await axios.post(
            `http://localhost:5000/users`,
            { Role: "Patient", Travelled: 1 }
          );
          var travelledList = travelResponse.data;

          var listOfP = [];
          pList.forEach((patient) => {
            travelledList.forEach((travelledPatient) => {
              if (patient.UserID == travelledPatient.UserID) {
                listOfP.push(patient);
              }
            });
          });
          this.listOfCovidPatients(listOfP);
        }
      } catch (err) {
        console.log(err);
      }
    },

    // Go to patient's profile
    onPatientClick() {
      this.$router.push("/");
    },
    async listOfCovidPatients(patientsList) {
      if (
        this.userRole == "doctor" ||
        this.userRole == "health-official" ||
        this.userRole == "admin"
      ) {
        for (var i = 0; i < patientsList.length; i++) {
          const covidStatusInt = await axios.get(
            `http://localhost:5000/healthstatus/${patientsList[i].UserID}`
          );
          var covidStatus = "";
          if (covidStatusInt.data.Covid == 1) {
            covidStatus = "Positive";
          } else {
            covidStatus = "Negative";
          }
          this.covidPatientsList.push({
            patientsList: patientsList[i],
            covidStatus: covidStatus,
          });
        }
      } else if (this.userRole == "immigration-officer") {
        for (var j = 0; j < patientsList.length; j++) {
          const covidStatusInt = await axios.get(
            `http://localhost:5000/healthstatus/${patientsList[j].UserID}`
          );
          if (covidStatusInt.data.Covid == 1) {
            this.patientList.push(patientsList[j]);
          }
        }
      }
    },
  },
  computed: {
    // Filter patients list
    filteredPatients: function () {
      if (this.userRole == "immigration-officer") {
        return this.patientList.filter((patient) => {
          return (
            patient.FirstName.toLowerCase().match(this.search.toLowerCase()) ||
            patient.LastName.toLowerCase().match(this.search.toLowerCase()) ||
            patient.Email.toLowerCase().match(this.search.toLowerCase()) ||
            patient.Telephone.toLowerCase().match(this.search.toLowerCase())
          );
        });
      } else if (
        this.userRole == "health-official" ||
        this.userRole == "doctor" ||
        this.userRole == "admin"
      ) {
        return this.covidPatientsList.filter((patient) => {
          return (
            patient.patientsList.FirstName.toLowerCase().match(
              this.search.toLowerCase()
            ) ||
            patient.patientsList.LastName.toLowerCase().match(
              this.search.toLowerCase()
            ) ||
            patient.patientsList.Email.toLowerCase().match(
              this.search.toLowerCase()
            ) ||
            patient.patientsList.Telephone.toLowerCase().match(
              this.search.toLowerCase()
            ) ||
            patient.covidStatus.toLowerCase().match(this.search.toLowerCase())
          );
        });
      } else return null;
    },
  },
};
</script>
<style>
.patients-list-container {
  margin-top: 70px;
  /* min-width: 100%;
  min-height: 100%; */
  text-align: center;
}
</style>
