// popimg

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
				debugger
				//alert(img.height > document.getElementById(imgboxID).offsetHeight)
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
				$(".img_div").css({"height":height+"px","width":width+"px"});
				$(".img_div").css({"top":(window.innerHeight*0.5)-(height/2)+"px","left":(window.innerWidth*0.5)-(width/2)+"px"});
				$(document.getElementById(imgboxID)).find("div").append(img)
				$(document.getElementById(imgboxID)).find("div").append("<div class='close1' id='hideImg01'>1</div>");
				$(hideImg01).css({"top":$(img).offset().top+"px","left":$(img).offset().left+img.width-48+"px"})
				document.getElementById(closeTriggeID).addEventListener("click",hide,false);
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