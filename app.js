const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || 5500;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, function () {
  console.log('server running at port', port);
});
