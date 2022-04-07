<template>
  <div>
    <h1 style="font-size: 50px; text-align: center; color: black">
      Account Requests
    </h1>
    <v-card class="account-requests-list" outlined color="transparent">
      <v-card
        v-for="(item, Email) in requestList"
        :key="Email"
        :title="item.title"
        class="pa-2 mx-8 my-8"
        style="display: inline-table"
        width="350px"
        height="100px"
        ><h2 class="my-2">
          {{ item.FirstName }} {{ item.LastName }}
        </h2>
        <p>
          Contact:<br />
          Phone: {{ item.Telephone }} <br />
          Email: {{ item.Email }} <br />
          Role: {{item.Role}}
        </p>
        <v-btn @click="approveAccountRequest(item)">Approve</v-btn>
        <v-btn class="mx-3" @click="rejectAccountRequest(item)">Reject</v-btn>
      </v-card>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      requestList: [],
    };
  },
  created() {
    // Call all these on page creation
    this.getAccountRequests();
  },
  methods: {
    // Get all account requests
    async getAccountRequests() {
      try {
        const requestResponse = await axios.get(`http://localhost:5000/accountrequests`);
        this.requestList = requestResponse.data;
      } catch (err) {
        console.log(err);
      }
    },

    // Approve account request
    async approveAccountRequest(item) {
      try {
        // Create new account
        await axios.post(`http://localhost:5000/user`, {
          Email: item.Email,
          FirstName: item.FirstName,
          LastName: item.LastName,
          Telephone: item.Telephone,
          Address: item.Address,
          Role: item.Role,
          Password: item.Password,
          Country: item.Country,
        });

        // Delete account request
        await axios.delete(`http://localhost:5000/accountrequest/${item.Email}`);

        // Reload account requests
        this.getAccountRequests();
      } catch (err) {
        console.log(err);
      }
    },

    // Reject account request
    async rejectAccountRequest(item) {
      try {
        // Delete account request
        await axios.delete(`http://localhost:5000/accountrequest/${item.Email}`);

        // Reload account requests
        this.getAccountRequests();
      } catch (err) {
        console.log(err);
      }
    },
  },
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
