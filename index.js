const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});
let port_number = server.listen(process.env.PORT || 3000);

app.listen(port_number,() => {
    console.log('server live');
});