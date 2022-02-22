<template>
  <div style="width: 70%; margin: auto">
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
              <form>
                <v-text-field
                  v-model="appointmentRequestForm.PID"
                  label="Enter Patient ID"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="appointmentRequestForm.Hour"
                  label="Enter hour of appointment"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="appointmentRequestForm.Minute"
                  label="Enter minute of appointment"
                  required
                ></v-text-field>
              </form>
            </v-col>
            <v-col cols="12">
              <h4>Level of Emergency:</h4>
              <v-radio-group v-model="appointmentRequestForm.EmergencyLevel">
                <v-radio label="High" value="0"> </v-radio>
                <v-radio label="Medium" value="1"> </v-radio>
                <v-radio label="Low" value="2"> </v-radio>
              </v-radio-group>
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
    <div
      style="background-color: rgba(256, 256, 256, 0.9)"
      class="pa-4 rounded-lg mb-5"
    >
      <h2>Requested Appointments:</h2>
      <div v-for="(item, i) in requestedAppointments" :key="i">
        {{ item.Date.substr(0, 10) + " -- " + item.Time }}

        <v-btn x-small @click="acceptAppointment(item)"> approve </v-btn>
      </div>
    </div>
    <!-- Own Requested apppointments -->
    <div
      style="background-color: rgba(256, 256, 256, 0.9)"
      class="pa-4 rounded-lg mb-5"
    >
      <h2>Own Requested Appointments:</h2>
      <div v-for="(item, i) in ownRequestedAppointments" :key="i">
        {{ item.Date.substr(0, 10) + " -- " + item.Time }}

        <v-btn x-small @click="deleteRequested(item)"> cancel </v-btn>
      </div>
    </div>
    <!-- approved apppointments -->
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
    <v-row align="center">
      <v-col>
        <div class="my-6" style="text-align: center">
          <v-btn
            class="white--text"
            style="font-size: 18px;"
            color="blue lighten-2"
            width="400px"
            height="75px"
            @click="appointment_dialog = !appointment_dialog"
            >Request Appointment with Patient</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "ListOfAppointments",
  data() {
    return {
      appointments: [],
      appointment_dialog: false,
      requestedAppointments: [],
      ownRequestedAppointments: [],
      appointmentRequestForm: {
        PID: 0,
        Date: null,
        Hour: 0,
        Minute: 0,
        EmergencyLevel: 0,
        Priority: 0,
      },
    };
  },
  methods: {
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
      this.approveAppointment(
        item.PID,
        item.DID,
        item.Date.substr(0, 10),
        item.Time,
        item.LevelOfEmergency,
        item.Priority
      );
      window.location.reload();
    },

    // Delete own requested appointment
    deleteRequested(item) {
      this.cancelAppointmentRequest(
        item.PID,
        item.DID,
        item.Date.substr(0, 10),
        item.Time
      );
      window.location.reload();
    },

    //Delete Approved Appointment
    deleteApproved(item) {
      this.cancelAppointment(
        item.PID,
        item.DID,
        item.Date.substr(0, 10),
        item.Time
      );
      window.location.reload();
    },

    // Get appointments
    async getAppointments() {
      try {
        const res = await axios.post(`http://localhost:5000/appointments`, {
          DID: this.$store.state.user.UserID,
        });
        this.appointments = res.data;
      } catch (err) {
        console.log(err);
      }
    },

    // Get appointment requests
    async getAppointmentRequests() {
      try {
        const res = await axios.post(
          `http://localhost:5000/appointmentrequests`,
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
        await axios.post(`http://localhost:5000/appointment`, {
          PID: PID,
          DID: DID,
          Date: Date,
          Time: Time,
          LevelOfEmergency: LevelOfEmergency,
          Priority: Priority,
        });
      } catch (err) {
        console.log(err);
      }
    },

    // Cancel an appointment
    async cancelAppointment(PID, DID, Date, Time) {
      try {
        await axios.post(`http://localhost:5000/deleteappointment`, {
          PID: PID,
          DID: DID,
          Date: Date,
          Time: Time,
        });
      } catch (err) {
        console.log(err);
      }
    },

    // Cancel an appointment request
    async cancelAppointmentRequest(PID, DID, Date, Time) {
      try {
        await axios.post(`http://localhost:5000/deleteappointmentrequest`, {
          PID: PID,
          DID: DID,
          Date: Date,
          Time: Time,
        });
      } catch (err) {
        console.log(err);
      }
    },

    // Request appointment with patient
    async requestAppointment() {
      try {
        const Date = this.appointmentRequestForm.Date.toString();
        const Time = this.appointmentRequestForm.Hour.toString().concat(
          ":",
          this.appointmentRequestForm.Minute.toString()
        );
        const RequestedBy = "D";
        const DID = this.$store.state.user.UserID;
        const PID = parseInt(this.appointmentRequestForm.PID);
        const covidStatusInt = await axios.get(
          `http://localhost:5000/healthstatus/${PID}`
        );
        await axios.post(`http://localhost:5000/appointmentrequest`, {
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
      } catch (err) {
        console.log(err);
      }
    },

    // Get appointment requests made by this doctor
    async getOwnAppointmentRequests() {
      try {
        const res = await axios.post(
          `http://localhost:5000/appointmentrequests`,
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
  },
  mounted() {
    this.getAppointments();
    this.getAppointmentRequests();
    this.getOwnAppointmentRequests();
  },
};
</script>
<style></style>
