const express = require('express');
const router = express.Router();
const connection = require('../database');

// SHOW ALL MOVIES

router.get('/', function(request, response) {
    connection.query('SELECT * FROM movie', 
    (err,result) => {
        if (err) {
            response.status(500).json(err);
        } else {
            response.status(200).json(result);
        }
    });
});

// SHOW ALL MOVIES

router.get('/new', function(request, response) {
    let thisYear = new Date();
    let tenYearsAgo = (thisYear.getFullYear() - 10).toString();
    connection.query(`SELECT * FROM fanetflix.movie WHERE movie.year > ?`,
    [tenYearsAgo], 
    (err,result) => {
        if (err) {
            response.status(500).json(err);
        } else {
            response.status(200).json(result);
        }
    });
});

// SHOW MOVIE WHERE CAROUSEL IS TRUE

router.get('/carousel', function(request, response) {
    connection.query(' SELECT * FROM movie WHERE carousel = true',
     (err,result) => {
        if (err) {
            response.status(500).json(err);
        } else if (result.length === 0) {
            response.sendStatus(404);
        } else {
            response.status(200).json(result);
        }
    });
});

// SHOW ALBUM BY ID

router.get('/:id', function(request, response) {
    connection.query('SELECT * FROM movie WHERE id = ?',
    [request.params.id],
    (err,result) => {
        if (err) {
            response.status(500).json(err);
        } else if (result.length === 0) {
            response.sendStatus(404);
        } else {
            response.status(200).json(result[0]);
        }
    });
});

// GET MOVIE BY GENRE

router.get('/genre/:id', function(request, response) {
    const id = request.params.id;

    connection.query('SELECT * FROM movie JOIN movie_has_genre ON movie.id = movie_has_genre.movie_id WHERE movie_has_genre.genre_id = ?',id,
     (err,result) => {
        if (err) {
            response.status(500).json(err);
        } else {
            response.status(200).json(result);
        }
    });
});

module.exports = router;