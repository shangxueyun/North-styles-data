
$(function () {

		let Base64Obj = {};
		
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
//		2）上传
	   	$("#idCardPhotoFrontUrl").on("change",function(e){

			let NameObj = e.currentTarget.files[0];
			
			if(NameObj)
			{
				$(".idCardPhotoFront_img").text("");
				$(".idCardPhotoFront_img").text(NameObj.name);
				lrz(this.files[0],{width: 500})
				.then(function (rst) {
					Base64Obj['idCardPhotoFrontUrl'] = rst.base64
					$('.idCardPhotoFront_img').attr("data-img",rst.base64);
					$('.idCardPhotoFront_img').show();
					$('.idCardPhotoFront_i').hide();
				})
				.catch(function (err) {
					$('.idCardPhotoFront_i').show();
				})
				.always(function (err) {
				});
			}
			else
			{
				$('.idCardPhotoFront_i').show();
			}

		})
	
		$("#idCardPhotoBehindUrl").on("change",function(e){

			let reader=new FileReader(),NameObj = e.currentTarget.files[0];
			
			if(NameObj)
			{	

				$(".idCardPhotoBehind_img").text("");
				$(".idCardPhotoBehind_img").text(NameObj.name);
				lrz(this.files[0],{width: 500})
				.then(function (rst) {
					Base64Obj['idCardPhotoBehindUrl'] = rst.base64
					$('.idCardPhotoBehind_img').attr("data-img",rst.base64);
					$('.idCardPhotoBehind_img').show();
					$(this).siblings(".err-tipBox").hide()
				})
				.catch(function (err) {
					$(this).siblings(".err-tipBox").show()
				})
				.always(function (err) {
				});
			}
			else
			{
				$(this).siblings(".err-tipBox").show()
			}

		})
		
//	   	法人委托授权书影印：
	   	$("#arrestPhotoUrl").on("change",function(e){
			let NameObj = e.currentTarget.files[0];
			
			if(NameObj)
			{
				$(".arrestPhotoUrl_img").text("");
				$(".arrestPhotoUrl_img").text(NameObj.name);
				lrz(this.files[0],{width: 500})
				.then(function (rst) {
					Base64Obj['arrestPhotoUrl'] = rst.base64
					$('.arrestPhotoUrl_img').attr("data-img",rst.base64);
					$('.arrestPhotoUrl_img').show();
					$(this).siblings(".err-tipBox").hide()
				})
				.catch(function (err) {
					$(this).siblings(".err-tipBox").show()
				})
				.always(function (err) {
				});
			}
			else
			{
				$(this).siblings(".err-tipBox").hide()
			}
		})
		
//	   	企业授权书影印：
		$("#companyAuthorizationFilePath").on("change",function(e){
			let reader=new FileReader(),NameObj = e.currentTarget.files[0];
			
			if(NameObj)
			{
				$(".companyAuthorizationFilePath_img").text("");
				$(".companyAuthorizationFilePath_img").text(NameObj.name);
				lrz(this.files[0],{width: 500})
				.then(function (rst) {
					Base64Obj['companyAuthorizationFilePath'] = rst.base64
					$('.companyAuthorizationFilePath_img').attr("data-img",rst.base64);
					$('.companyAuthorizationFilePath_img').show();
					$(this).siblings(".err-tipBox").hide()
				})
				.catch(function (err) {
					$(this).siblings(".err-tipBox").show()
				})
				.always(function (err) {
				});
			}
			else
			{
				$(this).siblings(".err-tipBox").hide()
			}
		})

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
    });