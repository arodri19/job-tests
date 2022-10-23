const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite');

const REMINDERS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS reminders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(10) NOT NULL,
    reminder VARCHAR(30) NOT NULL,
    hourMinuteBegin TIME NOT NULL,
    hourMinuteEnd TIME NOT NULL,
    date DATE NOT NULL,
    country VARCHAR(30),
    state VARCHAR(50),
    city VARCHAR(50)
  )
  `;

db.serialize(() => {
  db.run(REMINDERS_SCHEMA);

  db.each('SELECT * FROM reminders', (err, reminders) => {
    console.log('Reminders: ');
    console.log(reminders);
  });
});

process.on('SIGINT', () =>
  db.close(() => {
    process.exit(0);
  })
);

module.exports = db;
