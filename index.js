const express = require('express');
const app = express();

let PORT = process.env.PORT || '3000'
app.set('port', PORT);
app.use(express.static("public"));

app.listen(PORT,() => {
    console.log('server live');
});