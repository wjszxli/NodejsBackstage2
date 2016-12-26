var indexCatalogue=new Vue({
    el:'#admin-offcanvas',
    data:{
        strHtml:''
    },
    created:function () {
        //生成目录
        this.$http.get('catalogue/getCatalogue').then((response)=>{
            var strHtml = "<li><a href=\"admin-index.html\"><span class=\"am-icon-home\"></span> 首页</a></li>";
        strHtml += "<li class=\"admin-parent\">"
        for(var i=0;i<response.body.length;i++){
            strHtml+="<li><a href=\"reportRoutes/1\"><span class=\"am-icon-"+response.body[i].catalogue_icon+"\"></span> "+response.body[i].catalogue_name+"</a></li>";
        }
        strHtml += "<li><a class=\"am-cf\" data-am-collapse=\"{target: '#collapse-nav'}\"><span class=\"am-icon-file\"></span> 页面模块 <span class=\"am-icon-angle-right am-fr am-margin-right\"></span></a>";
        strHtml += "<ul class=\"am-list am-collapse admin-sidebar-sub am-in\" id=\"collapse-nav\">";
        strHtml += "<li><a href=\"admin-user.html\" class=\"am-cf\"><span class=\"am-icon-check\"></span> 个人资料<span class=\"am-icon-star am-fr am-margin-right admin-icon-yellow\"></span></a></li>";
        strHtml += "</ul>";
        strHtml += "</li>"
        this.strHtml = strHtml;
        },(response)=>{
            showTip('报错了');
        });
    }
});
var indexIfram=new Vue({
    el:'#body_iframe',
    data:{
        strIfr:''
    },
    created:function () {
        this.strIfr='<iframe name=\"theMain\" id=\"theMain\" width=\"100%\" height=\"800\" allowfullscreen mozallowfullscreen webkitallowfullscreen frameborder=\"0\" src=\"/catalogue\" scrolling="no"></iframe>';
    }

});