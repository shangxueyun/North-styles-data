//提现查询调会员信息资金账户信息
function _queryAcount(){
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

            "extension":null,
        }
    }
    $(loading_div).show();
    $.ajax({
        url:_url()+"/memberInfoQuery",
        type:"POST",
        async:true,
        contentType:'application/json',
        data:JSON.stringify(_data),
        success:function(result){
            $(loading_div).hide();
            if(result.bizData!=null){
                var bankAccountInfo=String_clear("Object",result.bizData.bankAccountInfo);
                if(bankAccountInfo!=null){
                    $(".list_info").find("p").eq(0).text(bankAccountInfo.accountName);
                    $(".list_info").find("p").eq(1).text(bankAccountInfo.accountNo);
                    $(".list_info").find("p").eq(2).text(Number(bankAccountInfo.accountBalance)/100+' 元');
                    $(".list_info").find("p").eq(3).text(Number(bankAccountInfo.freezeBalance)/100+' 元');
                    $(".list_info").find("p").eq(4).text(Number(bankAccountInfo.withdrewBalance)/100+' 元');
                    $('#withdrewBalance').val(bankAccountInfo.withdrewBalance);
                };
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
    if(_applyAmount>withdrewBalance){
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
            "applyAmount":$("#_applyAmount").val(),
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
                window.location.href='bankaccount.html'
            }else{
//		   	$('input[type="password"]').addClass("err_border")
//		   	$(".warntxt").show()
                alert(result.returnMessage)
            }
        }
    });
};

//判断提现金额是否大于可提现余额
function inputAmount(){
    var withdrewBalance=$('#withdrewBalance').val();
    var _applyAmount=$('#_applyAmount').val();
    if(_applyAmount>withdrewBalance){
        $('#amountError').css("display","block");
        return;
    }else {
        $('#amountError').css("display","none");
    }
};