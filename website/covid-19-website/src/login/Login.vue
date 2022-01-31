<template>
  <div class="login">
    <div class="navbar">
      <v-toolbar-items>
        <v-btn
          class="btn"
          v-for="item in nav"
          :key="item.icon"
          :title="item.title"
          text
          color="white"
          x-large
          >{{ item.text }}</v-btn
        >
      </v-toolbar-items>
    </div>
    <div class="main">
      <p class="main-title">COVID-19 TRACKER</p>
      <p class="main-middle-text">
        Stay Alert, Control the Virus, and Save Lives!
      </p>
      <center>
        <v-btn class="main-btn">Sign In</v-btn>
      </center>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      nav: [
        {
          icon: "info",
          text: "About",
          title: "About this demo",
          active: true,
        },
        {
          icon: "email",
          text: "Contact",
          title: "Our Contact info",
          active: true,
        },
        {
          icon: "info",
          text: "Sign In",
          title: "Click to sign in",
          active: true,
        },
        {
          icon: "info",
          text: "Sign Up",
          title: "Click to sign up",
          active: true,
        },
      ],
    };
  },
};
</script>

<style>
.login {
  background-image: url("../assets/CovidTrackingApp.png");
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100%;
  min-width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.navbar {
  margin-top: 15px;
  float: right;
}
.btn {
  margin-left: 35px;
  margin-right: 20px;
  font-size: 25px;
  color: antiquewhite;
  font-weight: 500;
  font-family: Arial, Helvetica, sans-serif;
}
.main-title {
  font-size: 75px;
  font-weight: 500;
  font-family: Arial, Helvetica, sans-serif;
  color: antiquewhite;
  text-align: center;
}
.main-middle-text {
  text-align: center;
  font-size: 25px;
  font-weight: 500;
  font-family: Arial, Helvetica, sans-serif;
  color: antiquewhite;
}
.main {
  margin-top: 300px;
  margin-left: 200px;
  width: 40%;
}
.main-btn {
  margin-top: 40px;
  font-size: 25px;
  font-weight: 500;
  font-family: Arial, Helvetica, sans-serif;
  color: antiquewhite;
}
</style>
