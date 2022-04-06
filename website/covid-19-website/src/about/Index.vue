<template>
  <v-row justify="center">
    <v-col cols="12">
      <h1 class="white--text" style="text-align: center; margin-top: 15%">
        The right platform used to keep track of your Covid Health Status. The
        right platform to seek the right help with fighting Covid-19 with the
        help of doctors available to you. You will have health officials and
        doctors to your aid and to your community's aid.
      </h1>
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
