var config = require('config-lite');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.mysql);

var reportCodition = sequelize.define('rdm_datasources', {
    F_ID: Sequelize.INTEGER, //ID
    F_NAME: Sequelize.STRING(45),//名称
    F_SORT: Sequelize.INTEGER,//排序号
    F_REMARK: Sequelize.STRING(1000),//备注
    F_ISDELETED: Sequelize.INTEGER,//删除标志
    F_INSERTDATETIME: Sequelize.DATE,//写入日期
    F_REPORTTYPEID:Sequelize.INTEGER,//报表ID
    F_TYPE:Sequelize.STRING(50),//
    F_WIDTH:Sequelize.STRING(50),//宽度
    F_HEIGHT:Sequelize.STRING(50),//高度
    F_ALIGN:Sequelize.STRING(50),//是否居中
    F_CONTENT:Sequelize.STRING(2000),//
    F_CODE:Sequelize.STRING(50),
    F_SYSTEMCODE:Sequelize.STRING(50),
    F_CONDITIONGROUP:Sequelize.INTEGER,
    F_PARENTID:Sequelize.STRING(50),
    F_DBPROVIDERTYPE:Sequelize.INTEGER
});

module.exports = {
    // 添加数据
    create: function (insertDatas) {
        return sequelize.sync().then(function () {
            return reportCodition.create(insertDatas);
        });
    },
    //依据分页和查询条件获取数据
    findAndCountAll: function (obj) {
        return reportCodition.findAndCountAll(obj);
    },
    //删除数据
    deleteDatas: function (obj) {
        return reportCodition.destroy(obj);
    },
    //依据ID获取一条数据
    findOne: function (obj) {
        return reportCodition.findOne(obj);
    },
    //更新一条数据
    update: function (obj, opt) {
        return reportCodition.update(obj, opt);
    },
    //获取数据的最大值
    getMax:function (obj) {
        return reportCodition.max(obj);
    },
    //获取所有目录
    findAll:function (obj) {
        return reportCodition.findAll(obj);
    }
}