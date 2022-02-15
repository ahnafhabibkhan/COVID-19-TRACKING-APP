<template>
  <div class="doctor">
    <div class="right-side">
      <div style="margin-top: 90%; margin-left: 80%">
        <v-btn @click="ChatboxClick" icon height="80px" width="80px">
          <v-icon color="blue darken-3" style="font-size: 80px">
            mdi-message-text
          </v-icon>
        </v-btn>
      </div>
    </div>
    <div class="left-side">
      <div class="btn-container" style="margin-left: auto; margin-right: auto">
        <v-row align="center">
          <v-col cols="12" sm="6">
            <div class="my-6 mx-3">
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
            <div class="my-6 mx-3">
              <v-btn
                class="white--text"
                style="font-size: 18px; opacity: 90%"
                color="blue lighten-2"
                width="400px"
                height="75px"
                >List of Appointments</v-btn
              >
            </div>
            <div class="my-6 mx-3">
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
      patients : [],
      messages : [],
      appointmentRequestForm: {
        PID: -1,
        Day: -1,
        Month: -1,
        Year: -1,
        Hour: -1,
        Minute: -1,
      },

      series: [44, 55],
      chartOptions: {
        chart: {
          width: 580,
          type: "pie",
        },
        labels: ["Infected", "Non-Infected"],
        responsive: [
          {
            breakpoint: 580,
            options: {
              chart: {
                width: 400,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },

  created() { // Call all these on page creation
    this.getPatients();
    this.getMessages();
  },

  methods:{

    // Get all patients assigned to this doctor
    async getPatients() {
      try {
        let DID = 0; // TODO: LOGGED IN Doctor ID MUST BE ACCESSIBLE FROM HERE
        // Check if user with that email already exists
        this.patients = await axios.get(`http://localhost:5000/users`,
                                         {
                                           Doctor: DID,
                                         }
                                        );
      } catch (err) {
        console.log(err);
      }
    },

    // Get all messages to and from this doctor's botchat
    async getMessages() {
      try {
        let DID = 0; // TODO: LOGGED IN Doctor ID MUST BE ACCESSIBLE FROM HERE
        // Check if user with that email already exists
        this.patients = await axios.get(`http://localhost:5000/users`,
                                         {
                                           Doctor: DID,
                                         }
                                        );
      } catch (err) {
        console.log(err);
      }
    },

    // Request appointment with patient
    async requestAppointment() {
      try {
        const Date = this.appointmentRequestForm.Year.toString().concat('-',this.appointmentRequestForm.Month.toString()).concat('-',this.appointmentRequestForm.Day.toString());
        const Time = this.appointmentRequestForm.Hour.toString().concat(':',this.appointmentRequestForm.Minute.toString());
        const RequestedBy = 'D';
        const DID = 0; // TODO: LOGGED IN Doctor ID MUST BE ACCESSIBLE FROM HERE
        // Check if user with that email already exists
        this.patients = await axios.post(`http://localhost:5000/appointmentrequest`,
                                         {
                                           PID: this.appointmentRequestForm.PID,
                                           DID: DID,
                                           Date: Date,
                                           Time: Time,
                                           RequestedBy: RequestedBy,
                                         }
                                        );
      } catch (err) {
        console.log(err);
      }
    },
	
	onPatientsClick(){
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
.btn-container {
  /* border: 5px solid red; */
  padding-top: 25px;
  margin-top: 100px;
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
  margin-top: 2%;
  margin-left: auto;
  margin-right: auto;
  opacity: 90%;
}
.left-side {
  /* border: 5px solid red; */
  width: 40%;
  height: 1000px;
  float: left;
}
.icons-container {
  /* border: 5px solid red; */
  width: 10%;
  margin-top: 20px;
  margin-right: 45px;
  float: right;
}

.right-side {
  /* border: 5px solid red; */
  float: right;
  width: 50%;
  height: 1000px;
}
</style>
