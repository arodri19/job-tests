/* eslint-disable no-unused-labels */
export default {
    data: () => ({
        form: {
            id: 0,
            uniqueCode: 0,
            title: "",
            reminder: "",
            hourMinuteBegin: "",
            hourMinuteEnd: "",
            date: null,
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
        valid: true
    }),
    methods: {
        async createReminder() {
            if (this.$refs.form.validate()) {

                try {
                    await this.$http.post(
                        `/reminder`,
                        this.form,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                            }
                        }
                    ).then(async () => {

                    })
                } catch (error) {
                    let actualList = this.$store.getters.reminders;
                    actualList.push({ ...this.form, uniqueCode: this.$store.getters.uniqueCode });
                    this.$store.dispatch("createReminder", actualList);
                }

                this.$router.push({ name: "Home", params: { text: 'Reminder created' } });
            }
        },
        async updateReminder() {
            if (this.$refs.form.validate()) {
                try {
                    await this.$http
                        .put(`/reminder/${this.form.id}`, this.form, {
                            headers: {
                                "Content-Type": "application/json",
                                "Access-Control-Allow-Origin": "*",
                            },
                        })
                } catch (error) {

                    let actualList = this.$store.getters.reminders;
                    let newList = actualList.filter(
                        (x) => x.uniqueCode != this.form.uniqueCode
                    );
                    newList.push({
                        ...this.form,
                    });
                    this.$store.dispatch("createReminder", newList);
                }


                this.$router.push({ name: "Home", params: { text: 'Reminder updated' } });
            }
        },
        async deleteReminder() {
            try {
                await this.$http
                    .delete(`/reminder/${this.form.id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                        },
                    })
            } catch (error) {

                let actualList = this.$store.getters.reminders;
                let newList = actualList.filter(
                    (x) => x.uniqueCode != this.form.uniqueCode
                );
                this.$store.dispatch("createReminder", newList);
            }

            this.$router.push({ name: "Home", params: { text: 'Reminder deleted' } });
        },
        cancelForm() {
            this.$router.push({ name: "Home" });
        },
    }
}