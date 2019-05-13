
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
    $('#reimbursement').css("background","#2d3f81");
    let queryRangeDate = $("#queryRangeDate").val(),queryBeginDate = queryRangeDate.substr(0,queryRangeDate.indexOf(" ")),
    queryEndDate = queryRangeDate.substr(queryRangeDate.lastIndexOf(" ")+1,queryRangeDate.length);
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
            "beginDate":formatDate(queryBeginDate),
            "endDate":formatDate(queryEndDate),
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
				if(result.bizData.list == 0)
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
                    if(res.status=="AC" || res.status=="AWAIT_COMPARE")
                        res.status="待对账"
                    else if(res.status=="AR" || res.status=="AWAIT_REPAY")
                        res.status="待还款"
                    else if(res.status=="RF" || res.status=="REPAY_FINISH")
                        res.status="已还清"
                    else if(res.status=="RETL" || res.status=="REPAY_EXCEED_THE_TIME_LIMIT")
                        res.status="已逾期"
                    else if(res.status=="RP" || res.status=="REPAY_PART")
                        res.status="已还部分"
                    else if(res.status=="RD" || res.status=="REPAY_DELAY")
                        res.status="已展期"
                    ApplyRecordList = '<tr class="_loanList"><td class="_index">'+ Number(1+i)+'</td>'+
                        '<td>'+res.status+'</td>'+
                        '<td>'+stringDispose(res.amount.toString())+'</td>'+
                        '<td>'+stringDispose(res.principal.toString())+'</td>'+
                        '<td>'+stringDispose(res.interest.toString())+'</td>'+
                        '<td>'+stringDispose(res.payFine.toString())+'</td>';
                        if(res.status == '待还款')
                        ApplyRecordList += '<td>'+res.lastRepayDate+'</td><td><a applyAmount="'+res.amount+'" agreementId="'+res.agreementId+'" repayPlanId="'+res.id+'" href="javascript:;" class="Operating_reimbursement reimbursement_F">还款</a></td></tr>';
                        else if(res.status == '已还清')
                        ApplyRecordList += '<td>'+res.lastRepayDate+'</td><td><a href="javascript:;" class="Operating_reimbursement gray">还款</a></td></tr>';
                    $("table").append(ApplyRecordList);
                })
            }else
            {
                 $("table tr:gt(0)").remove();
                 $('.pageHTMLtotal').remove();
                 $('.pageHTML').pagination({
                     pageCount: 0,
                     mode:"fixed",
                     jump: true,
                     callback: function (api) {
                         PageFUNC(api.getCurrent())
                     }
                 });       
            }

            if(result.requestStatus=="SUCCESS"){}else{
                alert(result.returnMessage)
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


$(document).click(fn=>{
    if(fn.target.className.indexOf("reimbursement_F")>=0)
    {
        let {applyamount,agreementid,repayplanid} = fn.target.attributes;
        let data = JSON.parse(sessionStorage.data);
        data.bizContent.repayPlanId = repayplanid.value;
        data.bizContent.agreementId = agreementid.value;
        data.bizContent.applyAmount = applyamount.value;
        let {bankAccountInfo,bankCardInfo,creditAccountInfo} = JSON.parse(window.sessionStorage.result).bizData;
        if(bankAccountInfo.status=='1')
        {
            //接入回显
            $(Capital_bank_account).text();
            $(Capital_bank_accountNo).text();
            
            $(bank_account).text(bankCardInfo.accountName);
            $(bank_accountNo).text(bankCardInfo.bankNo);
            $(creditAmount).text(`￥${stringDispose((creditAccountInfo.creditAmount - creditAccountInfo.useAmount).toString())}`);
            $(repayment_amount).text(stringDispose(applyamount.value));
            $(Payment_bounced).show();
            $(".cosle").click(fn=>{
                $(Payment_bounced).hide();
                $(Capital_bank_account).text("-");
                $(Capital_bank_accountNo).text("-");
                $(bank_account).text("-");
                $(bank_accountNo).text("-");
                $(creditAmount).text("-");
                $(repayment_amount).text("-");
            });
            $(repayment_submit).unbind();
            $(repayment_submit).click(fn=>{
                if((Number(bankAccountInfo.withdrewBalance)/100)-Number(applyamount.value)>=0)
                {
                    if($(transaction_password).val() != "")
                    {
                        data.bizContent.tradePassword = $(transaction_password).val();
                        $(loading_div).show();
                        $.ajax({
                            url:_url()+"/manualRepayApply",
                            type:"POST",
                            async:true,
                            contentType:'application/json',
                            data:JSON.stringify(data),
                            success:function(result){
                                $(loading_div).hide();
                                if(result.requestStatus=="SUCCESS"){
                                    window.location.reload();
                                }else{
                                    alert(result.returnMessage)
                                }
                            },
                        });
                    }else
                    alert("交易密码不能为空！");

                }else
                alert("资金监管账号可用小于还款金额！");
            })
        }else
        {
            alert("您没有开通资金监管账户不能进行还款！");
            return false;      
        }
    }
})


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