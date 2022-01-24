const db = require('../../database/database');
const { InternalServerError } = require('../errors')
const { promisify } = require('util');
const dbRun = promisify(db.run).bind(db);
const dbGet = promisify(db.get).bind(db);
const dbAll = promisify(db.all).bind(db);


module.exports = {
  async createReminder(reminder) {
    try {
      await dbRun('INSERT INTO reminders (title, reminder, hourMinuteBegin,hourMinuteEnd,date, createdAt, updatedAt) VALUES (?, ?, ?,?,?, DATE(), DATE())', [
        reminder.title,
        reminder.reminder,
        reminder.hourMinuteBegin,
        reminder.hourMinuteEnd,
        reminder.date
      ])
    } catch (erro) {
      throw new InternalServerError('Error add reminder!')
    }
  },

  async listReminders(dateBegin, dateEnd) {
    try {
      return await dbAll('SELECT id, title, reminder, hourMinuteBegin,hourMinuteEnd, date FROM reminders where date between ? AND ?', [dateBegin, dateEnd])
    } catch (erro) {
      throw new InternalServerError('Error list reminders!')
    }
  },

  async detailReminder(id) {
    try {
      return await dbGet('SELECT id, title, reminder, hourMinuteBegin, hourMinuteEnd, date FROM reminders where id = ?', [id])
    } catch (erro) {
      throw new InternalServerError('reminder not found!')
    }
  },

  async updateReminder(reminder) {
    try {
      return await dbRun('UPDATE reminders SET title = ?, reminder = ?, hourMinuteBegin=?, hourMinuteEnd=?, updatedAt = DATE() where id = ?',
        [reminder.title, reminder.reminder, reminder.hourMinuteBegin, reminder.hourMinuteEnd, reminder.id])
    } catch (erro) {
      throw new InternalServerError('Error update reminder!')
    }
  },

  async deleteReminder({ id }) {
    try {
      return await dbRun('DELETE FROM reminders WHERE id = ?', [id])
    } catch (erro) {
      throw new InternalServerError('error delete reminder!')
    }
  }
};
