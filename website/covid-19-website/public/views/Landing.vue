<template>
  <div class="full-size">
    <v-img
      src="https://source.unsplash.com/collection/151521/3840x2160"
      class="fill-screen" />
    <v-row
      no-gutters
      class="fill-height"
      align="center"
      justify="center">
      <v-container>
        <v-form
          @submit.prevent="login"
          class="px-4">
          <v-card
            elevation="6"
            class="pa-6 mx-auto my-12"
            style="max-width: 500px;">
            <v-card-title class="justify-center text-center">
              <h1 class="mb-10 text-center">
                Welcome to
                <v-img
                  src="@/assets/text-logo.svg"
                  height="5rem"
                  contain />
              </h1>
            </v-card-title>
            <v-card-subtitle class="justify-center text-center pa-0">
              <v-btn
                @click="facebook"
                color="facebook"
                :loading="fbProgress"
                depressed
                dark
                rounded
                large>
                <v-icon
                  dark
                  class="mr-3">
                  mdi-facebook
                </v-icon>
                Sign In with Facebook
              </v-btn>
              <v-btn
                @click="google"
                class="mt-4"
                color="google"
                :loading="googleProgress"
                depressed
                dark
                rounded
                large>
                <v-icon
                  dark
                  class="mr-3">
                  mdi-google
                </v-icon>
                Sign In with Google
              </v-btn>
              <p class="md-font my-6">
                OR
              </p>
            </v-card-subtitle>
            <v-card-text>
              <v-text-field
                v-model="email"
                class="mb-4"
                outlined
                rounded
                hide-details
                type="email"
                placeholder="E-mail" />
              <v-text-field
                v-model="password"
                outlined
                rounded
                hide-details
                type="password"
                placeholder="Password" />
            </v-card-text>
            <v-card-actions class="pt-0">
              <v-col class="text-center">
                <v-btn
                  block
                  text
                  rounded
                  class="mb-4 text-none"
                  :to="{ name: 'reset' }">
                  Forgot your password?
                </v-btn>
                <v-btn
                  large
                  block
                  depressed
                  rounded
                  type="submit"
                  :loading="progress"
                  :disabled="!valid"
                  color="primary"
                  class="mb-4">
                  Sign In
                </v-btn>
                <v-btn
                  block
                  large
                  outlined
                  rounded
                  color="primary"
                  :to="{ name: 'signup' }">
                  Create an Account
                </v-btn>
              </v-col>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-container>
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
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Landing',
  data() {
    return {
      snackbar: false,
      email: null,
      password: null,
      progress: false,
      fbProgress: false,
      googleProgress: false,
      error: 'Sorry, your login information was incorrect.',
    };
  },

  computed: {
    ...mapGetters('auth', ['loggedIn']),

    valid() {
      return this.email
        && this.password
        && this.email.trim().length > 0
        && this.password.trim().length > 0;
    },
  },

  methods: {
    ...mapActions('auth', ['getUser']),

    facebook() {
      this.fbProgress = true;
      const provider = new this.$firebase.auth.FacebookAuthProvider();
      this.$firebase.auth().setPersistence(this.$firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          this.$firebase.auth().signInWithPopup(provider)
            .then(({ user }) => {
              this.getDetails(user.uid).finally(() => {
                this.fbProgress = false;
              });
            })
            .catch((err) => {
              this.fbProgress = false;
              this.error = err.message;
              this.snackbar = true;
            });
        })
        .catch((err) => {
          this.fbProgress = false;
          this.error = err.message;
          this.snackbar = true;
        });
    },

    google() {
      this.googleProgress = true;
      const provider = new this.$firebase.auth.GoogleAuthProvider();
      this.$firebase.auth().setPersistence(this.$firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          this.$firebase.auth().signInWithPopup(provider)
            .then(({ user }) => {
              this.getDetails(user.uid).finally(() => {
                this.googleProgress = false;
              });
            })
            .catch((err) => {
              this.googleProgress = false;
              this.error = err.message;
              this.snackbar = true;
            });
        })
        .catch((err) => {
          this.googleProgress = false;
          this.error = err.message;
          this.snackbar = true;
        });
    },

    login() {
      this.progress = true;
      this.$firebase.auth().setPersistence(this.$firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          this.$firebase.auth().signInWithEmailAndPassword(
            this.email.trim().toLowerCase(),
            this.password.trim(),
          )
            .then(({ user }) => {
              this.getDetails(user.uid).finally(() => {
                this.progress = false;
              });
            })
            .catch((err) => {
              this.progress = false;
              this.error = err.message;
              this.snackbar = true;
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

  created() {
    if (this.loggedIn) {
      this.$router.replace({ name: 'feed' });
    }
  },
};
</script>

<style scoped>
  .full-size {
    height: 100vh;
    width: 100%;
  }

  .fill-screen {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
