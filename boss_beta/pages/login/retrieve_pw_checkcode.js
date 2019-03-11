// pages/login/retrieve_pw_checkcode.js
import { ajax, isBtnClick, showModal, getUrlData } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeTxtHide: true,
    codeBtnHide: false,
    time: 30,
    getCheckCode_txt: "秒重发",
    poperHide: true,
    btnClass: "button_gray",
    btnHoverClass: "button_gray_hover",
    btnBind: "",
    phone: "",
    checkCode: '',
  },
  //输入校验 是否填入
  checkCodeChange: function (e) {
    var phoneNum_reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;  //手机正则式
    let type = e.currentTarget.id || target.id;
    let that = this;
    let setCode = {};
    setCode[type] = e.detail.value// 获取当前表单元素输入框内容
    that.setData(setCode, () => {
      isBtnClick.call(that, (that.data.phone && that.data.checkCode && phoneNum_reg.test(this.data.phone)))
    });
  },
  //获取验证码
  getCheckCode: function () {
    var phoneNum_reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;  //手机正则式
    if (this.data.phone && phoneNum_reg.test(this.data.phone)) {
      var that = this;
      that.init(that);          //这步很重要，没有这步，重复点击会出现多个定时器
      ajax('sendSMSAuthCode', {
        phoneNo: that.data.phone,
        bizType: 'RESET_PASSWORD'
      }).then(data => {

      })
      that.setData({
        getCheckCode_txt: that.data.time + "秒重发"
      });

      that.setData({
        codeTxtHide: false,
        codeBtnHide: true,
      });

      var time = that.data.time;

      var interval = setInterval(function () {
        time--;
        that.setData({
          getCheckCode_txt: time + "秒重发"
        })
        if (time == 0) {           //归0时回到60
          that.stopTap();
          getCheckCode_txt: "秒重发"
        }
      }, 1000)

      this.setData({
        interval: interval    //定时器
      })
    }
    else {
      showModal({
        content: '请输入有效的手机号'
      })
    }
  },

  //停止倒计时
  stopTap: function () {
    var that = this;
    that.clearTimeInterval(that);

    that.setData({
      codeTxtHide: true,
      codeBtnHide: false,
    });
  },

  //重新倒计时
  restartTap: function () {
    var that = this;
    that.init(that);
    that.getCheckCode();
  },

  //初始化数据
  init: function (that) {
    var interval = "";
    that.clearTimeInterval(that)
    that.setData({
      interval: interval
    })
  },

  //清除interval
  clearTimeInterval: function (that) {
    var interval = that.data.interval;
    clearInterval(interval)
  },
  //跳转至：找回密码
  to_Retrieve_Pw: function () {
    if (this.data.btnBind) {
      wx.navigateTo({
        url: 'retrieve_pw?' + getUrlData({
          loginIdentity: this.data.phone,
          verifyCode: this.data.checkCode,
          type: 2
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