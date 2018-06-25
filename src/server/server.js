const express = require('express');
const path = require('path');
const opn = require('opn');

const app = express();

// Port to listen on
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.resolve('dist')));

// Route
app.get('/', (req, res) => {

    res.sendFile(path.resolve('dist/index.html'));
});

// Serve app
app.listen(port, () => {

    console.log(`App listening on port ${port}`);

    // Open browser
    opn(`http://localhost:${port}`);
});

