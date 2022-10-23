const remindersControllers = require('./reminders-controller');

module.exports = app => {
    app
        .route('/reminder/:dateBegin/:dateEnd')
        .get(
            remindersControllers.listReminders
        )
    app
        .route('/reminder')
        .post(
            remindersControllers.addReminder
        )

    app.route('/reminder/:id')
        .get(
            remindersControllers.getDetailsReminder
        )
        .put(
            remindersControllers.updateReminder
        )
        .delete(
            remindersControllers.deleteReminder
        )
}

