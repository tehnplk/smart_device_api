var express = require('express');
var router = express.Router();

var knex = require('./con_db');


router.get('/get_person_by_vn/:vn', async function(req,res ,next){
  let vn = req.params.vn;
  let sql = ` SELECT p.hn ,p.cid ,CONCAT(p.pname,p.fname,' ',p.lname) as fullname  
  FROM ovst o INNER JOIN patient p ON p.hn = o.hn WHERE o.vn =? limit 1  `;
  let data = await knex.raw(sql, [vn]);  
  
  try {
    res.json({
      'vn':vn,
      'hn':data[0][0].hn,
      'cid':data[0][0].cid,
      'fullname':data[0][0].fullname
    })
  } catch (error) {
    res.json({
      'vn':vn,
      'hn':'',
      'cid':'',
      'fullname':'ไม่พบรายชื่อ'
    });
  }
 
});

router.get('/get_person_by_cid/:cid', async function(req,res ,next){
  let cid = req.params.cid;
  let sql = ` SELECT o.vn,p.hn ,p.cid ,CONCAT(p.pname,p.fname,' ',p.lname) as fullname 
  FROM ovst o INNER JOIN patient p ON p.hn = o.hn WHERE p.cid =?
  AND o.vstdate = CURDATE() ORDER BY o.vn DESC LIMIT 1 `;
  let data = await knex.raw(sql, [cid]);  
  
  try {
    res.json({
      'vn':data[0][0].vn,
      'hn':data[0][0].hn,
      'cid':cid,
      'fullname':data[0][0].fullname
    })
  } catch (error) {
    res.json({
      'vn':'',
      'hn':'',
      'cid':cid,
      'fullname':'ไม่พบรายชื่อ'
    });
  }
 
});




module.exports = router;
