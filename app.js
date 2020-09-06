const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());

//Import Routes
const postsRoute = require('./post/post');

app.use('/post', postsRoute);

app.get('/', (req, res) => {
    res.send('Estamos en el home');
});

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log('connected to DB!')
);

app.listen(3000);