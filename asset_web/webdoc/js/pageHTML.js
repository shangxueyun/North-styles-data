let PageFUNCEvent = (ele,str,pageS,numpage,fnC)=>{
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

let HTMLappendPage = (response,pageS,numpage,PageFUNC) =>{
    if(!response)
    return false
    let PageHTML = '',PageData = response.total,actions = response.pageNum;pageS=actions;numpage = response.pages;
    PageHTML += "<ul>";
        if((PageData - 10)<0)
        {
            PageHTML += "<li><a class='prev' disabled='disabled' href='javascript:void(0);' id='prev'>上一页</a></li>";
            PageHTML += "<li><i class='on'>1</i></li>";
            PageHTML += "<li><a  disabled='disabled' class='next' id='next' href='javascript:void(0);'>下一页</a></li>";				
        }
        else
        {
            PageHTML += "<li><a class='prev' href='javascript:void(0);' id='prev'>上一页</a></li>";
            for(var i = 1;i<=numpage;i++)
            {
                if(i==actions)
                PageHTML += "<li><i class='on'>"+i+"</i></li>";
                else
                PageHTML += "<li><a class='page_ELE_CHILD' href='javascript:void(0);'>"+i+"</a></li>";
            }
            PageHTML += "<li><a class='next' id='next' href='javascript:void(0);'>下一页</a></li>";						
        }
        PageHTML += "<li>  共" + numpage + "页   到 <input type='text' id='inputVlaue'/> 页</li>";			
        PageHTML += "<li><a id='skip' href='javascript:void(0);'>确定</a></li>";			
        PageHTML += "<li class='page_text'></li>";			
    PageHTML += "</ul>";
    $(page_ELE).empty();
    $(page_ELE).append(PageHTML)
    //事件
    PageFUNCEvent($("#prev"),'prev',pageS,numpage,PageFUNC);
    PageFUNCEvent($("#next"),'next',pageS,numpage,PageFUNC);
    PageFUNCEvent($("#skip"),'skip',pageS,numpage,PageFUNC);
    PageFUNCEvent($(".page_ELE_CHILD"),'page_ELE_CHILD',pageS,numpage,PageFUNC);
}
