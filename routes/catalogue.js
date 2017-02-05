var express = require('express');
var router = express.Router();
var catalogue = require('../model/catalogue');
var success = "success";
var error = "error";

/**
 * 得到当前页
 */
router.get('/', function (req, res, next) {
    res.render('catalogue/index');
});
/**
 * 返回一页的数据
 *@param indexPages 页码
 *@param searchDatas 查询条件
 *@return count 数据条数 rows[]  返回的数据
 */
router.get('/datas/:indexPages/:searchDatas', function (req, res, next) {
    var indexPages = req.params.indexPages;
    if (!indexPages) {
        indexPages = 1;
    }
    var searchDatas = req.params.searchDatas;
    var objWhere = {}
    if (searchDatas != '' && searchDatas != 'null' && searchDatas != 'undefined') {
        objWhere = {F_name: {$like: '%' + searchDatas + '%'}}
    }
    var objCondition = {
        where: objWhere,
        offset: (parseInt(indexPages) - 1) * 10,
        limit: 10
    };
    catalogue.findAndCountAll(objCondition).then(function (result) {
        res.send(result);
    });
});
/**
 * 删除数据
 * @param id 要删除的ID
 */
router.get('/:id/remove', function (req, res, next) {
    console.log('wjszxli');
    var id = req.params.id;
    if (id != '' && id != 'null' && id != 'undefined') {
        objWhere = {id: id};
    }
    var objCondition = {
        where: objWhere
    }
    catalogue.deleteDatas(objCondition).then(function (result) {
        res.send(result + '');
    }).catch(function (e) {
        res.send(error);
    });
});

/**
 * 保存数据
 * post[user_account,user_realname,user_password,user_dept_id,user_duty_id....]
 * @reutn success 成功   error 失败
 */
router.post('/opter/:status', function (req, res, next) {
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
    if (status == 'new') {
        catalogue.create(insertDatas).then(function (error, result) {
            res.send(success);
        }).catch(function (e) {
            res.send(e);
        });
    } else if (status == 'edit') {
        catalogue.update(insertDatas, objCondition).then(function (error, result) {
            res.send(success);
        }).catch(function (e) {
            res.send(e);
        });
    }
});
/**
 * 删除多条数据
 * post[id,id,id,id,id,]
 * return count 数量
 */

router.post('/removeAll', function (req, res, next) {
    var delDatas = req.body;
    var objWhere,where;
    if (delDatas != '' && delDatas != 'null' && delDatas != 'undefined' && delDatas.length > 0) {
        objWhere = {id: delDatas};
    }
    var objCondition = {
        where: objWhere
    }
    catalogue.deleteDatas(objCondition).then(function (result) {
        res.send(result + '');
    }).catch(function (e) {
        res.send(e);
    });
});
/**
 * 获取排序号*/
router.get('/getSort', function (req, res, next) {
    catalogue.getMax('F_sort').then(function (result) {
        res.send((parseInt(result)+1)+'');
    }).catch(function (e) {
        res.send(e);
    });
});
/**
 * 获取目录编号*/
router.get('/catalogueId', function (req, res, next) {
    catalogue.getMax('F_id').then(function (result) {
        res.send((parseInt(result)+1)+'');
    }).catch(function (e) {
        res.send(e);
    });
});
/**
 * 获取一条数据*/
router.get('/:id/edit', function (req, res, next) {
    var ids = req.params.id;
    var objWhere="";
    if (ids != '' && ids != 'null' && ids != 'undefined') {
        objWhere = {id: ids};
    }
    var objCondition = {
        where: objWhere
    }
    catalogue.findOne(objCondition).then(function (result) {
        res.send(result);
    }).catch(function (e) {
       res.send(e);
    });
});
/**
 * 在首页生成目录信息*/
router.get('/getCatalogue', function (req, res, next) {
    var orderBy={F_sort:'F_sort'};
    catalogue.findAll(orderBy).then(function (error,results) {
        if(error){
            res.send(error);
        }else{
            res.send(results);
        }
    })
});
module.exports = router;