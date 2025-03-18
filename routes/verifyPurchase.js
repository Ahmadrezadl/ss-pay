const express = require('express');
const router = express.Router();
const db = require('../db');
const axios = require('axios');
const { verify } = require('../verifiers/functions');


router.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

router.post('/', async (req, res) => {
  const { store_name, game_package, receipt, sku, user_identifier } = req.body;

  const secret_key = req.headers.authorization;

  try {
    const games = await db.query('SELECT * FROM games WHERE package_name = $1', [game_package]);
    if (!games.rows.length) return res.status(401).json({ error: 'Game Not Found!' });

    const game = games.rows[0];

    if (game.secret_key !== secret_key) return res.status(401).json({ error: 'Unauthorized!' });


    const stores = await db.query('SELECT * FROM stores WHERE name = $1', [store_name]);
    if (!stores.rows.length) return res.status(400).json({ error: 'Store not found' });

    const store = stores.rows[0];


    const tokenRecord = await db.query('SELECT * FROM access_tokens WHERE store_id = $1 AND game_id = $2', [store.id, game.id]);
    if (!tokenRecord.rows.length && !store.rows[0].bypass) return res.status(400).json({ error: 'Access token not found' });

    const accessToken = tokenRecord.rows[0].access_token || null;

    let status = 2;

    if (store.bypass) {
      status = 0;
    } else {
      status = await verify(store, receipt, accessToken, sku, game_package);
    }


    await db.query('INSERT INTO payments (receipt, user_identifier, store_id, game_id, status,sku) VALUES ($1, $2, $3, $4, $5, $6)',
      [receipt, user_identifier, store.id, game.id, status === 0 ? 'success' : 'failed', sku]);

    res.status(status === 0 ? 200 : status === 1 ? 400 : 404).json({ status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;