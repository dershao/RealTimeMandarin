const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const MODE = process.env.MODE || "development";
console.info("Deploying in mode %s", MODE);
const app = express();

app.use(express.static(__dirname));
if (MODE !== "development") {
    app.use(express.static(path.join(__dirname, 'public')));
} else {
    app.use(express.static(path.join(__dirname, 'build')));
}


app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.get('/*', function (req, res) {
    if (MODE !== "development") {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } else {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    }
});

app.listen(PORT, () => {
    console.info("Server listening on port %s...", PORT);
});
