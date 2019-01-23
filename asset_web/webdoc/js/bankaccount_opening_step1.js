$(function () {	

		
	$(".err-tipBox").hide()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    $("input[name='telephone']").on("blur",function(e){
    	if($(this).val()){
    		$(this).siblings(".err-tipBox").hide()
    	}else{
    		$(this).siblings(".err-tipBox").show()
    	}
    })
        
//  点击下一步
    $('.button').click(function () {
    	var _dataInfo={
    		"bizContent":{
    			"companyInfo":{}
    		}
    	};
    	if($("input[name='telephone']").val()){
    		var d = {};
            var t = $('.companyForm').serializeArray();
            $.each(t, function () {
                d[this.name] = this.value;
            });
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
			// _dataInfo.bizContent.companyInfo.legalIdCardPhotoFrontUrl = $("#legalIdCardPhotoFrontUrl").attr("data-img")
			// _dataInfo.bizContent.companyInfo.legalIdCardPhotoBehindUrl = $("#legalIdCardPhotoBehindUrl").attr("data-img")
			// _dataInfo.bizContent.companyInfo.licenseNoPhoto = $("#licenseNoPhoto").attr("data-img")
			$("#loading_div").show();
            $.ajax({
		   		url:_url()+"/companyModify",
		   		type:"POST",
		   		async:true,
		   		contentType:'application/json',
		   		data:JSON.stringify(_dataInfo),
		   		success:function(result){
					   debugger
					$("#loading_div").hide();
		   			if(result.requestStatus=="SUCCESS"){
		   				window.location.href="bankaccount_opening_step2.html"
		   			}
				},
				error:function(result){
					console.log(result)
				}
			});
    	}else{
    		$(".err-tipBox").show()
    		return
    	}
    });
});