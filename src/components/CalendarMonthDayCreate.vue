<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <h1>Schedule day: {{ createReminder.selectedDate }}</h1>
    <v-text-field
      v-model="createReminder.title"
      :counter="10"
      :rules="validation.TitleRules"
      label="Title"
      required
    ></v-text-field>

    <v-text-field
      v-model="createReminder.reminder"
      :counter="30"
      :rules="validation.ReminderRules"
      label="Reminder"
      required
    ></v-text-field>

    <v-text-field
      v-model="createReminder.hourMinuteBegin"
      :rules="[(v) => !!v || 'Hours and Minutes is required']"
      label="Hour and Minute Begin"
      :max="createReminder.hourMinuteEnd"
      required
      type="time"
    ></v-text-field>

    <v-text-field
      v-model="createReminder.hourMinuteEnd"
      :rules="[(v) => !!v || 'Hours and Minutes is required']"
      label="Hour and Minute End"
      :min="createReminder.hourMinuteBegin" max="24:00"
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
    createReminder: {
      title: "",
      reminder: "",
      hourMinuteBegin: "",
      hourMinuteEnd: "",
      selectedDate: null,
    },
    validation:{
      TitleRules: [
        (v) => !!v || "Title is required",
        (v) => (v && v.length <= 10) || "Title must be less than 10 characters",
      ],
      ReminderRules: [
        (v) => !!v || "Reminder is required",
        (v) =>
          (v && v.length <= 30) || "Reminder must be less than 30 characters",
      ],
    },
    valid: true
  }),
  created() {
    this.createReminder.selectedDate = this.$route.query.date;
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        let actualList = this.$store.getters.reminders;
        actualList.push({...this.createReminder, uniqueCode: this.$store.getters.uniqueCode});
        this.$store.dispatch("createReminder", actualList);
        this.$router.push({ name: "Home" });
      }
    },
    cancelForm() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>