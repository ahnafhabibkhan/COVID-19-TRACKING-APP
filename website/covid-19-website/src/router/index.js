// layouts
import authLayout from "../layout/auth.vue";
import defaultLayout from "../layout/default.vue";

// pages
import Login from "../login/Login.vue";
// import Doctor from "../doctor/Doctor.vue";
const Doctor = () => import('../doctor/Doctor.vue')
// import DoctorListOfPatients from "../doctor/ListOfDoctorPatients.vue";
const DoctorListOfPatients = () => import("../doctor/ListOfDoctorPatients.vue")

// import ListOfAppointments from "../doctor/ListOfAppointments.vue";
const ListOfAppointments = () => import('../doctor/ListOfAppointments.vue')
// import Patient from "../patient/Patient.vue";
const Patient = () => import('../patient/Patient.vue')
// import Profile from "../user-profile/profile-page.vue";
const Profile = () => import('../user-profile/profile-page.vue')
import ImmigrationOfficer from "../immigration-officer/ImmigrationOfficer.vue";
import HealthOfficial from "../health-official/HealthOfficial.vue";
import HealthOfficialListOfPatients from "../health-official/ListOfHOPatients.vue";
import Admin from "../admin/Admin.vue";
import AdminListOfPatients from "../admin/ListOfAdminPatients.vue";
import AdminListOfAccounts from "../admin/ListOfAccountRequests.vue";
import Dashboard from "../admin/Dashboard.vue";

// import ImmigrationOfficer from "../immigration-officer/ImmigrationOfficer.vue";
const ImmigrationOfficer = () => import('../immigration-officer/ImmigrationOfficer.vue')
// import HealthOfficial from "../health-official/HealthOfficial.vue";
const HealthOfficial = () => import('../health-official/HealthOfficial.vue')
// import HealthOfficialListOfPatients from "../health-official/ListOfHOPatients.vue";
const HealthOfficialListOfPatients = () => import('../health-official/ListOfHOPatients.vue')
// import Admin from "../admin/Admin.vue";
const Admin = () => import('../admin/Admin.vue')
// import AdminListOfPatients from "../admin/ListOfAdminPatients.vue";
const AdminListOfPatients = () => import("../admin/ListOfAdminPatients.vue")
// import Dashboard from "../admin/Dashboard.vue";
const Dashboard = () => import('../admin/Dashboard.vue')
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
      { path: "/doctor-patients-list", component: DoctorListOfPatients },
      { path: "/list-of-appointments", component: ListOfAppointments },

      { path: "/patient", component: Patient },
      { path: "/profile", component: Profile },
      { path: "/immigration-officer", component: ImmigrationOfficer },

      { path: "/health-official", component: HealthOfficial },

      { path: "/health-official", component: HealthOfficial },
      {
        path: "/health-official-patients-list",
        component: HealthOfficialListOfPatients,
      },



      { path: "/admin", component: Admin },
      { path: "/admin-patients-list", component: AdminListOfPatients },
      { path: "/admin-dashboard", component: Dashboard },
      { path: "/admin-account-requests-list", component: AdminListOfAccounts },


      { path: "/admin", component: Admin },
      { path: "/admin-patients-list", component: AdminListOfPatients },
      { path: "/admin-dashboard", component: Dashboard },
    ],
  },
  // {path: '/', component: Login},
  // {path: '/doctor', component: Doctor},
  // {path: '/patient', component: Patient},
  // {path: '/immigration-officer', component: ImmigrationOfficer},
  // {path: '/health-official', component: HealthOfficial},
  // {path: '/admin', component: Admin},
];
