var indexCatalogue = new Vue({
    el: '#admin-offcanvas',
    data: {
        strHtml: ''
    },
    created: function () {

        //生成目录
        this.$http.get('catalogue/getCatalogue').then(function (response) {
            var strHtml = "<li><a href=\"admin-index.html\"><span class=\"am-icon-home\"></span> 首页</a></li>";
            strHtml += "<li class=\"admin-parent\">"
            for (var i = 0; i < response.body.length; i++) {
                var url =response.body[i].F_url;
                strHtml += "<li><a href=\"#\" onclick=\"changeIfr('"+url+"')\" ><span class=\"am-icon-" + response.body[i].F_icon + "\"></span> " + response.body[i].F_name + "</a></li>";
            }
            strHtml += "<li><a class=\"am-cf\" data-am-collapse=\"{target: '#collapse-nav'}\"><span class=\"am-icon-file\"></span> 页面模块 <span class=\"am-icon-angle-right am-fr am-margin-right\"></span></a>";
            strHtml += "<ul class=\"am-list am-collapse admin-sidebar-sub am-in\" id=\"collapse-nav\">";
            strHtml += "<li><a href=\"admin-user.html\" class=\"am-cf\"><span class=\"am-icon-check\"></span> 个人资料<span class=\"am-icon-star am-fr am-margin-right admin-icon-yellow\"></span></a></li>";
            strHtml += "</ul>";
            strHtml += "</li>"
            this.strHtml = strHtml;
        }).catch(function (response) {
            showTip(response);
        });
    }
});
var indexIfram = new Vue({
    el: '#body_iframe',
    data: {
        strIfr: ''
    },
    created: function () {
        var height =$(document.body).height()-100;
        this.strIfr = '<iframe name=\"theMain\" id=\"theMain\" width=\"100%\" height=\"'+height+'\" allowfullscreen mozallowfullscreen webkitallowfullscreen frameborder=\"0\" src=\"/catalogue\" scrolling="no"></iframe>';
    },
    method:{
        changeIfr:function () {
        }
    }
});

function changeIfr(strIfr) {
    strIfr="/"+strIfr;
    var height =$(document.body).height()-$(document.body).height()*0.08;
    $('#div_ifram').empty();
    var str = '<iframe name=\"theMain\" id=\"theMain\" width=\"100%\" height=\"'+height+'\" allowfullscreen mozallowfullscreen webkitallowfullscreen frameborder=\"0\" src=\"'+strIfr+'\" scrolling="no"></iframe>';
    $('#div_ifram').html(str);
}
