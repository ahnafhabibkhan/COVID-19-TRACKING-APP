<template>
  <div class="fill-height bg-image">
    <v-row
      no-gutters
      class="fill-height"
      align="center"
      justify="center">
      <v-form
        @submit.prevent="verify"
        v-model="valid"
        class="px-4"
        style="width: 100%">
        <v-card
          elevation="6"
          class="mx-auto pa-6 my-12 justify-center"
          width="100%"
          max-width="600">
          <v-card-title class="justify-center">
            <h1 class="text-center">
              Create an Account
            </h1>
          </v-card-title>
          <v-divider class="ma-4" />
          <v-card-text class="px-5">
            <h3 class="text-center mb-4">
              Account Information
            </h3>
            <v-text-field
              outlined
              hide-details
              dense
              v-model="email"
              class="mb-4"
              type="email"
              placeholder="E-mail"
              :rules="emailRules" />
            <v-text-field
              outlined
              hide-details
              dense
              v-model="password"
              class="mb-8"
              type="password"
              placeholder="Password (Minimum 8 Characters)"
              :rules="passLength" />
            <h3 class="text-center mb-4">
              Profile Information
            </h3>
            <v-text-field
              outlined
              hide-details
              dense
              v-model="username"
              class="mb-4"
              type="text"
              placeholder="Username"
              :rules="required" />
            <v-text-field
              outlined
              hide-details
              dense
              v-model="name"
              class="mb-4"
              type="text"
              placeholder="Name (Optional)" />
            <v-text-field
              outlined
              hide-details
              dense
              v-model="website"
              class="mb-4"
              type="url"
              placeholder="Website (Optional)" />
            <v-textarea
              outlined
              hide-details
              dense
              no-resize
              v-model="bio"
              class="mb-4"
              type="text"
              rows="3"
              placeholder="Bio (Optional)" />
          </v-card-text>
          <v-card-actions class="pb-0">
            <v-col>
              <v-btn
                large
                block
                depressed
                :disabled="!valid"
                :loading="progress"
                type="submit"
                color="primary"
                class="mt-n2">
                Create an Account
              </v-btn>
              <v-btn
                :to="{ name: 'landing' }"
                exact
                block
                text
                class="mt-4">
                Go Back
              </v-btn>
            </v-col>
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
import { mapActions } from 'vuex';
import isUrl from 'is-url';

export default {
  name: 'SignUp',

  data() {
    return {
      progress: false,
      valid: false,
      snackbar: false,
      error: 'OOPS! Something went wrong...',
      email: null,
      password: null,
      username: null,
      name: null,
      bio: null,
      website: null,
      required: [
        value => (value && value.trim().length > 0) || 'This field is required',
      ],
      passLength: [
        value => (value && value.trim().length >= 8) || 'Password must be at least 8 characters long',
      ],
      emailRules: [
        value => (value && value.trim().length >= 0 && isEmail(value)) || 'Email Invalid',
      ],
    };
  },

  methods: {
    ...mapActions('auth', ['getUser', 'updateProfile']),

    verify() {
      this.progress = true;

      this.username = this.username.trim().toLowerCase().replace(/ /gi, '-').replace(/--/gi, '-');
      this.name = this.name ? this.name.trim() : null;
      this.website = this.website ? this.website.trim().toLowerCase() : null;
      this.bio = this.bio ? this.bio.trim() : null;

      if (this.website && this.website.substring(0, 8) !== 'https://' && this.website.substring(0, 7) !== 'http://') {
        this.website = `https://${this.website}`;
      }

      if (!isUrl(this.website)) {
        this.website = null;
      }

      this.$firebase.firestore().collection('users')
        .where('username', '==', this.username)
        .limit(1)
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            this.progress = false;
            this.error = 'Username is already taken. Please choose a different one.';
            this.snackbar = true;
          } else {
            this.signUp();
          }
        })
        .catch((err) => {
          this.progress = false;
          this.error = err.message;
          this.snackbar = true;
        });
    },

    signUp() {
      this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(({ user }) => {
          this.getDetails(user.uid).then(() => {
            this.progress = false;
          });
        })
        .catch((err) => {
          this.progress = false;
          this.error = err.message;
          this.snackbar = true;
        });
    },

    getDetails(uid) {
      return new Promise((resolve) => {
        this.getUser(uid)
          .then(() => {
            const values = {
              username: this.username,
              bio: this.bio ? this.bio : '',
              name: this.name ? this.name : '',
              website: this.website ? this.website : '',
            };
            this.$firebase.firestore().collection('users').doc(uid).update(values);
            this.updateProfile(values);
            this.$router.replace({ name: 'feed' });
            resolve();
          })
          .catch(() => {
            setTimeout(() => {
              this.getDetails(uid).then(() => {
                resolve();
              });
            }, 1000);
          });
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
