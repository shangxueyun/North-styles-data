
$(function () {

	$(".err-tipBox").css("color","red")
	$(".err-tipBox").hide()
	
	let EleArr = [
		"bankName",
		"bankBranchName",
		"bankCode",
		"cardName",
		"cardNo",
		"bankBranchNo",
		"bankProvince",
		"bankCity",
	],
	showBox = 'err-tipBox';
	EleArr.forEach((v,i)=>{
		Eleshow(v,showBox)
	});

	
    $('#input-button').click(function (event) {
		event.preventDefault() //阻止form表单默认提交
		let _dataInfo={"bizContent":{'bankCardInfo':{}}},dataObj = $('#bankInfo').serializeArray();

		for(var i in dataObj){
			//if(RegValue(dataObj[i].name,dataObj[i].value))
			_dataInfo.bizContent.bankCardInfo[dataObj[i].name] = dataObj[i].value
		}
		
		_dataInfo.bizContent.token = window.sessionStorage.getItem("token"),
		_dataInfo.bizContent.requestNo = _requestNo(),
		_dataInfo.bizContent.requestTime=formateDateAndTimeToString(),
		_dataInfo.bizContent.inputCharset='utf-8',
		_dataInfo.bizContent.signType = 'RSA',
		_dataInfo.bizContent.sign = "sign"
		_dataInfo.bizContent.extension = null

		_dataInfo.service= "member_ bankcard_binding",
		_dataInfo.version=_version(),
		_dataInfo.partnerId= _partnerId(),
		$("#loading_div").show();
        $.ajax({
	   		url:_url()+"/bankCardBinding",
	   		type:"POST",
	   		async:true,
	   		contentType:'application/json',
	   		data:JSON.stringify(_dataInfo),
	   		success:function(result){
				$("#loading_div").hide();
	   			if(result.requestStatus=="SUCCESS"){
	   				window.location.href="bankaccount_confirm_info.html"
		   		}else{
					alert(result.returnMessage)
				}
			}
		});
	});
	
	function RegValue(str,value){
		var Reg
		if(str == 'bankBranchName'|| str == 'accountName'){
			Reg = /^[\u4e00-\u9fa5]+$/gi;
			return Reg.test(value)
		}
		switch (str) {
			case 'bankCode':
				Reg = /^[A-Z]+$/;
				return Reg.test(value)
				break;
			case 'accountNo':
				Reg = /^([1-9]{1})(\d{14}|\d{18})$/
				return Reg.test(value)
				break;
			default:
				return true
		}
	}

	function Eleshow(str,showBox){
		$("input[name='" + str + "']").blur(function(){
			$(this).siblings("."+ showBox).text("输入错误，请从新输入");
			if(RegValue(str,$(this).val())){
				$(this).siblings("."+ showBox).hide()
			}else{
				$(this).focus();
				$(this).siblings("."+ showBox).show()
			}
		})
	}

	$("#bank_info").blur(fn=>{
		let value = fn.currentTarget.value,No;
		BANK_CODE.forEach((v,i)=>{
			for(var o in v)
			{
				if(o == "name")
				{
					if(value == v[o])
					No = v.value;
				}
			}
		});
		if(No){
			$("input[name='bankNo']").val(No);
		}
	})



});