var express = require('express');
var router = express.Router();
var config = require('config-lite');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.mysql);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/datas/:indexPages', function (req, res, next) {
    var indexPages=req.params.indexPages;
    if(!indexPages){
        indexPages=1;
    }
    sequelize.query('SELECT * from rdm_reports order by id limit '+(indexPages-1)*10+',10 ').spread(function (results, metadata) {
        res.send(metadata);
    });
});
router.get('/allCounts', function (req, res, next) {
    sequelize.query(' SELECT COUNT(id) as allCounts from rdm_reports ').spread(function (results, metadata) {
        res.send(metadata);
    });
});

module.exports = router;
