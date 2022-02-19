// layouts
import authLayout from "../layout/auth.vue";
import defaultLayout from "../layout/default.vue";
import HealthOfficialLayout from "../layout/HealthOfficialLayout.vue";
import DoctorLayout from "../layout/DoctorLayout.vue";
import AdminLayout from "../layout/AdminLayout.vue";
import PatientLayout from "../layout/PatientLayout.vue";
// pages
import Login from "../login/Login.vue";
import Doctor from "../doctor/Doctor.vue";
import DoctorListOfPatients from "../doctor/ListOfDoctorPatients.vue";
import Patient from "../patient/Patient.vue";
import Profile from "../user-profile/profile-page.vue";

import ImmigrationOfficer from "../immigration-officer/ImmigrationOfficer.vue";
import HealthOfficial from "../health-official/HealthOfficial.vue";
import HealthOfficialListOfPatients from "../health-official/ListOfHOPatients.vue";
import Admin from "../admin/Admin.vue";
import AdminListOfPatients from "../admin/ListOfAdminPatients.vue";

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
      {
        path: "/doctor-layout",
        component: DoctorLayout,
        children: [
          { path: "/doctor", component: Doctor },
          { path: "/doctor-patients-list", component: DoctorListOfPatients },
          
        ],
      },
      {
        path: "/patient-layout",
        component: PatientLayout,
        children: [{ path: "/patient", component: Patient }],
      },
      { path: "/profile", component: Profile },
      { path: "/immigration-officer", component: ImmigrationOfficer },
      {
        path: "/health-official-layout",
        component: HealthOfficialLayout,
        children: [
          { path: "/health-official", component: HealthOfficial },
          {
            path: "/health-official-patients-list",
            component: HealthOfficialListOfPatients,
          },
        ],
      },
      {
        path: "/admin-layout",
        component: AdminLayout,
        children: [
          { path: "/admin", component: Admin },
          { path: "/admin-patients-list", component: AdminListOfPatients },
        ],
      },
    ],
  },
  // {path: '/', component: Login},
  // {path: '/doctor', component: Doctor},
  // {path: '/patient', component: Patient},
  // {path: '/immigration-officer', component: ImmigrationOfficer},
  // {path: '/health-official', component: HealthOfficial},
  // {path: '/admin', component: Admin},
];
