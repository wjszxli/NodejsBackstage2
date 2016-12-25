//页面加载时获取数据
var reportDatas = new Vue({
    el: '#reportDatas',
    data: {
        datas: [],
        dataCount: 0,
        searchId:null,
        checkedIds:[]
    },
    created: function () {
        //获取数据
        {
            this.$http.get('/users/datas/1/'+this.searchId).then((response) => {
                this.datas = response.body;
        },
            (response) =>
            {
                console.log('报错了');
            }
        );
        }
        //获取数据条数
        {
            this.$http.get('/users/allCounts/'+this.searchId).then((response) => {
                this.dataCount = response.body[0].allCounts;
        },
            (response) =>
            {
                console.log('报错了');
            }
        );
        }
    },
    methods: {
        //删除数据
        deleteReports: function (ids) {
            var url = 'reportRoutes/' + ids + '/remove';
            console.log(url);
            $('#my-confirm').modal({
                relatedTarget: this,
                onConfirm: function (options) {
                    {
                        Vue.http.get(url).then((response) => {
                        showTip('删除成功');
                        //reportDatas.showDatas(1);
                        setTimeout(function () {
                            window.location="/reportRoutes";
                        },3000)

                    },
                        (response) =>
                        {
                            console.log('报错了');
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
                this.$http.get('/users/datas/' + ids+'/'+reportDatas.searchId).then((response) => {
                    this.datas = response.body;
            },
                (response) =>
                {
                    console.log('报错了');
                }
            );
            }
            //获取数据条数
            {
                this.$http.get('/users/allCounts/'+reportDatas.searchId).then((response) => {
                    this.dataCount = response.body[0].allCounts;
            },
                (response) =>
                {
                    console.log('报错了');
                }
            );
            }
        },
        //全选与反选
        checkAll:function () {
            var checkBox=$("#reportDatas input[type='checkbox']");
            for(var i=0;i<checkBox.length;i++){
                checkBox[i].checked=checkBox[0].checked;
            }
        }
    }
});
//添加数据时的处理逻辑
var reportNew = new Vue({
    el: '#reportNew',
    data: {
     datas:{ //数据列表中的数据
         reportId: '',
         formType: '',
         reportName: '',
         reportStatistics: '',
         reportStatisticsType: '',
         reportStatisticsType2: '',
         reportSql: '',
         reportSecond: '',
         reportEnd: '',
         reportSort: ''}
    },
    methods: {
        //提交数据
        saveDatas: function (modelId) {
            $.ajax({
                url: 'reportRoutes',
                type: 'post',
                data: this.datas,
                success: function () {
                    //reportDatas.showDatas(1);
                    showTip('保存成功');
                    $('#' + modelId).modal('close');
                    setTimeout(function () {
                        window.location="/reportRoutes";
                    },3000)
                }
            });
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
        //显示数据
        showDatas: function (ids) {

            if (!ids) {
                ids = 1;
            }
            {
                this.$http.get('/users/datas/' + ids+'/'+this.datas.searchId).then((response) => {
                    reportDatas.datas = response.body;
            },
                (response) =>
                {
                    console.log('报错了');
                }
            );
            }
            //获取数据条数
            {
                this.$http.get('/users/allCounts/'+this.datas.searchId).then((response) => {
                    reportDatas.dataCount = response.body[0].allCounts;
                    pageDatas.all=response.body[0].allCounts;
            },
                (response) =>
                {
                    console.log('报错了');
                }
            );
            }
        },
        //删除选中的数据
        deleteCheckBox:function () {
            var checkBox=$("#reportDatas input[type='checkbox']");
            var delDatas=[];
            for(var i=0;i<checkBox.length;i++){
                if(checkBox[i].checked&&i!=0){
                    delDatas.push(checkBox[i].value);
                }
            }
            this.$http.post('reportRoutes/remove', delDatas)
                .then((response) => {
                showTip('删除成功');
                setTimeout(function () {
                    window.location="/reportRoutes";
                },3000);
            },(response) =>
            {
                console.log('报错了');
            });
        }
    }
});
//分页处理
var pageDatas = new Vue({
    el: '#page-bar',
    data: {
        all: 0, //总数据条数
        cur: 1,//当前页码
        size: 10//每页多少条数据
    },
    //获取总数据条数
    created: function () {
        {
            this.$http.get('/users/allCounts/'+searchDatas.datas.searchId).then((response) => {
                this.all = response.body[0].allCounts;
        },
            (response) =>
            {
                console.log('报错了');
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
                reportDatas.showDatas(pageIndex);
            }
        },
        //点击上一页翻页
        prePages: function () {
            this.cur--;
            reportDatas.showDatas(this.cur);
        },
        //点击下一页翻页
        nextPages: function () {
            this.cur++;
            reportDatas.showDatas(this.cur);
        }
    }
});
