const http = require('http');

for (let i = 1; i <= 10; i++) {
  console.log(new Date(), 'Sending request', i);
  
  http.get('http://localhost:4300/' + i, res => {
    let data= '';
    res.on('data', (chunk) =>{
      data+= chunk;
    });
    
    res.on('end', () => console.log(new Date(), 'Response received', i, data));
  });
}
