<template>
  <div class="doctor">
    <!-- date modal start -->
    <v-dialog v-model="date_dialog" width="600px">
      <v-card>
        <v-container>
          <v-row>
            <v-col cols="12" class="pa-5">
              <h1>Book an Appointment</h1>
              <v-date-picker
                v-model="date"
                :allowed-dates="allowedDates"
                full-width
                @change="onDateClick()"
              ></v-date-picker>
            </v-col>
            <!-- list -->
            <v-col cols="12">
              <v-container>
                <v-checkbox
                  v-for="(item, i) in allAvailabilities"
                  :key="i"
                  v-model="available"
                  :label="item"
                  :value="item"
                ></v-checkbox>
              </v-container>
            </v-col>
            <v-col cols="6">
              <v-btn
                color="error"
                block
                @click="date_dialog = false"
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
                @click="setAvailabilities()"
              >
                Set
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- date modal end -->
    <div class="right-side-doctor">
      <!-- availabilities -->
      <div
        style="
          background-color: rgba(256, 256, 256, 0.9);
          width: 70%;
          margin: auto;
        "
        class="pa-4 rounded-lg mb-5"
      >
        <h2>Availabilites:</h2>
        <div v-for="(item, i) in fetchAvailabilities" :key="i">
          {{
            item.SpecificDay.substr(0, 10) +
            " -- " +
            item.StartTime +
            "-" +
            item.EndTime
          }}

          <v-btn x-small @click="deleteAvailability(item)"> Delete </v-btn>
        </div>
      </div>
      <div style="margin-top: 50%; margin-left: 85%">
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
                @click="listOfAppointments()"
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
                @click="date_dialog = !date_dialog"
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
import moment from "moment";
import axios from "axios";

export default {
  name: "Doctor",

  components: {},

  data: function () {
    return {
      messages: [],
      chatBotMessages: [],

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
      appointments: [],
      date_dialog: false,
      available: [],
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      allAvailabilities: [],
      fetchAvailabilities: [],
    };
  },

  created() {
    this.getMessages();
    this.getAvailabilities();
    this.listOfAvailabilities();
    this.getChartData();
  },


  methods: {

    chatBox() {},

    // Get infected and non infected data
    async getChartData() {
      try {
        const DID = this.$store.state.user.UserID;
        // Get all users assigned to this doctor
        const response = await axios.post(`http://localhost:5000/users`, {
          Doctor: DID,
        });
        const patientList = response.data;
        let infectedCount = 0;
        let nonInfectedCount = 0;
        let totalCount = 0;
        let patientIDs = [];
        // Make a list of their IDs
        patientList.forEach(patient => {
          ++totalCount;
          patientIDs.push(patient.UserID);
        });
        // For each ID get their latest health status and check if they have covid and calculate count
        for(let i=0;i<patientIDs.length;++i){
          const latestHSResponse = await axios.get(`http://localhost:5000/healthstatus/${patientIDs[i]}`);
          console.log(JSON.stringify(latestHSResponse.data));
          const infected = (latestHSResponse.data.Covid == 1);
          if(infected){
            ++infectedCount;
          }else{
            ++nonInfectedCount
          }
        }
        // Write the data to series
        this.series = [infectedCount/totalCount * 100, nonInfectedCount/totalCount * 100];
      } catch (err) {
        console.log(err);
      }
    },
    
    // Get all messages to and from this doctor's botchat
    async getMessages() {
      try {
        const DID = this.$store.state.user.UserID;
        this.messages = await axios.get(`http://localhost:5000/messages/${DID}`);
      } catch (err) {
        console.log(err);
      }
    },

    // Get list of availabilities
    listOfAvailabilities() {
      this.allAvailabilities = [];
      var availabilities = [
        "09:00:00-10:00:00",
        "10:00:00-11:00:00",
        "11:00:00-12:00:00",
        "12:00:00-13:00:00",
        "13:00:00-14:00:00",
        "14:00:00-15:00:00",
        "15:00:00-16:00:00",
        "16:00:00-17:00:00",
      ];
      var dateTimes = [];
      for (var i = 0; i < this.fetchAvailabilities.length; i++) {
        const time =
          this.fetchAvailabilities[i].StartTime.toString() +
          "-" +
          this.fetchAvailabilities[i].EndTime.toString();
        if (
          this.date.substr(0, 10) ==
          this.fetchAvailabilities[i].SpecificDay.substr(0, 10)
        ) {
          dateTimes.push(time);
        }
      }
      for (let j = 0; j < availabilities.length; j++) {
        if (!dateTimes.includes(availabilities[j])) {
          this.allAvailabilities.push(availabilities[j]);
        }
      }
    },

    // Delete a doctor's availability
    deleteAvailability(item) {
      this.removeAvailability(
        item.DayOfWeek,
        item.StartTime,
        item.EndTime,
        item.SpecificDay.substr(0, 10)
      );
      window.location.reload();
    },

    // Click on a date to get availabilities
    onDateClick() {
      this.available = [];
      this.listOfAvailabilities();
    },

    //Set doctor's availabilities
    setAvailabilities() {
      for (var i = 0; i < this.available.length; i++) {
        var times = this.available[i].split("-");
        this.addAvailability(
          moment(this.date).format("dddd"),
          times[0],
          times[1],
          this.date
        );
      }
      window.location.reload();
    },
    disAvail(item) {
      const found = this.appointments.findIndex((a) => {
        return a.Time == item.StartTime && a.Date == item.SpecificDay;
      });
      if (found > -1) return true;
      return false;
    },
    allowedDates() {
      return true;
    },
    listOfAppointments() {
      this.$router.push("/list-of-appointments");
    },

    // Get availabilities
    async getAvailabilities() {
      try {
        const res = await axios.get(
          `http://localhost:5000/availability/${this.$store.state.user.UserID}`
        );
        this.fetchAvailabilities = res.data;
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

    // Open patients list
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
