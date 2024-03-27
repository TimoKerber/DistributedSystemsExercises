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
});

// gets the value of key or null if key has no value in database
const get = function(key) {
  const getRequest = {
    action: 'get',
    key: key,
  };

  client.write(JSON.stringify(getRequest) + '\n');
};

// sets  or overwrites a key value pair in the database
const set = function(key, value) {
  const setRequest = {
    action: 'set',
    key: key,
    value: value,
  };

  client.write(JSON.stringify(setRequest) + '\n');
};


// For testing purposes
get('test');
get('test1');
set('test1', 'received and set');
get('test1');
