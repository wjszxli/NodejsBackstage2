var express = require('express');
var router = express.Router();
var config = require('config-lite');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.mysql);
var users = require('../model/users');
var Promise = require("bluebird");
/**
 * 得到当前页
 */
router.get('/', function (req, res, next) {
    res.render('users/index');
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
        objWhere = {user_realname: {$like: '%'+searchDatas + '%'}}
    }
    var objCondition = {
        where: objWhere,
        offset: parseInt(indexPages)-1,
        limit: 10
    };
    users.findAndCountAll(objCondition).then(function (result) {
        res.send(result);
    });
});
/**
 * 返回数据条数
 * @param searchDatas 查询条件
 * @return 数据条数
 */
router.get('/allCounts/:searchDatas', function (req, res, next) {
    var searchDatas = req.params.searchDatas;
    var objWhere = {};
    if (searchDatas != '' && searchDatas != 'null' && searchDatas != 'undefined') {
        objWhere={user_realname:{$like:'%'+searchDatas+'%'}};
    }
    var objCondition={
        where:objWhere
    }
    users.findDatasCount(objCondition).then(function (result) {
       res.send(result+'');
    });
});
/**
 * 删除数据
 * @param id 要删除的ID
 */
router.post('/:id/remove', function (req, res, next) {
    var id = req.params.id;
    if (id != '' && id != 'null' && id != 'undefined') {
        objWhere={id:id};
    }
    var objCondition={
        where:objWhere
    }
    users.deleteDatas(objCondition).then(function (result) {
      res.send(result+'');
    })
});
/**
 * 保存数据
 * post[user_account,user_realname,user_password,user_dept_id,user_duty_id....]
 */
router.post('/', function (req, res, next) {
    var insertDatas = {
        user_account: req.body.user_account,//用户名
        user_realname: req.body.user_realname,//姓名
        user_password: req.body.user_password,//密码
        user_dept_id: req.body.user_dept_id,//部门编号
        user_duty_id: req.body.user_duty_id,//岗位编号
        user_role_id: req.body.user_role_id,//角色编号
        user_enable: req.body.user_enable,//是否启用
        user_gender: req.body.user_gender,//性别
        user_phone: req.body.user_phone,//手机号码
        user_birthday: req.body.user_birthday,//生日
        user_email: req.body.user_email,//邮箱
        user_remark: req.body.user_remark//备注
    }
    users.create(insertDatas).then(function (result) {
        res.send(result.get({plain: true}));
    });
});

module.exports = router;
