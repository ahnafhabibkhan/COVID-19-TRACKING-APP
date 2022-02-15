<template>
  <div class="login">
    <!-- Sign Up modal -->
    <v-dialog v-model="signUp_modal" width="500px">
      <SignUpDialog />
    </v-dialog>
    <!-- End of Sign Up modal -->
    <!-- login modal -->
    <v-dialog v-model="login_modal" width="600px">
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
            <v-col cols="6">
              Don't have an account?
              <a
                v-on:click="
                  signUp_modal = !signUp_modal;
                  login_modal = !login_modal;
                "
                >Sign up</a
              ></v-col
            >
            <v-col cols="6">
              Forgot your password?
              <a v-on:click="createPasswordResetRequest(login.user_name)"
                >Click here</a
              ></v-col
            >
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
              <v-btn
                block
                color="success"
                elevation="0"
                @click="loginUser(login.user_name, login.pass)"
              >
                Sign In
              </v-btn>
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
          @click="onNavClick(item.text)"
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
import SignUpDialog from "../components/SignUpDialog.vue";

import axios from "axios";

// Makes a random length char key used for password reset
function makeKey(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default {
  name: "Login",
  components: { SignUpDialog },
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
      signUp_modal: false,
    };
  },

  methods: {
    // Log the user in
    async loginUser(email, password) {
      console.log(`Login pressed`);
      if (!email || !password) {
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5000/users/${email}`
        );
        console.log(
          `Got response, url: ${`http://localhost:5000/users/${email}`}`
        );
        if (response.data.Password != null) {
          // added by mansi
          this.$store.commit("setUser", response.data);
          this.login_modal = false;
          // end
          console.log(`Retrieved user password: ${response.data.Password}`);
          if (password == response.data.Password) {
            console.log(`Login credentials valid`);
            console.log(response.data.Role);
            if (response.data.Role == "Admin") {
              this.$router.push("/admin");
            }
            else if (response.data.Role == "Patient") {
              this.$router.push("/Patient");
            }
            else if (response.data.Role == "Doctor") {
              this.$router.push("/Doctor");
            }
            else if (response.data.Role == "HealthOfficial") {
              this.$router.push("/health-official");
            }
            else if (response.data.Role == "ImmigrationOfficer") {
              this.$router.push("/immigration-officer");
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    },

    // Create a password reset request
    async createPasswordResetRequest(email) {
      console.log(`Password reset pressed`);
      if (!email) {
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5000/users/${email}`
        );
        console.log(
          `Got response, url: ${`http://localhost:5000/users/${email}`}`
        );
        if (response.data.UserID != null) {
          console.log(`Retrieved user ID: ${response.data.UserID}`);
          // Check if a request already exists, if so just change the key to a new one
          // If not, create a new one
          const requestExistsResponse = await axios.get(
            `http://localhost:5000/passwordresetrequest/${response.data.UserID}`
          );
          const newKey = makeKey(6);
          if (requestExistsResponse.data.UserID != null) {
            console.log(`Request already exists for this user, updating key`);
            // Update preexisting request
            await axios.put(
              `http://localhost:5000/passwordresetrequest/${requestExistsResponse.data.UserID}`,
              {
                Key: newKey,
                Email: email,
              }
            );
          } else {
            console.log(`Request does not exist for this user, making new key`);
            // Create new request
            await axios.post(`http://localhost:5000/passwordresetrequest/`, {
              UserID: response.data.UserID,
              Key: newKey,
              Email: email,
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    onNavClick(text) {
      if (text == "Sign Up") {
        this.signUp_modal = !this.signUp_modal;
      }
      if (text == "Sign In") {
        this.login_modal = !this.login_modal;
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
