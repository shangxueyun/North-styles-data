
import './highlight.min.js';
import './jquery-3.3.1.min.js';
import './jquery.pagination.js';

let serverUrl = 'http://47.99.170.54:9020/rest/'  //业务代码
let serverUrlLogin = 'https://www.china-mz.cn/'//登录代码
let serverUrlBank = 'http://47.99.170.57:9012/member/'//银行代码
let serverUrlUpload = 'http://47.99.170.57:9008/ufs/'//上传代码

export function AjaxAPI(url, type,data, config){
    return new Promise((resolve, reject) => {
        $.ajax({
            url:serverUrl+url,
            type:type,
            timeout:5000,
            async:true,
            beforeSend: function(xhr) {
                xhr.withCredentials = true;
            },
            contentType:config,
            data:JSON.stringify(data),
            success:function(response){}
        }).then(function(response){
            resolve(response);
        }, err => {
            resolve(err);
        })
        .catch((error) => {
            reject(error)
        })
    })
}

export function AjaxLogin(url, type,data, config){
    return new Promise((resolve, reject) => {
        $.ajax({
            url:serverUrlLogin+url,
            type:type,
            timeout:5000,
            async:true,
            beforeSend: function(xhr) {
                xhr.withCredentials = true;
            },
            contentType:config,
            data:JSON.stringify(data),
            success:function(response){}
        }).then(function(response){
            resolve(response);
        }, err => {
            resolve(err);
        })
        .catch((error) => {
            reject(error)
        })
    })
}

export function AjaxBank(url, type,data, config){
    return new Promise((resolve, reject) => {
        $.ajax({
            url:serverUrlBank+url,
            type:type,
            timeout:5000,
            async:true,
            beforeSend: function(xhr) {
                xhr.withCredentials = true;
            },
            contentType:config,
            data:JSON.stringify(data),
            success:function(response){}
        }).then(function(response){
            resolve(response);
        }, err => {
            resolve(err);
        })
        .catch((error) => {
            reject(error)
        })
    })
}

export function AjaxUpload(url, type,data, config){
    return new Promise((resolve, reject) => {
        $.ajax({
            url:serverUrlUpload+url,
            type:type,
            timeout:5000,
            async:true,
            contentType:config,
            data:data,
            cache: false,
            processData: false,
            contentType: false,
            success:function(response){}
        }).then(function(response){
            resolve(response);
        }, err => {
            resolve(err);
        })
        .catch((error) => {
            reject(error)
        })
    })
}

export function PageFUNCEvent(ele,str,pageS,numpage,fnC){

    $(ele).click(fn=>{
        if(str == "prev" || str == "next"){
            var disabledS = JSON.stringify(fn.currentTarget.attributes.disabled);
            if(disabledS)
            return false
            else
            {
                if(str == "prev")
                {
                    let page = pageS-1;
                    if(page == 0)
                    {
                        alert('当前已经是第一页了')
                        return false
                    }
                    fnC(page)
                }else
                {
                    let page = pageS+1;
                    if(page>numpage)
                    {
                        return false
                    }
                    fnC(page)
                }
            }
        }
        else if(str == "skip")
        {
            let page = inputVlaue.value;
            if(page == "")
                page = 1
            else if(page>numpage){
                alert('页数输入错误！')
                return false
            }
            fnC(page)
        }
        else if(str == "page_ELE_CHILD")
        {
            let page = fn.currentTarget.text;
            fnC(page)
        }
    })
}

export function stringDispose(str){
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

export function customer_informationF(url,id,type){
    let typeS,data;
    $(loading_div).show();
    if(type == "png")
    typeS = "image/"
    else
    typeS = "application/"
    var xhr = new XMLHttpRequest();    
    xhr.open("get", url+id+'.'+type, true);
    xhr.responseType = "blob";
    xhr.onload = function() {
        if (this.status == 200) {
            var blob=new Blob([this.response],{type:typeS+type}); 
            const url = window.URL || window.webkitURL || window.moxURL
            const downloadHref = url.createObjectURL(blob)
            let downloadLink = document.createElement('a')
            downloadLink.href = downloadHref
            downloadLink.download = id+'.'+type;
            // 触发点击事件执行下载
            $(loading_div).hide()
            reader.onload = function (e) {
               data = e.currentTarget.result.replace(/[\r\n]/g,"");
               window.localStorage.setItem("iframe",data);
               window.location.href = "iframeFile.html"
            }
            reader.readAsDataURL(blob);
        }
    };
    xhr.send();
}

export default{
    AjaxAPI,
    AjaxLogin,
    AjaxBank,
    AjaxUpload,
    PageFUNCEvent,
    stringDispose,
    customer_informationF
}