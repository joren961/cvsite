const express = require('express');
const app = express();
const path = require('path');

server.get('/*', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
let PORT = process.env.PORT || '3000'
app.set('port', PORT);
app.use(express.static("public"));

app.listen(PORT,() => {
    console.log('server live');
});