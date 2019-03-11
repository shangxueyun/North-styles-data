// pages/mine/personal_info.js
import { ajax, showModal } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyName: '',
    licenseNo: '',
    legalPersonName: '',
    legalPersonId: '',
    legalPersonPhone: '',
    address: '',
    phoneNum:'021-68888083',
  },

  //点击打电话
  makePhoneCall: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNum,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ajax('memberInfoQuery', {
    }).then(data => {
      let res = {}
      for(let i in this.data) {
        if(i!== 'address') {
          res[i] = data.companyInfo[i]
        }
        else {
          res[i] = data.companyInfo.licenseCity + data.companyInfo.licenseAddress
        }
      }
      this.setData(res)
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