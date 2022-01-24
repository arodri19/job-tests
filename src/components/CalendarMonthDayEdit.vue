<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <h1>Schedule day: {{ editReminder.selectedDate }}</h1>
    <v-text-field
      v-model="editReminder.title"
      :counter="10"
      :rules="validation.TitleRules"
      label="Title"
      required
    ></v-text-field>

    <v-text-field
      v-model="editReminder.reminder"
      :counter="30"
      :rules="validation.ReminderRules"
      label="Reminder"
      required
    ></v-text-field>

    <v-text-field
      v-model="editReminder.hourMinuteBegin"
      :rules="[(v) => !!v || 'Hours and Minutes is required']"
      label="Hour and Minute Begin"
      :max="editReminder.hourMinuteEnd"
      required
      type="time"
    ></v-text-field>

    <v-text-field
      v-model="editReminder.hourMinuteEnd"
      :rules="[(v) => !!v || 'Hours and Minutes is required']"
      label="Hour and Minute End"
      :min="editReminder.hourMinuteBegin"
      max="24:00"
      required
      type="time"
    ></v-text-field>

    <v-row>
      <v-col cols="4">
        <v-btn color="success" @click="submitForm"> Send </v-btn>
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
export default {
  data: () => ({
    editReminder: {
      id:0,
      uniqueCode: 0,
      title: "",
      reminder: "",
      hourMinuteBegin: "",
      hourMinuteEnd: "",
      selectedDate: null,
    },
    validation: {
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
    valid: true,
  }),
  created() {
    this.editReminder = this.$route.params.reminder;
  },
  methods: {
    async submitForm() {
      if (this.$refs.form.validate()) {
        try {
          await this.$http
            .put(`/reminder/${this.editReminder.id}`, this.editReminder, {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            })
        } catch (error) {

          let actualList = this.$store.getters.reminders;
          let newList = actualList.filter(
            (x) => x.uniqueCode != this.editReminder.uniqueCode
          );
          newList.push({
            ...this.editReminder,
          });
          this.$store.dispatch("createReminder", newList);
        }

        
        this.$router.push({ name: "Home", params:{text:'Reminder updated'} });
      }
    },
    async deleteReminder() {
      try {
          await this.$http
            .delete(`/reminder/${this.editReminder.id}`, {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            })
        } catch (error) {

          let actualList = this.$store.getters.reminders;
          let newList = actualList.filter(
            (x) => x.uniqueCode != this.editReminder.uniqueCode
          );
          this.$store.dispatch("createReminder", newList);
        }
      
      this.$router.push({ name: "Home", params:{text:'Reminder deleted'} });
    },
    cancelForm() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>