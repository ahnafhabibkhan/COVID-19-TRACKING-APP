<template>
  <v-card
    elevation="15"
    width="500"
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
            style="margin-left: auto; margin-right: auto"
            label="First Name"
            v-model="form.firstName"
            solo
            :autocomplete="false"
            full-width
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
            label="BirthDate"
            v-model="form.bithDate"
            type="date"
            solo
          ></v-text-field>

          <v-select
            item-text="title"
            item-value="value"
            :items="roles"
            label="role"
            solo
          ></v-select>

          <v-text-field
            v-model="form.password"
            label="password"
            type="password"
            solo
          />

          <div class="d-flex justify-center">
            <v-btn @click="save" width="150px" class="mx-2">save</v-btn>
            <v-btn @click="back" width="150px">cancel</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  name: "SignUpDialog",
  data() {
    return {
      roles: [
        { title: "admin", value: 1 },
        { title: "patient", value: 2 },
        { title: "doctor", value: 3 },
        { title: "health officer", value: 4 },
        { title: "immigrant officer", value: 5 },
      ],
      form: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        birthDate: null,
        telephone: null,
      },
    };
  },
};
</script>
<style></style>
