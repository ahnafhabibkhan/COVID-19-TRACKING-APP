<template>
  <!--Profile-->
  <div class="bg-image">
    <v-container>
      <v-row>
        <v-col cols="12">
         
         
          <h1>Profile page</h1>
        </v-col>
       
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.FirstName"
            label="FirstName"
            :autocomplete="false"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="form.LastName" label="LastName" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="form.Email" label="Email" type="Email" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="form.Telephone" label="phone" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="form.City" label="City" type="text" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="form.Country" label="country" type="text" />
        </v-col>
        <v-col cols="12" md="6">
          <v-select v-model="form.Role" :items="roles" label="role"></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.Password"
            label="password"
            type="password"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-textarea v-model="form.Address" dense hide-details rows="1" label="address" />
        </v-col>
         <v-col cols="12" md="6">
          <v-checkbox
            dense
            hide-details
            label="Travelled"
            true-value="1"
            false-value="0"
            v-model.number="form.Travelled"
          ></v-checkbox
        ></v-col>

        <v-col cols="12">
          <div class="d-flex justify-center">
            <v-btn @click="back" width="150px" color="primary">
              <v-icon left>
                mdi-arrow-left
              </v-icon>
              back</v-btn>
            <v-btn @click="save" width="150px" class="mx-2" color="success">save</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Profile",
  data() {
    return {
      url: "http://localhost:5001/",
      roles: [
        "Admin",
        "Patient",
        "Doctor",
        "HealthOofficer",
        "ImmigrantOfficer",
      ],
      form: {
        FirstName: null,
        LastName: null,
        Email: null,
        Password: null,
        Role: null,
        City: null,
        Telephone: null,
        Country: null,
        Address: null,
        Travelled: null,
      },
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },

    async save() {
      try {
        const id = this.userId;
        const res = await axios.put(this.url + `users/${id}`, this.form);
        console.log("successsfull upadated", res);
        this.get();
      } catch (err) {
        console.log("error ; save profile", err);
      }
    },
    async get() {
      const email = this.userEmail;
      try {
        const res = await axios.get(this.url + `users/${email}`);

        this.form = res.data;
      } catch (err) {
        console.log("error ; get profile", err);
      }
    },
  },
  computed: {
    userEmail() {
      return "test@gmail.com";
      // return store.state.user.UserID;
    },
    userId() {
      return 3;
      // return store.state.user.UserID;
    },
  },
  mounted() {
    this.get();
  },
};
</script>
<style>
.bg-image {
  background-image: url("../assets/PatientBg.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100%;
  min-width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 1;
}
.btn-container {
  /* border: 5px solid red; */
  /* margin-top: 100px;
  width: 30%;
  height: 40%;
  margin-left: 100%; */
}
</style>