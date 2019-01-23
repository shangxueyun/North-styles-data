

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

HTMLappendTable = (response,type,v1) =>{
    //渲染HTML
    if(!response)
        return false
    let HTML = "";
    if(type)
    {
        let data = response.page.records;
        HTML += "<tr><th>序号</th><th>公司名称</th><th>贷款合同编号</th><th>贷款申请日</th><th>贷款开始日期</th><th>贷款到期日</th><th>距离贷款到期日天数</th>";
        HTML += "<th>贷款期限</th><th>贷款期限单位</th><th>应还金额</th><th>已还金额</th><th>监管账户余额</th><th>发票池金额</th>";
        HTML += "<th>逾期罚息</th><th>逾期天数</th><th>状态</th><th>操作</th></tr>";
        var v1 = 0;
        data.forEach((v,i)=>{
            var status
            if(v.status=="AR")
            status = "待还款"
            else if(v.status=="RF")
            status = "已还款"
            else if(v.status=="RETL")
            status = "已逾期"
            v1 = v1+1
            HTML += "<tr>";
                HTML += "<td>"+v1+"</td>";
                HTML += "<td>"+v.companyName+"</td>";
                HTML += "<td>"+v.contractNo+"</td>";
                HTML += "<td>"+v.applyDate+"</td>";
                HTML += "<td>"+v.loanStartDate+"</td>";
                HTML += "<td>"+v.loanEndDate+"</td>";
                HTML += "<td>"+v.endDays+"</td>";
                HTML += "<td>"+v.loanTerm+"</td>";
                HTML += "<td>"+v.loanTermUnit+"</td>";
                HTML += "<td>"+v.shouldRePayAmount+"</td>";
                HTML += "<td>"+v.alreadyRepayAmount+"</td>";
                HTML += "<td>"+v.monitorAccountAmount+"</td>";
                HTML += "<td>"+v.invoicePoolAmount+"</td>";
                HTML += "<td>"+v.overdueRepayAmount+"</td>";
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
        HTML += "<tr><th>序号</th><th>客户名称</th><th>客户已有授信总额度</th><th>可用额度</th><th>已用额度</th><th>其中我方授信额度</th><th>我方授信批复时间</th>";
        HTML += "<th>其中我方已用额度</th><th>我方剩余额度</th><th>客户监管账户余额</th><th>客户发票池余额</th><th>操作</th></tr>";
        var v1 = 0;
        data.forEach((v,i)=>{
            //后续根据 客户已有授信总额度显示数据
            // if(Number(v.repayMode))
            // {
                v1 = v1+1
                HTML += "<tr>";
                    HTML += "<td>"+v1+"</td>";
                    HTML += "<td>"+v.companyName+"</td>";
                    HTML += "<td>"+v.repayMode+"</td>";
                    HTML += "<td>"+v.availableAmount+"</td>";
                    HTML += "<td>"+v.useAmount+"</td>";
                    HTML += "<td>"+v.creditAmount+"</td>";
                    HTML += "<td>"+v.firstCreditTime+"</td>";
                    HTML += "<td>"+v.useAmount+"</td>";
                    HTML += "<td>"+v.availableAmount+"</td>";
                    HTML += "<td>  </td>";
                    HTML += "<td>"+v.currentBalance+"</td>";
                    HTML += "<td><a class='Credit_adjustment' useAmount='"+v.useAmount+"' fundMemberId='"+v.memberId+"' Credit_adjustment='"+v.creditAmount+"' data_name='"+v.companyName+"' href='javascript:void(0);'>授信调整</a></td>";
                HTML += "</tr>";
            // }
        })
    }
    $(dataList_ELE).empty();
    $(dataList_ELE).append(HTML)

    return v1
}