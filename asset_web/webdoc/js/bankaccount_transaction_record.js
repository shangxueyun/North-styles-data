$(function(){
    //实现全选与反选
    $("#allAndNotAll").click(function() {
        // var isChecked = $("input[name='allAndNotAll']:checkbox").prop('checked');
        var i=1;
        if (this.checked){
            $("input[name='items']:checkbox").each(function(){
                console.log(i++);
                $(this).attr("checked", true);
            });
        } else {
            $("input[name='items']:checkbox").each(function() {
                $(this).attr("checked", false);
            });
        }
    });

    //获取被选中的id
    var ids=[];
    $('#getAllSelectedId').click(function(){
        var i=1;
        $("input[name='items']:checked").each(function(){
            ids.push($(this).attr("id"));
            console.log(i++);
        });
        var delIds=ids.join(",");
        console.log(delIds);

    });
});

let numpage,pages;//总记录数，每页显示数，总页数

(()=>{
    PageFUNC();
})()

//查询交易记录
function PageFUNC(Page){
    if(!Page)
    {
        Page = 1
        pageS = Page;
    }
    let RangeDateval = $("#RangeDate").val(),beginDate = RangeDateval.substr(0,RangeDateval.indexOf(" ")),
    endDate = RangeDateval.substr(RangeDateval.lastIndexOf(" ")+1,RangeDateval.length);
    $("._loanList").remove();
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
            "contractNo": null,
            "orderType":"LOAN",
            "beginDate":beginDate.replace(/-/g,""),
            "endDate":endDate.replace(/-/g,""),
            "accountName":$("input[name='accountName']").val(),
            "page":Page,
            "pageSize":10,
            "extension":null,
        }
    }
    $(loading_div).show()
    $.ajax({
        url:_url()+"/queryTradeOrder",
        type:"POST",
        async:true,
        contentType:'application/json',
        data:JSON.stringify(_data),
        success:function(result){
            $(loading_div).hide()
            if(result.bizData!=null){
                var v = 1;
                var _loanList=String_clear("Arr",result.bizData.list);
                HTMLappendPage(result.bizData,pageS,numpage,PageFUNC);
                $("table tr:gt(0)").remove();
                $.each(_loanList,function(i,res){
                    var status;
                    if(res.status == "IN_PROCESS")
                    status = "处理中"
                    else if(res.status == "SUCCESS")
                    status = "成功"
                    else if(res.status == "FAIL")
                    status = "失败"
                    let ApplyRecordList = "";
                    ApplyRecordList += '<tr class="_loanList">';
                    ApplyRecordList +=   '<td class="_status"><input type="checkbox" name=items id="'+v+'"/></td>';
                    ApplyRecordList +=     '<td class="_status">'+v+'</td>';
                    ApplyRecordList +=    '<td class="_status">'+res.tradeTime+'</td>';
                    if(res.crdrFlg == "出金")
                    {
                        ApplyRecordList +=    '<td class="_loanAppleDate">--</td>';//收入
                        ApplyRecordList +=    '<td class="_outDate">'+res.applyAmount+'</td>'; //支出
                    }
                    else{
                        ApplyRecordList +=    '<td class="_loanAppleDate">'+res.applyAmount+'</td>';//收入
                        ApplyRecordList +=    '<td class="_outDate">--</td>'; //支出
                    }
                    ApplyRecordList +=    '<td class="_outDate">'+res.accountName+'</td>';
                    ApplyRecordList +=    '<td class="_outDate">'+res.accountNo+'</td>';
                    //'<td class="_outDate">'+formatDateToString(res.accountingDate)+'</td>'+
                    ApplyRecordList +=   '<td class="_outDate">'+res.tradeTime+'</td>';
                    ApplyRecordList +=   '<td class="_outDate">'+status+'</td>';
                    // '<td class="_outDate">'+res.memo+'</td>'+
                    ApplyRecordList +=   '<td class="_outDate"><a applyNo="'+res.applyNo+'" class="generate" download>下载</a></td>'; //交易凭证
                    ApplyRecordList +=    '<td class="_outDate">'+res.memo+'</td>';
                    ApplyRecordList +=    '</td></tr>';
                    $("table").append(ApplyRecordList)
                    v++
                })
                let generateArr = $(".generate")
                for(var i in generateArr)
                {
                    generateArr[i].onclick = fn=>{
                        generate(fn)
                    }
                }
            }
        },
        // complete:function(){ //生成分页条
        //     getPageBar(curPage,pageSize,totalPage,total,pages);
        // },
        // error:function(){
        //     alert("数据加载失败");
        // }
    });
};
let data_C = sessionStorage.data
//提现查询调会员信息资金账户信息
$(loading_div).show()
$.ajax({
    url:_url()+"/memberInfoQuery",
    type:"POST",
    async:true,
    contentType:'application/json',
    data:data_C,
    success:function(result){
        $(loading_div).hide()
        if(result.requestStatus=="SUCCESS"){
            bankAccountInfo = result.bizData.bankAccountInfo,
            bankCardInfo = result.bizData.bankCardInfo;
            
            if(bankAccountInfo!=null){
                $('#accountBalance').text(Number(bankAccountInfo.accountBalance)/100);
                if(bankAccountInfo.status=='0'){
                    $("#status").text("未开通");
                }
                if(bankAccountInfo.status=='1'){
                    $("#status").text("已开通");
                }
            }else {
                $("#status").text("未开通");
            }
            if(bankCardInfo!=null){
                $('#accountNo').text(bankAccountInfo.accountNo);
                $('#accountName').text(bankAccountInfo.accountName);
            }
        }
    },
    // error:function(){
    //     alert("数据加载失败");
    // }
});

let generateELE;
function generate(fn){
    if(fn.currentTarget){
        let data_C = JSON.parse(sessionStorage.data),applyNo = fn.currentTarget.attributes[0].value;
        delete data_C.bizContent.queryContentList
        data_C.bizContent.applyNo = applyNo;
        generateELE = $(fn.currentTarget)
        $(loading_div).show()
        $.ajax({
            url:_url()+"/receiptCreate",
            type:"POST",
            async:true,
            contentType:'application/json',
            data:JSON.stringify(data_C),
            success:function(result){
                $(loading_div).hide()
                if(result.requestStatus=="SUCCESS"){
                    //result.bizDate;download
                    generateELE.attr("href",result.bizData);
                    generateELE.attr("download",result.bizData.substr(result.bizData.lastIndexOf("/")+1,result.bizData.length));
                    window.location.href = result.bizData
                    return false
                }
            },
            error:function(){
                $(loading_div).hide()
                alert("数据加载失败");
            }
        });        
    }

}
