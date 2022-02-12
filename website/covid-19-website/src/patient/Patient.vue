<template>
  <v-container class="bg-image">
    <v-row>
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
                {{ date }}
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
                <v-switch
                  v-model="form.i_have_covid"
                  label="I have covid 19"
                ></v-switch>
                <div>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        label="Fever"
                        filled
                        flat
                        v-model.number="form.fever"
                        dense
                        hide-details
                      ></v-text-field
                    ></v-col>
                    <v-col cols="6">
                      <v-checkbox
                        dense
                        hide-details
                        label="Headache"
                        v-model="form.headache"
                      ></v-checkbox
                    ></v-col>
                    <v-col cols="6">
                      <v-checkbox
                        dense
                        hide-details
                        label="Runny Nose"
                        v-model="form.runny_nose"
                      ></v-checkbox
                    ></v-col>
                    <v-col cols="6">
                      <v-checkbox
                        dense
                        hide-details
                        label="Breath Problem"
                        v-model="form.breath_problem"
                      ></v-checkbox
                    ></v-col>
                  </v-row>
                </div>
              </v-col>
              <v-col cols="12">
                <v-textarea rows="3" v-model="form.note" label="note">
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
              @click="date_dialoge = !date_dialoge"
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
                  <span> Date: {{ item.date }} </span>
                  <v-checkbox
                    label="i have Covid"
                    dense
                    hide-details
                    readonly
                    v-model="item.i_have_covid"
                  >
                  </v-checkbox>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="d-flex align-center justify-space-between">
                    <span> Fever: {{ item.fever }} </span>

                    <v-checkbox
                      label="Covid"
                      dense
                      hide-details
                      readonly
                      v-model="item.i_have_covid"
                    >
                    </v-checkbox>
                    <v-checkbox
                      label="Headech"
                      dense
                      readonly
                      hide-details
                      v-model="item.headache"
                    >
                    </v-checkbox>
                    <v-checkbox
                      label="Runny Nose"
                      dense
                      hide-details
                      readonly
                      v-model="item.runny_nose"
                    >
                    </v-checkbox>
                    <v-checkbox
                      label="Breath Issue"
                      dense
                      hide-details
                      readonly
                      v-model="item.breath_problem"
                    >
                    </v-checkbox>

                    <v-btn @click="onEdit(item)" icon color="primary" small>
                      <v-icon> mdi-pencil </v-icon>
                    </v-btn>
                    <v-btn
                      @click="deleteStatus(item.id)"
                      icon
                      color="error"
                      small
                    >
                      <v-icon> mdi-close </v-icon>
                    </v-btn>
                  </div>
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
      <v-col cols="12" md="6"  class="d-flex align-center">
        <div style="width: 70%; background-color:rgba(256,256,256,0.5);" class="pa-4 rounded-2">
          <h2>Appointments :</h2>
          <div v-for="(item, i) in appointments" :key="i">
            {{ item.date }}

            <v-btn small color="error" @click="deleteAppointment(item.id)">
              delete appointment
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
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
        id: null,
        date: null,
        i_have_covid: false,
        headache: false,
        breath_problem: false,
        fever: 36,
        runny_nose: false,
      },
      appointments: [
        {id: 1 ,date:'2021-02-14' }
      ],
      form: null,
    };
  },
  methods: {
    onEdit(item) {
      this.edit_mode = true;
      this.status_dialoge = true;
      this.form = Object.assign({}, item);
    },
    // update() {
    //   const index = this.statuses.findIndex((item) => {
    //     return item.id === this.form.id;
    //   });

    //   this.statuses.splice(index, 1, this.form);
    //   this.status_dialoge = false;
    //   this.edit_mode = false;
    // },
    allowedDates() {
      return true;
    },
    // add() {
    //   const d = new Date();
    //   this.form.date = d.toLocaleString();
    //   this.form.id = this.statuses.length + 1;
    //   this.statuses.push(Object.assign({}, this.form));
    //   this.status_dialoge = false;
    // },
    // this method open dialoge
    onUpdateStatus() {
      this.form = Object.assign({}, this.form_default);
      this.status_dialoge = !this.status_dialoge;
    },

    myInfo() {
      this.$router.push("/profile");
    },
    async getStatuses() {
      try {
        const res = await this.$axios.get(this.url + "statuses");
        console.log(res);
        this.statuses = res.data;
      } catch (err) {
        alert("error ; get statuses");
        console.log("err", err);
      }
    },
    async addStatus() {
      try {
        await this.$axios.post(this.url + "statuses", this.form);
        alert("statuse added successfully");
        this.getStatuses();
        this.status_dialoge = false;
      } catch (err) {
        console.log("err", err);
        alert("Failed ; add new status");
      }
    },
    async updateStatus() {
      try {
        await this.$axios.put(this.url + "statuses", this.form);
        alert("statuse updated successfully");
        this.status_dialoge = false;
        this.edit_mode = false;
        this.getStatuses();
      } catch (err) {
        console.log("err", err);
        alert("Failed ; add new status");
      }
    },
    async deleteStatus(id) {
      try {
        await this.$axios.put(this.url + "statuses", id);
        alert("statuse deleted successfully");
        this.getStatuses();
      } catch (err) {
        console.log("err", err);
        alert("Failed ; delete one status");
      }
    },
    async bookAppoitment() {
      try {
        await this.$axios.post(this.url + "statuses", this.date);
        alert("appointment booked successfully");
        this.getStatuses();
      } catch (err) {
        console.log("err", err);
        alert("Failed ; book appointment");
      }
    },
    async deleteAppointment(id) {
      try {
        await this.$axios.delete(this.url + "deleteAppoitnment", id);
        alert("appointment deleted successfully");
        this.getAppointments();
      } catch (err) {
        console.log("err", err);
        alert("Failed ; delete appointment");
      }
    },
    async getAppointments() {
      try {
        const res = await this.$axios.get(this.url + "Appointments");
        this.appointments = res.data;
      } catch (err) {
        console.log("err", err);
        alert("Failed ; get appointment");
      }
    },
  },
  computed: {
    statusesFiltered() {
      if (this.show_more === false) {
        return this.statuses.slice(0, 3);
      }
      return this.statuses;
    },
  },
  mounted() {
    // this.getStatuses();
    // this.getAppointments();
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