<template>
  <v-row justify="center">
    <v-col cols="12">
      <h1 class="white--text">about us</h1>
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
