var express = require('express');
var router = express.Router();

var knex = require('../con_db');

router.get('/', function(req, res, next) {
  res.render('tp', { title: 'TP' });
});


router.post('/add_log',async function(req,res,next){

  res.json({
    'effect':effect
  })
});

router.post('/update_opdscreen',async function(req,res,next){

  let vn = req.body.vn;
  let tp = req.body.tp;

  let effect = await knex('opdscreen')
  .where('vn', '=', vn)
  .update({
    temperature:tp,
  })

  res.json({
    'effect':effect
  })
});



module.exports = router;
