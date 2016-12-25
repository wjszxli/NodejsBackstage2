var express = require('express');
var router = express.Router();
var config = require('config-lite');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.mysql);

//返回首页
router.get('/', function (req, res, next) {
    res.render('catalogue/index');
});
//获取数据  indexPages 第几页  searchDatas 搜索字段
router.get('/datas/:indexPages/:searchDatas', function (req, res, next) {
    var indexPages = req.params.indexPages;
    if (!indexPages) {
        indexPages = 1;
    }
    var searchDatas = req.params.searchDatas;
    var where = "";
    if (searchDatas != null && searchDatas != '' && searchDatas != 'null' && searchDatas != 'undefined') {
        where = " and catalogue_name like  '" + searchDatas + "%' ";
    }
    sequelize.query('SELECT * from rdm_catalogues where 1=1 ' + where + ' order by id limit ' + (indexPages - 1) * 10 + ',10 ').spread(function (results, metadata) {
        res.send(metadata);
    });
});
//获取数据条数  searchDatas 搜索字段
router.get('/allCounts/:searchDatas', function (req, res, next) {
    var searchDatas = req.params.searchDatas;
    var where = "";
    if (searchDatas != null && searchDatas != '' && searchDatas != 'null' && searchDatas != 'undefined') {
        where = " and catalogue_name like  '" + searchDatas + "%' ";
    }
    sequelize.query(' SELECT COUNT(id) as allCounts from rdm_catalogues where 1=1 ' + where + ' ').spread(function (results, metadata) {
        res.send(metadata);
    });
});
//保存数据
router.post('/', function (req, res, next) {
    var report = sequelize.define('rdm_catalogue', {
        catalogue_id: Sequelize.STRING,
        catalogue_name: Sequelize.STRING,
        catalogue_icon: Sequelize.STRING,
        catalogue_start: Sequelize.STRING,
        catalogue_remark: Sequelize.STRING,
        catalogue_sort: Sequelize.STRING
    });
    sequelize.sync().then(function () {
        return report.create({
            reportId: req.body.reportId,
            catalogue_id: req.body.catalogue_id,
            catalogue_name: req.body.catalogue_name,
            catalogue_icon: req.body.catalogue_icon,
            catalogue_start: req.body.catalogue_start,
            catalogue_remark: req.body.catalogue_remark,
            catalogue_sort: req.body.catalogue_sort
        });
    }).then(function (result) {
        console.log(result.get({
            plain: true
        }));
        // 跳转到首页
        res.redirect('/catalogue');
    });
});
//删除单条数据
router.post('/:id/remove', function (req, res, next) {
    var id = req.params.id;
    sequelize.query('delete  from rdm_catalogues where id=' + id + ' ').spread(function (results, metadata) {
        // 跳转到首页
        res.redirect('/catalogue');
    });
});
//获取排序号
router.get('/getSort', function (req, res, next) {
    sequelize.query(' select ifnull(max(catalogue_sort)+1,1) as catalogue_sort from rdm_catalogues ').spread(function (results, metadata) {
        res.send(metadata);
    })
});
//获取目录编号
router.get('/catalogueId', function (req, res, next) {
    sequelize.query(' select ifnull(max(catalogue_id),1)+1 as catalogue_id from rdm_catalogues ').spread(function (results, metadata) {
        res.send(metadata);
    })
});
//获取一条数据
router.get('/:id/edit', function (req, res, next) {
    var id = req.params.id;
    sequelize.query(' select * from rdm_catalogues where id=' + id + ' ').spread(function (results, metadata) {
        res.send(metadata);
    })
});
//删除多条数据
router.post('/remove', function (req, res, next) {
    var delDatas = req.body;
    var delWhere = "";
    delDatas.forEach(function (items, index) {
        if (index == delDatas.length - 1) {
            delWhere += '\'' + items + '\'';
        } else {
            delWhere += '\'' + items + '\',';
        }
    });
    sequelize.query('delete  from rdm_catalogues where id in (' + delWhere + ') ').spread(function (results, metadata) {
        // 跳转到首页
        res.redirect('/catalogue');
    });
});
//生成目录
router.get('/getCatalogue', function (req, res, next) {
    sequelize.query(' select * from rdm_catalogues ').spread(function (results, metadata) {
        res.send(metadata);
    });
});
//更新数据
router.post('/update', function (req, res, next) {
    //得到数据
    var reportId = req.body.reportId;
    var catalogue_id = req.body.catalogue_id;
    var catalogue_name = req.body.catalogue_name;
    var catalogue_icon = req.body.catalogue_icon;
    var catalogue_start = req.body.catalogue_start;
    var catalogue_remark = req.body.catalogue_remark;
    var catalogue_sort = req.body.catalogue_sort;
    var id = req.body.id;

    sequelize.query(' update rdm_catalogues set catalogue_id=\'' + catalogue_id + '\',catalogue_name=\'' + catalogue_name + '\',' +
        ' catalogue_icon=\'' + catalogue_icon + '\',catalogue_start=\'' + catalogue_start + '\',catalogue_remark=\'' + catalogue_remark + '\',' +
        'catalogue_sort=' + catalogue_sort + ' where id=' + id + ' ').spread(function (results, metadata) {
        // 跳转到首页
        res.redirect('/catalogue');
    });
});
module.exports = router;