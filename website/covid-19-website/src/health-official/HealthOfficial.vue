<template>
  <div class="health-official">
    <div class="right-side">
      <div class="top-right">
        <v-tab> </v-tab>
      </div>
      <div class="bottom-half">
        <div class="my-4 mx-3">
          <v-btn
            class="white--text"
            style="
              font-size: 18px;
              margin-left: 30%;
              border-radius: 2px;
            "
            color="blue lighten-2"
            width="400px"
            height="75px"
            @click="onPatientsClick()"
            >LIST OF PATIENTS</v-btn
          >
        </div>
        <div class="chart" style="margin-top: 10%; margin-left: 25%">
          <apexchart
            type="pie"
            width="480"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  methods: {
    onPatientsClick(){
      this.$router.push('/health-official-patients-list');
    }
  }
};
</script>

<style>
.health-official {
  /* background-image: url("../assets/HealthOfficial.png");
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100%;
  min-width: 100%;
  position: fixed;
  top: 0;
  left: 0; */
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
.top-right {
  /* border: 5px solid red; */
  float: right;
  width: 40%;
  height: 50px;
}

.chatbox {
  /* border: 5px solid red; */
  margin-top: 900%;
  margin-left: 40%;
}
.v-tab {
  float: right;
  width: 0.5px;
  border: 1px;
}
.bottom-half {
  /* border: 5px solid red; */
  margin-top: 30%;
  height: 1000px;
}
</style>
