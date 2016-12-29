//页面加载时获取数据
var usersDatas = new Vue({
    el: '#user_list',
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
        this.$http.get('/users/datas/1/' + this.searchId).then(function (response) {
            this.datas = response.body.rows;
            this.dataCount = response.body.count;
        }).catch(function (response) {
            showTip('获取数据有误');
        });
    },
    methods: {
        //删除数据
        deleteReports: function (ids) {
            $('#my-confirm').modal({
                relatedTarget: this,
                onConfirm: function (options) {
                    var url = 'users/' + ids + '/remove';
                    Vue.http.post('users/' + ids + '/remove').then(function (response) {
                        showTip('删除成功');
                        usersDatas.showDatas(1);
                        url = '';
                    }).catch(function (response) {
                        showTip('删除数据有误');
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
            this.$http.get('/users/datas/' + ids + '/' + usersDatas.searchId).then(function (response) {
                this.datas = response.body.rows;
                this.dataCount = response.body.count;
            }).catch(function (response) {
                showTip('显示数据有误');
            });
        },
        //编辑数据
        reportEdit: function (ids) {
            this.editIds = ids;
            usersDatas.statues = 'edit';
            var $modal = $('#doc-modal-1');
            this.$http.get('/users/' + ids + '/edit').then(function (response) {
                //重新赋值
                usersNew.datas.users_id = response.body[0].users_id;
                usersNew.datas.users_name = response.body[0].users_name;
                usersNew.datas.users_icon = response.body[0].users_icon;
                usersNew.datas.users_start = response.body[0].users_start;
                usersNew.datas.users_remark = response.body[0].users_remark;
                usersNew.datas.users_sort = response.body[0].users_sort;
                //将窗口打开
                $modal.modal();
            }).catch(function (response) {
                showTip('编辑数据有误');
            });
        },
        //全选与反选
        checkAll: function () {
            var checkBox = $("#users_list input[type='checkbox']");
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
                this.$http.get('/users/datas/' + ids + '/' + this.datas.searchId).then(function (response) {
                    usersDatas.datas = response.body;
                    usersDatas.datas = response.body.rows;
                    usersDatas.dataCount = response.body.count;
                }).catch(function (response) {
                    showTip('搜索数据有误');
                });
            }
            ,
            //删除选中的数据
            deleteCheckBox: function () {
                $('#my-confirm-more').modal({
                    relatedTarget: this,
                    onConfirm: function (options) {
                        var checkBox = $("#users_list input[type='checkbox']");
                        var delDatas = [];
                        for (var i = 0; i < checkBox.length; i++) {
                            if (checkBox[i].checked && i != 0) {
                                delDatas.push(checkBox[i].value);
                            }
                        }
                        Vue.http.post('users/remove', delDatas).then(function (response) {
                            showTip('删除成功');
                            usersDatas.showDatas(1);
                        }).catch(function (response) {
                            showTip('删除数据有误');
                        });
                    },
                    onCancel: function () {
                    }
                });
            }
        }
    })
    ;
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
        this.$http.get('/users/allCounts/' + searchDatas.datas.searchId).then(function (response) {
            this.all = response.body;
        }).catch(function (response) {
            showTip('报错了');
        });
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
                usersDatas.showDatas(pageIndex);
            }
        },
        //点击上一页翻页
        prePages: function () {
            this.cur--;
            usersDatas.showDatas(this.cur);
        },
        //点击下一页翻页
        nextPages: function () {
            this.cur++;
            usersDatas.showDatas(this.cur);
        }
    }
});
//添加数据时的处理逻辑
var userNew = new Vue({
    el: '#user_new',
    data: {
        datas: { //数据列表中的数据
            user_account: '',
            user_realname: '',
            user_password: '',
            user_dept_id: '',
            user_duty_id: '',
            user_role_id: '',
            user_enable: '0',
            user_gender: '0',
            user_phone: '',
            user_birthday: '',
            user_email: '',
            user_remark: ''
        }
    },
    methods: {
        //提交数据
        saveDatas: function (modelId) {
            //this.datas.user_account=usersDatas.editIds;
            //对填写进行验证
            if (this.datas.user_account == "") {
                showTip('请输入用户名');
                $('#user_new')[0][1].focus();
                return;
            }
            if (this.datas.user_realname == "") {
                showTip('请输入姓名');
                $('#users_new')[0][2].focus();
                return;
            }
            if (this.datas.user_password == "") {
                showTip('请输入密码');
                $('#users_new')[0][3].focus();
                return;
            }
            if (this.datas.user_dept_id == "") {
                showTip('请选择部门');
                $('#users_new')[0][4].focus();
                return;
            }
            var url = 'users';
            // if(usersDatas.statues=='edit'){
            //     url='users/update';
            //     tip='修改成功';
            // }
            this.$http.post(url, this.datas).then(function (response) {
                if (response.body == 'success') {
                    showTip('保存成功');
                } else {
                    showTip('保存失败');
                }
                $('#' + modelId).modal('close');
                usersDatas.showDatas(1);
            }).catch(function (response) {
                showTip('保存数据有误');
            });
        }
    }
});
//当点击新增按钮时
$(function () {
    var $modal = $('#doc-modal-1');
    $('#newData').click(function () {
        // usersDatas.statues='new';
        // //清空之前填写的数据
        userNew.datas.user_account = '';
        userNew.datas.user_realname = '';
        userNew.datas.user_password = '';
        userNew.datas.user_dept_id = '';
        userNew.datas.user_duty_id = '';
        userNew.datas.user_role_id = '';
        userNew.datas.user_enable = '1';
        userNew.datas.user_gender = '0';
        userNew.datas.user_phone = '';
        userNew.datas.user_birthday = '';
        userNew.datas.user_email = '';
        userNew.datas.user_remark = '';
        $modal.modal();
    })
});

