const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});
let PORT = server.listen(process.env.PORT || '3000');
app.set('port', PORT);

app.listen(PORT,() => {
    console.log('server live');
});