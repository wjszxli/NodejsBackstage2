var config = require('config-lite');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.mysql);

var catalogue = sequelize.define('rdm_catalogue', {
    F_id: Sequelize.STRING(50), //ID
    F_name: Sequelize.STRING(50),//目录名字
    F_icon: Sequelize.STRING(50),//目录图标
    F_start: Sequelize.INTEGER,//是否重点目录
    F_remark: Sequelize.STRING(255),//目录备注
    F_sort: Sequelize.INTEGER,//目录排序号
    F_parent:Sequelize.STRING(50),//目录父级
    F_url:Sequelize.STRING(50),//目录地址
    F_AllowDelete: Sequelize.INTEGER//允许删除
});
module.exports = {
    // 添加用户
    create: function (insertDatas) {
        return sequelize.sync().then(function () {
            return catalogue.create(insertDatas);
        });
    },
    //依据分页和查询条件获取数据
    findAndCountAll: function (obj) {
        return catalogue.findAndCountAll(obj);
    },
    //删除数据
    deleteDatas: function (obj) {
        return catalogue.destroy(obj);
    },
    //依据ID获取一条数据
    findOne: function (obj) {
        return catalogue.findOne(obj);
    },
    //更新一条数据
    update: function (obj, opt) {
        return catalogue.update(obj, opt);
    },
    //获取数据的最大值
    getMax:function (obj) {
        return catalogue.max(obj);
    },
    //获取所有目录
    findAll:function (obj) {
        return catalogue.findAll(obj);
    }
}