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

    <v-row>
      <v-col cols="4">
        <v-btn color="success" @click="updateReminder"> Send </v-btn>
      </v-col>

      <v-col cols="4">
        <v-btn color="error" @click="cancelForm"> Cancel </v-btn>
      </v-col>
      <v-col cols="4">
        <v-btn color="warning" @click="deleteReminder"> Delete </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import formReminder from "../mixins/registerReminder.js";
export default {
  name: "CalendarMonthDayEdit",
  mixins: [formReminder],
  created() {
    this.form = this.$route.params.reminder;
  },
};
</script>