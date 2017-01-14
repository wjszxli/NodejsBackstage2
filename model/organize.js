var config = require('config-lite');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.mysql);

var users = sequelize.define('rdm_organize', {
    F_ParentId: Sequelize.STRING(50),//父级
    F_Layers: Sequelize.INTEGER,//层次
    F_EnCode: Sequelize.STRING(50),//编码
    F_FullName: Sequelize.STRING(255),//名称
    F_ManagerName: Sequelize.STRING(255),//负责人
    F_MobilePhone: Sequelize.STRING(20),//手机
    F_Email: Sequelize.STRING(50),//邮箱
    F_AllowEdit: Sequelize.STRING(50),//允许编辑
    F_AllowDelete: Sequelize.INTEGER,//允许删除
    F_DeleteMark: Sequelize.INTEGER,//删除标志
    F_EnabledMark: Sequelize.INTEGER,//有效标志
    F_DeleteUserId:Sequelize.STRING(50),//删除用户
    F_Remark:Sequelize.STRING(500)//备注
});

module.exports = {
    // 添加用户
    create: function (insertDatas) {
        return sequelize.sync().then(function () {
            return users.create(insertDatas);
        });
    },
    //依据分页和查询条件获取数据
    findAndCountAll: function (obj) {
        return users.findAndCountAll(obj);
    },
    //删除数据
    deleteDatas: function (obj) {
        return users.destroy(obj);
    },
    findOne: function (obj) {
        return users.findOne(obj);
    },
    update: function (obj, opt) {
        return users.update(obj, opt);
    }
}