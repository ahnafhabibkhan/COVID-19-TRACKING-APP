<template>
  <div class="dashboard">
    <div class="different-users">
      <div class="stats">
        <h3>Number of doctors: {{ numberOfDoctors }}</h3>
      </div>
      <div class="stats">
        <h3>Number of patients: {{ numberOfPatients }}</h3>
      </div>
      <div class="stats">
        <h3>Number of health officials: {{ numberOfHOs }}</h3>
      </div>
      <div class="stats">
        <h3>Number of immigration officers: {{ numberOfIOs }}</h3>
      </div>
    </div>
    <div class="bottom-part">
      <div class="pie-chart-stats">
        <apexchart
          type="pie"
          width="480"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Dashboard",
  data: function () {
    return {
      series: [44, 55],
      chartOptions: {
        chart: {
          width: 580,
          type: "pie",
        },
        labels: ["Infected", "Non-Infected"],
        responsive: [
          {
            breakpoint: 580,
            options: {
              chart: {
                width: 400,
              },
              legend: {
                position: "top",
                horizontalAlign: "center",
              },
            },
          },
        ],
      },
      numberOfDoctors: 0,
      numberOfPatients: 0,
      numberOfHOs: 0,
      numberOfIOs: 0,
    };
  },
  created() {
    this.getChartData();
    this.getNumberOfUsers();
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
    //Get number of users
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
    },
  },
};
</script>

<style>
.dashboard {
  height: 100%;
  width: 100%;
}
.different-users {
  width: 100%;
  height: 50%;
  text-align: center;
}
.stats {
  padding-top: 50px;
  margin-left: 63px;
  margin-right: 63px;
  display: inline-table;
  border: 4px solid rgb(59, 147, 248);
  border-radius: 25px;
  background: rgb(144, 196, 255);
  height: 210px;
  width: 210px;
}
.pie-chart-stats {
  margin-right: auto;
  margin-left: auto;
  margin-top: 5%;
  border: 4px solid rgb(59, 147, 248);
  border-radius: 25px;
  background: rgb(144, 196, 255);
  width: 500px;
  text-align: center;
}
</style>
