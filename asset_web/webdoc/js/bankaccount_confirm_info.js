
$(function () {
	var _data = {
		"service":_service(),
		"version": _version(),
		"partnerId": _partnerId(),
		"bizContent":{
			"requestNo":_requestNo(),
			"requestTime":formateDateAndTimeToString(),
			"inputCharset":'utf-8',
			"signType":'RSA',
			"sign":'sign',
			"token":window.sessionStorage.getItem("token"),
		}
	}
	var result_;
	$("#loading_div").show();
	$.ajax({
		url:_url()+"/memberInfoQuery",
		type:"POST",
		async:true,
		contentType:'application/json',
		data:JSON.stringify(_data),
		success:function(result){
			$("#loading_div").hide();
			if(result.requestStatus=="SUCCESS"){
				result_ = result
				var  _companyInfo = String_clear("Object",result.bizData.companyInfo);
				$(".list_info").find("p").eq(0).text(_companyInfo.companyName)

				$(".list_info").find("p").eq(1).text(_companyInfo.licenseNo)
				$(".list_info").find("p").eq(2).text(_companyInfo.telephone)
				$(".list_info").find("p").eq(3).text(_companyInfo.legalPersonName)
				$(".list_info").find("p").eq(4).text(_companyInfo.legalPersonId)
				$(".list_info").find("p").eq(7).text(_companyInfo.email)
				if(result.bizData.transactorInfo){
					var _transactorInfo = result.bizData.transactorInfo
					$(".list_info").find("p").eq(5).text(_transactorInfo.operatorName)
					$(".list_info").find("p").eq(6).text(_transactorInfo.operatorPhone)
				}

				var  _bankCardInfo = result.bizData.bankCardInfo
				$(".list_info").find("p").eq(8).text(_bankCardInfo.accountNo)
				$(".list_info").find("p").eq(9).text(_bankCardInfo.bankName)
				$(".list_info").find("p").eq(10).text(_bankCardInfo.bankNo)

			}
		}
	});
	$("input[type='checkbox']").change(function(e){
		console.log(e.currentTarget.checked)
		if(e.currentTarget.checked){
			$(".btn_block_2").removeClass("no_checked")
		}else{
			$(".btn_block_2").addClass("no_checked")
		}
	})
	$(".btn_block_2").on("click",function(){
		if(!$(".btn_block_2").hasClass("no_checked")){
			window.location.href="bankaccount_opening_setps.html?"+result_.bizData.bankCardInfo.bankCode
		}else{
			return
		}
	})
});