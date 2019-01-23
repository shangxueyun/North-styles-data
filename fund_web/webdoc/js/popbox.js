function popbox(box_id,open_id)
{
	this.BoxID = box_id;
	this.TriggerID = open_id ? open_id : 0;
	var Close = document.getElementById(this.BoxID).getElementsByTagName("s").item(0);
	var that = this,
		Width = window.innerWidth,
		Height = window.innerHeight,
		width = document.getElementById(this.BoxID).getElementsByTagName("section").item(0).offsetWidth,
		height = document.getElementById(this.BoxID).getElementsByTagName("section").item(0).offsetHeight;
	this.CloseBox = function()
	{
		document.getElementById(that.BoxID).className = "popBox off";
	}
	this.ShowBox = function()
	{
		document.getElementById(that.BoxID).className = "popBox on";
	}
	if(this.TriggerID == 0)
	{
		that.ShowBox();
	}
	else
	{
		document.getElementById(this.TriggerID).onclick = function()
		{
			document.getElementById(that.BoxID).className = "popBox on"
		}
	}
	
	document.getElementById(this.BoxID).getElementsByTagName("section").item(0).style.cssText = "margin-top:"+(Height-height)/2+"px";
	
	Close.onclick = function()
	{
		that.CloseBox();
	}
}