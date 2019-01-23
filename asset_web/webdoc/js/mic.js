// JavaScript Document
var menubtn = function(){
	$("#menubtn").click(function(){
		$(".menu").hide();
		
		$(".menubg").height($(document).height());
		$(".menubg").width($(document).width());
		$(".menubg").fadeIn(128,function(){
			$(".function_R").delay(16).animate({"right":"0","height":$(document).height()},256,"easeOutExpo");
			$("body").bind("touchmove", function (event) {
				event.preventDefault();
			}, false);
		});
		$(".menubg").click(function(){
			$(".function_R").animate({"right":"-100%"},128,"easeOutExpo",function(){
				$(".menubg").delay(16).fadeOut(192);
				$(".menu").show();
				$("body").unbind("touchmove");
			});
			
		})
	})
}

var imgWidth = function(tag){
	$(tag).each(function(index, element) {
		var h = $(this).height(),w = $(this).width(),_w = $(this).parent().width();
		
		if( w/h >= 0.9 ){
			$(this).attr("height","100%");
			$(this).css("height","100%");	
			
			w = $(this).width();
			if( w > _w ){			
				$(this).css("margin-left",(_w-w)/2);
				$(this).attr("parentWidth",_w);		
				$(this).attr("imgWidth",w);			
			}		
		}
		else if( w/h < 1 ){
			$(this).attr("width","100%");
			$(this).css("width","100%");
		}
	});
}

var imgScale = function(tag){
	var w = $(tag).eq(0).width();
	var h = parseInt(w*3/4);
	$(tag).height(h);
}

var imgScale_1609 = function(tag){//video list scale
	var w = $(tag).eq(0).width();
	var h = parseInt(w*9/16);
	$(tag).height(h);
}

var imgScale_videoDetail = function(tag){//video list scale
	var w = $(tag).eq(0).width();
	var h = parseInt(w*0.625);
	$(tag).height(h);
}

var backtolist = function(href){//newsdetail,videodetail
	var browser = window.navigator.userAgent.toLowerCase().indexOf("firefox");
	var scrolltop = function(){
		if(document.body.scrollTop <=512){
			$("#backtolist").css("left","-100%");
		}
		else{
			$("#backtolist").css("left",0);
		}
	}
	if(browser != -1)
	{
		document.addEventListener("DOMMouseScroll", function(){
			if(document.documentElement.scrollTop <=512){
				$("#backtolist").css("left","-100%");
			}
			else{
				$("#backtolist").css("left",0);
			}
		})
	}
	else{
		window.onscroll = function(){
			scrolltop();
		}
	}
}

var imgDetail = function(tag){
	var n,total = $(tag).find("li").size();
	$(tag).find("li").click(function(){
		
		n = $(tag).find("li").index($(this));
		var src = $(this).find("img").attr("src");
		var txt = $(this).find("span").text();
		var con = "<img src=\""+src+"\" /><p class=\"p01\" style=\"text-align:center;\">"+txt+"</p>";
		$("#popbox .conbox").html(con);
		$("#popbox").fadeIn(128);
		
	})
	
	$("#popbox .prev").click(function(){
		if( (n-1) < 0){
			n = total;
		}
		var src = $(tag).find("li").eq(n-1).find("img").attr("src");
		var txt = $(tag).find("li").eq(n-1).find("span").text();
		var con = "<img src=\""+src+"\" /><p class=\"p01\" style=\"text-align:center;\">"+txt+"</p>";
		$("#popbox .conbox").html(con);
		n--;
	});
	
	$("#popbox .next").click(function(){
		if( n == (total-1)){
			n = -1;
		}
		var src = $(tag).find("li").eq(n+1).find("img").attr("src");
		var txt = $(tag).find("li").eq(n+1).find("span").text();
		var con = "<img src=\""+src+"\" /><p class=\"p01\" style=\"text-align:center;\">"+txt+"</p>";
		$("#popbox .conbox").html(con);
		n++;
	});
	
	$("#popbox .close").click(function(){
		$("#popbox ").fadeOut(128);
	});
	
}
