// pages/mine/mine.js
import { ajax, showModal } from '../../utils/util.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    account: '',
    waittextcolor:'',
  },
  //页面跳转：个人信息
  to_PersonalInfo:function()
  {
    wx.navigateTo({
      url: 'personal_info',
    })
  },
  //页面跳转：待还款贷款
  to_LoanNeedtopay: function () {
    wx.navigateTo({
      url: 'loan_needtopay',
    })
  },
  //页面跳转：已还款贷款
  to_LoanPayoff: function () {
    wx.navigateTo({
      url: 'loan_payoff',
    })
  },
  //页面跳转：受理中贷款
  to_LoanAccept: function () {
    wx.navigateTo({
      url: 'loan_accept',
    })
  },
  //页面跳转：待放款贷款
  to_LoanWaiting: function () {
    wx.navigateTo({
      url: 'loan_waiting',
    })
  },
  //页面跳转：未通过贷款
  to_LoanNotPass: function () {
    wx.navigateTo({
      url: 'loan_notpass',
    })
  },
  //页面跳转：设置
  to_Settings:function () {
    wx.navigateTo({
      url: 'settings',
    })
  },
  //页面跳转：合同
  to_wait: function () {
    wx.navigateTo({
      url: 'loan_wait',
    })
  },
  /**
   * 生命周期函数--监听页面加载count
   */
  onLoad: function (options) {
    this.setData({
      account: wx.getStorageSync('loanMes').companyName
    });
  },

  loadAjax:function(status){
    ajax('queryApplyRecord', {
      orderType: 'LOAN',
      status: status,
      page: "1",
      pageSize: 999
    }).then(data => {
      if(data.count==0)
      {
        this.setData({
          waittextcolor: "display",
        })  
      }else{
        this.setData({
          waittextcolor: "",
        })
      }

    })
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
    this.loadAjax("I1");
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