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
            <v-btn @click="signupUser(form)" width="150px" class="mx-2"
              >save</v-btn
            >
            <v-btn @click="cancelButtonAction()" width="150px">cancel</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "ForgotPassword",

  components: {},

  data() {
    return {
      form: {
        email: null,
      },
    };
  },
  methods: {
    //  The user cancel the action
    cancelButtonAction() {
      this.$emit("clicked", true);
    },
    // cancelButtonAction() {
    //   this.login_modal = true;
    // },
  },
};
</script>
