
import './jquery-3.3.1.min.js';

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

export default{
    AjaxAPI,
    AjaxLogin,
    AjaxBank,
    AjaxUpload,
    PageFUNCEvent
}