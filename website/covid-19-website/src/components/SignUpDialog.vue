<template>
  <v-card
    elevation="15"
    width="500px"
    color="accent"
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
        <v-col cols="12" md="6">
          <v-text-field
            dense
            hide-details
            label="First Name"
            v-model="form.firstName"
            outlined
            background-color="white"
            :autocomplete="false"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            dense
            hide-details
            background-color="white"
            label="Last Name"
            v-model="form.lastName"
            outlined
            :autocomplete="false"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            dense
            hide-details
            background-color="white"
            label="Email"
            v-model="form.email"
            type="email"
            outlined
            :autocomplete="false"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            dense
            hide-details
            background-color="white"
            label="Telephone Number"
            v-model="form.telephone"
            type="phone"
            outlined
            :autocomplete="false"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            dense
            hide-details
            background-color="white"
            label="Address"
            v-model="form.address"
            outlined
            :autocomplete="false"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            dense
            hide-details
            background-color="white"
            label="City"
            v-model="form.city"
            outlined
            :autocomplete="false"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            dense
            hide-details
            background-color="white"
            label="Country"
            v-model="form.country"
            outlined
            :autocomplete="false"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            dense
            hide-details
            background-color="white"
            label="BirthDate"
            v-model="form.birthDate"
            type="date"
            outlined
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            dense
            hide-details
            background-color="white"
            v-model="form.role"
            item-text="title"
            item-value="value"
            :items="roles"
            label="Role"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            dense
            hide-details
            background-color="white"
            v-model="form.password"
            label="Password"
            type="password"
            outlined
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            dense
            hide-details
            background-color="white"
            v-model="form.passwordConfirm"
            label="Confirm Password"
            type="password"
            outlined
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-btn @click="onCancel" block color="primary">cancel</v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <v-btn @click="signupUser(form)" block color="success" class="mr-2"
            >save</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "SignUpDialog",
  data() {
    return {
      url: "http://localhost:5000/",
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
        city: null,
        country: null,
      },
    };
  },

  methods: {
    // Sign the user up
    async addNotif(Message, Recipient) {
      let d = new Date();
      let Time = d.toTimeString().split(" ")[0];
      const params = {
        Message,
        Recipient,
        Read: 0,
        Time,
      };
      try {
        await axios.post(this.url + "notification", params);
        // alert("statuse added successfully");
        this.getStatuses();
        this.status_dialoge = false;
      } catch (err) {
        console.log("err", err);
        // alert("Failed ; add new status");
      }
    },
    async signupUser(formStruct) {
      console.log(`Signup pressed`);
      // Validate form data
      if (
        !formStruct.role ||
        !formStruct.email ||
        !formStruct.password ||
        !formStruct.passwordConfirm ||
        !formStruct.firstName ||
        !formStruct.lastName ||
        !formStruct.telephone ||
        !formStruct.address ||
        !formStruct.city ||
        !formStruct.country ||
        formStruct.password != formStruct.passwordConfirm
      ) {
        alert(` invalid data entry`);
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
            Swal.fire("success!", "successfull registration.", "success");
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

              const res = await axios.post(
                `http://localhost:5000/accountRequest`,
                {
                  City: formStruct.city,
                  Email: formStruct.email,
                  FirstName: formStruct.firstName,
                  LastName: formStruct.lastName,
                  Telephone: formStruct.telephone,
                  Address: formStruct.address,
                  Role: role,
                  Password: formStruct.password,
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
                }
              );
              console.log("ddd", res);

              const id = this.$store?.state?.user?.UserID || 2;
              this.addNotif("new account request", id);
              Swal.fire("success!", "successfull account request.", "success");
            } else {
              alert("emaiL ALREADY EXIST");
            }
          }
        } else {
          alert("user with this email already exist");
        }

        this.$emit("onSaveDialogClick");
      } catch (err) {
        console.log(err);
        Swal.fire("error!", "Action Failed.", "error");
      }
    },
    onCancel(){
       this.$emit("onSaveDialogClick");
    }
  },
};
</script>
<style></style>
