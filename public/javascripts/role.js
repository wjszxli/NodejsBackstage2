//页面加载时获取数据
var roleDatas = new Vue({
    el: '#role_list',
    data: {
        datas: [],
        dataCount: 0,
        searchId: null,
        checkedIds: [],
        statues: 'new',
        editIds: ''
    },
    created: function () {
        //获取数据
        this.$http.get('/role/datas/1/' + this.searchId).then(function (response) {
            console.log(response.body.count);
            this.datas = response.body.rows;
            this.dataCount = response.body.count;
            pageDatas.all = response.body.count;
        }).catch(function (response) {
            showTip(response);
        });
    },
    methods: {
        //删除数据
        deleteReports: function (ids) {
            $('#my-confirm').modal({
                relatedTarget: this,
                onConfirm: function (options) {
                    var url = 'role/' + ids + '/remove';
                    Vue.http.get('role/' + ids + '/remove').then(function (response) {
                        showTip('删除成功');
                        roleDatas.showDatas(1);
                        url = '';
                    }).catch(function (response) {
                        showTip(response);
                    });
                },
                onCancel: function () {
                }
            });
        },
        //显示数据
        showDatas: function (ids) {
            if (!ids) {
                ids = 1;
            }
            this.$http.get('/role/datas/' + ids + '/' + roleDatas.searchId).then(function (response) {
                this.datas = response.body.rows;
                this.dataCount = response.body.count;
                pageDatas.all = response.body.count;
            }).catch(function (response) {
                showTip(response);
            });
        },
        //编辑数据
        roleEdit: function (ids) {
            this.editIds = ids;
            roleDatas.statues = 'edit';
            var $modal = $('#doc-modal-1');
            this.$http.get('/role/' + ids + '/edit').then(function (response) {
                console.log(response);
                roleNew.datas.F_RoleId = response.data.F_RoleId;
                roleNew.datas.F_RoleName = response.data.F_RoleName;
                roleNew.datas.F_Sort = response.data.F_Sort;
                roleNew.datas.F_Remark = response.data.F_Remark;
                //将窗口打开
                $modal.modal();
            }).catch(function (response) {
                showTip(response);
            });
        },
        //全选与反选
        checkAll: function () {
            var checkBox = $("#role_list input[type='checkbox']");
            for (var i = 0; i < checkBox.length; i++) {
                checkBox[i].checked = checkBox[0].checked;
            }
        }
    }
});
//数据搜索时的处理
var searchDatas = new Vue({
    el: '#searchDatas',
    data: {
        datas: {
            searchId: this.searchId
        }
    },
    methods: {
        //搜索显示数据
        showDatas: function (ids) {
            if (!ids) {
                ids = 1;
            }
            if (!this.datas.searchId) {
                this.datas.searchId = null;
            }
            this.$http.get('/role/datas/' + ids + '/' + this.datas.searchId).then(function (response) {
                roleDatas.datas = response.body.rows;
                pageDatas.all = response.body.count;
                roleDatas.dataCount = response.body.count;
            }).catch(function (response) {
                showTip(response);
            });
        },
        //删除选中的数据
        deleteCheckBox: function () {
            $('#my-confirm-more').modal({
                relatedTarget: this,
                onConfirm: function (options) {
                    var checkBox = $("#role_list input[type='checkbox']");
                    var delDatas = [];
                    for (var i = 0; i < checkBox.length; i++) {
                        if (checkBox[i].checked && i != 0) {
                            delDatas.push(checkBox[i].value);
                        }
                    }
                    Vue.http.post('role/removeAll', delDatas).then(function (response) {
                        showTip(response);
                        console.log(response);
                        roleDatas.showDatas(1);
                    }).catch(function (response) {
                        showTip(response);
                    });
                },
                onCancel: function () {
                }
            });
        },
        //当点击新增时
        addNewData: function () {
            var $modal = $('#doc-modal-1');
            roleDatas.statues = 'new';
            //清空之前填写的数据
            roleNew.datas.F_RoleId = '';
            roleNew.datas.F_RoleName = '';
            roleNew.datas.F_Sort = '';
            roleNew.datas.F_Remark = '';
            $modal.modal();
        }
    }
});
//分页处理
var pageDatas = new Vue({
    el: '#page_bar',
    data: {
        all: 0, //总数据条数
        cur: 1,//当前页码
        size: 10//每页多少条数据
    },
    //获取总数据条数
    created: function () {
        this.all = roleDatas.dataCount;
    },
    computed: {
        //显示有多少页
        indexs: function () {
            var ar = []
            var pages = (this.all / this.size) + 1;
            for (var i = 1; i < pages; i++) {
                ar.push(i);
            }
            return ar
        },
        //是否显示点击下一页
        showLast: function () {
            if (this.cur == parseInt((this.all / this.size))) {
                return false
            }
            return false;
        },
        //是否显示点击上一页
        showFirst: function () {
            if (this.cur == 1) {
                return false
            }
            return true
        }
    },
    methods: {
        //点击页码翻页
        changePages: function (pageIndex) {
            if (pageIndex != this.cur) {
                this.cur = pageIndex;
                roleDatas.showDatas(pageIndex);
            }
        },
        //点击上一页翻页
        prePages: function () {
            this.cur--;
            roleDatas.showDatas(this.cur);
        },
        //点击下一页翻页
        nextPages: function () {
            this.cur++;
            roleDatas.showDatas(this.cur);
        }
    }
});
//添加数据时的处理逻辑
var roleNew = new Vue({
    el: '#role_new',
    data: {
        datas: { //数据列表中的数据
            F_RoleId: '',
            F_RoleName: '',
            F_Sort: '',
            F_Remark: '',
            id: ''
        }
    },
    methods: {
        //提交数据
        saveDatas: function (modelId) {
            var url = 'role/opter/' + roleDatas.statues;
            this.$http.post(url, this.datas).then(function (response) {
                if (response.body == 'success') {
                    if (roleDatas.statues == 'new') {
                        showTip('保存成功');
                    } else {
                        showTip('修改成功');
                    }
                } else {
                    if (roleDatas.statues == 'new') {
                        showTip('保存失败');
                    } else {
                        showTip('修改失败');
                    }
                }
                $('#' + modelId).modal('close');
                roleDatas.showDatas(1);
            }).catch(function (response) {
                showTip(response);
            });
        }
    }
});
