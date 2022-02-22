<template>
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
          Create an Account
        </h1>
      </center>
      <v-row justify="center">
        <v-col md="7">
          <v-text-field
            label="First Name"
            v-model="form.firstName"
            solo
            :autocomplete="false"
          ></v-text-field>

          <v-text-field
            label="Last Name"
            v-model="form.lastName"
            solo
            :autocomplete="false"
          ></v-text-field>

          <v-text-field
            label="Email"
            v-model="form.email"
            type="email"
            solo
            :autocomplete="false"
          ></v-text-field>

          <v-text-field
            label="Telephone Number"
            v-model="form.telephone"
            type="phone"
            solo
            :autocomplete="false"
          ></v-text-field>

          <v-text-field
            label="Address"
            v-model="form.address"
            solo
            :autocomplete="false"
          ></v-text-field>

          <!-- <v-text-field
            label="City"
            v-model="form.city"
            solo
            :autocomplete="false"
          ></v-text-field> -->

          <v-text-field
            label="Country"
            v-model="form.country"
            solo
            :autocomplete="false"
          ></v-text-field>

          <v-text-field
            label="BirthDate"
            v-model="form.birthDate"
            type="date"
            solo
          ></v-text-field>

          <v-select
            v-model="form.role"
            item-text="title"
            item-value="value"
            :items="roles"
            label="Role"
            solo
          ></v-select>

          <v-text-field
            v-model="form.password"
            label="Password"
            type="password"
            solo
          />

          <v-text-field
            v-model="form.passwordConfirm"
            label="Confirm Password"
            type="password"
            solo
          />

          <div class="d-flex justify-center">
            <v-btn @click="signupUser(form)" width="150px" class="mx-2"
              >save</v-btn
            >
            <v-btn @click="back" width="150px">cancel</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  name: "SignUpDialog",
  data() {
    return {
      roles: [
        { title: "Admin", value: 1 },
        { title: "Patient", value: 2 },
        { title: "Doctor", value: 3 },
        { title: "Health Official", value: 4 },
        { title: "Immigrant Officer", value: 5 },
      ],
      form: {
        role: -1,
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        passwordConfirm: null,
        birthDate: null,
        telephone: null,
        address: null,
        // city: null,
        country: null,
      },
    };
  },

  methods: {
    // Sign the user up
    async signupUser(formStruct) {
      console.log(`Signup pressed`);
      if (
        !formStruct.role ||
        !formStruct.email ||
        !formStruct.password ||
        !formStruct.passwordConfirm ||
        !formStruct.firstName ||
        !formStruct.lastName ||
        !formStruct.telephone ||
        !formStruct.address ||
        // !formStruct.city ||
        !formStruct.country ||
        formStruct.password != formStruct.passwordConfirm
      ) {
        console.log(`Form invalid`);
        return;
      }
      try {
        console.log(`Form valid, checking if user already exists`);
        // Check if user with that email already exists
        const response = await axios.get(
          `http://localhost:5000/users/${formStruct.email}`
        );
        if (response.data.UserID == null) {
          console.log(`User does not exist yet`);
          // Make role into a string
          let role;
          if (formStruct.role == 1) {
            role = "Admin";
          } else if (formStruct.role == 2) {
            role = "Patient";
          } else if (formStruct.role == 3) {
            role = "Doctor";
          } else if (formStruct.role == 4) {
            role = "HealthOfficial";
          } else if (formStruct.role == 5) {
            role = "ImmigrationOfficer";
          }
          console.log(`Role: ` + role);
          // In case of Patient, create account directly
          if (role == "Patient") {
            console.log(`Patient, creating new user`);
            await axios.post(`http://localhost:5000/user`, {
              Email: formStruct.email,
              FirstName: formStruct.firstName,
              LastName: formStruct.lastName,
              Telephone: formStruct.telephone,
              Address: formStruct.address,
              Role: role,
              Password: formStruct.password,
              // City: formStruct.city,
              Country: formStruct.country,
            });
          } else {
            console.log(
              `Role not patient, checking is account request already exists`
            );
            // If role not patient then need to make an account request instead
            // Check if a request already exists
            const requestExistResponse = await axios.get(
              `http://localhost:5000/accountRequest/${formStruct.email}`
            );
            if (requestExistResponse.data.Email == null) {
              console.log(`Account request does not already exist, creating`);
              const currentDate = new Date();
              const year = currentDate.getFullYear();
              const month = currentDate.getMonth() + 1;
              const day = currentDate.getDate();
              const hour = currentDate.getHours();
              const minute = currentDate.getMinutes();
              await axios.post(`http://localhost:5000/accountRequest`, {
                Email: formStruct.email,
                FirstName: formStruct.firstName,
                LastName: formStruct.lastName,
                Telephone: formStruct.telephone,
                Address: formStruct.address,
                Role: role,
                Password: formStruct.password,
                // City: formStruct.city,
                Country: formStruct.country,
                Date:
                  "" +
                  year +
                  "-" +
                  (month < 10 ? "0" : "") +
                  month +
                  "-" +
                  (day < 10 ? "0" : "") +
                  day,
                Time:
                  "" +
                  (hour < 10 ? "0" : "") +
                  hour +
                  ":" +
                  (minute < 10 ? "0" : "") +
                  minute,
              });
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
<style></style>
