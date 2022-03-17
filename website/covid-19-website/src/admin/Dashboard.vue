<template>
  <div class="dashboard">
    <div class="different-users">
      <div class="stats"><h3>Number of doctors: 3</h3></div>
      <div class="stats"><h3>Number of patients: 12</h3></div>
      <div class="stats"><h3>Number of health officials: 7</h3></div>
      <div class="stats"><h3>Number of immigration officers: 1</h3></div>
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
}
</style>
