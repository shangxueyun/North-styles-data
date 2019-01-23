// pages/mine/loan_payoff.js

import { ajax, isBtnClick, showModal, getUrlData } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: [],
    message: '加载中...',
    num: 1
  },
  to_LoanAccept_Detail: function (e) {
    wx.navigateTo({
      url: 'loan_payoff_detail?' + getUrlData(this.data.datas[e.currentTarget.id]),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLists()
  },
  //获取数据
  getLists: function () {
    ajax('queryApplyRecord', {
      orderType: 'LOAN',
      status: 'I',
      page: this.data.num,
      pageSize: 20
    }).then(data => {
      if (data.loanList.length === 0) {
        this.setData({
          message: '没有更多了'
        })
      }
      else if (data.loanList.length < 20) {
        this.setData({
          message: '没有更多了',
          datas: [...this.data.datas, ...data.loanList],
        })
      }
      else {
        this.setData({
          datas: [...this.data.datas, ...data.loanList],
          num: (this.data.num + 1)
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
    if (this.data.message === '加载中...') {
      this.getLists()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
