const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(express.static('public'));

const movieRouter = require('./routes/movie.controller');

app.use('/api/movies', movieRouter);

app.listen(process.env.PORT_EXPRESS);