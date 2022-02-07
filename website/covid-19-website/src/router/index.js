// layouts
import authLayout from "../layout/auth.vue";
import defaultLayout from "../layout/default.vue";
// pages
import Login from "../login/Login.vue";
import Doctor from "../doctor/Doctor.vue";
import Patient from "../patient/Patient.vue";
import Profile from "../user-profile/profile-page.vue";

import ImmigrationOfficer from "../immigration-officer/ImmigrationOfficer.vue";
import HealthOfficial from "../health-official/HealthOfficial.vue";
import Admin from "../admin/Admin.vue";

export default [
  {
    path: "/",
    component: authLayout,
    children: [{ path: "", component: Login }],
  },
  {
    path: "",
    component: defaultLayout,
    children: [
      { path: "/doctor", component: Doctor },
      { path: "/patient", component: Patient },
      { path: "/profile", component: Profile },
      { path: "/immigration-officer", component: ImmigrationOfficer },
      { path: "/health-official", component: HealthOfficial },
      { path: "/admin", component: Admin },
    ],
  },
  // {path: '/', component: Login},
  // {path: '/doctor', component: Doctor},
  // {path: '/patient', component: Patient},
  // {path: '/immigration-officer', component: ImmigrationOfficer},
  // {path: '/health-official', component: HealthOfficial},
  // {path: '/admin', component: Admin},

];
