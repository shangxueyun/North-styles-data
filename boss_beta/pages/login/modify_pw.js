// pages/login/modify_pw.js

import { ajax, isBtnClick, showModal, getUrlData } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    pw: '',
    btnClass: "button_gray",
    btnHoverClass: "button_gray_hover",
    btnBind: ""
  },
  pwChange: function (e) {
    var content = e.detail.value; // 获取当前表单元素输入框内容
    var that = this;
    var phoneNum_reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;  //手机正则式
    that.setData({ pw: content }, () => {
      isBtnClick.call(that, (that.data.pw && that.data.phone && phoneNum_reg.test(that.data.phone)))
    });
  },
  phoneChange: function (e) {
    var content = e.detail.value; // 获取当前表单元素输入框内容
    var that = this;
    var phoneNum_reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;  //手机正则式
    that.setData({ phone: content }, () => {
      isBtnClick.call(that, (that.data.pw && that.data.phone && phoneNum_reg.test(content)))
    });
  },
  //跳转到：信息确认
  to_RetrievePw: function () {
    if (this.data.btnBind) {
      wx.navigateTo({
        url: 'retrieve_pw?' + getUrlData({
          phone: this.data.phone,
          pw: this.data.pw,
          type: 1
        }),
      })
    }
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