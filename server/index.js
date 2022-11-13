const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

app.listen(9000, () => {
    console.log('Server is running on port http://localhost:9000');
})
