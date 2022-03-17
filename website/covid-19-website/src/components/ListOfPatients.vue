<template>
  <div>
    <!-- ChatBox modal -->
    <v-dialog v-model="chatbox_modal" width="350px">
      <Chatbox />
    </v-dialog>
    <!-- end of ChatBox modal -->
    <h1
      style="
        margin-top: 50px;
        font-size: 50px;
        text-align: center;
        color: black;
      "
    >
      {{ title }}
    </h1>
    <v-text-field
      style="width: 50%; margin-left: auto; margin-right: auto"
      v-model="search"
      placeholder="Search Patients"
      filled
      rounded
      dense
      outlined
    ></v-text-field>
    <v-card
      v-if="userRole == 'immigration-officer'"
      class="patients-list-container"
      outlined
      color="transparent"
    >
      <v-card
        v-for="(item, UserID) in filteredPatients"
        :key="UserID"
        :title="item.title"
        class="pa-2 mx-8 my-8"
        style="display: inline-table"
        width="30%"
        height="10%"
        @click="onPatientClick(item.UserID)"
        ><h2 class="my-2">{{ item.FirstName }} {{ item.LastName }}</h2>
        <p>
          Contact:<br />
          Phone: {{ item.Telephone }} <br />
          Email: {{ item.Email }}
        </p>
      </v-card>
    </v-card>
    <v-card
      v-if="userRole == 'health-official' || userRole == 'doctor'"
      class="patients-list-container"
      outlined
      color="transparent"
    >
      <v-badge :value="false" class="mx-6" color="red" overlap>
        <v-card
          v-for="(item, UserID) in filteredPatients"
          :key="UserID"
          :title="item.title"
          class="pa-2 mx-8 my-8"
          style="display: inline-table"
          width="350px"
          height="100px"
          @click="onPatientClick(item.patientsList.UserID)"
          :color="item.covidStatus === 'Positive' ? '#FF4933' : 'white'"
          ><h2 class="my-2">
            {{ item.patientsList.FirstName }} {{ item.patientsList.LastName }}
          </h2>
          <p>
            Contact:<br />
            Phone: {{ item.patientsList.Telephone }} <br />
            Email: {{ item.patientsList.Email }} <br />
            Covid Status: {{ item.covidStatus }}
          </p>
        </v-card>
      </v-badge>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
import Chatbox from "../components/ChatBox.vue";
export default {
  name: "ListOfPatients",

  components: { Chatbox },
  props: {
    user: String,
    title: String,
  },
  data() {
    return {
      patientList: [],
      search: "",
      userRole: this.user,
      covidPatientsList: [],
      chatbox_modal: false,
    };
  },
  created() {
    // Call all these on page creation
    this.getPatients();
    this.getMessages();
    //this.notification;
  },
  methods: {
    // Get all patients assigned to this doctor
    async getPatients() {
      console.log("getPatients called");
      try {
        // Display a different list depending on user's role
        if (this.userRole == "doctor") {
          const DID = this.$store.state.user.UserID;
          console.log("logged in doctor ID: " + DID);
          // Get users assigned to this doctor ID
          const response = await axios.post(`http://localhost:5001/users`, {
            Doctor: DID,
          });
          this.patientList = response.data;
          this.listOfCovidPatients(this.patientList);
        } else if (this.userRole == "health-official") {
          // Get all patients
          const response = await axios.get(`http://localhost:5001/users`);
          this.patientList = response.data;
          this.listOfCovidPatients(this.patientList);
        } else if (this.userRole == "immigration-officer") {
          // Get all patients who were covid positive in their latest health status
          const response = await axios.get(
            `http://localhost:5001/usersByCovid`
          );
          var pList = response.data;
          const travelResponse = await axios.post(
            `http://localhost:5001/users`,
            { Role: "Patient", Travelled: 1 }
          );
          var travelledList = travelResponse.data;

          var listOfP = [];
          pList.forEach((patient) => {
            travelledList.forEach((travelledPatient) => {
              if (patient.UserID == travelledPatient.UserID) {
                listOfP.push(patient);
              }
            });
          });
          this.listOfCovidPatients(listOfP);
        }
      } catch (err) {
        console.log(err);
      }
    },

    // Get all messages between this user any other user
    async getMessages() {
      try {
        const ct = true;
        let messages = [];
        while (ct) {
          console.log("GetMessages called");
          // Get all messages sent to and from this user
          const messagesResponse = await axios.get(
            `http://localhost:5001/messages/${this.$store.state.user.UserID}`
          );
          messages = messagesResponse.data;
          // console.log("message value", this.messages);
          if (messages) {
            let messagesByUser = {};
            for (let i = 0; i < messages.length; ++i) {
              let otherUserID = 0;
              const currentMessage = messages[i];
              if (
                currentMessage.ReceiveUserID == this.$store.state.user.UserID
              ) {
                otherUserID = currentMessage.SendUserID;
              } else {
                otherUserID = currentMessage.ReceiveUserID;
              }
              if (!messagesByUser[otherUserID]) {
                messagesByUser[otherUserID] = [];
              }
              messagesByUser[otherUserID].push(currentMessage);
            }
            for (var UserID in messagesByUser) {
              if (messagesByUser[UserID] && messagesByUser[UserID].length > 0) {
                // Check if latest is read or not

                if (
                  messagesByUser[UserID][messagesByUser[UserID].length - 1]
                    .ReceiveUserID == this.$store.state.user.UserID &&
                  messagesByUser[UserID][messagesByUser[UserID].length - 1]
                    .State == "Sent"
                  //this.notification
                ) {
                  // TODO: Show that there is new message to read

                  // console.log("There's a new message");
                  // this.flag = !this.flag;
                  //  console.log(this.messages);

                  if (this.messages[this.messages.length - 1].State != "Sent") {
                    // this.notification = false;
                  }
                  if (this.chatbox_modal == true) {
                    await axios.put(
                      `http://localhost:5001/message/${
                        this.messages[this.messages.length - 1].ID
                      }`,
                      {
                        State: "Read",
                      }
                    );
                  }
                }
              }
            }
          }

          // Wait 2s before checking for new messages
          await new Promise((r) => setTimeout(r, 2000));
        }
      } catch (err) {
        console.log(err);
      }
    },

    // Go to patient's profile
    onPatientClick(UserID) {
      console.log("onPatientCLick called with user id: " + UserID);
      this.chatbox_modal = !this.chatbox_modal;
      this.notification = true;
      this.$store.commit("setSelectedUser", UserID);
      this.getMessages();
      // this.$router.push("/");
    },
    async listOfCovidPatients(patientsList) {
      if (this.userRole == "doctor" || this.userRole == "health-official") {
        for (var i = 0; i < patientsList.length; i++) {
          const covidStatusInt = await axios.get(
            `http://localhost:5001/healthstatus/${patientsList[i].UserID}`
          );
          var covidStatus = "";
          if (covidStatusInt.data.Covid == 1) {
            covidStatus = "Positive";
          } else {
            covidStatus = "Negative";
          }
          this.covidPatientsList.push({
            patientsList: patientsList[i],
            covidStatus: covidStatus,
          });
        }
      } else if (this.userRole == "immigration-officer") {
        for (var j = 0; j < patientsList.length; j++) {
          const covidStatusInt = await axios.get(
            `http://localhost:5001/healthstatus/${patientsList[j].UserID}`
          );
          if (covidStatusInt.data.Covid == 1) {
            this.patientList.push(patientsList[j]);
          }
        }
      }
    },
  },

  computed: {
    // Filter patients list
    filteredPatients: function () {
      if (this.userRole == "immigration-officer") {
        return this.patientList.filter((patient) => {
          return (
            patient.FirstName.toLowerCase().match(this.search.toLowerCase()) ||
            patient.LastName.toLowerCase().match(this.search.toLowerCase()) ||
            patient.Email.toLowerCase().match(this.search.toLowerCase()) ||
            patient.Telephone.toLowerCase().match(this.search.toLowerCase())
          );
        });
      } else if (
        this.userRole == "health-official" ||
        this.userRole == "doctor"
      ) {
        return this.covidPatientsList.filter((patient) => {
          return (
            patient.patientsList.FirstName.toLowerCase().match(
              this.search.toLowerCase()
            ) ||
            patient.patientsList.LastName.toLowerCase().match(
              this.search.toLowerCase()
            ) ||
            patient.patientsList.Email.toLowerCase().match(
              this.search.toLowerCase()
            ) ||
            patient.patientsList.Telephone.toLowerCase().match(
              this.search.toLowerCase()
            ) ||
            patient.covidStatus.toLowerCase().match(this.search.toLowerCase())
          );
        });
      } else return null;
    },
  },
};
</script>
<style>
.patients-list-container {
  margin-top: 70px;
  /* min-width: 100%;
  min-height: 100%; */
  text-align: center;
}
</style>
