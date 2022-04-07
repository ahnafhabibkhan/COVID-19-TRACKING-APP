<template>
  <v-row justify="center">
    <!-- Dialog for appointment requests with patients -->
    <v-dialog v-model="appointment_dialog" width="600px">
      <v-card>
        <v-container>
          <v-row>
            <v-col cols="12" class="pa-5">
              <h1>Request Appointment With Patient</h1>
              <v-date-picker
                v-model="appointmentRequestForm.Date"
                :allowed-dates="allowedDates"
                full-width
              ></v-date-picker>
            </v-col>
            <v-col cols="12">
              <v-select
                dense
                :hide-details="true"
                label="select Patient "
                :items="patients"
                item-value="UserID"
                item-text="LastName"
                v-model="appointmentRequestForm.PID"
              >
                <template v-slot:selection="{ item }">
                  {{ item.FirstName + " " + item.LastName }}
                </template>
                <template v-slot:item="{ item }">
                  {{ item.FirstName + " " + item.LastName }}
                </template>
              </v-select>
            </v-col>
            <v-col cols="12">
              <v-menu
                ref="menu"
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    dense
                    :hide-details="true"
                    v-model="appointmentRequestForm.Time"
                    label="select time"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menu2"
                  v-model="appointmentRequestForm.Time"
                  format="24hr"
                  @click:minute="$refs.menu.save(time)"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="12">
              <v-select
                label="emergency "
                :items="[
                  { text: 'high', value: 0 },
                  { text: 'medium', value: 1 },
                  { text: 'low', value: 2 },
                ]"
                item-value="value"
                item-text="text"
                v-model="appointmentRequestForm.EmergencyLevel"
              />
            </v-col>
            <v-col cols="6">
              <v-btn
                color="error"
                block
                @click="appointment_dialog = false"
                elevation="0"
              >
                cancel
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                block
                color="success"
                elevation="0"
                @click="requestAppointmentWithPatient()"
              >
                Request
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- requested apppointments -->
    <v-col cols="12" md="7">
      <div
        style="background-color: rgba(256, 256, 256, 0.9)"
        class="pa-4 rounded-lg"
      >
        <h2>Requested Appointments:</h2>
        <div v-for="(item, i) in requestedAppointments" :key="i">
          {{ item.Date.substr(0, 10) + " -- " + item.Time }}

          <v-btn x-small @click="acceptAppointment(item)"> approve </v-btn>
          <v-btn x-small @click="onCancelAR(item)"> cancel </v-btn>
        </div>
      </div>
    </v-col>
    <!-- Own Requested apppointments -->
    <v-col cols="12" md="7">
      <div
        style="background-color: rgba(256, 256, 256, 0.9)"
        class="pa-4 rounded-lg"
      >
        <h2>Own Requested Appointments:</h2>
        <div v-for="(item, i) in ownRequestedAppointments" :key="i">
          {{ item.Date.substr(0, 10) + " -- " + item.Time }}

          <v-btn x-small @click="deleteRequested(item)"> cancel </v-btn>
        </div>
      </div>
    </v-col>
    <!-- approved apppointments -->
    <v-col cols="12" md="7">
      <div
        style="background-color: rgba(256, 256, 256, 0.9)"
        class="pa-4 rounded-lg mt-5"
      >
        <h2>Appointments:</h2>
        <div v-for="(item, i) in appointments" :key="i">
          {{
            item.Date.substr(0, 10) +
            " -- " +
            item.Time +
            " Priority: " +
            item.Priority +
            " Emergency level: " +
            item.LevelOfEmergency
          }}

          <v-btn x-small @click="deleteApproved(item)"> cancel </v-btn>
        </div>
      </div>
    </v-col>

    <v-col cols="12" justify="center">
      <div class="my-6" style="text-align: center">
        <v-btn
          class="white--text"
          color="blue lighten-2"
          @click="appointment_dialog = !appointment_dialog"
          >Request Appointment with Patient</v-btn
        >
      </div>
    </v-col>
  </v-row>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "ListOfAppointments",
  data() {
    return {
      menu2: false,
      url: "http://localhost:5001/",
      patients: [],
      appointments: [],
      appointment_dialog: false,
      requestedAppointments: [],
      ownRequestedAppointments: [],
      appointmentRequestForm: {
        PID: 0,
        Date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        Time: null,
        EmergencyLevel: 0,
        Priority: 0,
      },
    };
  },
  methods: {
    onCancelAR(item) {
      Swal.fire({
        title: "cancel ?",
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          this.cancelAppointmentRequest(
            item.PID,
            item.DID,
            item.Date.substr(0, 10),
            item.Time
          );
          this.addNotif(
            `Appointment request[${
              item.Date.substr(0, 10) + " - " + item.Time
            }] deleted!`,
            item.DID
          );
          this.addNotif(
            `Appointment request[${
              item.Date.substr(0, 10) + " - " + item.Time
            }] deleted!`,
            item.PID
          );
          window.location.reload();
        }
      });
    },
    // Request an appointment with a patient
    requestAppointmentWithPatient() {
      this.requestAppointment();
      this.appointment_dialog = false;
      // window.location.reload();
    },

    allowedDates() {
      return true;
    },

    //Accept appointment
    acceptAppointment(item) {
      Swal.fire({
        title: "Are you sure?",
        text: "approve ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          this.approveAppointment(
            item.PID,
            item.DID,
            item.Date.substr(0, 10),
            item.Time,
            item.LevelOfEmergency,
            item.Priority
          );
          this.addNotif(
            `Appointment[${
              item.Date.substr(0, 10) + " - " + item.Time
            }] approved!`,
            item.DID
          );
          this.addNotif(
            `Appointment[${
              item.Date.substr(0, 10) + " - " + item.Time
            }] approved!`,
            item.PID
          );
          window.location.reload();
        }
      });
    },

    // Delete own requested appointment
    deleteRequested(item) {
      Swal.fire({
        title: "cancel ?",
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          this.cancelAppointmentRequest(
            item.PID,
            item.DID,
            item.Date.substr(0, 10),
            item.Time
          );
          this.addNotif(
            `Appointment resquest[${
              item.Date.substr(0, 10) + " - " + item.Time
            }] deleted!`,
            item.DID
          );
          this.addNotif(
            `Appointment resquest[${
              item.Date.substr(0, 10) + " - " + item.Time
            }] deleted!`,
            item.PID
          );
          window.location.reload();
        }
      });
    },

    //Delete Approved Appointment
    deleteApproved(item) {
      Swal.fire({
        title: "cancel ?",
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          this.cancelAppointment(
            item.PID,
            item.DID,
            item.Date.substr(0, 10),
            item.Time
          );
          this.addNotif(
            `Appointment request[${
              item.Date.substr(0, 10) + " - " + item.Time
            }] deleted!`,
            item.DID
          );
          this.addNotif(
            `Appointment request[${
              item.Date.substr(0, 10) + " - " + item.Time
            }] deleted!`,
            item.PID
          );
          window.location.reload();
        }
      });
    },

    // Get appointments
    async getAppointments() {
      try {
        const res = await axios.post(`http://localhost:5001/appointments`, {
          DID: this.$store.state.user.UserID,
        });
        this.appointments = res.data;
      } catch (err) {
        console.log(err);
      }
    },
    // Get patients
    async getPatients() {
      try {
        const res = await axios.post(`http://localhost:5001/users`, {
          Role: "Patient",
        });
        this.patients = res.data;
      } catch (err) {
        console.log(err);
      }
    },

    // Get appointment requests
    async getAppointmentRequests() {
      try {
        const res = await axios.post(
          `http://localhost:5001/appointmentrequests`,
          {
            DID: this.$store.state.user.UserID,
            RequestedBy: "P",
          }
        );
        this.requestedAppointments = res.data;
      } catch (err) {
        console.log(err);
      }
    },

    // Approve an appointment
    async approveAppointment(PID, DID, Date, Time, LevelOfEmergency, Priority) {
      try {
        this.cancelAppointmentRequest(PID, DID, Date, Time);
        await axios.post(`http://localhost:5001/appointment`, {
          PID: PID,
          DID: DID,
          Date: Date,
          Time: Time,
          LevelOfEmergency: LevelOfEmergency,
          Priority: Priority,
        });

        this.addNotif(
          `  appointment on [${Date + "-" + Time}] was approved`,
          PID
        );
      } catch (err) {
        console.log(err);
      }
    },

    // Cancel an appointment
    async cancelAppointment(PID, DID, Date, Time) {
      try {
        await axios.post(`http://localhost:5001/deleteappointment`, {
          PID: PID,
          DID: DID,
          Date: Date,
          Time: Time,
        });

        this.addNotif(
          `an appointment[${Date + " - " + Time}] is booked for you by doctor`,
          PID
        );
      } catch (err) {
        console.log(err);
      }
    },

    // Cancel an appointment request
    async cancelAppointmentRequest(PID, DID, Date, Time) {
      try {
        await axios.post(`http://localhost:5001/deleteappointmentrequest`, {
          PID: PID,
          DID: DID,
          Date: Date,
          Time: Time,
        });

        // added by me
        this.addNotif(
          `Your requested appointment on [${Date + "-" + Time}] was declined`,
          PID
        );
      } catch (err) {
        console.log(err);
      }
    },

    // Request appointment with patient
    async requestAppointment() {
      try {
        const Date = this.appointmentRequestForm.Date.toString();
        // const Time = this.appointmentRequestForm.Hour.toString().concat(
        //   ":",
        //   this.appointmentRequestForm.Minute.toString()
        // );
        const Time = this.appointmentRequestForm.Time;
        const RequestedBy = "D";
        const DID = this.$store.state.user.UserID;
        const PID = parseInt(this.appointmentRequestForm.PID);
        const covidStatusInt = await axios.get(
          `http://localhost:5001/healthstatus/${PID}`
        );
        await axios.post(`http://localhost:5001/appointmentrequest`, {
          PID: PID,
          DID: DID,
          Date: Date,
          Time: Time,
          RequestedBy: RequestedBy,
          LevelOfEmergency: parseInt(
            this.appointmentRequestForm.EmergencyLevel
          ),
          Priority: covidStatusInt.data.Covid,
        });

        this.addNotif(
          `an appointment on[${Date + "-" + Time}]is booked for you by doctor`,
          parseInt(this.appointmentRequestForm.PID)
        );
      } catch (err) {
        console.log(err);
      }
      // window.location.reload();
      this.init();
    },

    // Get appointment requests made by this doctor
    async getOwnAppointmentRequests() {
      try {
        const res = await axios.post(
          `http://localhost:5001/appointmentrequests`,
          {
            DID: this.$store.state.user.UserID,
            RequestedBy: "D",
          }
        );
        this.ownRequestedAppointments = res.data;
      } catch (err) {
        console.log(err);
      }
    },
    async addNotif(Message, Recipient) {
      let d = new Date();
      let Time = d.toTimeString().split(" ")[0];
      const params = {
        Message,
        Recipient,
        Read: 0,
        Time,
      };
      try {
        await axios.post(this.url + "notification", params);
        // alert("statuse added successfully");
        this.getStatuses();
        this.status_dialoge = false;
      } catch (err) {
        console.log("err", err);
        // alert("Failed ; add new status");
      }
    },
    init() {
      this.getPatients();
      this.getAppointments();
      this.getAppointmentRequests();
      this.getOwnAppointmentRequests();
    },
  },
  mounted() {
    this.init();

    this.$emit("img", "doctor");
  },
};
</script>
