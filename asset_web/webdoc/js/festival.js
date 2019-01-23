function Festival(_date,_classname,_birthdayPerson)
{
	function isIE()
	{
		if(!!window.ActiveXObject || "ActiveXObject" in window){return true;}
		else{return false;}
	}
	var browser = isIE();
	var myDate = new Date();
		myDate.date = String((myDate.getMonth()+1)) + String(myDate.getDate());
	var festivalDate = _date.split(",");
	
	
	if(festivalDate.length > 0)
	{
		for(i=0;i<festivalDate.length;i++)
		{
			if(myDate.date == festivalDate[i])
			{
				
				window.onload = function()
				{
					if(browser){
						var classname_ = window.document.body.className;
						window.document.body.className = classname_ +" "+ _classname;
						if(_birthdayPerson){
							var em = document.createElement("em");
								
							if(_birthdayPerson.indexOf("name:"))
							{
								em.innerHTML = _birthdayPerson.replace(/name:/,"");
								document.getElementById("head").getElementsByTagName("h1").item(0).appendChild(em);
							}
							else if(_birthdayPerson.indexOf("img:"))
							{
								var img = document.createElement("img");
								img.src = _birthdayPerson.replace(/img:/,"");
								em.appendChild(img);document.getElementById("head").getElementsByTagName("h1").item(0).appendChild(em);
								
							}
						}
						if(!_birthdayPerson){
							document.getElementById("head").getElementsByTagName("h1").item(0).birthdayPerson = " ";
						}
					}
					else{
						var classname_ = window.document.body.getAttribute("class");
						window.document.body.setAttribute("class",classname_ +" "+ _classname);
						if(_birthdayPerson){
							var em = document.createElement("em");
								
							if(_birthdayPerson.indexOf("name:") >= 0)
							{
								em.innerHTML = _birthdayPerson.replace(/name:/,"");
								document.getElementById("head").getElementsByTagName("h1").item(0).appendChild(em);
							}
							else if(_birthdayPerson.indexOf("img:") >= 0)
							{
								var img = document.createElement("img");
								img.src = _birthdayPerson.replace(/img:/,"");
								em.appendChild(img);document.getElementById("head").getElementsByTagName("h1").item(0).appendChild(em);
								
							}
						}
						if(!_birthdayPerson){
							document.getElementById("head").getElementsByTagName("h1").item(0).setAttribute("birthday-person"," ");
						}
					}
				}
			}
		}
	}
	else
	{
		if(myDate.date == festivalDate)
		{
			window.onload = function()
			{
				if(browser){window.document.body.className = _classname;}
				else{window.document.body.setAttribute("class",_classname);}
			}
		}
	}
}

Festival("125","birthday","name:GG");//1-25 GG birthday
Festival("51","Labor_Day","Labor Day");//5-1 labor day
Festival("75","birthday","name:me");//7-5 my birthday
Festival("61","birthday","name:ZY");//6-1 octopus' birthday
Festival("820","birthday","name:XP");//8-20 XP's birthday
Festival("1031,111","Halloween");//10-31 ww's birthday && Halloween eve
Festival("1111","birthday","name:17");//11-11 17 birthday
Festival("1115","birthday","name:Xian");//11-15 zhengxian birthday
Festival("1212","birthday","name:Punk");//12-12 xiechen birthday
Festival("1224,1225","Christmas");//Merry Christmas
Festival("1228,1229,1230,1231,11","HappyNewYear");//HappyNewYear
Festival("214","ValentinesDay");//ValentinesDay
Festival("21","birthday","name:Dy");//2-1 Dy birthday
Festival("227","birthday","name:Qing");//2-27 XieQing birthday
