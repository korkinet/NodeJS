const events = require('events');

const sumEvent = new events.EventEmitter();
const MAX = 2000;

function init() {
  setInterval(() => {
    const a = Math.round(Math.random() * MAX);
    const b = Math.round(Math.random() * MAX);
    sumEvent.emit('calculate', a, b);
  }, 1000);
}

module.exports = {
  init,
  sumEvent
};
