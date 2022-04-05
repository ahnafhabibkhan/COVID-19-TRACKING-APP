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
    onPatientsClick() {
      this.$router.push("/health-official-patients-list");
    },
  },
  mounted() {
    this.$emit("img", "healthOfficial");
  },
};
</script>

