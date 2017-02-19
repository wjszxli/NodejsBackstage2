var express = require('express');
var router = express.Router();
var reportShows = require('../model/reportShows');
var success = "success";
var error = "error";
/**
 * 得到当前页
 */
router.get('/', function (req, res, next) {
    res.render('reportShows/index');
});

//得到一条报表数据
router.get('/:id/shows', function (req, res, next) {
    var ids = req.params.id;
    var objWhere="";
    if (ids != '' && ids != 'null' && ids != 'undefined') {
        objWhere = {F_REPORTTYPEID: ids};
    }
    var objCondition = {
        where: objWhere
    }
    reportShows.findOne(objCondition).then(function (result) {
        res.send(result);
    }).catch(function (e) {
        res.send(e);
    });
});
router.post('/opter', function (req, res, next) {
    var status = req.params.status;
    var id = req.body.id;
    var objWhere="";
    if (id != '' && id != 'null' && id != 'undefined') {
        objWhere = {id: id};
    }
    var objCondition = {
        where: objWhere
    }
    var insertDatas = {
        reportId : req.body.reportId,
        F_id : req.body.F_id,
        F_name : req.body.F_name,
        F_icon : req.body.F_icon,
        F_start : req.body.F_start,
        F_remark : req.body.F_remark,
        F_sort : req.body.F_sort,
        F_parent:req.body.F_parent,
        F_url:req.body.F_url,
        F_AllowDelete:req.body.F_AllowDelete
    }
    reportShows.create(insertDatas).then(function (error, result) {
            res.send(success);
        }).catch(function (e) {
            res.send(e);
        });

});
module.exports = router;
