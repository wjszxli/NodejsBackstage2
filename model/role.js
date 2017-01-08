var config = require('config-lite');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.mysql);

var users = sequelize.define('rdm_role', {
    F_RoleId: Sequelize.STRING(50),//权限Id
    F_RoleName: Sequelize.STRING(255),//权限名称
    F_Sort: Sequelize.INTEGER,//排序号
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
    //得到一条数据
    findOne: function (obj) {
        return users.findOne(obj);
    },
    //更新一条数据
    update: function (obj, opt) {
        return users.update(obj, opt);
    }
}