// JavaScript Document
// Loading
function Loading() 
{
	this.styleElement        = document.createElement("style");
	this.loadingBox          = document.createElement("div");
	this.circleBox           = document.createElement("em");
	this.icon                = document.createElement("i");
	this.background          = "rgba(0,0,0,.8)";//set background-color of loading
	this.size                = "1.5rem";//set circle size of loading
	this.borderWidth         = "1px";//set circle's border width of loading
	this.borderColorStator   = "rgba(0,0,0,.2)";//set stator color of loading
	this.borderColorRotator  = "#000";//set rotator color of loading
	var loadingBoxId        = "_loadingBox" + Math.floor(Math.random()*1000);
	var styleElementId      = "_loadingStyle" + Math.floor(Math.random()*1000);
	this.init = function(){
		this.loadingBox.setAttribute("id",loadingBoxId);
		this.styleElement.setAttribute("id",styleElementId);
		this.styleElement.type = "text/css";
		this.styleElement.innerHTML = 
		"div._loadingBox {position:fixed;width:100%;height:100%;z-index:9999;left:0;top:0;}"+
		"div._loadingBox_other {position:absolute;width:100%;height:100%;z-index:9999;left:0;top:0;} "+
		"em._circleBox {position:fixed;display:block;border-radius:100rem;margin:auto;left:0;right:0;top:0;bottom:0;} "+
		"em._circleBox_other {position:absolute;display:block;border-radius:100rem;margin:auto;left:0;right:0;top:0;bottom:0;}"+
		"i._icon {display:block;padding:0;margin:0;width:100%;height:100%;border-radius:10rem;position:absolute;-moz-animation:rotate .8s infinite linear;-webkit-animation:rotate .86s infinite linear;animation:rotate .8s infinite linear;}"+
		"@-moz-keyframes rotate{0%   "+
			"{-moz-transform:rotate(0deg);}100% {-moz-transform:rotate(-360deg);}}"+
		"@-webkit-keyframes rotate{0%   "+
			"{-webkit-transform:rotate(0deg);}100% {-webkit-transform:rotate(-360deg);}}"+
		"@keyframes rotate{0%   "+
			"{transform:rotate(0deg);}100% {transform:rotate(-360deg);}}";
	};
	this.insert = function(insertTarget){
		if(!document.getElementById(insertTarget)){return;}
		this.init();
		this.loadingBox.setAttribute("class","_loadingBox");
		this.loadingBox.style.background = this.background;
		this.circleBox.setAttribute("class","_circleBox");
		this.circleBox.style.cssText = "width:"+this.size+";height:"+this.size+";border:"+this.borderWidth+" solid "+this.borderColorStator+";";
		this.icon.setAttribute("class","_icon");
		this.icon.style.cssText = "border:"+this.borderWidth+" solid rgba(0,0,0,0);border-top:"+this.borderWidth+" solid "+this.borderColorRotator+";left:-"+this.borderWidth+";top:-"+this.borderWidth+";";
		document.body.appendChild(this.styleElement);
		this.circleBox.appendChild(this.icon);
		this.loadingBox.appendChild(this.circleBox);
		
		if(!insertTarget)
		{
			document.body.appendChild(this.loadingBox);
		}
		else
		{
			this.loadingBox.setAttribute("class","_loadingBox_other");
			this.loadingBox.style.background = this.background;
			this.circleBox.setAttribute("class","_circleBox_other");
			this.circleBox.style.cssText = "width:"+this.size+";height:"+this.size+";border:"+this.borderWidth+" solid "+this.borderColorStator+";";
			document.getElementById(insertTarget).appendChild(this.loadingBox);
		}
	};
	this.remove_loading = function(){
		document.getElementById(loadingBoxId).remove();
		document.getElementById(styleElementId).remove();
	}
}