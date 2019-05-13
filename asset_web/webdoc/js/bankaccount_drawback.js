//提现查询调会员信息资金账户信息
let bizData
function _queryAcount(){
	let data = JSON.parse(sessionStorage.data)
    data.bizContent.queryContentList = ["BANK_ACCOUNT"];
    $(loading_div).show();
    $.ajax({
        url:_url()+"/memberInfoQuery",
        type:"POST",
        async:true,
        contentType:'application/json',
        data:JSON.stringify(data),
        success:function(result){
            $(loading_div).hide();
            if(result.bizData!=null){
                var bankAccountInfo=String_clear("Object",result.bizData.bankAccountInfo);
                if(bankAccountInfo!=null){
                    if(bankAccountInfo.status=='1'){
                        $(".list_info").find("p").eq(0).text(bankAccountInfo.accountName);
                        $(".list_info").find("p").eq(1).text(bankAccountInfo.accountNo);
                    }else{
                        $(".list_info").find("p").eq(0).text("-");
                        $(".list_info").find("p").eq(1).text("-");
                    }
                    if(bankAccountInfo.accountBalance=="-")
                    $(".list_info").find("p").eq(2).text(stringDispose(bankAccountInfo.accountBalance.toString())+' 元');
                    else
                    $(".list_info").find("p").eq(2).text(stringDispose(((Number(bankAccountInfo.accountBalance)/100).toFixed(2)).toString())+' 元');
                    if(bankAccountInfo.freezeBalance=="-")
                    $(".list_info").find("p").eq(3).text(bankAccountInfo.freezeBalance+' 元');
                    else
                    $(".list_info").find("p").eq(3).text(stringDispose(((Number(bankAccountInfo.freezeBalance)/100).toFixed(2)).toString())+' 元');
                    if(bankAccountInfo.withdrewBalance=="-")
                    $(".list_info").find("p").eq(4).text(bankAccountInfo.freezeBalance+' 元');
                    else
                    $(".list_info").find("p").eq(4).text(stringDispose(((Number(bankAccountInfo.withdrewBalance)/100).toFixed(2)).toString())+' 元');
                    $('#withdrewBalance').val(bankAccountInfo.withdrewBalance);
                };
            }
            if(result.requestStatus=="SUCCESS"){}else{
                alert(result.returnMessage)
            }
        },
        error:function(){
            alert("数据加载失败");
        }
    });
}

window.onload=function(){
    _queryAcount();
}

function withdrawal(){
    var withdrewBalance=$('#withdrewBalance').val();
    var _applyAmount=$('#_applyAmount').val();
    if(Number(_applyAmount)<=0||Number(_applyAmount)>Number(withdrewBalance)){
        alert`输入金额不正确，请输入正确金额`
        return;
    }
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
            "applyAmount":_applyAmount,
            "password":$('input[type="password"]').val(),
            "extension":null,
        }
    }
    $(loading_div).show();
    $.ajax({
        url:_url()+"/fundOutApply",
        type:"POST",
        async:true,
        contentType:'application/json',
        data:JSON.stringify(_data),
        success:function(result){
            $(loading_div).hide();
            if(result.requestStatus=="SUCCESS"){
                window.location.href='bankaccount_transaction_record.html'
            }else{
                alert(result.returnMessage)
            }
        }
    });
};

//判断提现金额是否大于可提现余额
function inputAmount(){
    var withdrewBalance=$('#withdrewBalance').val();
    var _applyAmount=$('#_applyAmount').val();
    if(Number(_applyAmount)>Number(withdrewBalance)){
        $('#amountError').css("display","block");
        return;
    }else {
        $('#amountError').css("display","none");
    }
};