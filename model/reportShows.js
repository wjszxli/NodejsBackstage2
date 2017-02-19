var config = require('config-lite');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.mysql);

var reportShows = sequelize.define('rdm_datasources', {
    F_id: Sequelize.INTEGER, //ID
    F_NAME: Sequelize.STRING(45),//名称
    F_SORT: Sequelize.INTEGER,//排序号
    F_REMARK: Sequelize.STRING(1000),//备注
    F_ISDELETED: Sequelize.INTEGER,//删除标志
    F_INSERTDATETIME: Sequelize.DATE,//写入日期
    F_STATISTICSFIELD:Sequelize.STRING(2000),//统计字段
    F_RETURNDATATYGE:Sequelize.STRING(45),//返回数据类型
    F_ISSUBTOTAL: Sequelize.INTEGER,//是否小计
    F_ISALLTOTAL: Sequelize.INTEGER,//是否总计
    F_TITLE: Sequelize.STRING(45),
    F_ISTITLESHOW: Sequelize.INTEGER,//是否显示标题
    F_TITLESHOWTYPE: Sequelize.STRING(45),//标题显示的位置
    F_SECTITLE: Sequelize.STRING(1000),//二级标题
    F_ISSECTITLESHOW: Sequelize.INTEGER,//是否显示二级标题
    F_SECTITLESHOWTYPE: Sequelize.STRING(45),//二级标题显示位置
    F_FOOTTITLE: Sequelize.STRING(45),
    F_ISFOOTTITLESHOW: Sequelize.INTEGER,//是否显示尾部标题
    F_FOOTTITLESHOWTYPE: Sequelize.STRING(45),//尾部标题显示位置
    F_DBPROVIDERTYPE: Sequelize.INTEGER,
    F_CONTENT: Sequelize.STRING(2000),
    F_SYSTEMCODE: Sequelize.INTEGER,//所属系统
    F_ISCHART: Sequelize.STRING(45),
    F_CHARTDATASOURCE: Sequelize.STRING(2000),
    F_CHARTDATATYGE: Sequelize.STRING(45),
    F_CHARTTYPE: Sequelize.INTEGER,
    F_CHARTDATAFORMATCONFIG: Sequelize.STRING(2000),
    F_ISMOBILESHOW: Sequelize.INTEGER,
    F_PARENTID: Sequelize.STRING(45),
    F_PARENTNAME: Sequelize.INTEGER,
    F_VARS: Sequelize.INTEGER,
    F_REPORTTYPEID:Sequelize.INTEGER//报表ID
});

module.exports = {
    // 添加数据
    create: function (insertDatas) {
        return sequelize.sync().then(function () {
            return reportShows.create(insertDatas);
        });
    },
    //依据分页和查询条件获取数据
    findAndCountAll: function (obj) {
        return reportShows.findAndCountAll(obj);
    },
    //删除数据
    deleteDatas: function (obj) {
        return reportShows.destroy(obj);
    },
    //依据ID获取一条数据
    findOne: function (obj) {
        return reportShows.findOne(obj);
    },
    //更新一条数据
    update: function (obj, opt) {
        return reportShows.update(obj, opt);
    },
    //获取数据的最大值
    getMax:function (obj) {
        return reportShows.max(obj);
    },
    //获取所有目录
    findAll:function (obj) {
        return reportShows.findAll(obj);
    }
}