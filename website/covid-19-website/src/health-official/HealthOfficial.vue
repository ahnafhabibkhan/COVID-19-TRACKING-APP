<template>
  <v-row justify="center">
    <v-col cols="12" md="7">
      <v-btn
        dark
        color="blue lighten-2"
        block
        height="75px"
        @click="onPatientsClick()"
        >LIST OF PATIENTS</v-btn
      >
    </v-col>
    <v-col cols="12" md="7" class="d-flex justify-center">
      <apexchart
        type="pie"
        width="480"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  name: "health-official",

  components: {},

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
  created() {
    this.getChartData();
  },
  methods: {
    onPatientsClick() {
      this.$router.push("/health-official-patients-list");
    },
  },
  mounted() {
    this.$emit("img", "healthOfficial");
  },
  // Get infected and non infected data
  async getChartData() {
    try {
      // Get all patients
      const response = await axios.post(`http://localhost:5001/users`, {
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
          `http://localhost:5001/healthstatus/${patientIDs[i]}`
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
};
</script>
