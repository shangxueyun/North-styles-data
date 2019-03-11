// pages/mine/loan_accept_detail.js
import { ajax, showModal } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loanAmt: '',
    loanRate: '',
    loanTerm: '',
    loanApplyDate: '',
    delayRate: '',
    interest:"",
    awaitRepayAmt:"",
    feeRate:"",
    feeAmt:"",
    feeMode:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ajax('queryApplyRecordDetail', {
      loanApplyNo: options.loanNo,
    }).then(data => {
      if(data.delayDay == undefined || data.delayDay == null)
        data.delayDay = ""
        if(data.delayAmt == null || data.delayAmt == undefined)
          data.delayAmt = ""
      let interestPenalty = data.delayAmt*data.delayRate*Number(data.delayDay);
      data.interestPenalty = interestPenalty;
      let Total = Number(data.loanAmt)+Number(data.interest);
      data.Total = Total;
      this.setData({
        data: data
      })
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