
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const corsOptions = {
    //To allow requests from client
    origin: [
        "http://localhost:8081",
        "http://localhost:8080",
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"],
};
app.use(cors(corsOptions));
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());

app.use('/', require('./routes/users'));

app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});


