<template>
  <div class="admin">
    <div class="left-side-admin">
      <v-row align="center">
        <v-col cols="12" sm="6">
          <div class="btn-container">
            <div class="my-6 mx-3">
              <v-btn
                class="white--text"
                style="font-size: 18px; opacity: 90%"
                color="blue lighten-2"
                width="400px"
                height="75px"
                >Dashboard</v-btn
              >
            </div>
            <div class="my-6 mx-3">
              <v-btn
                class="white--text"
                style="font-size: 18px; opacity: 90%"
                color="blue lighten-2"
                width="400px"
                height="75px"
                >List Of Patients</v-btn
              >
            </div>
            <div class="my-6 mx-3">
              <v-btn
                class="white--text"
                style="font-size: 18px; opacity: 90%"
                color="blue lighten-2"
                width="400px"
                height="75px"
                >List Of Doctors</v-btn
              >
            </div>
            <div class="my-6 mx-3">
              <v-btn
                class="white--text"
                style="font-size: 18px; opacity: 90%"
                color="blue lighten-2"
                width="400px"
                height="75px"
                >List Of Health Officials</v-btn
              >
            </div>
            <div class="my-6 mx-3">
              <v-btn
                class="white--text"
                style="font-size: 18px; opacity: 90%"
                color="blue lighten-2"
                width="400px"
                height="75px"
                >List Of Immigration Officials</v-btn
              >
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="right-side-admin">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.firstName"
              label="firstname"
              :autocomplete="false"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.lastName" label="lastName" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.email" label="email" type="email" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.telephone" label="phone" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.bithDate"
              label="birthDate"
              type="date"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              item-text="title"
              item-value="value"
              :items="roles"
              label="role"
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.password"
              label="password"
              type="password"
            />
          </v-col>

          <v-col cols="12">
            <div class="d-flex justify-center">
              <v-btn @click="save" width="150px" class="mx-2">save</v-btn>
              <v-btn @click="back" width="150px">cancel</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
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
  methods: {
    back() {
      this.$router.go(-1);
    },

    async save() {
      try {
        const res = await this.$axios.put(
          "http://localhost:5000/profile/${id}",
          this.form
        );
        console.log("successsfull upadated", res);
      } catch (err) {
        console.log("error ; save profile", err);
      }
    },
    async get() {
      const id = this.$route.params.id;
      try {
        const res = await this.$axios.get(
          `http://localhost:5000/profile/${id}`
        );
        console.log("successsfull upadated", res);
        this.form = res;
      } catch (err) {
        console.log("error ; save profile", err);
      }
    },
  },
  mounted() {
    this.get();
  },
};
</script>

<style>
.admin {
  background-image: url("../assets/Admin.png");
  min-height: 100%;
  min-width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.left-side-admin {
  width: 50%;
  height: 1000px;
  /* border: 5px solid red; */
  float: left;
}
.btn-container {
  /* border: 5px solid red; */
  padding-top: 25px;
  margin-top: 100px;
  margin-left: 45%;
  margin-right: auto;
  width: 58%;
  height: 40%;
}
.right-side-admin {
  margin-top: 150px;
  padding-right: 70px;
  float: right;
  height: 1000px;
  width: 50%;

  /* border: 5px solid red; */
}
</style>
