import './jquery-3.3.1.min.js';

let serverUrl = 'https://www.china-mz.cn/'

export function AjaxResult(url, type,data, config){
    return new Promise((resolve, reject) => {
        $.ajax({
            url:serverUrl+url,
            type:type,
            timeout : 30000,
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
export default{
    AjaxResult(url, type,data, config){
        return AjaxResult(url, type,data, config);
    },
}