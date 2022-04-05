<template>
  <!--Profile-->
  <div class="profile-page">
    <v-container>
      <!-- wrap all from with validation obs -->
      <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
        <v-row>
          <v-col cols="12">
            <h1>Profile page</h1>
          </v-col>

          <v-col cols="12" md="6">
            <!-- wrap input with validaion comp -->
            <ValidationProvider rules="required" v-slot="{ errors }">
              <v-text-field
                v-model="form.FirstName"
                label="FirstName"
                :autocomplete="false"
                :hide-details="errors.length == 0"
                :error-messages="errors[0]"
              />
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="6">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <v-text-field
                :hide-details="errors.length == 0"
                :error-messages="errors[0]"
                v-model="form.LastName"
                label="LastName"
              />
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="6">
            <ValidationProvider rules="required|email" v-slot="{ errors }">
              <v-text-field
                :hide-details="errors.length == 0"
                :error-messages="errors[0]"
                v-model="form.Email"
                label="Email"
                type="Email"
              />
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="6">
            <ValidationProvider
              rules="required|digits:10|numeric"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="form.Telephone"
                label="phone"
                :hide-details="errors.length == 0"
                :error-messages="errors[0]"
              />
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="6">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <v-text-field
                v-model="form.Country"
                label="country"
                type="text"
                :hide-details="errors.length == 0"
                :error-messages="errors[0]"
              />
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="6">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <v-text-field
                readonly
                :error-messages="errors[0]"
                v-model="form.Role"
                label="role"
                disabled
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="6">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <v-text-field
                :hide-details="errors.length == 0"
                :error-messages="errors[0]"
                v-model="form.Password"
                label="password"
                type="password"
              />
              <v-text-field
                v-if="setHide()"
                readonly
                v-model="DoctorAssigned"
                label="Doctor"
                disabled
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="6">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <v-textarea
                :hide-details="errors.length == 0"
                :error-messages="errors[0]"
                v-model="form.Address"
                dense
                rows="1"
                label="address"
              />
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="6">
            <v-checkbox
              dense
              hide-details
              label="Travelled"
              :true-value="1"
              :false-value="0"
              v-model.number="form.Travelled"
            ></v-checkbox
          ></v-col>

          <v-col cols="12">
            <div class="d-flex justify-center">
              <v-btn @click="back" width="150px" color="primary">
                <v-icon left> mdi-arrow-left </v-icon>
                back</v-btn
              >
              <v-btn
                @click="handleSubmit(save)"
                width="150px"
                class="mx-2"
                color="success"
                >save</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </ValidationObserver>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
//import validation
import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
// import needed rules for validate
import { required, numeric, digits, email } from "vee-validate/dist/rules";
// extend  rules
extend("required", {
  ...required,
  message: "This field is required",
});
extend("numeric", {
  ...numeric,
  message: "This field shuold be a number",
});
extend("digits", {
  ...digits,
  message: "please enter valid phone number",
});
extend("email", { ...email, message: "please enter with valid email" });
// end
export default {
  name: "Profile",
  components: { ValidationProvider, ValidationObserver },
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

        Role: null,
        Telephone: null,
        Country: null,
        Address: null,
        Travelled: 0,
      },
      DoctorAssigned: "None",
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },

    async save() {
      try {
        const id = this.userId;
        await axios.put(this.url + `users/${id}`, this.form);
        Swal.fire({
          icon: "success",
          title: "updated",
          text: "profile updated successfully ",
        });
        this.get();
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "failed",
          text: "profile update failed ",
        });
      }
    },
    setHide() {
      // hide this the v-text field if its not a patient
      if (this.$store.state.user.Role != "Patient") {
        return false;
      }
      return true;
    },
    async getDoctorAssigned() {
      const response = await axios.post(`http://localhost:5001/users`, {
        Role: "Patient",
      });
      var users = response.data;
      let doctorID = "";
      for (var i = 0; i < users.length; i++) {
        if (this.$store.state.user.UserID == users[i].UserID) {
          doctorID = users[i].Doctor;
        }
      }
      if (doctorID == "") {
        // If there's no doctor found that is assigned to this patient
        return;
      }
      const doctorResponse = await axios.post(`http://localhost:5001/users`, {
        UserID: doctorID,
      });
      var myDoctor = doctorResponse.data;
      this.DoctorAssigned = myDoctor[0].FirstName;
      console.log("My doctor", this.DoctorAssigned);
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
      // return "test@gmail.com";
      return this.$store.state.user.Email;
    },
    userId() {
      // return 3;
      return this.$store.state.user.UserID;
    },
  },
  mounted() {
    this.get();
    this.getDoctorAssigned();
  },
};
</script>
<style>
.profile-page {
  background-image: url("../assets/profilepage.png");
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100%;
  min-width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.btn-container {
  /* border: 5px solid red; */
  /* margin-top: 100px;
  width: 30%;
  height: 40%;
  margin-left: 100%; */
}
</style>
