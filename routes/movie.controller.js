const express = require('express');
const router = express.Router();
const connection = require('../database');

// SHOW ALL MOVIES

router.get('/', function(request, response) {
    connection.query('SELECT * FROM movie', (err,result)=>{
        if (err){
            response.status(500).json(err);
        } else {
            response.status(200).json(result);
        }
    });
});

// SHOW ALBUM BY ID

router.get('/:id', function(request, response) {
    connection.query('SELECT * FROM movie WHERE id = ?', [request.params.id],
     (err,result) => {
        if (err){
            response.status(500).json(err);
        } else if (result.length === 0) {
            response.sendStatus(404);
        } else {
            response.status(200).json(result[0]);
        }
    });
});

module.exports = router;