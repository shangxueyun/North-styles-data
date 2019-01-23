
let numpage,pages,statusP;//总记录数，每页显示数，总页数

(()=>{
    PageFUNC();
})()


$("#lending").mouseover(function(){
    $('#lending').css("background","#2d3f81");
    $('#reimbursement').css("background","gray");
}).mouseout(function(){
    $('#lending').css("background","gray");
    $('#reimbursement').css("background","#2d3f81");
});

function PageFUNC(Page,status){
    debugger
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
    $('#reimbursement').css("background","#2d3f81");
    var _data = {
        "service": _service(),
        "version": _version(),
        "partnerId": _partnerId(),
        "bizContent":{
            "requestNo": _requestNo(),
            "requestTime":formateDateAndTimeToString(),
            "inputCharset": "utf-8",
            "signType": "RSA",
            "sign": "sign",
            "token":window.sessionStorage.getItem("token"),
            "contractNo": null,
            "orderType":"LOAN",
            "status":status,
            "beforeRepayLastDay":$('#beforeRepayLastDay').val(),
            "page":Page,
            "pageSize":10,
            "extension": null
        }
    }
    $(loading_div).show();
    $.ajax({
        url:_url()+"/queryRepayPlan",
        type:"POST",
        async:true,
        contentType:'application/json',
        data:JSON.stringify(_data),
        success:function(result){
            $(loading_div).hide();
            if(result.bizData!=null){
                var v = 1;
                var _loanList=String_clear("Arr",result.bizData.list);
                HTMLappendPage(result.bizData,pageS,numpage,PageFUNC);
                $("table tr:gt(0)").remove();
                $.each(_loanList,function(i,res){
                    if(res.status=="AR" || res.status=="AWAIT_REPAY"){
                        res.status="待还款"
                    }
                    if(res.status=="RF" || res.status=="REPAY_FINISH"){
                        res.status="已还清"
                    }
                    if(res.status=="RETL" || res.status=="REPAY_EXCEED_THE_TIME_LIMIT"){
                        res.status="已逾期"
                    }
                    ApplyRecordList = '<tr class="_loanList"><td class="_index">'+ Number(1+i)+'</td>'+
                        '<td>'+res.status+'</td>'+
                        '<td>'+res.amount+'</td>'+
                        '<td>'+res.principal+'</td>'+
                        '<td>'+res.interest+'</td>'+
                        '<td>'+res.payFine+'</td>'+
                        '<td>'+res.lastRepayDate+'</td>'+
                        '</tr>';
                    $("table").append(ApplyRecordList)
                })
            }
        },
        // complete:function(){ //生成分页条
        //     getPageBar(curPage,pageSize,totalPage,total,pages);
        // },
        // // error:function(){
        // //     alert("数据加载失败");
        // // }
    });

};
$(function(){
    $('.magnifier').click(function () {
        PageFUNC(1,null);
    })
    $('.on').click(function () {
        PageFUNC(1,status);
    })
})
//确定选择页数
function confirmBtn(){
    var page=$('#toPage').val();
    if(page==''){
        page=1;
    }
    PageFUNC(page,null);
};