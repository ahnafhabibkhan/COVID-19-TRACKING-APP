<template>
  <div class="fill-height bg-image">
    <v-row
      no-gutters
      class="fill-height"
      align="center"
      justify="center">
      <v-form
        @submit.prevent="sendResetEmail"
        v-model="valid"
        class="px-4"
        style="width: 100%">
        <v-card
          elevation="6"
          class="mx-auto pa-6 my-12 justify-center"
          width="100%"
          max-width="380">
          <v-card-text class="px-5">
            <v-img
              src="@/assets/forgot-password.png"
              height="110"
              contain />
            <h3 class="text-center mb-2 mt-3">
              Troube Logging In?
            </h3>
            <h4
              class="text-center mb-6"
              style="color: grey">
              Enter your username or email and we'll send you a link to get back into your account.
            </h4>
            <v-text-field
              outlined
              hide-details
              dense
              v-model="email"
              class="mb-4"
              type="email"
              placeholder="E-mail"
              :rules="emailRules" />
            <v-btn
              block
              depressed
              :disabled="!valid"
              :loading="progress"
              type="submit"
              color="primary">
              Reset Password
            </v-btn>
          </v-card-text>
          <v-card-actions>
            <v-btn
              :to="{ name: 'landing' }"
              exact
              block
              text>
              Go Back
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-row>
    <v-snackbar
      v-model="snackbar"
      bottom
      color="error"
      class="mb-6"
      style="position:fixed;">
      <span class="white--text">{{ error }}</span>
      <v-btn
        dark
        text
        @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>


<script>
import isEmail from 'is-email';

export default {
  name: 'ForgotPasword',
  data() {
    return {
      progress: false,
      valid: false,
      snackbar: false,
      error: 'OOPS! Something went wrong...',
      email: null,
      emailRules: [
        value => (value && value.trim().length >= 0 && isEmail(value)) || 'Email Invalid',
      ],
    };
  },
  methods: {
    sendResetEmail() {
      this.progress = true;
      this.$firebase.auth().sendPasswordResetEmail(this.email).then(() => {
        console.log('Email sent');
        this.progress = false;
      }).catch((err) => {
        console.log('Email not sent');
        this.progress = false;
        this.error = err.message;
        this.snackbar = true;
      });
    },
  },
};
</script>

<style scoped>
  .bg-image{
    background-image: url("https://source.unsplash.com/collection/151521/3840x2160");
    background-size: cover;
    background-repeat: no-repeat;
  }
</style>
