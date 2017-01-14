//页面加载时获取数据
var catalogueDatas = new Vue({
    el: '#catalogue_list',
    data: {
        datas: [],
        dataCount: 0,
        searchId:null,
        checkedIds:[],
        statues:'new',
        editIds:''
    },
    created: function () {
        //获取数据
        this.$http.get('/catalogue/datas/1/' + this.searchId).then(function (response) {
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
                    var url='catalogue/' + ids + '/remove';
                    Vue.http.get(url).then(function (response) {
                        showTip('删除成功');
                        catalogueDatas.showDatas(1);
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
            this.$http.get('/catalogue/datas/' + ids + '/' + catalogueDatas.searchId).then(function (response) {
                this.datas = response.body.rows;
                this.dataCount = response.body.count;
                pageDatas.all = response.body.count;
            }).catch(function (response) {
                showTip(response);
            });
        },
        //编辑数据
        reportEdit:function (ids) {
            this.editIds=ids;
            catalogueDatas.statues='edit';
            var $modal = $('#doc-modal-1');
            this.$http.get('/catalogue/'+ids+'/edit').then(function (response) {
                //重新赋值
                catalogueNew.datas.F_id= response.body.F_id;
                catalogueNew.datas.F_name= response.body.F_name;
                catalogueNew.datas.F_icon= response.body.F_icon;
                catalogueNew.datas.F_start= response.body.F_start;
                catalogueNew.datas.F_remark= response.body.F_remark;
                catalogueNew.datas.F_sort=response.body.F_sort;
                catalogueNew.datas.F_parent=response.body.F_parent;
                catalogueNew.datas.F_url=response.body.F_url;
                catalogueNew.datas.F_AllowDelete=response.body.F_AllowDelete;
                $modal.modal();
            });
        },
        //全选与反选
        checkAll:function () {
            var checkBox=$("#catalogue_list input[type='checkbox']");
            for(var i=0;i<checkBox.length;i++){
                checkBox[i].checked=checkBox[0].checked;
            }
        }
    }
});
//数据搜索时的处理
var searchDatas=new Vue({
    el:'#searchDatas',
    data:{
        datas:{
            searchId:this.searchId
        }
    },
    methods:{
        //搜索显示数据
        showDatas: function (ids) {
            if (!ids) {
                ids = 1;
            }
            if (!this.datas.searchId) {
                this.datas.searchId = null;
            }
            this.$http.get('/catalogue/datas/' + ids + '/' + this.datas.searchId).then(function (response) {
                console.log(response);
                catalogueDatas.datas = response.body.rows;
                pageDatas.all = response.body.count;
                catalogueDatas.dataCount = response.body.count;
            }).catch(function (response) {
                console.log(response);
                showTip(response);
            });
        },
        //删除选中的数据
        deleteCheckBox:function () {
            $('#my-confirm-more').modal({
                relatedTarget: this,
                onConfirm: function (options) {
                    var checkBox = $("#catalogue_list input[type='checkbox']");
                    var delDatas = [];
                    for (var i = 0; i < checkBox.length; i++) {
                        if (checkBox[i].checked && i != 0) {
                            delDatas.push(checkBox[i].value);
                        }
                    }
                    Vue.http.post('catalogue/remove', delDatas).then(function (response) {
                        showTip(response);
                        catalogueDatas.showDatas(1);
                    }).catch(function (response) {
                        showTip(response);
                    });
                },
                onCancel: function () {
                }
            });
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
        this.all = catalogueDatas.dataCount;
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
                catalogueDatas.showDatas(pageIndex);
            }
        },
        //点击上一页翻页
        prePages: function () {
            this.cur--;
            catalogueDatas.showDatas(this.cur);
        },
        //点击下一页翻页
        nextPages: function () {
            this.cur++;
            catalogueDatas.showDatas(this.cur);
        }
    }
});
//添加数据时的处理逻辑
var catalogueNew = new Vue({
    el: '#catalogue_new',
    data: {
        datas:{ //数据列表中的数据
            F_id: '',
            F_name: '',
            F_icon: '',
            F_start: '',
            F_remark: '',
            F_sort: '',
            F_parent:'',
            F_url:'',
            F_AllowDelete:'',
            id:''
        }
    },
    methods: {
        //提交数据
        saveDatas: function (modelId) {
            this.datas.id=catalogueDatas.editIds;
            //对填写进行验证
            var url='catalogue/'+catalogueDatas.statues;
            var tip='保存成功';
            this.$http.post(url, this.datas).then(function (response) {
                showTip(tip);
                $('#' + modelId).modal('close');
                catalogueDatas.showDatas(1);
            }).catch(function (e) {
                showTip(e);
            })
        }
    }
});
//当点击新增按钮时
$(function() {
    var $modal = $('#doc-modal-1');
    $('#newData').click(function () {
        catalogueDatas.statues='new';
        //清空之前填写的数据
        catalogueNew.datas.F_name= '';
        catalogueNew.datas.F_icon= '';
        catalogueNew.datas.F_start= '0';
        catalogueNew.datas.F_parent= '';
        catalogueNew.datas.F_url= '';
        catalogueNew.datas.F_AllowDelete= '1';
        catalogueNew.datas.F_remark= '';
        //获取最大的排序号
        Vue.http.get('/catalogue/getSort').then(function (response) {
            if(isNaN(parseInt(response.body))){
                catalogueNew.datas.F_sort=1;
            }else{
                catalogueNew.datas.F_sort=response.body;
            }
        }).catch(function (e) {
            showTip(e);
        });
        //获取目录编号
        Vue.http.get('/catalogue/catalogueId').then(function (response) {
            var level=4;
            level=4-response.body.length;
            var F_id=response.body;
            for(var i=0;i<level;i++){
                F_id='0'+F_id;
            }
            if(isNaN(parseInt(response.body))){
                catalogueNew.datas.F_id='0001';
            }else{
                catalogueNew.datas.F_id=F_id;
            }
        }).catch(function (e) {
            showTip(e);
        });
        $modal.modal();
    })
});