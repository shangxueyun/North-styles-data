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
				document.getElementById(imgboxID).appendChild(img);
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