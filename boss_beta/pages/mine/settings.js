// pages/mine/settings.js
import { ajax, isBtnClick, showModal } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poperHide:true,
    poperHeadtext:"您是要安全退出吗？"
  },
  //跳转至：找回密码
  to_Retrieve_Pw_CheckCode: function () {
    wx.navigateTo({
      url: '/pages/login/retrieve_pw_checkcode',
    })
  },
  //跳转至：修改密码
  to_Modify_Pw: function () {
    wx.navigateTo({
      url: '/pages/login/modify_pw',
    })
  },
  //跳转至：关于我们
  to_AboutUs: function () {
    wx.navigateTo({
      url: '/pages/mine/aboutus',
    })
  },
  Logging_Out:function (){
    ajax('memberLogout', {}).then(data => {
      wx.removeStorageSync('token');
      wx.removeStorageSync('phone');
      wx.navigateTo({
        url: '/pages/login/login',
      })
    })
  },
  //关闭弹窗
  closePoper: function () {
    this.setData({
      poperHide: true,
    })

  },
  //打开弹窗
  showPoper: function () {
    this.setData({
      poperHide: false,
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