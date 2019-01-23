//index.js
import { ajax, showModal } from '../../utils/util.js'
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
    addAmount: 0


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
      res.creditAmount = "￥"+ data.creditAccountInfo.creditAmount;
      res.useAmount = "￥"+ data.creditAccountInfo.useAmount;
      res.canAmount = "￥"+(data.creditAccountInfo.creditAmount - data.creditAccountInfo.useAmount);
      wx.setStorageSync('canAmount', res.canAmount)
      res.accountBalance = this.string(data.bankAccountInfo.accountBalance);
      res.freezeBalance = this.string(data.bankAccountInfo.freezeBalance);
      res.withdrewBalance = this.string(data.bankAccountInfo.withdrewBalance);
      
      res.currentBalance = data.invoicePoolInfo.currentBalance;
      res.cancelAmount = data.invoicePoolInfo.cancelAmount;
      res.addAmount = data.invoicePoolInfo.addAmount;
      wx.setStorageSync('loanMes', {
        companyName: data.companyInfo.companyName,
        legalPersonName: data.companyInfo.legalPersonName,
        accountNo: data.bankAccountInfo.accountNo
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
  string:function(str){if(str==null){return "-"}else{str+".00元"}}
})
