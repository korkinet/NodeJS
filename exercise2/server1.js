const http = require('http');
const cluster = require('cluster');

function delay(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

if (cluster.isMaster) {
  const numCPUs = require('os').cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({ workerId: i });
  }
} else {
  new http.Server((req, res) => {
    console.log(new Date(), 'Request received', req.url, 'worker: ' + process.env.workerId);
    delay(2000);
    res.end('Success, ' + req.url);
  }).listen(4300);
}


