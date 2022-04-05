<template>
  <v-row>
    <v-col cols="12" md="3" sm="6">
      <div class="my-card">
        <h3>Number of doctors: 3</h3>
      </div>
    </v-col>
    <v-col cols="12" md="3" sm="6">
      <div class="my-card">
        <h3>Number of patients: 12</h3>
      </div>
    </v-col>
    <v-col cols="12" md="3" sm="6">
      <div class="my-card">
        <h3>Number of health officials: 7</h3>
      </div>
    </v-col>
    <v-col cols="12" md="3" sm="6">
      <div class="my-card">
        <h3>Number of immigration officers: 1</h3>
      </div>
    </v-col>
    <v-col cols="12">
      <div class="my-card">
        <apexchart
          type="pie"
          width="480"
          :options="chartOptions"
          :series="series"
        ></apexchart>
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
    };
  },
  mounted() {
    this.$emit("img", "admin")
  },
  created() {
    this.getChartData();
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
