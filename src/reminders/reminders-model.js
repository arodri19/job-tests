const remindersDAO = require('./reminders-dao');
const validations = require('../commom-validations');

class Reminder {
  constructor (reminder) {
    this.id = reminder.id
    this.title = reminder.title
    this.reminder = reminder.reminder
    this.hourMinuteBegin = reminder.hourMinuteBegin
    this.hourMinuteEnd = reminder.hourMinuteEnd
    this.date = reminder.date
    this.country = reminder.country
    this.state = reminder.state
    this.city = reminder.city
    this.color = reminder.color
    this.validate()
  }
  validate () {

    validations.stringNotEmpty(this.title, 'title')
    validations.stringMaxLength(this.title, 'title', 10)

    validations.stringNotEmpty(this.reminder, 'reminder')
    validations.stringMaxLength(this.reminder, 'reminder', 30)

    validations.stringNotEmpty(this.hourMinuteBegin, 'hourMinuteBegin')
    
    validations.stringNotEmpty(this.hourMinuteEnd, 'hourMinuteEnd')

    validations.stringNotEmpty(this.color, 'color')

    validations.stringNotEmpty(this.date, 'date')
    validations.stringCheckDate(this.date, 'date')

  }

  async create () {
    return await remindersDAO.createReminder(this)
  }

  static async listSelectedDate(dateBegin, dateEnd){
    const reminders = await remindersDAO.listReminders(dateBegin, dateEnd)
    if (!reminders) {
      return []
    }

    return reminders
  }

  static async detailReminder (id) {
    const reminder = await remindersDAO.detailReminder(id)
    if (!reminder) {
      return null
    }

    return new Reminder(reminder)
  }

  async updateReminder(){
    return await remindersDAO.updateReminder(this)
  }

  async deleteReminder () {
    return await remindersDAO.deleteReminder(this)
  }
}

module.exports = Reminder;
