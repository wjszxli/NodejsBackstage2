var reportShows=new Vue({
    el:'#reportDataShows',
    data:{
        fname:'',
        ftitle:'',
        fsectitle:'',
        fsecShowType:'',
        ffoottitle:'',
        ffoottitleshowtype:'',
        fDataHeads:[],
        fShowCondition:'',
        fShowDatas:[]
    },
    created:function () {
        //获取数据
        this.$http.get('/reportShows/553/shows').then(function (response) {
            this.fname=response.body.F_NAME;
            this.ftitle=response.body.F_TITLE;
            if(response.body.F_ISSECTITLESHOW=='0'){
                this.fsectitle=response.body.F_SECTITLE;
                this.fsecShowType=response.body.F_SECTITLESHOWTYPE;
            }
            if(response.body.F_ISFOOTTITLESHOW=='0'){
                this.ffoottitle=response.body.F_FOOTTITLE;
                this.ffoottitleshowtype=response.body.F_FOOTTITLESHOWTYPE;
            }
            console.log(response.body);
        }).catch(function (response) {
            showTip(response.body);
        });
        //构造查询条件
        this.$http.get('/reportShows/520d8587-4a93-42e2-95c6-62586a54c762/shows3').then(function (response) {
            var returnStr="";
            var ids = "";
            response.body.forEach(function (item) {
                switch (item.F_TYPE){
                    case "1":
                        returnStr+='<label>'+item.F_NAME+'日期：<input style=\"width: '+item.F_WIDTH+'px;height: '+item.F_HEIGHT+'px,text-align='+item.F_ALIGN+'\" id=\"'+item.F_CODE+'\" type=\"text\" onClick=\"WdatePicker()\"></label>&nbsp;'
                        ids+=item.F_CODE+',';
                        break;
                    case "2":
                        returnStr +='<label>开始'+item.F_NAME+'时间：<input style=\"width: '+item.F_WIDTH+'px;height: '+item.F_HEIGHT+'px,text-align='+item.F_ALIGN+'\" id=\"ps_'+item.F_CODE+'\" type=\"text\" onClick=\"WdatePicker()\">&nbsp;';
                        returnStr +='结束'+item.F_NAME+'时间：<input style=\"width: '+item.F_WIDTH+'px;height: '+item.F_HEIGHT+'px,text-align='+item.F_ALIGN+'\" id=\"pe_'+item.F_CODE+'\" type=\"text\" onClick=\"WdatePicker()\"></label>&nbsp;'
                        ids+="ps_"+item.F_CODE+',';
                        ids+="pe_"+item.F_CODE+',';
                        break;
                    case "3":
                        returnStr +='<label>开始'+item.F_NAME+'时刻：<input style=\"width: '+item.F_WIDTH+'px;height: '+item.F_HEIGHT+'px,text-align='+item.F_ALIGN+'\" id=\"ms_'+item.F_CODE+'\" type=\"text\" onClick=\"WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm:ss\'})\">&nbsp;';
                        returnStr+='结束'+item.F_NAME+'时刻：<input style=\"width: '+item.F_WIDTH+'px;height: '+item.F_HEIGHT+'px,text-align='+item.F_ALIGN+'\" id=\"me_'+item.F_CODE+'\" type=\"text\" onClick=\"WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm:ss\'})\"></label>&nbsp;';
                        ids+="ms_"+item.F_CODE+',';
                        ids+="me_"+item.F_CODE+',';
                        break;
                    case "4":
                        returnStr+='<label>'+item.F_NAME+'：<select id=\"'+item.F_CODE+'\" style=\"width: '+item.F_WIDTH+'px;height: '+item.F_HEIGHT+'px,text-align='+item.F_ALIGN+'\" ><option value=\"a\">Apple</option><option value=\"b\" selected>Banana</option> <option value=\"o\">Orange</option> <option value=\"m\">Mango</option> </select></label>&nbsp;';
                        ids+=item.F_CODE+',';
                        break;
                    case "5":
                        returnStr+='<label>'+item.F_NAME+'：<input id=\"'+item.F_CODE+'\" style=\"width: '+item.F_WIDTH+'px;height: '+item.F_HEIGHT+'px,text-align='+item.F_ALIGN+'\" placeholder="请输入'+item.F_NAME+'的值进行搜索" ></label>&nbsp;';
                        ids+=item.F_CODE+',';
                        break;
                }
            });
            $('#ids').val(ids);
            this.fShowCondition=returnStr+'<button type=\"button\" id=\"newData\" class=\"am-btn am-btn-primary\" onclick="searchDatas()" style="float: right;margin-right:30px "><span class=\"am-icon-search\"></span>查询</button>';
        }).catch(function (response) {
            showTip(response.body);
        });
        //获取表头
        this.$http.get('/reportShows/520d8587-4a93-42e2-95c6-62586a54c762/shows2').then(function (response) {
            this.fDataHeads=response.body
        }).catch(function (response) {
            showTip(response.body);
        });
        this.$http.get('/reportShows/getDataBySql').then(function (response) {
            console.log(response.body);
            this.fShowDatas=response.body
        }).catch(function (response) {
            showTip(response.body);
        });
    },
    methods:{
        searchDatas:function () {

        }
    }
});
function searchDatas() {
    var ids=$('#ids').val().split(',');
    ids.forEach(function (items,i) {
        if($('#'+items).val()!=''&& i!=ids.length-1){
            alert($('#'+items).val());
        }
    });
}

