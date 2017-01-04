var config = require('config-lite');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.mysql);

var users = sequelize.define('rdm_users', {
    user_account: Sequelize.STRING(50),
    user_realname: Sequelize.STRING(100),
    user_password: Sequelize.STRING(255),
    user_dept_id: Sequelize.STRING(50),
    user_duty_id: Sequelize.STRING(500),
    user_role_id: Sequelize.STRING(50),
    user_enable: Sequelize.BIGINT,
    user_gender: Sequelize.BIGINT,
    user_phone: Sequelize.STRING(50),
    user_birthday: Sequelize.DATE,
    user_email: Sequelize.STRING(50),
    user_remark: Sequelize.STRING(500)
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
    //得到数据条数
    findDatasCount: function (obj) {
        return users.count(obj);
    },
    //删除数据
    deleteDatas: function (obj) {
        return users.destroy(obj);
    },
    findOne: function (obj) {
        return users.findOne(obj);
    }
}