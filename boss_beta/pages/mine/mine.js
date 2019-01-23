// pages/mine/mine.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    account: ''
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
  to_wait: function () {
    wx.navigateTo({
      url: 'loan_wait',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      account: wx.getStorageSync('loanMes').companyName
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