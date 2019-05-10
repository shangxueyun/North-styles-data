// pages/login/login.js
import { ajax, isBtnClick, showModal } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnClass: "button_gray",
    btnHoverClass: "button_gray_hover",
    btnBind: false,
    phone: '',
    password: ''
  },
  pwChange: function (e) {
    var content = e.detail.value; // 获取当前表单元素输入框内容
    var that = this;
    that.setData({
      password: content
    }, () => {
      isBtnClick.call(that, that.data.phone && that.data.password)
    })
  },
  phChange: function(e) {
    var content = e.detail.value; // 获取当前表单元素输入框内容
    var that = this;
    that.setData({
      phone: content
    }, () => {
      isBtnClick.call(that, that.data.phone && that.data.password)
    })
  },
  //跳转至：我的
  to_Index: function () {
    var that = this;
    
    // let str = '13122156670',mm='sxy123456';
    // that.data.phone = str
    // that.data.password = mm
    
    if (that.data.btnBind && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(16[0-9]{1}))+\d{8})$/.test(that.data.phone)) {
      ajax('memberLogin', {
        loginIdentity: that.data.phone,
        verifyType: 'PASSWORD',
        loginVoucher: that.data.password,
        extension:null,
        identityType: 'PHONE_NO',
        client: 'APP'
      }).then(data => {
        if(data.updateStep == "/pages/upload_file/state_of_check")
        {
          wx.setStorageSync('token', data.token);
          wx.setStorageSync('phone', that.data.phone);
          wx.switchTab({ //关闭当前页面，跳转到应用内的某个页面
            url: "/pages/index/index"
          });
        }
        else if(data.updateStep == null)
        {
          wx.setStorageSync('token', data.token);  
          wx.setStorageSync('phone', that.data.phone);       
          wx.navigateTo({
            url: "/pages/upload_file/upload_file",
          });
        }
        else{
          wx.setStorageSync('phone', that.data.phone);
          wx.setStorageSync('token', data.token);
          wx.setStorageSync('memberId', data.memberId);
          wx.navigateTo({
            url: data.updateStep,
          });
        }
        // wx.setStorageSync('token', data.token);
        // wx.setStorageSync('phone', that.data.phone);
        //   wx.switchTab({ //关闭当前页面，跳转到应用内的某个页面
        //     url: "/pages/index/index"
        //   });
      })
    }
    else {
      showModal({ content: '手机号格式不正确！'})
    }
  },
  //跳转至：找回密码——验证码
  to_Retrieve_Pw_CheckCode: function () {
    wx.navigateTo({
      url: 'retrieve_pw_checkcode',
    })
  },
  to_Reg: function () {
    wx.navigateTo({
      url: '/pages/reg/reg',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
        }
        else
        {
          wx.redirectTo({
            url: './auth',
          })
        }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})