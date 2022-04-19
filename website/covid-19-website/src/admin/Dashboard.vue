<template>
  <v-row>
    <v-col cols="12" md="3" sm="6">
      <div class="my-card">
        <h3>Number of doctors: {{ numberOfDoctors }}</h3>
      </div>
    </v-col>
    <v-col cols="12" md="3" sm="6">
      <div class="my-card">
        <h3>Number of patients: {{ numberOfPatients }}</h3>
      </div>
    </v-col>
    <v-col cols="12" md="3" sm="6">
      <div class="my-card">
        <h3>Number of health officials: {{ numberOfHOs }}</h3>
      </div>
    </v-col>
    <v-col cols="12" md="3" sm="6">
      <div class="my-card">
        <h3>Number of immigration officers: {{ numberOfIOs }}</h3>
      </div>
    </v-col>
    <v-col cols="12">
      <div class="my-card">
        <v-row>
          <v-col cols="12" md="6">
            <apexchart
              type="pie"
              width="480"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </v-col>
          <v-col cols="12" md="6">
            <apexchart
              type="pie"
              width="515"
              :options="accountChartOptions"
              :series="accountSeries"
            ></apexchart>
          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  name: "Dashboard",
  data: function () {
    return {
      series: [0, 0],
      chartOptions: {
        chart: {
          width: 400,
          type: "pie",
        },
        labels: ["Infected", "Non-Infected"],
        responsive: [
          {
            breakpoint: 580,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      accountSeries: [0, 0],
      accountChartOptions: {
        chart: {
          width: 400,
          type: "pie",
        },
        labels: ["Account Requests", "Accounts Approved"],
        responsive: [
          {
            breakpoint: 580,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      numberOfPatients: 0,
      numberOfDoctors: 0,
      numberOfIOs: 0,
      numberOfHOs: 0,
    };
  },
  mounted() {
    this.$emit("img", "admin");
  },
  created() {
    this.getChartData();
    this.getNumberOfUsers();
    this.getNumberOfAccounts();
  },
  methods: {
    onPatientsClick() {
      this.$router.push("/health-official-patients-list");
    },

    // Get infected and non infected data
    async getChartData() {
      try {
        // Get all patients
        const response = await axios.post(`http://localhost:5000/users`, {
          Role: "Patient",
        });
        const patientList = response.data;
        let infectedCount = 0;
        let nonInfectedCount = 0;
        let totalCount = 0;
        let patientIDs = [];
        // Make a list of their IDs
        patientList.forEach((patient) => {
          ++totalCount;
          patientIDs.push(patient.UserID);
        });
        // For each ID get their latest health status and check if they have covid and calculate count;
        for (let i = 0; i < patientIDs.length; ++i) {
          const latestHSResponse = await axios.get(
            `http://localhost:5000/healthstatus/${patientIDs[i]}`
          );
          const infected = latestHSResponse.data.Covid == 1;
          if (infected) {
            ++infectedCount;
          } else {
            ++nonInfectedCount;
          }
        }
        // Write the data to series
        this.series = [
          (infectedCount / totalCount) * 100,
          (nonInfectedCount / totalCount) * 100,
        ];
      } catch (err) {
        console.log(err);
      }
    },
    async getNumberOfUsers() {
      //Get number of patients
      const patients = await axios.post(`http://localhost:5000/users`, {
        Role: "Patient",
      });
      this.numberOfPatients = patients.data.length;
      //Get number of doctors
      const doctors = await axios.post(`http://localhost:5000/users`, {
        Role: "Doctor",
      });
      this.numberOfDoctors = doctors.data.length;
      //Get number of immigration officers
      const IOs = await axios.post(`http://localhost:5000/users`, {
        Role: "ImmigrationOfficer",
      });
      this.numberOfIOs = IOs.data.length;
      //Get number of health officials
      const HOs = await axios.post(`http://localhost:5000/users`, {
        Role: "HealthOfficial",
      });
      this.numberOfHOs = HOs.data.length;

      //Calculating number of pending accounts
      const accountRequestResponse = await axios.get(
        `http://localhost:5000/accountrequests`
      );

      this.accountSeries = [
        accountRequestResponse.data.length,
        this.numberOfDoctors + this.numberOfIOs + this.numberOfHOs,
      ];
    },
  },
};
</script>

<style>
.my-card {
  padding: 10px 3px;
  border: 1px dashed blue;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  min-height: 100px;
  background-color: rgba(255, 252, 252, 0.3);
}
/* .dashboard {
  height: 100%;
  width: 100%;
}
.different-users {
  width: 100%;
  height: 50%;
}
.stats {
  padding-top: 50px;
  margin-left: 63px;
  display: inline-table;
  border: 4px solid rgb(56, 54, 54);
  height: 210px;
  width: 210px;
}
.pie-chart-stats {
  margin-top: 30px;
  border: 4px solid rgb(56, 54, 54);
} */
</style>
