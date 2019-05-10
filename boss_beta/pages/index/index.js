//index.js
import { ajax, showModal,stringDispose } from '../../utils/util.js'
Page({
  data: {
    poperHide: true,
    creditAmount: 0,
    useAmount: 0,
    canAmount: 0,
    accountBalance: 0,
    freezeBalance: 0,
    withdrewBalance: 0,
    currentBalance: 0,
    cancelAmount: 0,
    addAmount: 0,

    btnClass:""
  },
  //关闭弹窗
  closePoper: function () {
    this.setData({
      poperHide: true
    })
  },
  //打开弹窗
  showPoper: function () {
    this.setData({
      poperHide: false
    })
  },
  //跳转至：待付款贷款
  to_NeedToPay: function() {
    wx.navigateTo({
      url: '/pages/mine/loan_needtopay'
    })
  },  
  setInfo: function () {
    ajax('memberInfoQuery', {
    }).then(data => {
      let res = {};
      if(Number(data.creditAccountInfo.creditAmount)==0)
      {
        this.setData({
          btnClass:"btnClass"
        })
        res.creditAmount = "批复中..."
      }
      else
      {
        this.setData({
          btnClass:""
        })
        res.creditAmount = stringDispose(Number(data.creditAccountInfo.creditAmount).toString()); 
      }

      res.useAmount = stringDispose(Number(data.creditAccountInfo.useAmount).toString());
      res.canAmount = stringDispose((Number(data.creditAccountInfo.creditAmount) - Number(data.creditAccountInfo.useAmount)).toString());
      wx.setStorageSync('canAmount', res.canAmount)
      res.accountBalance = this.string(data.bankAccountInfo.accountBalance/100);
      res.freezeBalance = this.string(data.bankAccountInfo.freezeBalance/100);
      res.withdrewBalance = this.string(data.bankAccountInfo.withdrewBalance/100);
      if(data.invoicePoolInfo)
      {
        res.currentBalance = this.string(data.invoicePoolInfo.currentBalance);
        res.cancelAmount = this.string(data.invoicePoolInfo.cancelAmount);
        res.addAmount = this.string(data.invoicePoolInfo.addAmount);
      }
      else
      {
        res.currentBalance = this.string(0);
        res.cancelAmount = this.string(0);
        res.addAmount = this.string(0);
      }
      wx.setStorageSync('loanMes', {
        companyName: data.companyInfo.companyName,
        legalPersonName: data.companyInfo.legalPersonName,
        accountNo: this.string(data.bankAccountInfo.accountNo)
      })
      this.setData(res)
    })
  },
  onLoad: function () {
  },
  onShow: function() {
    this.setInfo();
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  string:function(str){if(str==null){return "-"}else{
    return Number(str).toFixed(2)
  }},
})
