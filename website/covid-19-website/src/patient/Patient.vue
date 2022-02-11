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
                <v-btn
                  block
                  color="success"
                  elevation="0"
                  @click="add"
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
                  @click="update"
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
        <!-- statuses -->
      </div>
      <!-- status rows -->
      <v-col cols="6">
        <v-row>
          <v-col cols="12">
            <div v-for="(item, i) in statusesFiltered" :key="i">
              <div class="d-flex align-center">
                <span> id: {{ item.id }} </span>
                <span> Date: {{ item.date }} </span>
                <span> Fever: {{ item.fever }} </span>
                <div class="d-flex">
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
                </div>
                <v-btn @click="onEdit(item)" icon color="primary" small>
                  <v-icon> mdi-pencil </v-icon>
                </v-btn>
                <v-btn @click="statuses.splice(i, 1)" icon color="error" small>
                  <v-icon> mdi-close </v-icon>
                </v-btn>
              </div>
            </div>
          </v-col>
          <v-col cols="12">
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
    </v-row>
  </div>
</template>
<script>
export default {
  name: "Patient",

  data() {
    return {
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
      form: Object.assign({}, this.form_default),
    };
  },
  methods: {
    onEdit(item) {
      this.edit_mode = true;
      this.status_dialoge = true;
      this.form = Object.assign({}, item);
    },
    update() {
      const index = this.statuses.findIndex((item) => {
        return item.id === this.form.id;
      });
      this.statuses.splice(index, this.form);
      this.status_dialoge = false;
      this.edit_mode = false;
    },
    allowedDates() {
      return true;
    },
    add() {
      this.form = Object.assign({}, this.form_default);
      const d = new Date();
      this.form.date = d.toLocaleString();
      this.form.id = this.statuses.length + 1;
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
  computed: {
    statusesFiltered() {
      if (this.show_more === false) {
        return this.statuses.slice(0, 3);
      }
      return this.statuses;
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
}
.btn-container {
  /* border: 5px solid red; */
  /* margin-top: 100px;
  width: 30%;
  height: 40%;
  margin-left: 100%; */
}
</style>
