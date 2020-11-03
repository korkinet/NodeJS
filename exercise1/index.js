const source = require('./source');
const calcFunction = require('./app');

source.sumEvent.on('calculate', async (a, b) => console.log(`${a} + ${b} = ${await calcFunction(a, b)}`));

source.init();
