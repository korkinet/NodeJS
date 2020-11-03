const superagent = require('superagent');

for (let i = 1; i <= 10; i++) {
  console.log(new Date(), 'Sending request', i);

  superagent.get('http://localhost:4300/' + i)
    .then(res => console.log(new Date(), 'Response received', i, res.text));
}
