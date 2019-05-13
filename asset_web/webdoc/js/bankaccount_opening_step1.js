$(function () {	

		
	$(".err-tipBox").hide()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    $("input[name='telephone']").on("blur",function(e){
    	if($(this).val()){
			$(this).siblings(".err-tipBox").hide();
			var value = this.value
			var reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9])|(17[0,5-9])|(16[0,5-9]))\d{8}$/;
			if(value.indexOf("-")>=0)
			{
				let str = value.substr(value.indexOf("-")+1,value.length);
				if(str.length==8)
				{
					if(Number(str).toString()=="NaN")
					alertLog(false)
					else
					alertLog(true)
				}
				else
				{
					alertLog(false)
				}
			}else{
				if(reg.test(value)){
					alertLog(true)
				}else
				alertLog(false)
			}
		}
		else
		{
			$(this).siblings(".err-tipBox").show();
		}
	})
	
	function alertLog(type){
		if(type==true)
		{
			$(this).siblings(".err-tipBox").hide()
		}else
		{
			alert("企业联系电话输入不正确，请从新输入")
		}
	}
	$("input[name='openLicCmii']").on("blur",function(e){
		if($(this).val()!="")
		{
			$(this).siblings(".err-tipBox").hide();
		}else
		{
			$(this).siblings(".err-tipBox").show();
			$(this).focus();
		}
	});
//  点击下一步
    $('.button').click(function () {
    	var _dataInfo={
    		"bizContent":{
    			"companyInfo":{}
    		}
		};

		if($("input[name='openLicCmii']").val()=="")
		{
			$("input[name='openLicCmii']").siblings(".err-tipBox").show();
			return
		}
		else
		$("input[name='openLicCmii']").siblings(".err-tipBox").hide();

    	if($("input[name='telephone']").val()){
			var d = {};
			let str = false;
            var t = $('.companyForm').serializeArray();
            $.each(t, function () {
                d[this.name] = this.value;
			});
			d.updateStep = "/pages/upload_file/state_of_check"
			_dataInfo.bizContent.companyInfo=d
			_dataInfo.service= _service(),
			_dataInfo.version= _version(),
			_dataInfo.partnerId=_partnerId(),
			_dataInfo.bizContent.token = window.sessionStorage.getItem("token"),
			_dataInfo.bizContent.requestNo = _requestNo(),
			_dataInfo.bizContent.requestTime=formateDateAndTimeToString(),
			_dataInfo.bizContent.inputCharset='utf-8',
			_dataInfo.bizContent.signType = 'RSA',
			_dataInfo.bizContent.sign = "sign"
			_dataInfo.bizContent.extension = null,
			_dataInfo.bizContent.companyInfo.taxNoPhoto = $("#taxNoPhoto").attr("data-img")
			_dataInfo.bizContent.companyInfo.organizationNoPhoto = $("#organizationNoPhoto").attr("data-img")
			_dataInfo.bizContent.companyInfo.openingPermitPhoto = $("#openingPermitPhoto").attr("data-img")
			$("#loading_div").show();
            $.ajax({
		   		url:_url()+"/companyModify",
		   		type:"POST",
		   		async:true,
		   		contentType:'application/json',
		   		data:JSON.stringify(_dataInfo),
		   		success:function(result){
					$("#loading_div").hide();
		   			if(result.requestStatus=="SUCCESS"){
						window.location.search.replace("?","")
						if(window.location.search.replace("?","")=="Modify")
						   window.location.href="bankaccount_opening_step2.html?Modify"
						   else
						   window.location.href="bankaccount_opening_step2.html"
					}else{
						alert(result.returnMessage)
					}
				},
				error:function(result){

				}
			});
    	}else{
    		$("input[name='telephone']").siblings(".err-tipBox").show()
    		return
    	}
    });
});