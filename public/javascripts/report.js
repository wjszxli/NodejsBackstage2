//页面加载时获取数据
var reportDatas = new Vue({
    el: '#reportDatas',
    data: {
        datas: [],
        dataCount: 0
    },
    created: function () {
        //获取数据
        {
            this.$http.get('/users/datas/1').then((response) => {
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
            this.$http.get('/users/allCounts').then((response) => {
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
                            console.log(response);
                        console.log(url);
                        showTip('删除成功');
                        reportDatas.showDatas(1);
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
                this.$http.get('/users/datas/' + ids).then((response) => {
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
                this.$http.get('/users/allCounts').then((response) => {
                    this.dataCount = response.body[0].allCounts;
            },
                (response) =>
                {
                    console.log('报错了');
                }
            );
            }
        }
    }
});
//添加数据时的处理逻辑
var reportNew = new Vue({
    el: '#reportNew',
    data: {
     datas:{
         reportId: this.reportId,
         formType: this.formType,
         reportName: this.reportName,
         reportStatistics: this.reportStatistics,
         reportStatisticsType: this.reportStatisticsType1,
         reportStatisticsType2: this.reportStatisticsType2,
         reportSql: this.reportSql,
         reportSecond: this.reportSecond,
         reportEnd: this.reportEnd,
         reportSort: this.reportSort}
    },
    methods: {
        //提交数据
        saveDatas: function (modelId) {
            $.ajax({
                url: 'reportRoutes',
                type: 'post',
                data: this.datas,
                success: function () {
                    reportDatas.showDatas(1);
                    showTip('保存成功');
                    $('#' + modelId).modal('close');
                    this.datas=null;
                }
            });
        }
    }
});
//分页处理
var pageDatas = new Vue({
    el: '#page-bar',
    data: {
        all: 0, //总页数
        cur: 1,//当前页码
        size: 10//每页多少条数据
    },
    //获取总数据条数
    created: function () {
        {
            this.$http.get('/users/allCounts').then((response) => {
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
            if (this.cur == parseInt((this.all / this.size)+1)) {
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
var showTip = function (message) {
    $._messengerDefaults = {
        extraClasses: 'messenger-fixed messenger-theme-air messenger-on-bottom messenger-on-right'
    }
    $.globalMessenger().post({
        message: message,
        hideAfter: 2,
        showCloseButton: true
    });
}

