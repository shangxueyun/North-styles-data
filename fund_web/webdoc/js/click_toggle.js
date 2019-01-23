function ClickToggle(id)
{
	var that = this;
	this.attachFn = function()
	{
		var tag = document.getElementById(id);
		tag.onclick = function()
		{
			if(tag.className == "icon_filter_up"){tag.className = "icon_filter_down"}
			else if(tag.className == "icon_filter_down"){tag.className = "icon_filter_up"}
		}
	}
}