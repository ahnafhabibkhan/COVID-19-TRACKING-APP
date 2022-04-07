<template>
  <v-row justify="center">
    <v-col cols="12">
      <h1 class="white--text" style="text-align: center; margin-top: 5%">
        Contact us
      </h1>
      <h2 class="white--text" style="text-align: center; margin-top: 5%">
        John Doe -- 514-009-9009
      </h2>
      <h2 class="white--text" style="text-align: center">
        Marouane Fellaini -- 674-908-4567
      </h2>
      <h2 class="white--text" style="text-align: center">
        Jean De LaFourchette -- 789-098-5674
      </h2>
      <h2 class="white--text" style="text-align: center">
        Or support@covidtracker.com
      </h2>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "About",

  mounted() {
    this.$emit("img", "admin");
  },
};
</script>
