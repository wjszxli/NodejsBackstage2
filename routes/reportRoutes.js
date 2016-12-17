var express = require('express');
var router = express.Router();
var config = require('config-lite');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.mysql);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('reportRoutes', {reportDatas: ""});
});
router.post('/', function (req, res, next) {
    var report = sequelize.define('rdm_report', {
        reportId: Sequelize.STRING,
        formType: Sequelize.STRING,
        reportName: Sequelize.STRING,
        reportStatistics: Sequelize.STRING,
        reportStatisticsType: Sequelize.STRING,
        reportSecond: Sequelize.STRING,
        reportEnd: Sequelize.STRING,
        reportSort: Sequelize.STRING
    });
    sequelize.sync().then(function () {
        return report.create({
            reportId: req.body.reportId,
            formType: req.body.formType,
            reportName: req.body.reportName,
            reportStatistics: req.body.reportStatistics,
            reportStatisticsType: req.body.reportStatisticsType,
            reportSecond: req.body.reportSecond,
            reportEnd: req.body.reportEnd,
            reportSort: req.body.reportSort,
        });
    }).then(function (jane) {
        console.log(jane.get({
            plain: true
        }));
        // 跳转到首页
        res.redirect('/reportRoutes');
    });
});
router.get('/:id/remove', function (req, res, next) {
    var id = req.params.id;
    if(!id){
        id=1;
    }
    sequelize.query('delete  from rdm_reports where id=' + id + ' ').spread(function (results, metadata) {
        console.log(metadata.length);
        res.redirect('/reportRoutes');
    });
});
module.exports = router;