var express = require('express');
var router = express.Router();

var knex = require('./con_db');

router.get('/', function(req, res, next) {
  res.render('bmi', { title: 'BMI' });
});

router.post('/add_log',async function(req,res,next){

  let vn = req.body.vn;
  let cid = req.body.cid;
  let bw = req.body.bw;
  let bh = req.body.bh;
  let bmi = req.body.bmi;
  let hn = req.body.hn;
  let fullname = req.body.fullname;
  d_update = new Date();
  console.log(d_update)

  var id = await knex('smart_gate_bmi')
  .insert({id:null,vn:vn,cid:cid,bw:bw,bh:bh,bmi:bmi,hn:hn,fullname:fullname,d_update:d_update})
  res.json({
    'id':id[0]
  })
});

router.post('/update_opdscreen',async function(req,res,next){

  let vn = req.body.vn;
  let bw = req.body.bw;
  let height = req.body.height;
  let bmi = req.body.bmi;

  let id = await knex('opdscreen')
  .where('vn', '=', vn)
  .update({
    bw:bw,
    height:height,
    bmi:bmi
  })
  console.log(id);

  res.json({
    'id':id[0]
  })
});



module.exports = router;
