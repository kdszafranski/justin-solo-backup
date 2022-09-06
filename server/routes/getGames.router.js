const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
    const queryText = 'SELECT * FROM games;';

    pool.query(queryText)
    .then( result => {
        res.send(result.rows)
    }).catch( err => {
        console.log(err);
        res.sendStatus(500);
    })

});

router.post('/', (req, res) => {
    const games = req.body.games;

      let queryText = `INSERT INTO "games" ("score_id", "time", "home_team", "away_team", "home_moneyline", "away_moneyline", "channel", "week")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;

      for( let i=0; i<games.length; i++) {
      // if ( games[i].Week === currentWeek ){
      let queryValues = [ games[i].ScoreID, games[i].DateTime, games[i].HomeTeam, games[i].AwayTeam, games[i].HomeTeamMoneyLine, games[i].AwayTeamMoneyLine, games[i].Channel, games[i].Week ];
      console.log(queryValues);

      pool.query(queryText, queryValues)
        .then( result => {

        }).catch( err => {
          console.log(err);
          res.sendStatus(500)
        })
      }
      // }
      res.sendStatus(201);
});

router.delete('/', (req, res) => {
    const queryText = 'DELETE FROM "games"'
    pool.query(queryText)
    .then( result => {
      res.sendStatus(204)
    }).catch( err => {
      console.log(err);
      res.sendStatus(500)
    });
});

module.exports = router;