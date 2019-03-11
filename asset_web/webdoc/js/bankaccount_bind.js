$(function(){
    var _data = {
        "service": "member_register",
        "version": "1.0",
        "partnerId": "111111111111",
        "bizContent":{
            "requestNo":'S2018101210',
            "requestTime":formateDateAndTimeToString(new Date()),
            "inputCharset":'utf-8',
            "signType":'RSA',
            "sign":'sign',
            "token":sessionStorage.getItem("token"),
            "queryContentList":[],
        }
    }
    console.log(JSON.stringify(_data))
    $.ajax({
        url:"http://47.99.170.54:9001/memberInfoQuery",
        type:"POST",
        async:true,
        contentType:'application/json',
        data:JSON.stringify(_data),
        success:function(result){
            if(result.requestStatus=="SUCCESS"){
                var _bankCardInfo = result.bizData.bankCardInfo
                $(".pbox").find("em").eq(0).html(_bankCardInfo.accountName)
                $(".pbox").find("em").eq(1).html(_bankCardInfo.accountNo)
                $(".pbox").find("em").eq(2).html(_bankCardInfo.branchName)
                $(".pbox").find("em").eq(3).html(_bankCardInfo.bankNo)
            }else{
                alert(result.returnMessage)
            }
        }
    });
})