<template>
  <!--Profile-->
  <div class="bg-image">
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
                :hide-details="errors.lenght == 0"
                :error-messages="errors[0]"
              />
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="6">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <v-text-field
                :hide-details="errors.lenght == 0"
                :error-messages="errors[0]"
                v-model="form.LastName"
                label="LastName"
              />
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="6">
            <ValidationProvider rules="required|email" v-slot="{ errors }">
              <v-text-field
                :hide-details="errors.lenght == 0"
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
                :hide-details="errors.lenght == 0"
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
                :hide-details="errors.lenght == 0"
                :error-messages="errors[0]"
              />
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="6">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <v-select
                readonly
                :hide-details="errors.lenght == 0"
                :error-messages="errors[0]"
                v-model="form.Role"
                :items="roles"
                label="role"
              ></v-select>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="6">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <v-text-field
                :hide-details="errors.lenght == 0"
                :error-messages="errors[0]"
                v-model="form.Password"
                label="password"
                type="password"
              />
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="6">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <v-textarea
                :hide-details="errors.lenght == 0"
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
      url: "http://localhost:5000/",
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
