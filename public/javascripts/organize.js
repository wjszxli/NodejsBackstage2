//页面加载时获取数据
var organizeDatas = new Vue({
    el: '#organize_list',
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
        this.$http.get('/organize/datas/1/' + this.searchId).then(function (response) {
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
                    var url = 'organize/' + ids + '/remove';
                    Vue.http.get('organize/' + ids + '/remove').then(function (response) {
                        showTip('删除成功');
                        organizeDatas.showDatas(1);
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
            this.$http.get('/organize/datas/' + ids + '/' + organizeDatas.searchId).then(function (response) {
                this.datas = response.body.rows;
                this.dataCount = response.body.count;
                pageDatas.all = response.body.count;
            }).catch(function (response) {
                showTip(response);
            });
        },
        //编辑数据
        organizeEdit: function (ids) {
            this.editIds = ids;
            organizeDatas.statues = 'edit';
            var $modal = $('#doc-modal-1');
            this.$http.get('/organize/' + ids + '/edit').then(function (response) {
                console.log(response);
                organizeNew.datas.F_EnCode = response.data.F_EnCode;
                organizeNew.datas.F_FullName = response.data.F_FullName;
                organizeNew.datas.F_ManagerName = response.data.F_ManagerName;
                organizeNew.datas.F_MobilePhone = response.data.F_MobilePhone;
                organizeNew.datas.F_Email = response.data.F_Email;
                organizeNew.datas.F_AllowEdit = response.data.F_AllowEdit;
                organizeNew.datas.F_AllowDelete = response.data.F_AllowDelete;
                organizeNew.datas.F_Remark = response.data.F_Remark;
                organizeNew.datas.id = response.data.id;
                //将窗口打开
                $modal.modal();
            }).catch(function (response) {
                showTip(response);
            });
        },
        //全选与反选
        checkAll: function () {
            var checkBox = $("#organize_list input[type='checkbox']");
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
            this.$http.get('/organize/datas/' + ids + '/' + this.datas.searchId).then(function (response) {
                organizeDatas.datas = response.body.rows;
                pageDatas.all = response.body.count;
                organizeDatas.dataCount = response.body.count;
            }).catch(function (response) {
                showTip(response);
            });
        },
        //删除选中的数据
        deleteCheckBox: function () {
            $('#my-confirm-more').modal({
                relatedTarget: this,
                onConfirm: function (options) {
                    var checkBox = $("#organize_list input[type='checkbox']");
                    var delDatas = [];
                    for (var i = 0; i < checkBox.length; i++) {
                        if (checkBox[i].checked && i != 0) {
                            delDatas.push(checkBox[i].value);
                        }
                    }
                    Vue.http.post('organize/removeAll', delDatas).then(function (response) {
                        showTip(response);
                        console.log(response);
                        organizeDatas.showDatas(1);
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
            organizeDatas.statues = 'new';
            //清空之前填写的数据
            organizeNew.datas.F_EnCode = '';
            organizeNew.datas.F_FullName = '';
            organizeNew.datas.F_ManagerName = '';
            organizeNew.datas.F_MobilePhone = '';
            organizeNew.datas.F_Email = '';
            organizeNew.datas.F_AllowEdit = '1';
            organizeNew.datas.F_AllowDelete = '1';
            organizeNew.datas.F_Remark="";
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
        this.all = organizeDatas.dataCount;
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
                organizeDatas.showDatas(pageIndex);
            }
        },
        //点击上一页翻页
        prePages: function () {
            this.cur--;
            organizeDatas.showDatas(this.cur);
        },
        //点击下一页翻页
        nextPages: function () {
            this.cur++;
            organizeDatas.showDatas(this.cur);
        }
    }
});
//添加数据时的处理逻辑
var organizeNew = new Vue({
    el: '#organize_new',
    data: {
        datas: { //数据列表中的数据
            F_ParentId: '',
            F_Layers: '1',
            F_EnCode: '',
            F_FullName: '',
            F_ManagerName: '',
            F_MobilePhone: '',
            F_Email: '',
            F_AllowEdit: '',
            F_AllowDelete: '',
            F_DeleteMark: '0',
            F_EnabledMark: '1',
            F_DeleteorganizeId: '',
            F_Remark:'',
            id: ''
        }
    },
    methods: {
        //提交数据
        saveDatas: function (modelId) {
            var url = 'organize/opter/' + organizeDatas.statues;
            this.$http.post(url, this.datas).then(function (response) {
                if (response.body == 'success') {
                    if (organizeDatas.statues == 'new') {
                        showTip('保存成功');
                    } else {
                        showTip('修改成功');
                    }
                } else {
                    if (organizeDatas.statues == 'new') {
                        showTip('保存失败');
                    } else {
                        showTip('修改失败');
                    }
                }
                $('#' + modelId).modal('close');
                organizeDatas.showDatas(1);
            }).catch(function (response) {
                showTip(response);
            });
        }
    }
});
