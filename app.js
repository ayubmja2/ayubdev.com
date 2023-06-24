const express = require('express');
const server = require('http').createServer();
const app = express();
const PORT = 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname, {extensions: ['html']}));

app.get('/favicon.ico', (req, res) => {
  res.sendFile('/images/favicon_io/favicon-32x32.png');
});
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/index', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/mprojects', function (req, res) {
  res.sendFile(__dirname + '/mprojects.html');
});

server.on('request', app);

server.listen(PORT, function () {
  console.log('Listening on ' + PORT);
});
