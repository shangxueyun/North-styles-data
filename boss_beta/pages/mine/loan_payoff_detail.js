// pages/mine/loan_payoff_detail.js

import { ajax,FileLook } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ajax('queryApplyRecordDetail', {
      agreementId: options.id,
    }).then(data => {
      if(data.delayDay == undefined || data.delayDay == null)
        data.delayDay = ""
        if(data.delayAmt == null || data.delayAmt == undefined)
          data.delayAmt = ""
      let interestPenalty = data.delayAmt*data.delayRate*Number(data.delayDay);
      data.interestPenalty = interestPenalty;
      this.setData({
        data: data
      })
    })
  },

  dateFunc:function(strat,end){

  },

  ContractClick:function(e){
    let type = e.currentTarget.id || target.id;
    FileLook(this.data.data.loanNo,type);
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