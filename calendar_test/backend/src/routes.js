const reminders = require('./reminders');

module.exports = app => { 
  reminders.routes(app);
};