// pages/loan/loan.js
import { ajax, showModal } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnClass:"button_gray",
    btnHoverClass:"button_gray_hover",
    btnBind:"",
    poperHide: true,
    poperHeadtext:'',
    lengthOfTime:[],
    index:0,
    canAmount: '',
    loanRate: '',
    modeDesc: '',
    applyAmount: '',
    applyShow: '0(元)',
    isShow: true

  },
  focus:function () {
    this.setData({
      isShow: false,
      applyShow: "",
    });

  },
  blur: function (e) {
    let content = e.detail.value;
    if(content==""||content=="0(元)")
    {
      this.showPoper("输入金额不能为空");
      this.setData({
        isShow: true,
        applyShow: "0(元)",
      });
    }else{
      let reg = /^[0-9]*$/;
      if(reg.test(content))
      {
        let newvalue = content.replace(/[^0-9]/ig,"");
        if(newvalue == "0")
        {
          this.showPoper("输入金额不能为0");
          this.setData({
            isShow: true,
            applyShow: "0(元)",
          });
        }else{
          if(Number(this.data.canAmount)- Number(newvalue)>=0){
            if(newvalue.length>4)
            newvalue = this.stringDispose(newvalue)
            this.setData({
              isShow: true,
              applyAmount: "￥"+newvalue,
              applyShow: newvalue,
            });  
          }else
          this.showPoper("输入金额不能大于剩余可用额度");
        }
      }
      else
      this.showPoper("输入金额不能为小数或者其他字符");
    }
    var that = this;
    if (content && content !== '0' && content !== '00') {
      // 不为空
      that.setData
        ({
          btnClass: "button_dark",
          btnHoverClass: "button_dark_hover",
          btnBind: "to_ConfirmInfo"
        })
    }
    else{
      // 为空
      that.setData
        ({
          btnClass: "button_gray",
          btnHoverClass: "button_gray_hover",
          btnBind: ""
        })
    }
  },
  //贷款期限
  bindPickerChange: function (e) {
    let index = e.detail.value;
    this.setData({
      index: index,
      loanRate: this.data.lengthOfTime[index].loanRate,
      modeDesc: this.data.lengthOfTime[index].repayMode.modeDesc
    })
  },
  //申请贷款输入框onChang
  
  //跳转到：信息确认
  to_ConfirmInfo:function()
  {
    let serverAmount = this.data.lengthOfTime[this.data.index].feeConfigList[0];
    wx.navigateTo({
      url: 'confirm_info?productCode=' + this.data.lengthOfTime[this.data.index].productCode + '&applyAmount=' + this.data.applyAmount + '&num=' + this.data.lengthOfTime[this.data.index].loanTerm + '&unit=' + this.data.lengthOfTime[this.data.index].loanTermUnitDescription + '&loanRate=' + this.data.loanRate + '&serverMount=' + (serverAmount.feeRules === 'FINAL' ? serverAmount.ruleValue : serverAmount.feeRules === 'RATIO' ? parseFloat(this.data.applyShow.replace(/,/g, '')).toFixed(2) * serverAmount.ruleValue : 0 )
      //url: '../mine/loan_accept'
    });
    this.setData({
      isShow: true,
      applyShow: "0(元)",
      applyAmount: "0",
    });
  },
  outputdollars:function(number) {
    if (!number) return '0';
    let numArrRes = number.replace(/,/g, '');
    if (parseInt(numArrRes) > parseInt(this.data.canAmount)) {
      numArrRes = this.data.canAmount.toString()
    }
    numArrRes = numArrRes.split('')
    let flag = true;
    let resArr = [];
    let numArr = [];
    for (var i = 0; i < numArrRes.length; i++) {
      if (numArrRes[i] !== '0' || !flag) {
        numArr.push(numArrRes[i])
        flag = false
      }
    }

      for (var i = 1; i < numArr.length + 1; i++) {
       if(i%3 === 1) {
         resArr.push(',')
       }
        resArr.push(numArr[numArr.length-i])
      }
    let res = resArr.reverse().join('').substring(0, resArr.length - 1)
    return res
  },
  //关闭弹窗
  closePoper: function () {
    this.setData({
      poperHide: true,
    })

  },
  //打开弹窗
  showPoper: function (text) {
    this.setData({
      poperHide: false,
      poperHeadtext:text,
      applyShow:"0(元)",
    })
  },
  stringDispose:function(str){
    let strLe = str.length,newstr = "",fig = parseInt(strLe/3),g=3,arr = str.split("");
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
    newstr = arr.toString().replace(/,/g,"").replace(/ /g,",")
    return newstr
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */

  onShow: function () {
    ajax('productQueryAll', {
    }).then(data => {
      this.setData({
        lengthOfTime: [{showText:''}],
        index: 0,
      });
      this.setData({
        lengthOfTime: data.map(it => {
          it.showText = it.loanTerm + it.loanTermUnitDescription;
          return it
        })
      });
      this.setData({
        loanRate:(data[0].loanRate).toString(),
        modeDesc:data[0].repayMode.modeDesc
      })
    })

    ajax('memberInfoQuery', {
    }).then(data => {
      let canAmount = data.creditAccountInfo.creditAmount - data.creditAccountInfo.useAmount;
      this.setData({
        canAmount: canAmount
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})