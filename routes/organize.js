var express = require('express');
var router = express.Router();
var organize = require('../model/organize');
var success = "success";
/**
 * 得到当前页
 */
router.get('/', function (req, res, next) {
    res.render('organize/index');
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
        objWhere = {F_FullName: {$like: '%' + searchDatas + '%'}}
    }
    var objCondition = {
        where: objWhere,
        offset: (parseInt(indexPages) - 1) * 10,
        limit: 10
    };
    organize.findAndCountAll(objCondition).then(function (result) {
        res.send(result);
    });
});
/**
 * 删除数据
 * @param id 要删除的ID
 */
router.get('/:id/remove', function (req, res, next) {
    var id = req.params.id;
    if (id != '' && id != 'null' && id != 'undefined') {
        objWhere = {id: id};
    }
    var objCondition = {
        where: objWhere
    }
    organize.deleteDatas(objCondition).then(function (result) {
        res.send(result + '');
    }).catch(function (e) {
        res.send(e);
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
    var objWhere = {};
    if (id != '' && id != 'null' && id != 'undefined') {
        objWhere = {id: id};
    }
    var objCondition = {
        where: objWhere
    }
    var insertDatas = {
        F_ParentId: req.body.F_ParentId,//父级
        F_Layers: req.body.F_Layers,//层次
        F_EnCode: req.body.F_EnCode,//编码
        F_FullName: req.body.F_FullName,//名称
        F_ManagerName: req.body.F_ManagerName,//负责人
        F_MobilePhone: req.body.F_MobilePhone,//手机
        F_Email: req.body.F_Email,//邮箱
        F_AllowEdit: req.body.F_AllowEdit,//允许编辑
        F_AllowDelete: req.body.F_AllowDelete,//允许删除
        F_DeleteMark: req.body.F_DeleteMark,//删除标志
        F_EnabledMark: req.body.F_EnabledMark,//有效标志
        F_DeleteUserId: req.body.F_DeleteUserId,//删除用户
        F_Remark: req.body.F_Remark,//备注
    }
    if (status == 'new') {
        organize.create(insertDatas).then(function (result) {
            res.send(success);
        }).catch(function (e) {
            res.send(e);
        });
    } else if (status == 'edit') {
        organize.update(insertDatas, objCondition).then(function (result) {
            res.send(success);
        }).catch(function (e) {
            res.send(e);
        });
    } else {
        res.send('传入的参数有误');
    }
});
/**
 * 删除多条数据
 * post[id,id,id,id,id,]
 * return count 数量
 */
router.post('/removeAll', function (req, res, next) {
    var delDatas = req.body;
    console.log(delDatas);
    if (delDatas != '' && delDatas != 'null' && delDatas != 'undefined' && delDatas.length > 0) {
        objWhere = {id: delDatas};
    }
    var objCondition = {
        where: objWhere
    }
    organize.deleteDatas(objCondition).then(function (result) {
        res.send(result + '');
    }).catch(function (e) {
        res.send(e);
    });
});
router.get('/:id/edit', function (req, res, next) {
    var ids = req.params.id;
    if (ids != '' && ids != 'null' && ids != 'undefined') {
        objWhere = {id: ids};
    }
    var objCondition = {
        where: objWhere
    }
    organize.findOne(objCondition).then(function (result) {
        res.send(result);
    }).catch(function (e) {
        res.send(e);
    });
});
module.exports = router;
