const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());

const movieRouter = require('./routes/movie.controller');

app.use('/movies', movieRouter);

app.listen(process.env.PORT_EXPRESS);