<template>
  <div class="login">
    <!-- Sign Up modal -->
    <v-dialog v-model="signUp_modal" width="500px">
      <SignUpDialog  @onSaveDialogClick="onSave()" />
    </v-dialog>
    <!-- End of Sign Up modal -->

    <!-- Forget Password modal -->
    <v-dialog v-model="ForgotPassword_modal" width="500px">
      <v-card
        elevation="15"
        width="500px"
        color="blue lighten-2"
        style="border-radius: 20px; opacity: 95%; margin: auto"
      >
        <v-container>
          <center>
            <h1
              class="white--text"
              style="margin-left: auto; margin-right: auto; margin-bottom: 10px"
            >
              Enter Your email
            </h1>
          </center>
          <v-row justify="center">
            <v-col md="7">
              <v-text-field
                label="Email"
                v-model="form.email"
                type="email"
                solo
                :autocomplete="false"
              ></v-text-field>

              <!-- <v-text-field
            label="City"
            v-model="form.city"
            solo
            :autocomplete="false"
          ></v-text-field> -->

              <div class="d-flex justify-center">
                <v-btn
                  @click="createPasswordResetRequest(form.email)"
                  width="150px"
                  class="mx-2"
                  >Send email</v-btn
                >
                <v-btn @click="cancelButtonAction()" width="150px"
                  >cancel</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- end of forget password modal  -->

    <!-- Message afer clicking on Send a Login link -->
    <v-dialog v-model="GeneratedPassword_modal" width="500px">
      <v-card
        elevation="15"
        width="500px"
        color="blue lighten-2"
        style="border-radius: 20px; opacity: 95%; margin: auto"
      >
        <v-container>
          <center>
            <h1
              class="white--text"
              style="margin-left: auto; margin-right: auto; margin-bottom: 10px"
            >
              Enter Your Generated Password
            </h1>
          </center>
          <v-row justify="center">
            <v-col md="7">
              <v-text-field
                v-model="form.password"
                :error-messages="passwordErrorMessage"
                label="Generated Password"
                type="password"
                solo
              />
              <!-- <v-text-field
                v-model="form.password"
                label="New Password"
                type="password"
                solo
              /> -->

              <!-- <v-text-field
            label="City"
            v-model="form.city"
            solo
            :autocomplete="false"
          ></v-text-field> -->

              <div class="d-flex justify-center">
                <v-btn
                  @click="verifyPasswordResetKey(form.email, form.password)"
                  width="150px"
                  class="mx-2"
                  >Confirm</v-btn
                >
                <v-btn @click="cancelGeneratedPasswordAction()" width="150px"
                  >cancel</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>

    <!-- Enter your new password UI -->
    <v-dialog v-model="NewPassword_modal" width="500px">
      <v-card
        elevation="15"
        width="500px"
        color="blue lighten-2"
        style="border-radius: 20px; opacity: 95%; margin: auto"
      >
        <v-container>
          <center>
            <h1
              class="white--text"
              style="margin-left: auto; margin-right: auto; margin-bottom: 10px"
            >
              Enter Your New password
            </h1>
          </center>
          <v-row justify="center">
            <v-col md="7">
              <v-text-field
                v-model="form.newPassword"
                label="New password"
                type="password"
                solo
              />
              <v-text-field
                v-model="form.passwordConfirmation"
                label="Password Confirmation"
                :error-messages="confirmationErrorMessage"
                type="password"
                solo
              />

              <!-- <v-text-field
            label="City"
            v-model="form.city"
            solo
            :autocomplete="false"
          ></v-text-field> -->

              <div class="d-flex justify-center">
                <v-btn
                  @click="
                    changePassword(
                      form.email,
                      form.newPassword,
                      form.passwordConfirmation
                    )
                  "
                  width="150px"
                  class="mx-2"
                  >Confirm</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- end of new password UI -->
    <!-- End message after clickin -->
    <!-- login modal -->
    <v-dialog v-model="login_modal" width="330px">
      <v-card>
        <v-container>
          <v-row>
            <v-col cols="12" class="pa-5">
              <h1 style="text-align: center">login</h1>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="login.user_name"
                label="Username"
                style="text-align: center"
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
              <!-- createPasswordResetRequest(login.user_name) -->
              <a v-on:click="RenderForgotPasswordComponent"
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
//import ForgotPassword from "../components/ForgotPassword.vue";
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
      //ForgotPassword_modal: false,
      form: {
        email: null,
        password: null,
      },
      LoginLink_modal: false,
      GeneratedPassword_modal: false,
      NewPassword_modal: false,
      passwordErrorMessage: "",
      confirmationErrorMessage: "",
    };
  },

  methods: {

    onSave(saveText){
      console.log(saveText);
      this.signUp_modal = false;
    },
    //Forget Password Cancel Button
    cancelButtonAction() {
      this.login_modal = !this.login_modal;
      this.ForgotPassword_modal = !this.ForgotPassword_modal;
    },
    // Login link modal render page
    // loginLinkSendAction() {
    //   this.ForgotPassword_modal = !this.ForgotPassword_modal;
    //   this.GeneratedPassword_modal = !this.GeneratedPassword_modal;
    // },
    // Generated Password UI
    cancelGeneratedPasswordAction() {
      this.GeneratedPassword_modal = !this.GeneratedPassword_modal;
      this.login_modal = !this.login_modal;
    },
    // Display forgot password dialog
    RenderForgotPasswordComponent() {
      this.ForgotPassword_modal = !this.ForgotPassword_modal;
      this.login_modal = !this.login_modal;
    },
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
        // Check if user with entered email exists
        if (response.data.Password != null) {
          console.log(`Retrieved user password: ${response.data.Password}`);
          if (password == response.data.Password) {
            this.$store.commit("setUser", response.data);
            this.login_modal = false;
            console.log(`Login credentials valid`);
            console.log(response.data.Role);
            // Sent user to page depending on role
            if (response.data.Role == "Admin") {
              this.$router.push("/admin");
            } else if (response.data.Role == "Patient") {
              this.$router.push("/Patient");
            } else if (response.data.Role == "Doctor") {
              this.$router.push("/Doctor");
            } else if (response.data.Role == "HealthOfficial") {
              this.$router.push("/health-official");
            } else if (response.data.Role == "ImmigrationOfficer") {
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
      this.ForgotPassword_modal = !this.ForgotPassword_modal;
      this.GeneratedPassword_modal = !this.GeneratedPassword_modal;

      console.log(`Password reset pressed`);
      if (!email) {
        return;
      }
      try {
        // Get user that has this email
        const response = await axios.get(
          `http://localhost:5000/users/${email}`
        );
        console.log(
          `Got response, url: ${`http://localhost:5000/users/${email}`}`
        );
        // If user exists
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

    // Redirects to new password input form if key is correct
    async verifyPasswordResetKey(email, key) {
      console.log(`Password reset key submitted: ${key}`);
      if (!email || !key) {
        return;
      }
      try {
        // Get UserID of the User with that Email
        const response = await axios.get(
          `http://localhost:5000/users/${email}`
        );
        if (response.data.UserID != null) {
          console.log(`Retrieved user ID: ${response.data.UserID}`);
          // Get passwordresetrequest for that UserID
          const requestResponse = await axios.get(
            `http://localhost:5000/passwordresetrequest/${response.data.UserID}`
          );

          if (requestResponse.data.UserID != null) {
            if (key == requestResponse.data.Key) {
              this.GeneratedPassword_modal = !this.GeneratedPassword_modal;
              this.NewPassword_modal = !this.NewPassword_modal;
            } else if (key != requestResponse.data.Key) {
              this.passwordErrorMessage = "Wrong password";
              return;
              // this.GeneratedPassword_modal = false;
              // this.GeneratedPassword_modal = !this.GeneratedPassword_modal;
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    },

    // Changes the password of the user with that email
    async changePassword(email, password, passwordConfirmation) {
      console.log(`Change password called for Email: ${email}`);
      if (
        !email ||
        !password ||
        !passwordConfirmation
        // password != passwordConfirmation
      ) {
        return;
      }
      if (password != passwordConfirmation) {
        this.confirmationErrorMessage = "Password doesn't match";
        return;
      }
      try {
        // Get the User with that Email
        const response = await axios.get(
          `http://localhost:5000/users/${email}`
        );
        if (response.data.UserID != null) {
          // Update User's password
          await axios.put(
            `http://localhost:5000/users/${response.data.UserID}`,
            {
              Password: password,
            }
          );
          this.NewPassword_modal = !this.NewPassword_modal;
          this.login_modal = !this.login_modal;
          // Delete password reset request
          await axios.delete(
            `http://localhost:5000/passwordresetrequest/${response.data.UserID}`
          );
        }
      } catch (err) {
        console.log(err);
      }
    },

    // Control display of login and signup modals
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
