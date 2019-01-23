// popbox
function PopBox()
{
	this.show = function(triggerID,boxID)
	{
		document.getElementById(triggerID).addEventListener("click",function()
		{
			document.getElementById(boxID).setAttribute("class",document.getElementById(boxID).getAttribute("class").replace("off","on"));
		},false);
	}
	this.hide = function(triggerID,boxID)
	{
		document.getElementById(triggerID).addEventListener("click",function()
		{
			document.getElementById(boxID).setAttribute("class",document.getElementById(boxID).getAttribute("class").replace("on","off"));
		},false);
	}
}