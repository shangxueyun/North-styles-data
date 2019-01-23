//changing location of page
var linked = function(){
	var link_go = function(tag){
		$(this).click(function(){
			window.location.href = tag.attr("linked");
		})
	}
	
	$("*").each(function(i) {
		if( $(this).attr("linked") )
		{
			$(this).bind("click",function(){
				$(this).addClass("linked_on");
				link_go( $(this) )})
		}
	});
}

//set icon for list's item
var icon = function(){
	$("li p").each(function(index, element) {
		if( !$(this).attr("data") )
		{
			$(this).attr("data",$(this).find("span").html().slice(0,1));
		}
	});
}

//cut off the character that overflow
var cutOff = function(){
	if(window.innerWidth <= 320)
	{
		$("p span").each(function(index, element) {
			var con = $(this).text();
			if(con.length > 20)
			{
				var conBefore = con.slice(0,7);
				var conAfter = con.slice(-7,con.length);
				
				$(this).html(conBefore +"..."+ conAfter);
			}
		});
	}
}
