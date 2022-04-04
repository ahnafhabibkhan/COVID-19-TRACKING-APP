<template>
  <div>
    <h1 style="font-size: 50px; text-align: center; color: black">
      Account Requests
    </h1>
    <v-card class="account-requests-list" outlined color="transparent">
      <v-row>
        <v-col cols="12" md="6" v-for="i in 5" :key="i">
          <v-card :title="i" class="pa-2"
            ><h2 class="my-2">John Doe</h2>
            <p>
              Contact:<br />
              Phone: 5146789032 <br />
              Email: john.doe134@gmail.com <br />
              Role: Doctor <br />
              ID: JD763848492
            </p>
            <v-btn>Approve</v-btn>
            <v-btn class="mx-3">Reject</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$emit("img", "admin");
  }
};
</script>
<style>
.account-requests-list {
  margin-top: 70px;
  text-align: center;
}
</style>
