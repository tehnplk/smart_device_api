var express = require('express');
var router = express.Router();

var knex = require('../con_db');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'SMART DEVICE API' });
});

router.get('/test',async function(req,res){
  let sql = ` select * from smart_gate_bp limit 1  `;
  let data = await knex.raw(sql);
  res.end(data)
});


module.exports = router;
