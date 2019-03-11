$(function(){
    //token失效跳回登录页
    if(window.sessionStorage.getItem("token")==null){
        window.location.href='index.html';
    }
    $("#SignOut").click(function(){
        let data = JSON.parse(sessionStorage.data)
        delete data.bizContent.queryContentList
        $("#loading_div").show();
        $.ajax({
               url:"https://www.china-mz.cn/memberLogout",
               type:"POST",
               async:true,
               contentType:'application/json',
               data:JSON.stringify(data),
               success:function(result){
                $("#loading_div").hide();
                   if(result.requestStatus=="SUCCESS"){
                        window.location.href="index.html";
                        window.sessionStorage.removeItem("token");
                   }else{
                        alert(result.returnMessage)
                    }
            }
        });
    })
})

function trim(e) {
    document.getElementsByTagName("input01").value = e.trim();
}

function _url(){
    var _urlIp = "https://www.china-mz.cn"
    return _urlIp
}

function _service(){
    var _service = "member_register"
    return _service
}

function _version(){
    var _version = "1.0"
    return _version
}

function _partnerId(){
    var _partnerId = "111111111111"
    return _partnerId
}

function _requestNo(){
    var _requestNo = "S"+formateDateAndTimeToString();
    return _requestNo
}

//获取当前时间
function formateDateAndTimeToString(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hours = date.getHours();
    var mins = date.getMinutes();
    var secs = date.getSeconds();
    if(month<10) month = "0"+month;
    if(day<10) day = "0"+day;
    if(hours<10) hours = "0"+hours;
    if(mins<10) mins = "0"+mins;
    if(secs<10) secs = "0"+secs;
    month = month.toString()
    hours = hours.toString()
    mins = mins.toString()
    secs = secs.toString()
    return year+month+day+hours+mins+secs;
}

function formatDate(now) {
    var str=now;
    var year=null;
    var month=null;
    var day=null;
    if(str!=''){
        year=str.substring(0,4);
        month=str.substring(5,7);
        day=str.substring(8,10);
    }
    if(str!=''){
        return year+month+day;
    }else {
        return '';
    }
}

function formatDateToString(date){
    var str=date;
    var year=null;
    var month=null;
    var day=null;
    if(str!=''){
        year=str.substring(0,4);
        month=str.substring(5,7);
        day=str.substring(8,6);
    }
    if(str!=''){
        return year+'-'+month+'-'+day;
    }else {
        return '';
    }
}
//分页
function getPageBar(curPage,pageSize,totalPage,total,pages){
    console.log(pages);
    $("#pagination_12").find('*').remove();
    //页码大于最大页数
    if(curPage>totalPage) curPage=totalPage;
    //页码小于1
    // if(curPage<1) curPage=1;
    pageStr='<div class="whj_jqueryPaginationCss-1" id="select">' +
        '<div class="whj_border whj_padding whj_bgc whj_hoverDisable" name="whj_previousPage">';
    if(totalPage>1){
        pageStr +='</span><span><a href="javascript:void(0)" rel="'+(totalPage-1)+'">&lt;</a></div>';
    }else {
        pageStr +='&lt;</div>';
    }
    if(totalPage==1||totalPage==undefined){
        pageStr += '<div class="whj_border whj_padding whj_bgc whj_checked" name="whj_page">1</div>';
    }else {
        for (var j = 1; j < totalPage+1; j++) {
            if(pages==j){
                pageStr += '<div class="whj_border whj_padding whj_bg" name="whj_page" data-page='+j+'>' +
                    '<a onclick="_bankList('+j+',10)" href="javascript:void(0)">'+j+'</a></div>';
            }else {
                pageStr += '<div class="whj_border whj_padding" name="whj_page" data-page='+j+'>' +
                    '<a onclick="_bankList('+j+',10)" href="javascript:void(0)">'+j+'</a></div>';
            }
        }
    }
    pageStr +='<div class="whj_border whj_padding whj_bgc whj_hoverDisable" name="whj_previousPage">';
    if(totalPage>1){
        pageStr +='</span><span><a href="javascript:void(0)" rel="'+(curPage+1)+'">&gt;</a></div>';
    }else {
        pageStr +='&gt;</div>';
    }
    pageStr +='<select class="whj_border whj_bgc whj_hover" onchange="whjPageSize()" id="whjPageSize"  name="whj_pageSize">';
    if(pageSize=='10'){
        pageStr +='<option value="10" selected>10条/页</option>' +
            '<option value="20" >20条/页</option>' +
            '<option value="50">50条/页</option>';
    }else if(pageSize<='20'){
        pageStr +='<option value="10" >10条/页</option>' +
            '<option value="20" selected>20条/页</option>' +
            '<option value="50">50条/页</option>';
    }else if(pageSize<='50'){
        pageStr +='<option value="10" >10条/页</option>' +
            '<option value="20" >20条/页</option>' +
            '<option value="50" selected>50条/页</option>';
    }
    pageStr +='<div class="whj_padding whj_color">跳转至</div>';
    if(totalPage>1){
        pageStr +='<input type="text"  class="whj_border whj_color" id="toPage" name="whj_toPage"><div>页</div>' +
            '<div class="whj_border whj_padding whj_bgc whj_hover confirmBtn"  name="whj_confirm">' +
            '<a onclick="confirmBtn()" href="javascript:void(0)">确认</a>';
    }else {
        pageStr +='<input type="text" readonly  class="whj_border whj_color" id="toPage" name="whj_toPage"><div>页</div>' +
            '<div class="whj_border whj_padding whj_bgc whj_hover confirmBtn"  name="whj_confirm">' +
            '<a onclick="confirmBtn()" href="javascript:void(0)">确认</a>';
    }
    pageStr +='</div></div></div>';
    $("#pagination_12").append(pageStr);
}

function FalseShow(str,showBox){
    $("input[name='" + str + "']").blur(function(){
		if($(this).val()){
			$(this).siblings("."+ showBox).hide()
		}else{
			$(this).siblings("."+ showBox).show()
		}
	})
}

function String_clear(str,data){
    if(str == "Object")
    {
        for(var i in data)
        {
            if(data[i]==null)
            data[i]= "-"
        }
        return data
    }else
    {
        data.forEach((v,i)=>{
            for(var i in v)
            {
                if(v[i]==null)
                v[i] = "-"
            }
        });
        return data
    }
}

sessionStorage.data = JSON.stringify
({
    "service": _service(),
    "version": _version(),
    "partnerId": _partnerId(),
    "bizContent":{
        "requestNo":_requestNo(),
        "requestTime":formateDateAndTimeToString(),
        "inputCharset":'utf-8',
        "signType":'RSA',
        "sign":'sign',
        "token":sessionStorage.getItem("token"),
        "queryContentList":[],

    }
});

let stringDispose = (str)=>{
    let strLe = str.length,newstr = "",fig = parseInt(strLe/3),g=3,arr = str.split("").reverse();
    if(str.indexOf(".")>=0)
    {
        arr = (str.substr(0,str.indexOf("."))).split("").reverse();
        var arr1 = (str.substr(str.indexOf("."),str.length)).split("").reverse()
        for(var s = 0;s<fig;s++)
        {
            arr.forEach((v,i)=>{
            if(i==g)
            {
                arr.splice(g,0," ")            
            }
            });
            g = g +4
        }
        arr = arr.reverse();
        var newarr1 = arr1.reverse();
        arr = arr.concat(newarr1)
    }else
    {
        for(var s = 0;s<fig;s++)
        {
            arr.forEach((v,i)=>{
            if(i==g)
            {
                arr.splice(g,0," ")            
            }
            });
            g = g +4   
        }
        arr = arr.reverse()
    }
    newstr = arr.toString().replace(/,/g,"").replace(/ /g,",")
    return newstr
  }