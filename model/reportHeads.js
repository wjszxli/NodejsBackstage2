var config = require('config-lite');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.mysql);

var reportHeads = sequelize.define('rdm_dataReportHeads', {
    F_id: Sequelize.STRING(50), //ID
    F_CODE: Sequelize.STRING(50),//字段ID
    F_NAME: Sequelize.STRING(50),//字段名
    F_REMARK: Sequelize.STRING(1000),//备注
    F_SORT: Sequelize.INTEGER,//排序号
    F_REMARK: Sequelize.STRING,//备注
    F_ISDELETED: Sequelize.INTEGER,//删除标志
    F_INSERTDATETIME: Sequelize.DATE,//插入日期
    F_WIDTH: Sequelize.STRING(45),//宽度
    F_HEIGHT: Sequelize.INTEGER,//高度
    F_ALIGN: Sequelize.STRING(45)//布局位置
});

module.exports = {
    // 添加数据
    create: function (insertDatas) {
        return sequelize.sync().then(function () {
            return reportHeads.create(insertDatas);
        });
    },
    //依据分页和查询条件获取数据
    findAndCountAll: function (obj) {
        return reportHeads.findAndCountAll(obj);
    },
    //删除数据
    deleteDatas: function (obj) {
        return reportHeads.destroy(obj);
    },
    //依据ID获取一条数据
    findOne: function (obj) {
        return reportHeads.findOne(obj);
    },
    //更新一条数据
    update: function (obj, opt) {
        return reportHeads.update(obj, opt);
    },
    //获取数据的最大值
    getMax:function (obj) {
        return reportHeads.max(obj);
    },
    //获取所有数据
    findAll:function (obj) {
        return reportHeads.findAll(obj);
    }
}