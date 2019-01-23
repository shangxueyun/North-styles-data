
let numpage,pages,statusP;//总记录数，每页显示数，总页数

(()=>{
    PageFUNC();
})()


function PageFUNC(Page,status){
    if(!Page)
    {
        Page = 1
        pageS = Page;
    }
    if(!status)
    {
        status = statusP;
    }
    statusP = status
    var _data = {
        "service": _service(),
        "version": _version(),
        "partnerId": _partnerId(),
        "bizContent":{
            "requestNo":_requestNo(),
            "requestTime":formateDateAndTimeToString(),
            "inputCharset":'utf-8',
            "signType":'RSA',
            "sign":'sign',
            "token":window.sessionStorage.getItem("token"),
            "beginDate":null,
            "endDate":null,
            "page":Page,
            "pageSize":10,
            "extension":null,
        }
    }
    $(loading_div).show();
    $.ajax({
        url:_url()+"/bankAccountModifyQueryPage",
        type:"POST",
        async:true,
        contentType:'application/json',
        data:JSON.stringify(_data),
        success:function(result){
            $(loading_div).hide();
            if(result.requestStatus=="SUCCESS"){
                $("._loanList").remove()
                var v = 1;
                var _loanList=String_clear("Arr",result.bizData.list);
                HTMLappendPage(result.bizData,pageS,numpage,PageFUNC);
                $("table tr:gt(0)").remove();
                $.each(_loanList,function(i,res){
                    if(res.settleMode==0){
                        res.settleMode="票到"
                    }else if(res.settleMode==1){
                        res.settleMode="货到"
                    }
                    ApplyRecordList = '<tr class="_loanList">'+
                        '<td class="_status">'+res.invoiceTitle+'</td>'+
                        '<td class="_loanAppleDate">'+res.settleMode+'</td>'+
                        '<td class="_outDate">'+res.preAmount+'</td>'+
                        '<td class="_loanEndDate">' +
                        '<a  name='+res.id+'  onclick="queryImg(this)" href="javascript:void(0);">点击查看</a>' +
                        '</td></tr>';
                    $("table").append(ApplyRecordList)
                })
            }
        },
        complete:function(){ //生成分页条
            getPageBar(curPage,pageSize,totalPage,total,pages);
        }
    });
};


//新增回款变更信息
function _addbank(){
    var _data = {
        "service": _service(),
        "version": _version(),
        "partnerId": _partnerId(),
        "bizContent":{
            "requestNo":_requestNo(),
            "requestTime":formateDateAndTimeToString(),
            "inputCharset":'utf-8',
            "signType":'RSA',
            "sign":'sign',
            "token":window.sessionStorage.getItem("token"),
            "clientInfo":{
                "invoiceTitle":$("#invoiceTitle").val(),
                "settleMode":$('input[name="settleMode"]:checked').val(),
                "settleCycle":$("#settleCycle").val(),
                "preAmount":$("#preAmount").val(),
                "paybackDays":$("#paybackDays").val(),
                "modifyPhoto":$("#file").val(),
            }
        }
    }
    
    $(loading_div).show();
    $.ajax({
        url:_url()+"/addBankAccountModify",
        type:"POST",
        async:true,
        contentType:'application/json',
        data:JSON.stringify(_data),
        success:function(result){
            $(loading_div).hide();
            if(result.requestStatus=="SUCCESS"){
                _bankList();
                _clear()
            }
        }
    });
};

//查看图片
function queryImg(obj){
    $('#recImg').attr("src","");
    var _data = {
        "service": _service(),
        "version": _version(),
        "partnerId": _partnerId(),
        "bizContent":{
            "requestNo":_requestNo(),
            "requestTime":formateDateAndTimeToString(),
            "inputCharset":'utf-8',
            "signType":'RSA',
            "sign":'sign',
            "token":window.sessionStorage.getItem("token"),
            "id":obj.name,
            "extension": null
        }
    }
    $(loading_div).show();
    $.ajax({
        url:_url()+"/bankAccountModifyQueryById",
        type:"POST",
        async:true,
        contentType:'application/json',
        data:JSON.stringify(_data),
        success:function(result){
            $(loading_div).hide();
            if(result.requestStatus=="SUCCESS"){
                $('#popbox_1').removeClass("off").addClass("on");
                $('#recImg').attr("src",result.bizData.modifyPhoto);
            }
        }
    });
};

//隐藏图片
popbox_1.onclick = function () {
    $('#popbox_1').removeClass("on").addClass("off")
}

//清空新增汇款变更信息
function _clear(){
    $("#invoiceTitle").val('');
    $('input[name="settleMode"]:checked').val('');
    $("#settleCycle").val('');
    $("#preAmount").val('');
    $("#modifyPhoto").val('');
}

//确定选择页数
function confirmBtn(){
    var page=$('#toPage').val();
    if(page==''){
        page=1;
    }
    _bankList(page,10);
};