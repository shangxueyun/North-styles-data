//test
function getContent(tagid,contenturl,noimg)
{
	var date=new Date();
	var year=date.getFullYear(); //获取当前年份
	var mon=date.getMonth()+1; //获取当前月份
	var da=date.getDate(); //获取当前日
	var day=date.getDay(); //获取当前星期几
	var h=date.getHours(); //获取小时
	var m=date.getMinutes(); //获取分钟
	var s=date.getSeconds(); //获取秒
	var self = this
	this.tagId = tagid;
	this.url = contenturl+"?"+year+mon+da+h+m+s;
	this.section = "";
	this.content = "";
	this.count = 0;
	this.noImg = new Image();
	this.noImg.src = noimg;
	this.imgArray = new Array();
	this.callback = function(){};
	this.start = function()
	{
		$.ajax({
			url: this.url,
			success: function(res)
			{
				self.init(res);
			}
		});
	}
	
	this.init = function(a)
	{
		this.section = a.split("&&&");
		console.log(this.section.length);
		
		for(i=0; i<this.section.length; i++) 
		{ 
		
			this.imgArray[i] = new Image();
			this.imgArray[i].onload = function()
			{
				self.count++;
				console.log("ok:"+self.count)
				if(self.count >= self.section.length){
					self.fill();
				}
			} 
			this.imgArray[i].onerror = function(){
				self.error(this);
			};
			this.imgArray[i].src = this.section[i].split("&&")[0];
						
		}	
		console.log("count:"+self.count)
	};
	
	this.error = function(a){
		//alert(a);
		console.log("no:"+this.count)
		a.src = this.noImg.src;
		a.width = "100%";
		a.onerror = null;
		
		this.count++;
		if(this.count >= this.section.length){
			this.fill();
		}
	};
	
	this.fill = function()
	{
		console.log(self.url);
		for(i=0;i<this.section.length;i++)
		{
			this.content += "<li><p><a target=\""+this.section[i].split("&&")[3]+"\" href=\""+this.section[i].split("&&")[2]+"\"><b><img src=\""+this.imgArray[i].src+"\" /></b><i>"+this.section[i].split("&&")[1]+"</i></a></p></li>";
			
			$("#"+this.tagId).html(this.content);
		}
		this.callback();
	};
}