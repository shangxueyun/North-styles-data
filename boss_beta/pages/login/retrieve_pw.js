// pages/login/retrieve_pw.js
import { ajax, isBtnClick, showModal } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oPw: '',
    nPw: '',
    nRePw: '',
    btnClass: "button_gray",
    btnHoverClass: "button_gray_hover",
    btnBind: ""
  },
  pwChange: function (e) {
    var content = e.detail.value; // 获取当前表单元素输入框内容
    var that = this;
    let passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;
    that.setData({ nPw: content }, () => {
      isBtnClick.call(that, (that.data.nPw && that.data.nRePw && passwordReg.test(content) && that.data.nPw == that.data.nRePw))
    });
  },
  rePwChange: function (e) {
    var content = e.detail.value; // 获取当前表单元素输入框内容
    var that = this;
    let passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;
    that.setData({ nRePw: content }, () => {
      isBtnClick.call(that, (that.data.nPw && that.data.nRePw && passwordReg.test(content) && that.data.nPw == that.data.nRePw))
    });
  },
  //跳转到：信息确认
  to_Login: function () {
    if (this.data.btnBind) {
      if(this.data.type === '2') {
        ajax('setLoginPassword', {
          identityType: 'PHONE_NO',
          loginIdentity: this.data.loginIdentity,
          verifyCode: this.data.verifyCode,
          newPassword: this.data.nPw,
        }).then(data => {
          wx.redirectTo({
            url: 'login',
          })
        })
      }
      else {
        ajax('updateLoginPassword', {
          newPassword: this.data.nPw,
          oldPassword: this.data.oPw
        }).then(data => {
          wx.redirectTo({
            url: 'login',
          })
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      oPw: options.pw,
      loginIdentity: options.loginIdentity,
      verifyCode: options.verifyCode,
      type: options.type
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