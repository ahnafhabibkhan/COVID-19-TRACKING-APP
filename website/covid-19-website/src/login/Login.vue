<template>
  <div class="login">
    <!-- login modal -->
    <v-dialog v-model="login_modal" width="500px">
      <v-card class="">
        <v-container>
          <v-row>
            <v-col cols="12" class="pa-5">
              <h1>login</h1>

              <v-select
                :items="roles"
                v-model="login.role"
                item-text="title"
                item-value="value"
                label="role"
                dense
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="login.user_name"
                label="Username"
                dense
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="login.pass"
                label="Password"
                dense
                hide-details
                type="password"
              ></v-text-field>
            </v-col>
            <v-col cols="6"> don't have an account ? Sign up </v-col>
            <v-col cols="6"> forget your password? </v-col>
            <v-col cols="6">
              <v-btn
                color="error"
                block
                @click="login_modal = false"
                elevation="0"
              >
                cancel
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block color="success" elevation="0" @click="loginUser(login.user_name, login.pass)"> Sign In </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- login modal end -->
    <div class="navbar">
      <v-toolbar-items>
        <v-btn
          class="btn"
          v-for="(item, i) in nav"
          :key="i"
          :title="item.title"
          text
          color="white"
          x-large
          >{{ item.text }}</v-btn
        >
      </v-toolbar-items>
    </div>
    <div class="main">
      <p class="main-title">COVID-19 TRACKER</p>
      <p class="main-middle-text">
        Stay Alert, Control the Virus, and Save Lives!
      </p>
      <center>
        <v-btn class="main-btn" @click="login_modal = !login_modal"
          >Sign In</v-btn
        >
      </center>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      nav: [
        {
          icon: "info",
          text: "About",
          title: "About this demo",
          active: true,
        },
        {
          icon: "email",
          text: "Contact",
          title: "Our Contact info",
          active: true,
        },
        {
          icon: "info",
          text: "Sign In",
          title: "Click to sign in",
          active: true,
        },
        {
          icon: "info",
          text: "Sign Up",
          title: "Click to sign up",
          active: true,
        },
      ],
      roles: [
        { title: "admin", value: 1 },
        { title: "patient", value: 2 },
        { title: "doctor", value: 3 },
        { title: "health officer", value: 4 },
        { title: "immigrant officer", value: 5 },
      ],
      login: {
        user_name: null,
        pass: null,
        role: -1,
      },
      login_modal: false,
    };
  },

  methods:{
    // Get All Products
    async loginUser(email, password) {
      console.log(`Login pressed`)
      if(!email || !password){
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/users/${email}`);
        console.log(`Got response, url: ${`http://localhost:5000/users/${email}`}`);
        if(response.data.Password != null){
          console.log(`Retrieved user password: ${response.data.Password}`);
          if(password == response.data.Password){
            console.log(`Login credentials valid`);
            if(response.data.Role == 0){
              // TODO
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
.login {
  background-image: url("../assets/CovidTrackingApp.png");
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100%;
  min-width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.navbar {
  margin-top: 15px;
  float: right;
}
.btn {
  margin-left: 35px;
  margin-right: 20px;
  font-size: 25px;
  color: antiquewhite;
  font-weight: 500;
  font-family: Arial, Helvetica, sans-serif;
}
.main-title {
  font-size: 75px;
  font-weight: 500;
  font-family: Arial, Helvetica, sans-serif;
  color: antiquewhite;
  text-align: center;
}
.main-middle-text {
  text-align: center;
  font-size: 25px;
  font-weight: 500;
  font-family: Arial, Helvetica, sans-serif;
  color: antiquewhite;
}
.main {
  margin-top: 300px;
  margin-left: 200px;
  width: 40%;
}
.main-btn {
  margin-top: 40px;
  font-size: 25px;
  font-weight: 500;
  font-family: Arial, Helvetica, sans-serif;
  color: antiquewhite;
}
</style>
