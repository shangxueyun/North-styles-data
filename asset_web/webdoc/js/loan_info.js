

let numpage,pages,statusP;//总记录数，每页显示数，总页数

(()=>{
    PageFUNC();
})()

$("#reimbursement").mouseover(function(){
    $('#lending').css("background","gray");
    $('#reimbursement').css("background","#2d3f81");
}).mouseout(function(){
    $('#lending').css("background","#2d3f81");
    $('#reimbursement').css("background","gray");
});

//查询贷款信息
function PageFUNC(Page,status){
    if(!Page)
    {
        Page = 1
        pageS = Page;
    }else{pageS = Page}
    if(!status)
    {
        status = statusP;
    }
    statusP = status
    $('#lending').css("background","#2d3f81");
    let queryRangeDate = $("#queryRangeDate").val(),queryBeginDate = queryRangeDate.substr(0,queryRangeDate.indexOf(" ")),
    queryEndDate = queryRangeDate.substr(queryRangeDate.lastIndexOf(" ")+1,queryRangeDate.length);

    var dateType=null;
    if($("#_datatype").html()=='请选择'){
        dateType='';
    }else if($("#_datatype").html()=='申请日'){
        dateType='applyDate';
    }else if($("#_datatype").html()=='放款日'){
        dateType='fundOutDate';
    }else if($("#_datatype").html()=='到期日'){
        dateType='endDate';
    }
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
            "dateType":dateType,
            "queryBeginDate":formatDate(queryBeginDate),
            "queryEndDate":formatDate(queryEndDate),
            "page":Page,
            "pageSize":10,
            "extension": null
        }
    }
    $(loading_div).show();
    $.ajax({
        url:_url()+"/queryApplyRecord",
        type:"POST",
        async:true,
        contentType:'application/json',
        data:JSON.stringify(_data),
        success:function(result){
            $(loading_div).hide();
            if(result.requestStatus=="SUCCESS"){
                $("._loanList").remove()
                var ApplyRecordList='';
                var m =Number(result.bizData.count)/10,reg = /.*\..*/;
                if(reg.test(m))
                m = parseInt(m) +1;
                result.bizData.pages = m;
                result.bizData.pageNum = result.bizData.page;
                result.bizData.total = result.bizData.count;
                var _loanList=String_clear("Arr",result.bizData.loanList);
				if(result.bizData.loanList == 0)
				result.bizData.pages = 0;
				$(".pageHTMLtotal").remove();
				$('.pageHTML').pagination({
					pageCount: result.bizData.pages,
					mode:"fixed",
					current:Page,
					jump: true,
					count:99,
					callback: function (api) {
						PageFUNC(api.getCurrent())
					}
				});
				$('.pageHTML').append("<span style='white-space:pre;' class='pageHTMLtotal'>共" + result.bizData.pages +"页  共"+result.bizData.total+"条记录</span>") 
                $("table tr:gt(0)").remove();
                $.each(_loanList,function(i,res){
                    if(res.status=="I00")
                    status = "待审核"
                    if(res.status=="I")
                    status = "处理中"
                    else if(res.status=="I1")
                    status = "审核通过"
                    else if(res.status=="I0")
                    status = "已发送"
                    else if(res.status=="F")
                    status = "已拒绝"
                    else if(res.status=='I3')
                    status = "合同已签待放款"
                    else if(res.status=='S')
                    status = "放款成功"
                    else if(res.status=='I4')
                    status = "放款失败"
                    ApplyRecordList = '<tr class="_loanList"><td class="_index">'+ Number(1+i)+'</td>'+
                        '<td class="_status">'+status+'</td>'+
                        '<td class="_loanAppleDate">'+res.loanApplyDate+'</td>'+
                        '<td class="_outDate">'+res.outDate+'</td>'+
                        '<td class="_loanEndDate">'+res.loanEndDate+'</td>'+
                        '<td class="_loanTerm">'+res.loanTerm+'</td>'+
                        '<td class="_loanAmt">'+stringDispose(res.loanAmt.toString())+'</td>';
                        if(res.loanRate == "-")
                        ApplyRecordList +='<td class="_loanRate">'+res.loanRate+'</td>';
                        else
                        ApplyRecordList +='<td class="_loanRate">'+res.loanRate+'%</td>';
                        ApplyRecordList +='<td class="_interest">'+stringDispose(res.interest.toString())+'</td>'+
                        '</tr>';
                    $("table").append(ApplyRecordList)
                })
            }else{
                alert(result.returnMessage)
            }
        },
        // complete:function(){ //生成分页条
        //     getPageBar(curPage,pageSize,totalPage,total,pages);
        // }
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
