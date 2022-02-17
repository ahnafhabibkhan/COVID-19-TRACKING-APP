<template>
  <div class="doctor">
    <div class="right-side-doctor">
      <div style="margin-top: 95%; margin-left: 85%">
        <v-btn @click="ChatboxClick" icon height="80px" width="80px">
          <v-icon color="blue darken-3" style="font-size: 80px">
            mdi-message-text
          </v-icon>
        </v-btn>
      </div>
    </div>
    <div class="left-side-doctor">
      <div class="btn-container-doctor" style="margin: auto">
        <v-row align="center">
          <v-col cols="12" sm="6">
            <div>
              <v-btn
                class="white--text"
                style="font-size: 18px; opacity: 90%"
                color="blue lighten-2"
                width="400px"
                height="75px"
                @click="onPatientsClick()"
                >List Of Patients</v-btn
              >
            </div>
            <div class="my-6">
              <v-btn
                class="white--text"
                style="font-size: 18px; opacity: 90%"
                color="blue lighten-2"
                width="400px"
                height="75px"
                >List of Appointments</v-btn
              >
            </div>
            <div class="my-6">
              <v-btn
                class="white--text"
                style="font-size: 18px; opacity: 90%"
                color="blue lighten-2"
                width="400px"
                height="75px"
                >Update Availabilities</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </div>
      <div class="chart">
        <apexchart
          type="pie"
          width="480"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Doctor",

  components: {},

  data: function () {
    return {
      messages: [],
      appointments: [],
      appointmentRequestForm: {
        PID: -1,
        Day: -1,
        Month: -1,
        Year: -1,
        Hour: -1,
        Minute: -1,
      },
      chatBotMessages: [],

      series: [44, 55],
      chartOptions: {
        chart: {
          width: 580,
          type: "pie",
        },
        labels: ["Infected", "Non-Infected"],
        dataLabels: {
          style: {
            colors: ["white"],
          },
        },
        responsive: [
          {
            breakpoint: 580,
            options: {
              chart: {
                width: 400,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
    };
  },

  created() {
    this.getMessages();
    this.getAppointments();
    this.getOwnAppointmentRequests();
    this.getAppointmentRequests();
  },

  methods: {
    // Get all messages to and from this doctor's botchat
    async getMessages() {
      try {
        const DID = this.$store.state.user.UserID;
        this.messages = await axios.get(`http://localhost:5000/message/${DID}`);
      } catch (err) {
        console.log(err);
      }
    },

    // Request appointment with patient
    async requestAppointment() {
      try {
        const Date = this.appointmentRequestForm.Year.toString()
          .concat("-", this.appointmentRequestForm.Month.toString())
          .concat("-", this.appointmentRequestForm.Day.toString());
        const Time = this.appointmentRequestForm.Hour.toString().concat(
          ":",
          this.appointmentRequestForm.Minute.toString()
        );
        const RequestedBy = "D";
        const DID = this.$store.state.user.UserID;
        await axios.post(`http://localhost:5000/appointmentrequest`, {
          PID: this.appointmentRequestForm.PID,
          DID: DID,
          Date: Date,
          Time: Time,
          RequestedBy: RequestedBy,
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

    // Get appointment requests made by this doctor
    async getOwnAppointmentRequests() {
      try {
        await axios.post(`http://localhost:5000/appointmentrequests`, {
          DID: this.$store.state.user.UserID,
          RequestedBy: "D",
        });
      } catch (err) {
        console.log(err);
      }
    },

    // Get appointment requests
    async getAppointmentRequests() {
      try {
        await axios.post(`http://localhost:5000/appointmentrequests`, {
          DID: this.$store.state.user.UserID,
          RequestedBy: "P",
        });
      } catch (err) {
        console.log(err);
      }
    },

    // Get appointments
    async getAppointments() {
      try {
        await axios.post(`http://localhost:5000/appointments`, {
          DID: this.$store.state.user.UserID,
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

    // Approve an appointment
    async approveAppointment(PID, DID, Date, Time) {
      try {
        this.cancelAppointmentRequest(PID, DID, Date, Time);
        await axios.post(`http://localhost:5000/appointment`, {
          PID: PID,
          DID: DID,
          Date: Date,
          Time: Time,
        });
      } catch (err) {
        console.log(err);
      }
    },

    // Get availabilities
    async getAvailabilities() {
      try {
        await axios.get(
          `http://localhost:5000/availability/${this.$store.state.user.UserID}`
        );
      } catch (err) {
        console.log(err);
      }
    },

    // Add availability
    async addAvailability(DayOfWeek, StartTime, EndTime, SpecificDay) {
      try {
        await axios.post(`http://localhost:5000/availability`, {
          DID: this.$store.state.user.UserID,
          DayOfWeek: DayOfWeek,
          StartTime: StartTime,
          EndTime: EndTime,
          SpecificDay: SpecificDay,
        });
      } catch (err) {
        console.log(err);
      }
    },

    // Remove availability
    async removeAvailability(DayOfWeek, StartTime, EndTime, SpecificDay) {
      try {
        await axios.post(`http://localhost:5000/deleteavailability`, {
          DID: this.$store.state.user.UserID,
          DayOfWeek: DayOfWeek,
          StartTime: StartTime,
          EndTime: EndTime,
          SpecificDay: SpecificDay,
        });
      } catch (err) {
        console.log(err);
      }
    },

    onPatientsClick() {
      this.$router.push("/doctor-patients-list");
    },
  },
};
</script>

<style>
.doctor {
}
/* .btn {
  display: block;
  margin-top: 35px;
} */
.btn-container-doctor {
  /* border: 5px solid red; */
  /* padding-top: 25px;
  margin-top: auto;
  margin-bottom: auto; */
  /* margin-left: 300px; */
  /* margin-right: auto; */
  width: 58%;
  height: 40%;
}
.chart {
  /* border: 2px solid white;
  background-color: #64B5F6; */
  /* border: 5px solid red; */
  width: 65%;
  height: 40%;
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
  opacity: 90%;
}
.left-side-doctor {
  /* border: 5px solid red; */
  width: 40%;
  height: 100%;
  float: left;
}
.icons-container {
  /* border: 5px solid red; */
  width: 10%;
  margin-top: 20px;
  margin-right: 45px;
  float: right;
}

.right-side-doctor {
  /* border: 5px solid red; */
  float: right;
  width: 50%;
  height: 100%;
}
</style>
