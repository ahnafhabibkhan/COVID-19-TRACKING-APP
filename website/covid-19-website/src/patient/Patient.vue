<template>
  <v-container class="bg-image">
    <v-row>
      <!-- confirm modal for delete status -->
      <v-dialog v-model="confirm_modal" width="500px">
        <v-card>
          <v-card-title> are you sure to delete item ? </v-card-title>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-btn @click="confirm_modal = false">no</v-btn>
              </v-col>
              <v-col cols="6">
                <!-- <v-btn color="error" @click="">yes</v-btn> -->
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
      <!-- date modal start -->
      <v-dialog v-model="date_dialoge" width="500px">
        <v-card>
          <v-container>
            <v-row>
              <v-col cols="12" class="pa-5">
                <h1>Book an Appointment</h1>
                <v-date-picker
                  v-model="date"
                  :allowed-dates="allowedDates"
                  full-width
                ></v-date-picker>
              </v-col>
              <!-- list -->
              <v-col cols="12">
                <v-radio-group v-model="available">
                  <v-radio
                    v-for="(item, i) in filteredAvailability"
                    :key="i"
                    :label="
                      item.SpecificDay.substr(0, 10) +
                      ' -- ' +
                      item.StartTime +
                      ' - ' +
                      item.EndTime
                    "
                    :value="item"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="6">
                <v-btn
                  color="error"
                  block
                  @click="date_dialoge = false"
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
                  @click="bookAppoitment"
                >
                  book
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
      <!-- date modal end -->

      <!-- status modal start -->
      <v-dialog v-model="status_dialoge" width="500px" v-if="status_dialoge">
        <v-card>
          <v-container>
            <v-row>
              <v-col cols="12" class="pa-5">
                <h1>update status</h1>
                <!-- <v-switch
                  v-model="form.i_have_covid"
                  label="I have covid 19"
                ></v-switch> -->
                <div>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        label="Temperature :"
                        filled
                        flat
                        v-model.number="form.Temperature"
                        dense
                        hide-details
                      ></v-text-field
                    ></v-col>
                    <v-col cols="6">
                      <v-text-field
                        label="Weight :"
                        filled
                        flat
                        v-model.number="form.Weight"
                        dense
                        hide-details
                      ></v-text-field
                    ></v-col>
                    <v-col cols="6">
                      <v-checkbox
                        dense
                        hide-details
                        label="Headache"
                        true-value="1"
                        false-value="0"
                        v-model.number="form.Headache"
                      ></v-checkbox
                    ></v-col>
                    <v-col cols="6">
                      <v-checkbox
                        dense
                        hide-details
                        label="covid"
                        true-value="1"
                        false-value="0"
                        v-model.number="form.Covid"
                      ></v-checkbox
                    ></v-col>
                    <v-col cols="6">
                      <v-checkbox
                        dense
                        hide-details
                        label="BreathingIssues"
                        true-value="1"
                        false-value="0"
                        v-model.number="form.BreathingIssues"
                      ></v-checkbox
                    ></v-col>
                    <v-col cols="6">
                      <v-checkbox
                        dense
                        hide-details
                        label="Cough"
                        true-value="1"
                        false-value="0"
                        v-model.number="form.Cough"
                      ></v-checkbox
                    ></v-col>
                    <v-col cols="6">
                      <v-checkbox
                        label="LostTasteSmell"
                        dense
                        hide-details
                        v-model="form.LostTasteSmell"
                      >
                      </v-checkbox
                    ></v-col>
                    <v-col cols="6">
                      <v-checkbox
                        dense
                        hide-details
                        label="MusclePain"
                        true-value="1"
                        false-value="0"
                        v-model.number="form.MusclePain"
                      ></v-checkbox
                    ></v-col>
                    <v-col cols="6">
                      <v-checkbox
                        dense
                        hide-details
                        label="Diarrhea"
                        true-value="1"
                        false-value="0"
                        v-model.number="form.Diarrhea"
                      ></v-checkbox
                    ></v-col>
                    <v-col cols="6">
                      <v-checkbox
                        dense
                        hide-details
                        label="Vomitting"
                        true-value="1"
                        false-value="0"
                        v-model.number="form.Vomitting"
                      ></v-checkbox
                    ></v-col>
                    <v-col cols="6">
                      <v-checkbox
                        dense
                        hide-details
                        label="Nausea"
                        true-value="1"
                        false-value="0"
                        v-model.number="form.Nausea"
                      ></v-checkbox
                    ></v-col>
                    <v-col cols="6">
                      <v-checkbox
                        dense
                        hide-details
                        label="SoreThroat"
                        true-value="1"
                        false-value="0"
                        v-model.number="form.SoreThroat"
                      ></v-checkbox
                    ></v-col>
                  </v-row>
                </div>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  rows="3"
                  v-model="form.SympDescription"
                  label="SympDescription :"
                >
                </v-textarea>
              </v-col>

              <v-col cols="6">
                <v-btn
                  block
                  color="success"
                  elevation="0"
                  @click="addStatus"
                  :disabled="edit_mode"
                >
                  <v-icon left> mdi-plus </v-icon>
                  add
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  block
                  color="success"
                  elevation="0"
                  @click="updateStatus"
                  :disabled="!edit_mode"
                >
                  update
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
      <!-- status modal end -->
      <v-col cols="12" md="6">
        <!-- buttons -->
        <div class="d-flex flex-column align-center mt-5">
          <div class="my-6 mx-3">
            <v-btn
              class="white--text"
              style="font-size: 18px; opacity: 90%"
              color="blue lighten-2"
              width="400px"
              height="75px"
              @click="myInfo"
              >My Info</v-btn
            >
          </div>
          <div class="mx-3">
            <v-btn
              class="white--text"
              style="font-size: 18px; opacity: 90%"
              color="blue lighten-2"
              width="400px"
              height="75px"
              @click="onAppointment"
              >Book an Appointment</v-btn
            >
          </div>
          <div class="my-6 mx-3">
            <v-btn
              class="white--text"
              style="font-size: 18px; opacity: 90%"
              color="blue lighten-2"
              width="400px"
              height="75px"
              @click="onUpdateStatus"
              >Update Status</v-btn
            >
          </div>
        </div>

        <!-- status rows -->
        <v-row>
          <v-col cols="12">
            <v-expansion-panels>
              <v-expansion-panel v-for="(item, i) in statusesFiltered" :key="i">
                <v-expansion-panel-header>
                  <span> Date: {{ item.fillOutDate.substr(0, 10) }} </span>
                  <span>
                    Updated Time: {{ item.lastUpdateTime.substr(0, 10) }}
                  </span>
                  <v-checkbox
                    label="Covid"
                    dense
                    readonly
                    hide-details
                    v-model="item.Covid"
                  >
                  </v-checkbox>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div
                    class="d-flex align-center justify-space-between flex-wrap"
                  >
                    <span> Temperature: {{ item.Temperature }} </span>
                    <span> Weight: {{ item.Weight }} </span>

                    <v-checkbox
                      label="BreathingIssues"
                      dense
                      hide-details
                      readonly
                      v-model="item.BreathingIssues"
                    >
                    </v-checkbox>
                    <v-checkbox
                      label="Cough"
                      dense
                      hide-details
                      readonly
                      v-model="item.Cough"
                    >
                    </v-checkbox>

                    <v-checkbox
                      label="Diarrhea"
                      dense
                      hide-details
                      readonly
                      v-model="item.Diarrhea"
                    >
                    </v-checkbox>
                    <v-checkbox
                      label="Headache"
                      dense
                      hide-details
                      readonly
                      v-model="item.Headache"
                    >
                    </v-checkbox>
                    <v-checkbox
                      label="LostTasteSmell"
                      dense
                      hide-details
                      readonly
                      v-model="item.LostTasteSmell"
                    >
                    </v-checkbox>
                    <v-checkbox
                      label="MusclePain"
                      dense
                      hide-details
                      readonly
                      v-model="item.MusclePain"
                    >
                    </v-checkbox>
                    <v-checkbox
                      label="SoreThroat"
                      dense
                      hide-details
                      readonly
                      v-model="item.SoreThroat"
                    />
                    <v-checkbox
                      label="Vomitting"
                      dense
                      hide-details
                      readonly
                      v-model="item.Vomitting"
                    >
                    </v-checkbox>
                    <v-checkbox
                      label="Nausea"
                      dense
                      hide-details
                      readonly
                      v-model="item.Nausea"
                    >
                    </v-checkbox>

                    <v-btn @click="onEdit(item)" icon color="primary" small>
                      <v-icon> mdi-pencil </v-icon>
                    </v-btn>
                    <v-btn @click="deleteStatus(item)" icon color="error" small>
                      <v-icon> mdi-close </v-icon>
                    </v-btn>
                  </div>
                  <div>SympDescription: {{ item.SympDescription }}</div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
          <v-col cols="12" v-if="statuses.length > 3">
            <v-btn
              elevation="0"
              text
              @click="show_more = !show_more"
              block
              small
            >
              {{ show_more ? "show less" : "show more" }}
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <!-- apppointments -->
      <v-col cols="12" md="6" class="d-flex align-center">
        <div
          style="width: 70%; background-color: rgba(256, 256, 256, 0.5)"
          class="pa-4 rounded-2"
        >
          <h2>Appointments :</h2>
          <div v-for="(item, i) in appointments" :key="i">
            {{ item.Date.substr(0, 10) + " -- " + item.Time }}

            <v-btn small icon color="error" @click="deleteAppointment(item)">
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "Patient",

  data() {
    return {
      url: "http://localhost:5000/",
      edit_mode: false,
      show_more: false,
      date_dialoge: false,
      status_dialoge: false,
      date: null,
      statuses: [],
      form_default: {
        fillOutDate: "2022-02-14",
        lastUpdateTime: "13:30:30",
        Weight: null,
        SympDescription: null,
        Temperature: null,
        BreathingIssues: 0,
        Cough: 0,
        Covid: 0,
        LostTasteSmell: 0,
        MusclePain: 0,
        Diarrhea: 0,
        Vomitting: 0,
        Nausea: 0,
        Headache: 0,
        SoreThroat: 0,
      },
      appointments: [{ id: 1, date: "2021-02-14" }],
      form: null,
      availabilities: [],
      available: null,
    };
  },
  methods: {
    onEdit(item) {
      this.edit_mode = true;
      this.status_dialoge = true;
      this.form = Object.assign({}, item);
    },

    allowedDates() {
      return true;
    },

    onUpdateStatus() {
      this.form = Object.assign({}, this.form_default);
      this.status_dialoge = !this.status_dialoge;
    },

    myInfo() {
      this.$router.push("/profile");
    },
    async getStatuses() {
      try {
        console.log("request fired");
        const res = await axios.get(this.url + `healthstatuses/${this.userId}`);
        console.log(res);
        this.statuses = res.data;
      } catch (err) {
        // alert("error ; get statuses");
        console.log("err", err);
      }
    },
    async addStatus() {
      let d = new Date();
      this.form.fillOutDate = d.toISOString().split("T")[0];
      this.form.lastUpdateTime = d.toLocaleTimeString().substr(0, 8);
      try {
        this.form.PID = this.userId;
        await axios.post(this.url + "healthstatus", this.form);
        // alert("statuse added successfully");
        this.getStatuses();
        this.status_dialoge = false;
      } catch (err) {
        console.log("err", err);
        // alert("Failed ; add new status");
      }
    },
    async updateStatus() {
      const PID = this.userId;
      const date = this.form.fillOutDate.substr(0, 10);
      this.form.fillOutDate = this.form.fillOutDate.substr(0, 10);
      try {
        await axios.put(this.url + `healthstatus/${PID}/${date}`, this.form);
        // alert("statuse updated successfully");
        this.status_dialoge = false;
        this.edit_mode = false;
        this.getStatuses();
      } catch (err) {
        console.log("err", err);
        // alert("Failed ; add new status");
      }
    },
    async deleteStatus(status) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          // del status
          try {
            const id = this.userId;
            status.PID = id;
            axios.delete(
              this.url +
                `healthstatus/${id}/${status.fillOutDate.split("T")[0]}`
            );

            this.getStatuses();
          } catch (err) {
            console.log("err", err);
          }
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    },
    async bookAppoitment() {
      const did = this.doctorId;
      const pid = this.userId;
      let params = {
        DID: did,
        PID: pid,
        Time: this.available.StartTime,
        Date: this.available.SpecificDay.substr(0, 10),
        RequestedBy: "P",
      };
      try {
        await axios.post(this.url + "appointmentrequest", params);

        this.date_dialoge = false;
        this.getAppointments();
      } catch (err) {
        console.log("err", err);
        alert("Failed ; book appointment");
      }
    },
    async deleteAppointment(item) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          item.Date = item.Date.substr(0, 10);
          delete item.RequestedBy;
          try {
            axios.post(this.url + "deleteappointment", item);

            this.getAppointments();
          } catch (err) {
            console.log("err", err);
            alert("Failed ; delete appointment");
          }
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    },
    async getAppointments() {
      const id = this.userId;
      try {
        const res = await axios.post(this.url + `appointmentrequests`, {
          PID: id,
        });
        this.appointments = res.data;
      } catch (err) {
        console.log("err", err);
        alert("Failed ; get appointment");
      }
    },
    async getAvailabilities() {
      const id = this.doctorId;
      try {
        const res = await axios.get(this.url + `availability/${id}`);
        this.availabilities = res.data;
      } catch (err) {
        console.log("err", err);
        alert("Failed ; get appointment");
      }
    },

    async onAppointment() {
      await this.getAvailabilities();
      this.date_dialoge = true;
    },
  },
  computed: {
    statusesFiltered() {
      if (this.show_more === false) {
        return this.statuses.slice(0, 3);
      }
      return this.statuses;
    },
    userId() {
      return 3;
      // return store.state.user.UserID;
    },
    doctorId() {
      return 4;
      // return store.state.user.UserID;
    },
    filteredAvailability() {
      return this.availabilities.filter((item) => {
        return item.SpecificDay.substr(0, 10) == this.date;
      });
    },
  },
  mounted() {
    this.getStatuses();
    this.getAppointments();
    this.form = Object.assign({}, this.form_default);
  },
};
</script>
<style>
/* .up::before {
  content: "Next";
}
::before {
  content: "Next";
} */
/* td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}
th {
  padding: 5px;
  font-size: 0.6rem;
} */
.bg-image {
  background-image: url("../assets/PatientBg.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100%;
  min-width: 100%;
  /* position: fixed; */
  top: 0;
  left: 0;
  /* filter: opacity(0.5); */
}
.btn-container {
  /* border: 5px solid red; */
  /* margin-top: 100px;
  width: 30%;
  height: 40%;
  margin-left: 100%; */
}
</style>