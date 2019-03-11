// pages/reg/reg.js
Page({
  /**
   * 页面的初始数据
   */

  data: {
    btnClass: "button_gray",
    btnHoverClass: "button_gray_hover",
    btnBind: "",
    warnClass: "",
    warnTxt:"",
    phone: ""
  },
  phoneNumChange: function (e) {
    var content = e.detail.value; // 获取当前表单元素输入框内容
    var that = this;
    that.setData({
      phone: content
    });
    if (content) {
      // 不为空
      that.verifyPhoneNum(content);
    }
    else if (!content) {
      // 为空
      that.setData
        ({
          btnClass: "button_gray",
          btnHoverClass: "button_gray_hover",
          btnBind: ""
        })
    }
  },
  //核实手机号码
  verifyPhoneNum:function(num)
  {
    var that = this;
    var phone = num;
    var phoneNum_reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(16[0-9]{1}))+\d{8})$/;  //手机正则式
    
    
    if (phone.length < 11) {
      that.setData
      ({
        btnClass: "button_gray",
        btnHoverClass: "button_gray_hover",
        warnClass: "",
        warnTxt: "",
        btnBind: "",
      });
    }
    else if (phone.length == 11) {
      if (phoneNum_reg.test(phone)) 
      {
        that.setData
          ({
            btnClass: "button_dark",
            btnHoverClass: "button_dark_hover",
            warnClass: "heading02 success icon_ok",
            warnTxt: "请点击下一步",
            btnBind: "check_phone_num",
          });
      }
      else
      {
        that.setData
        ({
          btnClass: "button_gray",
          btnHoverClass: "button_gray_hover",
          warnClass: "heading02 warn icon_warn",
          warnTxt: "请输入正确手机号",
          btnBind: "",
        });
      }
    }
    if (phone.length > 11) {
      that.setData
      ({
        btnClass: "button_gray",
        btnHoverClass: "button_gray_hover",
        warnClass: "heading02 warn icon_warn",
        warnTxt: "请输入正确手机号",
        btnBind: "",
      });
    }
  },
  //页面跳转：验证手机号
  check_phone_num: function () {
    var that = this;
    wx.redirectTo({
      url: 'check_phone_num?phone=' + that.data.phone,
    })
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