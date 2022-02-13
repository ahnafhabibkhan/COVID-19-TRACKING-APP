import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import Routes from "./router/index.js";
import VueApexCharts from 'vue-apexcharts'
// import store - added by mansi
import store from './store/index'

Vue.use(VueRouter);
Vue.use(VueApexCharts);

Vue.component('apexchart', VueApexCharts)

const router = new VueRouter({
  routes: Routes,
  mode: 'history',
});


Vue.config.productionTip = false;

new Vue({
  // added by mansi
  store,
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");