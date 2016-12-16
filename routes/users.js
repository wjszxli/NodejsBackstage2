var express = require('express');
var router = express.Router();
var config = require('config-lite');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.mysql);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/datas', function (req, res, next) {
    sequelize.query('SELECT * from rdm_reports').spread(function (results, metadata) {
        res.send(metadata);
    });
    //res.render('reportRoutes');
});

module.exports = router;
