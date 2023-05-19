const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require("./config/dbConfig");
const errorHandler = require('./middleware/errorHandler');
// const bodyParser = require('body-parser');
// var bodyParser = require('body-parser');

const app = express()
const port = process.env.PORT || 5000;

connectDB();

// app.use('/', (request, response) => {
//     response.send('Hello World');
// })
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

app.use(express.json());

app.use('/api/users', require('./routes/authRoute'));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is runnig at ${port}`);
});