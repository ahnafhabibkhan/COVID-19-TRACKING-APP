<template>
  <div class="immigration-officer">
    <div class="patients-list-container">
      <h1 style="margin-top: 100px;">List Of Patients</h1>
      <v-card
        class="patients-list-container"
        outlined
        color="transparent"
      >
        <v-card
          v-for="(item, i) in patientList"
          :key="i"
          :title="item.title"
          class="pa-2 mx-8 my-8"
          style="display: inline-table;"
          width="25%"
          height="10%"
          @click="onPatientClick()"
          ><h3 class="my-2">{{ item.firstName }} {{ item.lastName }}</h3>
          <p>Covid: {{item.covidStatus}}</p>
          <p>Age: {{item.age}}</p>
          <p>Traveled in the last 14 days: {{item.traveledDuringLastCoupleOfDays}}</p>
          </v-card
        >
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImmigrationOfficer",

  components: {},

  data() {
    return {
      patientList: [
        {
          firstName: "John",
          lastName: "Doe",
          covidStatus: true,
          age: 40,
          traveledDuringLastCoupleOfDays: false,
        },
        {
          firstName: "Naruto",
          lastName: "Uchiha",
          covidStatus: false,
          age: 32,
          traveledDuringLastCoupleOfDays: true,
        },
        {
          firstName: "Luffy",
          lastName: "Uzumaki",
          covidStatus: false,
          age: 19,
          traveledDuringLastCoupleOfDays: true,
        },
        {
          firstName: "Zoro",
          lastName: "Roronoa",
          covidStatus: true,
          age: 20,
          traveledDuringLastCoupleOfDays: true,
        },
        {
          firstName: "Mikasa",
          lastName: "Ackerman",
          covidStatus: true,
          age: 18,
          traveledDuringLastCoupleOfDays: false,
        },
      ],
    };
  },
  mounted() {
    console.log(this.patientList);
  },
  methods: {
    onPatientClick() {
      this.$router.push('/')
    },
  }
};
</script>

<style>
.immigration-officer {
  background-image: url("../assets/io.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100%;
  min-width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
/* .patient-info {
  width: 50%;
  height: 30%;
  border: 5px solid red; */
/* } */
.patients-list-container {
  /* display: inline-table; */
  margin-top: 100px;
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
