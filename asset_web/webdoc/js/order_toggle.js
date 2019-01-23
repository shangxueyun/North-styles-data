// JavaScript Document
function order_Toggle()
{
	_self = this;
	_self.ClassA = "order_up";
	_self.ClassB = "order_down";
	this.toggle = function(id)
	{
		document.getElementById(id).addEventListener("click",function()
		{
			if(this.getAttribute("class") == _self.ClassA)
			{
				this.setAttribute("class",_self.ClassB);
			}
			else if(this.getAttribute("class") == _self.ClassB)
			{
				this.setAttribute("class",_self.ClassA);
			}
		},false);
	}
}