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