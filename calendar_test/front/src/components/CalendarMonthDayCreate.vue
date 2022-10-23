<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <h1>Schedule day: {{ form.date }}</h1>
    <v-text-field
      v-model="form.title"
      :counter="10"
      :rules="validation.TitleRules"
      label="Title"
      required
    ></v-text-field>

    <v-text-field
      v-model="form.reminder"
      :counter="30"
      :rules="validation.ReminderRules"
      label="Reminder"
      required
    ></v-text-field>

    <v-text-field
      v-model="form.hourMinuteBegin"
      :rules="[(v) => !!v || 'Hours and Minutes is required']"
      label="Hour and Minute Begin"
      :max="form.hourMinuteEnd"
      required
      type="time"
    ></v-text-field>

    <v-text-field
      v-model="form.hourMinuteEnd"
      :rules="[(v) => !!v || 'Hours and Minutes is required']"
      label="Hour and Minute End"
      :min="form.hourMinuteBegin"
      max="24:00"
      required
      type="time"
    ></v-text-field>

    <v-autocomplete
      :items="colors"
      v-model="form.color"
      :rules="[(v) => !!v || 'Color is required']"
      label="Color"
      required
    ></v-autocomplete>

    <v-autocomplete
      :items="states"
      v-model="form.state"
      label="State"
      item-text="name"
      item-value="name"
      @blur="getCities"
    ></v-autocomplete>
    <v-autocomplete
      :items="cities"
      v-model="form.city"
      label="City"
    ></v-autocomplete>

    <v-row>
      <v-col cols="6">
        <v-btn color="success" @click="createReminder"> Send </v-btn>
      </v-col>

      <v-col cols="6">
        <v-btn color="error" @click="cancelForm"> Cancel </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import formReminder from "../mixins/registerReminder.js";
export default {
  name: "CalendarMonthDayCreate",
  mixins: [formReminder],
  created() {
    this.form.date = this.$route.query.date;
    this.getStates()
  },
  methods: {
    getStates() {
      this.$http.post(
        `https://countriesnow.space/api/v0.1/countries/states`,
        { country: "Brazil" },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then(res => {
        this.states = res.data.data.states
      });
    },
    getCities() {
      this.$http.post(
        `https://countriesnow.space/api/v0.1/countries/state/cities`,
        { country: "Brazil", state: this.form.state },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then(res => {
        this.cities = res.data.data
      });
    },
  },
};
</script>