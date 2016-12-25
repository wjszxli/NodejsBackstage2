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
        {
            this.$http.get('/catalogue/datas/1/'+this.searchId).then((response) => {
                this.datas = response.body;
        },
            (response) =>
            {
                showTip('报错了');
            }
        );
        }
        //获取数据条数
        {
            this.$http.get('/catalogue/allCounts/'+this.searchId).then((response) => {
                this.dataCount = response.body[0].allCounts;
        },
            (response) =>
            {
                showTip('报错了');
            }
        );
        }
    },
    methods: {
        //删除数据
        deleteReports: function (ids) {
            $('#my-confirm').modal({
                relatedTarget: this,
                onConfirm: function (options) {
                    var url = 'catalogue/' + ids + '/remove';
                    showTip(url);
                    {
                        Vue.http.post('catalogue/' + ids + '/remove').then((response) => {
                            showTip(response);
                            showTip('删除成功');
                        catalogueDatas.showDatas(1);
                        url='';
                        },
                        (response) =>
                        {
                            showTip('报错了');
                        }
                    )
                        ;
                    }
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
            {
                this.$http.get('/catalogue/datas/' + ids+'/'+catalogueDatas.searchId).then((response) => {
                    this.datas = response.body;
            },
                (response) =>
                {
                    showTip('报错了');
                }
            );
            }
            //获取数据条数
            {
                this.$http.get('/catalogue/allCounts/'+catalogueDatas.searchId).then((response) => {
                    this.dataCount = response.body[0].allCounts;
            },
                (response) =>
                {
                    showTip('报错了');
                }
            );
            }
        },
        //编辑数据
        reportEdit:function (ids) {
            this.editIds=ids;
            catalogueDatas.statues='edit';
            var $modal = $('#doc-modal-1');
            this.$http.get('/catalogue/'+ids+'/edit').then((response)=>{
                //重新赋值
            catalogueNew.datas.catalogue_id= response.body[0].catalogue_id;
            catalogueNew.datas.catalogue_name= response.body[0].catalogue_name;
            catalogueNew.datas.catalogue_icon= response.body[0].catalogue_icon;
            catalogueNew.datas.catalogue_start= response.body[0].catalogue_start;
            catalogueNew.datas.catalogue_remark= response.body[0].catalogue_remark;
            catalogueNew.datas.catalogue_sort=response.body[0].catalogue_sort;
            //将窗口打开
            $modal.modal();
            },(response)=>{
                showTip('报错了');
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
            {
                this.$http.get('/catalogue/datas/' + ids+'/'+this.datas.searchId).then((response) => {
                    catalogueDatas.datas = response.body;
            },
                (response) =>
                {
                    showTip('报错了');
                }
            );
            }
            //获取数据条数
            {
                this.$http.get('/catalogue/allCounts/'+this.datas.searchId).then((response) => {
                    catalogueDatas.dataCount = response.body[0].allCounts;
                pageDatas.all=response.body[0].allCounts;
            },
                (response) =>
                {
                    showTip('报错了');
                }
            );
            }
        },
        //删除选中的数据
        deleteCheckBox:function () {
            $('#my-confirm-more').modal({
                relatedTarget: this,
                onConfirm: function (options) {
                    var checkBox=$("#catalogue_list input[type='checkbox']");
                    var delDatas=[];
                    for(var i=0;i<checkBox.length;i++){
                        if(checkBox[i].checked&&i!=0){
                            delDatas.push(checkBox[i].value);
                        }
                    }
                    Vue.http.post('catalogue/remove', delDatas)
                        .then((response) => {
                        showTip('删除成功');
                    catalogueDatas.showDatas(1);
                },(response) =>
                    {
                        showTip('报错了');
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
        {
            this.$http.get('/catalogue/allCounts/'+searchDatas.datas.searchId).then((response) => {
                this.all = response.body[0].allCounts;
        },
            (response) =>
            {
                showTip('报错了');
            }
        )
            ;
        }
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
            catalogue_id: '',
            catalogue_name: '',
            catalogue_icon: '',
            catalogue_start: '',
            catalogue_remark: '',
            catalogue_sort: '',
            catalogue_ifadmin:'',
            id:''
        }
    },
    methods: {
        //提交数据
        saveDatas: function (modelId) {
            this.datas.id=catalogueDatas.editIds;
            //对填写进行验证
            if(this.datas.catalogue_id==""){
                showTip('请输入目录编号');
                $('#catalogue_new')[0][1].focus();
                return;
            }
            if(this.datas.catalogue_name==""){
                showTip('请输入目录名称');
                $('#catalogue_new')[0][2].focus();
                return;
            }
            if(this.datas.catalogue_icon==""){
                showTip('请输入目录图标');
                $('#catalogue_new')[0][3].focus();
                return;
            }
            if(this.datas.catalogue_start==""){
                showTip('请选择重点与否');
                $('#catalogue_new')[0][4].focus();
                return;
            }
            if(this.datas.catalogue_sort==""){
                showTip('请输入排序号');
                $('#catalogue_new')[0][6].focus();
                return;
            }
            var url='catalogue';
            var tip='保存成功';
            if(catalogueDatas.statues=='edit'){
                url='catalogue/update';
                tip='修改成功';
            }
            this.$http.post(url, this.datas)
                .then((response) => {
                showTip(tip);
                $('#' + modelId).modal('close');
                 catalogueDatas.showDatas(1);
            },(response) =>
            {
                showTip('报错了');
            });
        }
    }
});
//当点击新增按钮时
$(function() {
    var $modal = $('#doc-modal-1');
    $('#newData').click(function () {
        catalogueDatas.statues='new';
        //清空之前填写的数据
        catalogueNew.datas.catalogue_id= '';
        catalogueNew.datas.catalogue_name= '';
        catalogueNew.datas.catalogue_icon= '';
        catalogueNew.datas.catalogue_start= '';
        catalogueNew.datas.catalogue_remark= '';
        //获取最大的排序号
        {
            Vue.http.get('/catalogue/getSort').then((response) => {
                catalogueNew.datas.catalogue_sort=response.body[0].catalogue_sort;
        },
            (response) =>
            {
                showTip('报错了');
            }
        )
            ;
        }
        //获取目录编号
        {
            Vue.http.get('/catalogue/catalogueId').then((response) => {
                var level=4;
                level=4-response.body[0].catalogue_id;
                console.log(response.body[0].catalogue_id);
                var catalogue_id=response.body[0].catalogue_id;
                for(var i=0;i<level;i++){
                    catalogue_id='0'+catalogue_id;
                }
                catalogueNew.datas.catalogue_id=catalogue_id;
        },
            (response) =>
            {
                showTip('报错了');
            }
        )
            ;
        }
        $modal.modal();
    })
});