const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

const movieRouter = require('./routes/movie.controller');

app.use('/api/movies', movieRouter);

app.listen(process.env.PORT_EXPRESS);