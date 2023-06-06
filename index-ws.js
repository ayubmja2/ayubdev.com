const express = require('express');
const server = require('http').createServer();
const app = express();
const PORT = 3000;



app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname, {extensions: ['html']}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/index', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/portfolio', function(req, res){
    res.sendFile(__dirname + '/portfolio.html');
});


server.on('request', app);

server.listen(PORT, function () { console.log('Listening on ' + PORT); });


process.on('SIGINT', () => {
    wss.clients.forEach(function each(client){
        client.close();
    });

    server.close(() => {
        shutdownDB();
    });
});


/** Websocket **/
const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({ server: server });

wss.on('connection', function connection(ws) {
  const numClients = wss.clients.size;

  console.log('clients connected: ', numClients);

  wss.broadcast(`Current visitors: ${numClients}`);

  if (ws.readyState === ws.OPEN) {
    ws.send('welcome!');
  }
 
  db.run(`INSERT INTO visitors (count, time)
        VALUES (${numClients}, datetime('now'))
      `);

  ws.on('close', function close() {
    wss.broadcast(`Current visitors: ${wss.clients.size}`);
    console.log('A client has disconnected');
  });

  ws.on('error', function error() {
    //
  });
});

/**
 * Broadcast data to all connected clients
 * @param  {Object} data
 * @void
 */
wss.broadcast = function broadcast(data) {
  console.log('Broadcasting: ', data);
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

/** End Websocket **/


/** Begin database **/

const sqlite = require('sqlite3');
const db = new sqlite.Database(':memory:');
db.serialize(() => {
    db.run(`
        CREATE TABLE visitors (
            count INTEGER,
            time TEXT
        )
    `);
});

function getCount(){
    db.each("SELECT * FROM visitors", (err, row) => {
        console.log(row);

    });

};


function shutdownDB() {
    getCount();
    console.log("Shutting Down db");
    db.close();
};
