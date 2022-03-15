<template>
  <div class="doctor">
    <!-- ChatBox modal -->
    <v-dialog v-model="chatbox_modal" width="350px">
      <Chatbox />
    </v-dialog>
    <!-- end of ChatBox modal -->
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
        <v-btn @click="onChatBoxClick()" icon height="80px" width="80px">
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
                style="font-size: 18px"
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
                style="font-size: 18px"
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
                style="font-size: 18px"
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
import Chatbox from "../components/ChatBox.vue";

export default {
  name: "Doctor",

  components: { Chatbox },

  data: function () {
    return {
      sentMessages: [], // Array of array of sent messages per user
      receivedMessages: [], // Array of array of received messages per user
      userUnread: [], // Array of bool for each user indicating whether the conversation with this user has an unread message
      updateUserChat: [], // Array of bool for each user indicating whether we need to update the chat box with new messages
      previousUserLatestMessage: [], // Array of previous latest message for each user

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
      chatbox_modal: false,
    };
  },

  created() {
    this.getMessages();
    this.getAvailabilities();
    this.listOfAvailabilities();
    this.getChartData();
  },

  methods: {
    chatBox() {
      this.chatbox_modal = !this.chatbox_modal;
    },

    // Get infected and non infected data
    async getChartData() {
      try {
        const DID = this.$store.state.user.UserID;
        // Get all users assigned to this doctor
        const response = await axios.post(`http://localhost:5001/users`, {
          Doctor: DID,
        });
        const patientList = response.data;
        let infectedCount = 0;
        let nonInfectedCount = 0;
        let totalCount = 0;
        let patientIDs = [];
        // Make a list of their IDs
        patientList.forEach((patient) => {
          ++totalCount;
          patientIDs.push(patient.UserID);
        });
        // For each ID get their latest health status and check if they have covid and calculate count
        for (let i = 0; i < patientIDs.length; ++i) {
          const latestHSResponse = await axios.get(
            `http://localhost:5001/healthstatus/${patientIDs[i]}`
          );
          console.log(JSON.stringify(latestHSResponse.data));
          const infected = latestHSResponse.data.Covid == 1;
          if (infected) {
            ++infectedCount;
          } else {
            ++nonInfectedCount;
          }
        }
        // Write the data to series
        this.series = [
          (infectedCount / totalCount) * 100,
          (nonInfectedCount / totalCount) * 100,
        ];
      } catch (err) {
        console.log(err);
      }
    },

    // Get all messages between this doctor and their patients
    async getMessages() {
      try {
        const ct = true;
        const DID = this.$store.state.user.UserID;
        this.messages = [];
        let assignedPatients = [];
        while(ct){
          // Get patients assigned to this doctor
          assignedPatients = await axios.post(`http://localhost:5000/users`, {Doctor: DID});
          // Get all messages sent to and from the users
          for(let i = 0; i < assignedPatients.length; ++i){
            const sentMessages = await axios.post(`http://localhost:5000/messages`, {SendUserID: DID, ReceiveUserID: assignedPatients[i].UserID});
            const receivedMessages = await axios.post(`http://localhost:5000/messages`, {SendUserID: assignedPatients[i].UserID, ReceiveUserID: DID});
            // Check if we have any latest messages
            let latestSent = null;
            let latestReceived = null;
            if(sentMessages.length > 0) {
              latestSent = sentMessages[sentMessages.length - 1];
            }
            if(receivedMessages.length > 0) {
              latestReceived = sentMessages[sentMessages.length - 1];
            }
            // Get actual latest
            let actualLatest = null;
            if(latestSent && latestReceived){
              const sentDateSplit = latestSent.Date.split("-");
              const sentYear = parseInt(sentDateSplit[0]);
              const sentMonth = parseInt(sentDateSplit[1]);
              const sentDay = parseInt(sentDateSplit[2]);
              const sentTimeSplit = latestSent.Time.split(":");
              const sentHour = parseInt(sentTimeSplit[0]);
              const sentMinute = parseInt(sentTimeSplit[1]);
              const sentSecond = parseInt(sentTimeSplit[2]);
              const receivedDateSplit = latestReceived.Date.split("-");
              const receivedYear = parseInt(receivedDateSplit[0]);
              const receivedMonth = parseInt(receivedDateSplit[1]);
              const receivedDay = parseInt(receivedDateSplit[2]);
              const receivedTimeSplit = latestReceived.Time.split(":");
              const receivedHour = parseInt(receivedTimeSplit[0]);
              const receivedMinute = parseInt(receivedTimeSplit[1]);
              const receivedSecond = parseInt(receivedTimeSplit[2]);
              if(sentYear < receivedYear){
                actualLatest = latestSent;
              }else if(receivedYear < sentYear){
                actualLatest = latestReceived;
              }
              if(!actualLatest){
                if(sentMonth < receivedMonth){
                  actualLatest = latestSent;
                }else if(receivedMonth < sentMonth){
                  actualLatest = latestReceived;
                }
                if(!actualLatest){
                  if(sentDay < receivedDay){
                    actualLatest = latestSent;
                  }else if(receivedDay < sentDay){
                    actualLatest = latestReceived;
                  }
                  if(!actualLatest){
                    if(sentHour < receivedHour){
                      actualLatest = latestSent;
                    }else if(receivedHour < sentHour){
                      actualLatest = latestReceived;
                    }
                  }
                  if(!actualLatest){
                    if(sentMinute < receivedMinute){
                      actualLatest = latestSent;
                    }else if(receivedMinute < sentMinute){
                      actualLatest = latestReceived;
                    }
                  }
                  if(!actualLatest){
                    if(sentSecond <= receivedSecond){
                      actualLatest = latestSent;
                    }else if(receivedSecond < sentSecond){
                      actualLatest = latestReceived;
                    }
                  }
                }
              }
            }else if(latestSent){
              actualLatest = latestSent;
            }else if(latestReceived){
              actualLatest = latestReceived;
              // Set unread for this user
              this.userUnread[i] = actualLatest.State == 'Sent';
            }else{
              // No messages
            }
            // Check is current latest is same as previous, set updateUserChat, and update messages
            if(this.previousUserLatestMessage[i].ID != actualLatest.ID){
              this.updateUserChat[i] = true;// TODO: Update frontend, could be done here directly. We could then remove this.updateUserChat
              this.previousUserLatestMessage[i] = actualLatest;
              this.sentMessages[i] = sentMessages;
              this.receivedMessages[i] = receivedMessages;
            }else{
              this.updateUserChat[i] = false;
            }
          }

          // Wait 2s before checking for new messages
          await new Promise(r => setTimeout(r, 2000));
        }
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
          `http://localhost:5001/availability/${this.$store.state.user.UserID}`
        );
        this.fetchAvailabilities = res.data;
      } catch (err) {
        console.log(err);
      }
    },

    // Add availability
    async addAvailability(DayOfWeek, StartTime, EndTime, SpecificDay) {
      try {
        await axios.post(`http://localhost:5001/availability`, {
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
        await axios.post(`http://localhost:5001/deleteavailability`, {
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
    onChatBoxClick() {
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
