<template>
  <div class="bg-image">
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
                <v-btn block color="success" elevation="0"> book </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>

      <!-- date modal end -->
      <!-- status modal start -->
      <v-dialog v-model="status_dialoge" width="500px">
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
                <v-btn block color="success" elevation="0" @click="saveStatus">
                  Save
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
      <!-- status modal end -->
      <!-- <div class="btn-container">
        <v-col cols="4">
          <v-row>
            <v-col cols="12">
              <v-btn block x-large elevation="0" color="success" @click="myInfo"
                >My Info</v-btn
              >
            </v-col>
            <v-col cols="12">
              <v-btn
                block
                x-large
                elevation="0"
                color="success"
                @click="date_dialoge = !date_dialoge"
              >
                Book an Appointment
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn
                block
                x-large
                elevation="0"
                color="success"
                @click="onUpdateStatus"
              >
                Update Status
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-text-field
                :readonly="item.disable"
                v-for="(item, i) in statuses"
                :key="i"
                v-model="item.note"
                dense
                hide-details
                solo
              >
                <template v-slot:append>
                  <v-btn
                    @click="item.disable = !item.disable"
                    icon
                    color="primary"
                    small
                  >
                    <v-icon> mdi-pencil </v-icon>
                  </v-btn>
                  <v-btn
                    @click="statuses.splice(i, 1)"
                    icon
                    color="error"
                    small
                  >
                    <v-icon> mdi-close </v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </div> -->
      <div class="btn-container" style="margin-right: 65%; width: 25%">
        <v-row>
          <v-col cols="12">
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
            <div class="my-6 mx-3">
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
          </v-col>
        </v-row>
        <v-col cols="12">
          <v-text-field
            style="margin-top: 10px"
            :readonly="item.disable"
            v-for="(item, i) in statuses"
            :key="i"
            v-model="item.note"
            dense
            hide-details
            solo
          >
            <template v-slot:append>
              <v-btn
                @click="item.disable = !item.disable"
                icon
                color="primary"
                small
              >
                <v-icon> mdi-pencil </v-icon>
              </v-btn>
              <v-btn @click="statuses.splice(i, 1)" icon color="error" small>
                <v-icon> mdi-close </v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
      </div>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "Patient",

  data() {
    return {
      date_dialoge: false,
      status_dialoge: false,
      date: null,
      statuses: [],
      form: {
        disable: true,
        i_have_covid: false,
        headache: false,
        breath_problem: false,
        fever: 36,
        runny_nose: false,
      },
    };
  },
  methods: {
    allowedDates() {
      return true;
    },
    saveStatus() {
      this.statuses.push(Object.assign({}, this.form));
      this.status_dialoge = false;
    },
    onUpdateStatus() {
      this.status_dialoge = !this.status_dialoge;
      this.form.note = null;
    },
    myInfo() {
      this.$router.push("/profile");
    },
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
  position: fixed;
  top: 0;
  left: 0;
}
.btn-container {
  /* border: 5px solid red; */
  /* margin-top: 100px;
  width: 30%;
  height: 40%;
  margin-left: 100%; */
}
</style>
