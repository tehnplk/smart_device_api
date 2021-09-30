var express = require('express');
var router = express.Router();

var knex = require('../con_db');
var version = require('../version')

router.get('/', function (req, res, next) {

  res.render('index', {
    title: `SMART DEVICE API ${version.version()}`
  });
});

router.get('/test', async function (req, res) {

  let sql = ` select * from opdscreen order by vstdate desc , vsttime desc limit 1 `;
  console.log('test', sql);
  let data = await knex.raw(sql);
  res.json({
    'vn': data[0][0].vn,
    'vstdate': data[0][0].vstdate
  })
});


module.exports = router;