var reportDatas=new Vue({
    el: '#reportDatas',
    data: {
        datas: []
    },
    created: function (){
        {
            this.$http.get('users/datas').then((response) => {
                this.datas=response.body;
        }, (response) => {
            console.log('报错了');
        });
        }
     },
    methods:{
        deleteReports:function(event){
            // $('#my-confirm').modal({
            //     relatedTarget: this,
            //     onConfirm: function (options) {
                    console.log(event);
                    alert('reportRoutes/' + event + '/remove');
                    $.ajax({
                        url: 'reportRoutes/' + event + '/remove',
                        success: function () {
                            window.location.href = "/reportRoutes";
                        }
                    });
            //     },
            //     onCancel: function () {
            //     }
            // });
        }
    }
});

var reportNew=new Vue({
   el:'#reportNew',
    data:{
        reportId: '',
        formType: '',
        reportName: '',
        reportStatistics: '',
        reportStatisticsType1: '',
        reportStatisticsType2: '',
        reportSql: '',
        reportSecond: '',
        reportEnd: '',
        reportSort: ''
    },
    methods:{
       saveDatas:function () {
           $.ajax({
               url: 'reportRoutes',
               type:'post',
               data:{reportId: this.reportId, formType: this.formType, reportName: this.reportName, reportStatistics: this.reportStatistics,
                   reportStatisticsType: this.reportStatisticsType1, reportStatisticsType2: this.reportStatisticsType2, reportSql: this.reportSql,
                   reportSecond: this.reportSecond, reportEnd:this.reportEnd, reportSort:this.reportSort},
               success: function () {
                   window.location.href = "/reportRoutes";
               }
           });
       }
    }
});




