

		
//		经办人身份证正、反面影印件：
//		1)状态默认隐藏
		let EleArr = [
			"operatorName",
			"operatorCertId",
			"operatorEmail",
			"operatorPhone",
		],
		showBox = 'err-tipBox';
		EleArr.forEach((v,i)=>{
			Eleshow(v,showBox)
		});
		$(operatorName).focus();
//		2）上传{width: 700,quality:0.9}
	   	$("#idCardPhotoFrontUrl").on("change",function(e){
			let NameObj = e.currentTarget.files[0],oFileReader = new FileReader();
			if(NameObj)
			{
				$(".idCardPhotoFront_img").text("");
				$(".idCardPhotoFront_img").text(NameObj.name);
				if(NameObj.size > 370200 && NameObj.size < 1024000)
				{
					lrzFUNC($(".idCardPhotoFront_img"),"idCardPhotoFrontUrl",this.files[0],0.7)
				}else if(NameObj.size > 1024000){
					lrzFUNC($(".idCardPhotoFront_img"),"idCardPhotoFrontUrl",this.files[0],0.)
				}else{
                    oFileReader.onloadend = function (e) {
						Base64Obj['idCardPhotoFrontUrl'] = e.target.result
						$('.idCardPhotoFront_img').attr("herf",e.target.result);
						$('.idCardPhotoFront_img').show();
						$(this).siblings(".err-tipBox").hide()
                    };
                    oFileReader.readAsDataURL(this.files[0]);
				}
			}
			else
			{
				$('.idCardPhotoFront_i').show();
			}
		})
	
		$("#idCardPhotoBehindUrl").on("change",function(e){
			let NameObj = e.currentTarget.files[0],oFileReader = new FileReader();
			
			if(NameObj)
			{	

				$(".idCardPhotoBehind_img").text("");
				$(".idCardPhotoBehind_img").text(NameObj.name);
				if(NameObj.size > 370200 && NameObj.size < 1024000)
				{
					lrzFUNC($(".idCardPhotoBehind_img"),"idCardPhotoBehindUrl",this.files[0],0.7)
				}else if(NameObj.size > 1024000){
					lrzFUNC($(".idCardPhotoBehind_img"),"idCardPhotoBehindUrl",this.files[0],0.)
				}else{
                    oFileReader.onloadend = function (e) {
						Base64Obj['idCardPhotoBehindUrl'] = e.target.result
						$('.idCardPhotoBehind_img').attr("data-img",e.target.result);
						$('.idCardPhotoBehind_img').show();
						$(this).siblings(".err-tipBox").hide()
                    };
                    oFileReader.readAsDataURL(this.files[0]);
				}
			}
			else
			{
				$(this).siblings(".err-tipBox").show()
			}
		})
		
//	   	法人委托授权书影印：
	   	// $("#arrestPhotoUrl").on("change",function(e){
		// 	let NameObj = e.currentTarget.files[0],oFileReader = new FileReader();
			
		// 	if(NameObj)
		// 	{
		// 		$(".arrestPhotoUrl_img").text("");
		// 		$(".arrestPhotoUrl_img").text(NameObj.name);
		// 		if(NameObj.size > 370200 && NameObj.size < 1024000)
		// 		{
		// 			lrzFUNC($(".arrestPhotoUrl_img"),"arrestPhotoUrl",this.files[0],0.7)
		// 		}else if(NameObj.size > 1024000){
		// 			lrzFUNC($(".arrestPhotoUrl_img"),"arrestPhotoUrl",this.files[0],0.)
		// 		}else{
        //             oFileReader.onloadend = function (e) {
		// 				Base64Obj['arrestPhotoUrl'] = e.target.result
		// 				$('.arrestPhotoUrl_img').attr("data-img",e.target.result);
		// 				$('.arrestPhotoUrl_img').show();
		// 				$(this).siblings(".err-tipBox").hide()
        //             };
        //             oFileReader.readAsDataURL(this.files[0]);
		// 		}
		// 	}
		// 	else
		// 	{
		// 		$(this).siblings(".err-tipBox").hide()
		// 	}
		// 	})
		
// //	   	企业授权书影印：
// 		$("#companyAuthorizationFilePath").on("change",function(e){
// 			let NameObj = e.currentTarget.files[0],oFileReader = new FileReader();
			
// 			if(NameObj)
// 			{
// 				$(".companyAuthorizationFilePath_img").text("");
// 				$(".companyAuthorizationFilePath_img").text(NameObj.name);
// 				if(NameObj.size > 370200 && NameObj.size < 1024000)
// 				{
// 					lrzFUNC($(".companyAuthorizationFilePath_img"),"companyAuthorizationFilePath",this.files[0],0.7)
// 				}else if(NameObj.size > 1024000){
// 					lrzFUNC($(".companyAuthorizationFilePath_img"),"companyAuthorizationFilePath",this.files[0],0.)
// 				}else{
//                     oFileReader.onloadend = function (e) {
// 						Base64Obj['companyAuthorizationFilePath'] = e.target.result
// 						$('.companyAuthorizationFilePath_img').attr("data-img",e.target.result);
// 						$('.companyAuthorizationFilePath_img').show();
// 						$(this).siblings(".err-tipBox").hide()
//                     };
//                     oFileReader.readAsDataURL(this.files[0]);
// 				}
// 			}
// 			else
// 			{
// 				$(this).siblings(".err-tipBox").hide()
// 			}
// 		})

//      表单提交
		$(".err-tipBox").css("color","red")
		$(".err-tipBox").hide()
    	$('#input-button').click(function () {
			let _dataInfo={"bizContent":{'transactorInfo':{}}},dataObj = $('#operatorForm').serializeArray();
			
			for(var i in dataObj){
				//if(RegValue(dataObj[i].name,dataObj[i].value))
				_dataInfo.bizContent.transactorInfo[dataObj[i].name] = dataObj[i].value
			}

			_dataInfo.bizContent.token = sessionStorage.getItem("token"),
			_dataInfo.bizContent.requestNo = _requestNo(),
			_dataInfo.bizContent.requestTime=formateDateAndTimeToString(),
			_dataInfo.bizContent.inputCharset='utf-8',
			_dataInfo.bizContent.signType = 'RSA',
			_dataInfo.bizContent.sign = "sign"
			_dataInfo.bizContent.extension = null
			_dataInfo.service= "member_ transactor_modify",
			_dataInfo.version= _version(),
			_dataInfo.partnerId= _partnerId()

			for(var i in Base64Obj){
				FlaseShow(Base64Obj[i],i)
				//照片字符串
				_dataInfo.bizContent.transactorInfo[i] = Base64Obj[i]
			}

			$("#loading_div").show();
			$.ajax({
		   		url:_url()+"/transactorModify",
		   		type:"POST",
		   		async:true,
		   		contentType:'application/json',
		   		data:JSON.stringify(_dataInfo),
		   		success:function(result){
					$("#loading_div").hide();
		   			if(result.requestStatus=="SUCCESS"){
		   				window.location.href="bankaccount_opening_step3.html"
		   			}else{
						alert(result.returnMessage)
					}
				}
			});
		});

		function FlaseShow(parent,str){
			if(parent == ""){
				$("input[name='"+str+"']").siblings("i").text("请输入必选项");
				$("input[name='"+str+"']").siblings("i").show()
				return
            }
		}

		function RegValue(str,value){
			var Reg
			switch (str) {
				case 'operatorName':
					Reg = /^[\u4e00-\u9fa5]+$/gi;
					return Reg.test(value)
					break;
				case 'operatorCertId':
					Reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
					return Reg.test(value)
					break;
				case 'operatorEmail':
					Reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
					return Reg.test(value)
					break;
				case 'operatorPhone':
					Reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9])|(17[0,5-9])|(16[0,5-9]))\d{8}$/
					return Reg.test(value)
					break;
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

		function lrzFUNC(ele,str,data,quality){
			let type = data.type;
			lrz(data,{quality:quality})
			.then(function (rst) {
				rst.base64 = rst.base64.replace("data:image/jpeg;","data:"+type+";");
				Base64Obj[str] = rst.base64
				ele.attr("herf",rst.base64);
				ele.show();
				ele.siblings(".err-tipBox").hide()
			})
			.catch(function (err) {
				ele.siblings(".err-tipBox").show()
			})
			.always(function (err) {
			});
		}