function SetTime(id)
{
	function interval()
	{
		var myDate = new Date(),
			result  = "",
			year    = myDate.getFullYear(),
			month   = myDate.getMonth()+1,
			date    = myDate.getDate(),
			hours   = myDate.getHours(),
			minutes = myDate.getMinutes(),
			seconds = myDate.getSeconds();
		
		if(month < 10)
		{
			month = "0" + month;
		}
		if(date < 10)
		{
			date = "0" + date;
		}
		if(hours < 10)
		{
			hours = "0" + hours;
		}
		if(minutes < 10)
		{
			minutes = "0" + minutes;
		}
		if(seconds < 10)
		{
			seconds = "0" + seconds;
		}
		result = year+"-"+month+"-"+date+"&nbsp;"+hours+":"+minutes+":"+seconds
		document.getElementById(id).innerHTML = result;
	}
	setInterval(interval,1000)
}