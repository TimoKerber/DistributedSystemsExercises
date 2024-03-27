const net = require('net');
const readline = require('readline');

const name = process.argv[2];

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

  // Receive data from server and log to console
  const rlServer = readline.createInterface(client, client);

  rlServer.on('line', (data) => {
    try {
      const message = JSON.parse(data);
      console.log(message.sent + ' ' + message.from + ': ' + message.message);
    } catch (e) {
      console.log('invalid message encoding');
    }
  });

  // Take each input from command line and send it to server
  const rlConsole = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rlConsole.on('line', (data) => {
    const messageObj = {
      from: name, // Command line argument
      sent: Date.now(), // Current timestamp in milliseconds
      message: data,
    };
    client.write(JSON.stringify(messageObj) + '\n');
  });
});
