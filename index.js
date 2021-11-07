const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
}
);

app.listen(() => {
    console.log('live on http://localhost:3000/');
});