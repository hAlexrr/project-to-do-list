const express = require('express');
const cors = require('cors');
const env = require('dotenv');

const app = express();

// environment variables or you can say constants
env.config();

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

app.listen(9000, () => {
    console.log('Server is running on port http://localhost:9000');
})
