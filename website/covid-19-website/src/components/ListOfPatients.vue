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
      <v-row>
        <v-col
          cols="12"
          md="6"
          v-for="(item, UserID) in filteredPatients"
          :key="UserID"
        >
          <v-card
            :title="item.title"
            class="pa-2"
            @click="onPatientClick(item.UserID)"
            ><h2 class="my-2">{{ item.FirstName }} {{ item.LastName }}</h2>
            <p>
              Contact:<br />
              Phone: {{ item.Telephone }} <br />
              Email: {{ item.Email }}
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-card
      v-if="userRole == 'health-official' || userRole == 'doctor'"
      class="patients-list-container"
      outlined
      color="transparent"
    >
      <v-row>
        <v-col
          cols="12"
          md="6"
          v-for="(item, UserID) in filteredPatients"
          :key="UserID"
        >
          <v-card
            :title="item.title"
            class="pa-2"
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
        </v-col>
      </v-row>
    </v-card>
    <v-card
      v-if="userRole == 'admin'"
      class="patients-list-container"
      outlined
      color="transparent"
    >
      <v-row>
        <v-col
          cols="12"
          md="6"
          v-for="(item, UserID) in filteredPatients"
          :key="UserID"
        >
          <v-card
            :title="item.title"
            class="pa-2"
            @click="onPatientClick()"
            :color="item.covidStatus === 'Positive' ? '#FF4933' : 'white'"
            ><h2 class="my-2">
              {{ item.patientsList.FirstName }} {{ item.patientsList.LastName }}
            </h2>
            <p>
              Contact:<br />
              Phone: {{ item.patientsList.Telephone }} <br />
              Email: {{ item.patientsList.Email }} <br />
              Covid Status: {{ item.covidStatus }} <br />
              Role: {{ item.patientsList.Role }}
            </p>
            <p
              :id="'doc' + item.patientsList.UserID"
              v-if="item.patientsList.Role == 'Patient'"
            >
              Doctor:
              {{
                getDoctorName(
                  item.patientsList.Doctor,
                  item.patientsList.UserID
                )
              }}
            </p>
            <p v-else>No Doctor Needed</p>
            <v-btn @click.stop="deleteUser(item.patientsList.UserID)"
              >Delete</v-btn
            >
            <v-btn
              @click="getListOfDoctor(item.patientsList.UserID)"
              v-if="item.patientsList.Role == 'Patient'"
              class="mx-3"
              >Assign Doctor</v-btn
            >
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
import Chatbox from "../components/ChatBox.vue";
import Swal from "sweetalert2";
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
      notification: false,
      flag: false,
      senderID: -1,
    };
  },
  created() {
    // Call all these on page creation
    this.getPatients();
    this.getMessages();

    //this.notification;
  },
  methods: {
    setSenderIDNotification(ID) {
      this.senderID = ID;
    },
    getSenderIDNotification() {
      console.log("userIDVAlue ******", this.senderID);
      return this.senderID;
    },
    // Get all patients assigned to this doctor
    async getDoctorName(doctorID, user) {
      var doctorName = "";

      if (!doctorID) {
        // console.log("show me the value", user);
        document.getElementById("doc" + user).innerText = "None";
        return;
      }
      // Get all doctors
      const response = await axios.post("http://localhost:5001/users", {
        Role: "Doctor",
      });

      var doctorInfo = response.data;
      for (var i = 0; i < doctorInfo.length; i++) {
        if (doctorInfo[i].UserID == doctorID) {
          doctorName = doctorInfo[i].FirstName;
          //  this.isPatient = true;
          break;
        }
      }
      if (doctorName == "") {
        // this.isPatient = false;
        document.getElementById("doc" + doctorID).innerText = "user";
        return;
      } else if (doctorName != "") {
        //  this.isPatient = true;
        console.log(doctorName, doctorID);
        document.getElementById("doc" + user).innerText = doctorName;
        console.log(user);
        return;
      }
    },

    // Get all users depending on role of current user
    async getPatients() {
      console.log("getPatients called");
      try {
        // Clear the list in the case that there are already elements in it
        this.patientList = [];
        this.covidPatientsList = [];
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
        } else if (this.userRole == "admin") {
          // Get all users
          const response = await axios.get(`http://localhost:5001/users`);
          this.patientList = response.data;
          console.log(this.patientList);
          this.listOfCovidPatients(this.patientList);
        } else if (this.userRole == "health-official") {
          // Get all patients
          const response = await axios.post(`http://localhost:5001/users`, {
            Role: "Patient",
          });
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
        var count = 0;
        const ct = true;
        let messages = [];
        while (ct) {
          console.log("GetMessages called");
          // Get all messages sent to and from this user
          const messagesResponse = await axios.get(
            `http://localhost:5001/messages/${this.$store.state.user.UserID}/`
          );
          messages = messagesResponse.data;
          //console.log("message value", messages);
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
                ) {
                  // TODO: Show that there is new message to read

                  // console.log("There's a new message");
                  // this.flag = !this.flag;
                  //  console.log(this.messages);
                  console.log("notification Value:", this.notification);
                  if (messages[messages.length - 1].State != "Sent") {
                    this.notification = false;
                  } else if (messages[messages.length - 1].State == "Sent") {
                    console.log(
                      "sender ID",
                      messages[messages.length - 1].SendUserID
                    );

                    this.notification = true;
                    this.setSenderIDNotification(
                      messages[messages.length - 1].SendUserID
                    );
                  }
                  if (
                    this.chatbox_modal == false &&
                    this.notification == true
                  ) {
                    console.log("There's a new message");
                    this.notification = false;
                    this.flag = true;
                    if (count == 0) {
                      count++;
                    }
                  }
                  if (this.chatbox_modal == true && count > 0) {
                    await axios.put(
                      `http://localhost:5001/message/${
                        messages[messages.length - 1].ID
                      }`,
                      {
                        State: "Read",
                      }
                    );

                    this.setSenderIDNotification(-1);
                    this.flag = false;
                    count = 0;
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
    async getListOfDoctor(PID) {
      //Array for doctor with less than 10 patients
      let doctorLessThanTreshold = [];
      if (this.userRole == "admin") {
        //Empty array
        this.doctorList = [];
        // Get all doctors
        const doctorResponse = await axios.post("http://localhost:5001/users", {
          Role: "Doctor",
        });
        // looping through all the doctors and getting their names and number of patient
        this.doctorList = doctorResponse.data;

        var assignedPatients = "";
        // getting the list of doctor less than 10 patients
        for (var i = 0; i < this.doctorList.length; i++) {
          // Get users assigned to this doctor ID
          const Patientresponse = await axios.post(
            "http://localhost:5001/users",
            {
              Doctor: this.doctorList[i].UserID,
            }
          );
          assignedPatients = Patientresponse.data;
          // verifying the total of patients assign to a doctor
          if (assignedPatients[i] != undefined) {
            if (assignedPatients.length < 10) {
              doctorLessThanTreshold.push(this.doctorList[i]);
            }
          } else if (assignedPatients[i] == undefined) {
            doctorLessThanTreshold.push(this.doctorList[i]);
          }
        }

        const inputOptions = new Promise((resolve) => {
          let docs = {};
          setTimeout(() => {
            for (var i = 0; i < doctorLessThanTreshold.length; i++) {
              docs["" + doctorLessThanTreshold[i].FirstName] =
                doctorLessThanTreshold[i].FirstName;
            }
            resolve(docs);
          }, 1000);
        });
        const { value: doctor } = await Swal.fire({
          title: "Select doctor",
          confirmButtonColor: "#DD6B55",
          input: "radio",
          inputOptions: inputOptions,
          inputValidator: (value) => {
            if (!value) {
              return "You need to choose something!";
            }
          },
        });

        if (doctor) {
          var doctorFirstName = "";
          Swal.fire({ html: `You selected: ${doctor} ` });
          var doctorDID = "";
          this.doctorList.forEach((doctors) => {
            if (doctors.FirstName == doctor) {
              doctorDID = doctors.UserID;
              doctorFirstName = doctor;
            }
          });
          console.log("assigned", PID, doctorDID);
          this.assignDoctor(PID, doctorDID);
          document.getElementById("doc" + PID).innerText = doctorFirstName;
        }
      }
    },

    // Go to patient's profile
    onPatientClick(UserID) {
      console.log("onPatientCLick called with user id: " + UserID);

      this.$store.commit("setSelectedUser", UserID);

      if (this.userRole == "doctor") {
        this.chatbox_modal = !this.chatbox_modal;
        this.notification = true;
        this.getMessages();
      }
      if (this.userRole == "admin") {
        return;
      }
      // this.$router.push("/");
    },
    async listOfCovidPatients(patientsList) {
      if (
        this.userRole == "doctor" ||
        this.userRole == "health-official" ||
        this.userRole == "admin"
      ) {
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

    async deleteUser(ID) {
      Swal.fire({
        icon: "warning",
        title: "Are you sure you want to permanently delete this account ",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
      })
        .then((result) => {
          if (result.isConfirmed) {
            axios.delete(`http://localhost:5001/users/${ID}`);

            Swal.fire("Deleted!", "The account has been deleted", "success");
          }
        })
        .then(() => {
          this.getPatients();
        });
    },

    // Assign patient to a doctor
    async assignDoctor(PID, DID) {
      // Verify input
      if (!PID || !DID) {
        return;
      }
      // Verify existence of both and correct roles
      const patientResponse = await axios.post("http://localhost:5001/users/", {
        UserID: PID,
      });
      if (
        patientResponse.data[0].UserID != PID ||
        patientResponse.data[0].Role != "Patient"
      ) {
        console.log(
          "AssignDoctor: PID does not exist or is not patient" +
            patientResponse.data.UserID +
            " : " +
            patientResponse.data.Role
        );
        return;
      }
      const doctorResponse = await axios.post("http://localhost:5001/users/", {
        UserID: DID,
      });
      if (
        doctorResponse.data[0].UserID != DID ||
        doctorResponse.data[0].Role != "Doctor"
      ) {
        console.log("AssignDoctor: DID does not exist or is not doctor");
        return;
      }
      // Assign doctor
      await axios.put(`http://localhost:5001/users/${PID}`, { Doctor: DID });
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
      } else if (this.userRole == "admin") {
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
            patient.covidStatus
              .toLowerCase()
              .match(this.search.toLowerCase()) ||
            patient.patientsList.Role.toLowerCase().match(
              this.search.toLowerCase()
            )
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
.blink {
  /* text-decoration: blink;
  -webkit-animation-name: blinker;
  -webkit-animation-duration: 0.6s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: ease-in-out;
  -webkit-animation-direction: alternate; */
}
</style>
