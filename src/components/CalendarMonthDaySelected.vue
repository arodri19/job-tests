<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <h1>Schedule day: {{ selectedDate }}</h1>
    <v-text-field
      v-model="title"
      :counter="10"
      :rules="TitleRules"
      label="Title"
      required
    ></v-text-field>

    <v-text-field
      v-model="reminder"
      :counter="30"
      :rules="ReminderRules"
      label="Reminder"
      required
    ></v-text-field>

    <v-text-field
      v-model="hourMinuteBegin"
      :rules="[(v) => !!v || 'Hours and Minutes is required']"
      label="Hour and Minute Begin"
      required
      type="time"
    ></v-text-field>

    <v-text-field
      v-model="hourMinuteEnd"
      :rules="[(v) => !!v || 'Hours and Minutes is required']"
      label="Hour and Minute End"
      required
      type="time"
    ></v-text-field>

    <v-row>
      <v-col cols="6">
        <v-btn color="success" @click="submitForm"> Send </v-btn>
      </v-col>

      <v-col cols="6">
        <v-btn color="error" @click="cancelForm"> Cancel </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  props: ["date"],
  data: () => ({
    valid: true,
    title: "",
    TitleRules: [
      (v) => !!v || "Title is required",
      (v) => (v && v.length <= 10) || "Title must be less than 10 characters",
    ],
    reminder: "",
    ReminderRules: [
      (v) => !!v || "Reminder is required",
      (v) =>
        (v && v.length <= 30) || "Reminder must be less than 30 characters",
    ],
    hourMinuteBegin: "",
    hourMinuteEnd: "",
    selectedDate: null,
  }),
  created() {
    this.selectedDate = this.$route.query.date;
  },
  methods: {
    submitForm() {
      this.$refs.form.validate();
    },
    cancelForm() {
      this.$router.push({ name: 'Home'})
    },
  },
};
</script>