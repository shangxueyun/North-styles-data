// popimg
let figS1 = 0,coordinateObj;
function ShowImage()
{
	this.init = function(shouImgName,closeTriggeID,popboxID,imgboxID)
	{
		var imgTag = document.getElementsByName(shouImgName);
		for(i=0;i<imgTag.length;i++)
		{
			imgTag.item(i).onclick = function()
			{
				show(this.getAttribute("data-img"))
			}
		}
		function show(imgUrl)
		{
			var img = new Image();
			img.src = imgUrl;
			img.onload = function()
			{
				//alert(img.height > document.getElementById(imgboxID).offsetHeight)
				let topoffset,leftoffset;
				if(img.width <= img.height || img.height > document.getElementById(imgboxID).offsetHeight)
				{
					img.style.cssText = "height:100%";
				}
				else if(img.width > img.height)
				{
					img.style.cssText = "width:100%";
				}
				document.getElementById(imgboxID).innerHTML = "";
				$(document.getElementById(imgboxID)).append("<div class='img_div'></div>");
				if(img.height>2000)
				{
					var height = img.height/3;
					var width = img.width/3;
				}else if(img.height>1000){
					var height = img.height/2;
					var width = img.width/2;
				}else if(img.height>500){
					var height = img.height/1.2;
					var width = img.width/1.2;
				}else{
					var height = img.height
					var width = img.width
				}
				//top距离不能大于顶部距离
				if((window.innerHeight*0.5)-(height/2)<0)
				$(".img_div").css({"top":"0px","left":(window.innerWidth*0.5)-(width/2)+"px"});
				else
				$(".img_div").css({"top":(window.innerHeight*0.5)-(height/2)+"px","left":(window.innerWidth*0.5)-(width/2)+"px"});
				if((window.innerWidth*0.5)-(width/2)<0)
				$(".img_div").css({"top":(window.innerHeight*0.5)-(height/2)+"px","left":"0px"});
				else
				$(".img_div").css({"top":(window.innerHeight*0.5)-(height/2)+"px","left":(window.innerWidth*0.5)-(width/2)+"px"});
				$(".img_div").css({"height":height+"px","width":width+"px"});
				$(document.getElementById(imgboxID)).find("div").append(img)
				$(document.getElementById(imgboxID)).find("div").append("<div class='close1' id='hideImg01'>1</div>");
				if($(img).offset().top<0){
					$(hideImg01).css({"top":"0px","left":$(img).offset().left+img.width-48+"px"});
					topoffset=0;leftoffset=$(img).offset().left+img.width-48;
				}
				else{
					$(hideImg01).css({"top":$(img).offset().top+"px","left":$(img).offset().left+img.width-48+"px"});
					topoffset=$(img).offset().top;leftoffset=$(img).offset().left+img.width-48;				
				}

				document.getElementById(closeTriggeID).addEventListener("click",hide,false);
				//原始位置收集
				coordinateObj = {
					Fheight:height,
					Fwidth:width,
					Ftop:(window.innerHeight*0.5)-(height/2),
					Fleft:(window.innerWidth*0.5)-(width/2),
					top:topoffset,
					left:leftoffset,
					imgHeight:img.height,
					imgWidth:img.width,
				}
				$(".img_div").click(fn=>{
					let width = fn.currentTarget.clientWidth,height = fn.currentTarget.clientHeight,clientWidth,clientHeight,w,h,CW,CH,mp;
					if(figS1%2==0)
					{
						
						//图片宽大于高
						mpW = (((window.screen.width/4)*3)/width)/1.2
						window.screen.height
						mpH = (((window.screen.height/4)*3)/height)/1.2
						if(width>height)
						{
							clientWidth = width*mpW;
							clientHeight = height*mpH;
							h = clientHeight-height
							w = clientWidth-width
							//放大图片容器宽度不能大过页面大小
							if(clientWidth>window.screen.width){
								CW = "100%";
								CH = clientHeight+"px";
							}else{
								CW = clientWidth+"px";
								CH = clientHeight+"px";
							}
						//图片高大于宽
						}else if(width<height){
							clientWidth = width*mpW;
							clientHeight = height*mpH;
							h = clientHeight-height
							w = clientWidth-width
							//放大图片容器高度不能大过页面大小
							if(clientHeight>window.screen.height){
								CW = clientWidth+"px";
								CH = "100%";
							}else{
								CW = clientWidth+"px";
								CH = clientHeight+"px";
							}
						}
						$(".img_div img").css({
							"height":clientHeight+"px",
							"width":clientWidth+"px",
						});
						//css
						$(".img_div").css({"height":CH,"width":CW,
							"cursor":"zoom-out",
						});
						//top距离不能大于顶部距离
						var leftS,topS;
						if(((window.innerHeight*0.5)-(height/2))-(h/2)<0)
						topS = 0
						else
						topS = ((window.innerHeight*0.5)-(height/2))-(h/2)
						if(((window.innerWidth*0.5)-(width/2))-(w/2)<0)
						leftS = 0
						else
						leftS = ((window.innerWidth*0.5)-(width/2))-(w/2)

						$(".img_div").css({"top":topS+"px","left":leftS+"px"});
						//关闭位置
						$("#hideImg01").css({"top":$(".img_div img").offset().top+"px","left":$(".img_div img").offset().left+img.width-48+"px"});
						
					}else{
						$(".img_div img").css({"height":coordinateObj.imgHeight+"px","width":coordinateObj.imgWidth+"px"});
						$(".img_div").css({
							"height":coordinateObj.Fheight+"px",
							"width":coordinateObj.Fwidth+"px",
							"top":coordinateObj.Ftop+"px",
							"left":coordinateObj.Fleft+"px",
							"cursor":"zoom-in",
						});
						$("#hideImg01").css({"top":coordinateObj.top+"px","left":coordinateObj.left+"px"});	
					}
					figS1++;
				});
			}
			
			document.getElementById(popboxID).setAttribute("class",document.getElementById(popboxID).getAttribute("class").replace("off","on"));
		}
		function hide()
		{
			document.getElementById(imgboxID).innerHTML = "<div class=\"loading\"></div>"
			document.getElementById(popboxID).setAttribute("class",document.getElementById(popboxID).getAttribute("class").replace("on","off"));;
		}
		
	}
}