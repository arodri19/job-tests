const Reminder = require('./reminders-model');
const { InvalidArgumentError } = require('../errors');
const repositoryReminder = require("./reminders-repository")

module.exports = {
    async addReminder(req, res, proximo) {
        const {date,hourMinuteBegin,hourMinuteEnd,reminder,title, country, state, city, color} = req.body
        try {
            const createReminder = new Reminder({
                date,
                hourMinuteBegin,
                hourMinuteEnd,
                reminder,
                title,
                country,
                state,
                city,
                color,
            })

            await createReminder.create();

            res.status(201).send({ msg: 'Reminder Created' });
        } catch (erro) {
            if (erro instanceof InvalidArgumentError) {
                res.status(422).json({ erro: erro.message });
            } else {
                res.status(500).json({ erro: erro.message });
            }
        }
    },

    async listReminders(req, res, proximo) {
        try {
            const {dateBegin, dateEnd} = req.params
            const reminders = await Reminder.listSelectedDate(dateBegin,dateEnd);

            for (const reminder of reminders) {
                if(reminder.state && reminder.city){
                    await repositoryReminder.getWeatherByCountryStateCity(reminder)
                }
            }

            res.send(reminders);
        } catch (erro) {
            return res.status(500).json({ erro: erro });
        }
    },
    async getDetailsReminder(req, res, proximo) {
        try {
            const {id} = req.params
            const reminder = await Reminder.detailReminder(id);
            res.send(reminder);
        } catch (erro) {
            return res.status(500).json({ erro: erro });
        }
    },

    async updateReminder(req, res, proximo) {
        try {
            const {date,hourMinuteBegin,hourMinuteEnd,reminder,title,country,state,city, color} = req.body
            const {id} = req.params
            const updateReminder = new Reminder({
                id,
                date,
                hourMinuteBegin,
                hourMinuteEnd,
                reminder,
                title,
                country,
                state,
                city,
                color
            })
            await updateReminder.updateReminder();
            res.status(201).send({ msg: 'Reminder updated' });
        } catch (erro) {
            return res.status(500).json({ erro: erro.message })
        }
    },

    async deleteReminder(req, res, proximo) {
        try {
            const {id} = req.params
            const reminder = await Reminder.detailReminder(id);
            await reminder.deleteReminder()
            res.status(201).send({ msg: 'Reminder deleted' });
        } catch (erro) {
            return res.status(500).json({ erro: erro.message })
        }
    }
};
