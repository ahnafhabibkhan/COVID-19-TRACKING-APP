<template>
  <div class="doctor">
    <div class="right-side">
      <div style="margin-top: 90%; margin-left: 80%">
        <v-btn @click="ChatboxClick" icon height="80px" width="80px">
          <v-icon color="blue darken-3" style="font-size: 80px">
            mdi-message-text
          </v-icon>
        </v-btn>
      </div>
    </div>
    <div class="left-side">
      <div class="btn-container">
        <v-row align="center">
          <v-col cols="12" sm="6">
            <div class="my-6 mx-3">
              <v-btn
                class="white--text"
                style="font-size: 18px; opacity: 90%"
                color="blue lighten-2"
                width="400px"
                height="75px"
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
                >List of Appointments</v-btn
              >
            </div>
            <div class="my-6 mx-3">
              <v-btn
                class="white--text"
                style="font-size: 18px; opacity: 90%"
                color="blue lighten-2"
                width="400px"
                height="75px"
                >Update Availabilities</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </div>
      <div class="chart">
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
export default {
  name: "Doctor",

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
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
};
</script>

<style>
.doctor {
  background-image: url("../assets/doctorImage2.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100%;
  min-width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
/* .btn {
  display: block;
  margin-top: 35px;
} */
.btn-container {
  /* border: 5px solid red; */
  padding-top: 25px;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  width: 58%;
  height: 40%;
}
.chart {
  /* border: 2px solid white;
  background-color: #64B5F6; */
  /* border: 5px solid red; */
  width: 65%;
  height: 40%;
  margin-top: 2%;
  margin-left: auto;
  margin-right: auto;
  opacity: 90%;
}
.left-side {
  /* border: 5px solid red; */
  width: 40%;
  height: 1000px;
}
.icons-container {
  /* border: 5px solid red; */
  width: 10%;
  margin-top: 20px;
  margin-right: 45px;
  float: right;
}

.right-side {
  /* border: 5px solid red; */
  float: right;
  width: 50%;
  height: 1000px;
}
</style>
