const net = require('net');
const readline = require('readline');

// create new connection
const client = net.createConnection({
  host: '127.0.0.2',
  port: 3333,
});

// log errors
client.on('error', (err) => {
  console.error(err);
});

client.on('connect', () => {
  console.log('client connected');

  // handling responses to get requests
  responseRl = readline.createInterface(client);

  responseRl.on('line', (data) => {
    console.log(data + '\n');
  });
  get('test', client);
});

const get = function(key, client) {
  const getRequest = {
    action: 'get',
    key: key,
  };

  client.write(JSON.stringify(getRequest) + '\n');
};
