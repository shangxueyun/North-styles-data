

HTMLappendPage = (response,AJAX,pageS,numpage,PageFUNC) =>{
    if(!response)
    return false
    let PageHTML = '',PageData = response.page.total,actions = response.page.current;pageS=actions;numpage = response.page.pages;
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
        PageHTML += "<li>  共" + response.page.pages + "页   到 <input type='text' id='inputVlaue'/> 页</li>";			
        PageHTML += "<li><a id='skip' href='javascript:void(0);'>确定</a></li>";			
        PageHTML += "<li class='page_text'></li>";			
    PageHTML += "</ul>";
    $(page_ELE).empty();
    $(page_ELE).append(PageHTML)
    //事件
    AJAX.PageFUNCEvent($("#prev"),'prev',pageS,numpage,PageFUNC);
    AJAX.PageFUNCEvent($("#next"),'next',pageS,numpage,PageFUNC);
    AJAX.PageFUNCEvent($("#skip"),'skip',pageS,numpage,PageFUNC);
    AJAX.PageFUNCEvent($(".page_ELE_CHILD"),'page_ELE_CHILD',pageS,numpage,PageFUNC);
}

HTMLappendTable = (response,AJAX,type) =>{
    //渲染HTML
    if(!response)
        return false
    let HTML = "";
    if(type)
    {
        let data = response.page.records;
        HTML += "<tr><th><a class='checkbox_'><input id='checkbox_F' type='checkbox' /></a></th><th>公司名称</th><th>贷款合同编号</th><th>贷款申请日</th><th>贷款开始日期</th><th>贷款金额(元)</th><th>贷款期限</th><th>当期应还款日期</th>";
        HTML += "<th>当期应还本金(元)</th><th>当期应还利息(元)</th><th>已还本息(元)</th><th>监管账户余额(元)</th><th>发票池余额(元)</th>";
        HTML += "<th>逾期罚息(元)</th><th>逾期天数</th><th>状态</th><th>操作</th></tr>";
        data.forEach((v,i)=>{
            var status
            if(v.status=="AR")
            status = "待还款"
            else if(v.status=="RF")
            status = "已还款"
            else if(v.status=="AC")
            status = "待对账"
            else if(v.status=="RP")
            status = "已还部分"
            else if(v.status=="RD")
            status = "已展期"
            else if(v.status=="RETL")
            status = "已逾期"
            var time
            if(v.loanTermUnit == "M")
            time = "月"
            else if(v.loanTermUnit == "Y")
            time = "年"
            HTML += "<tr class='checkbox_flg'>";
                HTML += "<td><a class='checkbox_'><input type='checkbox' /></a></td>";
                HTML += "<td>"+v.companyName+"</td>";
                HTML += "<td>"+v.contractNo+"</td>";
                HTML += "<td>"+v.applyDate+"</td>";
                HTML += "<td>"+v.loanStartDate+"</td>";
                HTML += "<td>"+AJAX.stringDispose(v.loanAmount.toString())+"</td>";
                HTML += "<td>"+v.loanTerm+time+"</td>";
                HTML += "<td>"+v.loanEndDate+"</td>";
                HTML += "<td>"+AJAX.stringDispose(v.principalAmount.toString())+"</td>";
                HTML += "<td>"+AJAX.stringDispose(v.interestAmount.toString()) +"</td>";
                HTML += "<td>"+AJAX.stringDispose(v.alreadyRepayAmount.toString())+"</td>";
                HTML += "<td>"+AJAX.stringDispose(v.monitorAccountAmount.toString())+"</td>";
                HTML += "<td>"+AJAX.stringDispose(v.invoicePoolAmount.toString())+"</td>";
                HTML += "<td>"+AJAX.stringDispose(v.overdueRepayAmount.toString())+"</td>";
                HTML += "<td>"+v.delayDays+"</td>";
                HTML += "<td>"+status+"</td>";
                if(v.status == 'RETL')
                HTML += "<td><a class='clear_curtain' href='javascript:void(0);'>清账</a></td>";
                else
                HTML += "<td> </td>";
            HTML += "</tr>";
        })
    }
    else
    {
        let data = response.page.records;
        HTML += "<tr><th><a class='checkbox_'><input id='checkbox_F' type='checkbox' /></a></th><th>客户名称</th><th>客户已有授信总额度(元)</th><th>可用额度(元)</th><th>已用额度(元)</th><th>其中我方授信额度(元)</th><th>我方授信批复时间</th>";
        HTML += "<th>其中我方已用额度(元)</th><th>我方剩余额度(元)</th><th>客户监管账户余额(元)</th><th>客户发票池余额(元)</th><th>操作</th></tr>";
        data.forEach((v,i)=>{
            //后续根据 客户已有授信总额度显示数据
            // if(Number(v.repayMode))
            // {
                HTML += "<tr class='checkbox_flg'>";
                    HTML += "<td><a class='checkbox_'><input data_memberId='"+v.memberId+"' type='checkbox' class='checkbox_Cheng'/></a></td>";
                    HTML += "<td>"+v.companyName+"</td>";
                    HTML += "<td>"+AJAX.stringDispose(v.repayMode.toString())+"</td>";
                    HTML += "<td>"+AJAX.stringDispose(v.availableAmount.toString())+"</td>";
                    HTML += "<td>"+AJAX.stringDispose(v.useAmount.toString())+"</td>";
                    HTML += "<td>"+AJAX.stringDispose(v.creditAmount.toString())+"</td>";
                    HTML += "<td>"+v.gmtModified+"</td>";
                    HTML += "<td>"+AJAX.stringDispose(v.useAmount.toString())+"</td>";
                    HTML += "<td>"+AJAX.stringDispose(v.availableAmount.toString())+"</td>";
                    HTML += "<td>  </td>";
                    HTML += "<td>"+AJAX.stringDispose(v.currentBalance.toString())+"</td>";
                    HTML += "<td><a class='Credit_adjustment' useAmount='"+v.useAmount+"' fundMemberId='"+v.memberId+"' Credit_adjustment='"+v.creditAmount+"' data_name='"+v.companyName+"' href='javascript:void(0);'>授信调整</a></td>";
                HTML += "</tr>";
            // }
        })
    }
    $(dataList_ELE).empty();
    $(dataList_ELE).append(HTML)
}

function checkbox_Func(){
    $(".checkbox_flg").bind("click",fn=>{
        if($(fn.currentTarget).find("input").get(0).checked == true)
        {
            $(fn.currentTarget).find("input").get(0).checked = false;
            $(fn.currentTarget.children).css("background","");
        }
        else
        {
            $(fn.currentTarget).find("input").get(0).checked = true;
            $(fn.currentTarget.children).css("background","#f2f2f2");
        }
    })
    $("input[type='checkbox']").click(function(e){
        e.stopPropagation(); 
    });
    $(checkbox_F).bind("change",fn=>{
        if(fn.currentTarget.checked == false)
        {
            let childElE = $(".checkbox_ input").not(".checkbox_ #checkbox_F");
            for(var i in childElE){if(Number(i)>=0){
                childElE[i].checked = false
            }}
        }else
        {
            let childElE = $(".checkbox_ input").not(".checkbox_ #checkbox_F");
            for(var i in childElE){if(Number(i)>=0){
                childElE[i].checked = true
            }}
        }
    });
}

function responsepageHTML(response,PageFUNC,Page,numpageData){
    let count;
    if(response.page.records == 0)
    response.page.pages = 0;
    if(response.page.pages>5)
    count = 2;
    else
    count = response.page.pages+1;
    $(".pageHTMLtotal").remove();
    $('.pageHTML').pagination({
        pageCount: response.page.pages,
        current:Page,
        jump:true,
        count:count,
        coping: true,
        callback: function (api) {
            PageFUNC(api.getCurrent())
        }
    });
    $('.pageHTML').append("<span style='white-space:pre;' class='pageHTMLtotal'>共" + response.page.pages +"页  共"+numpageData+"条记录</span>")   
}	