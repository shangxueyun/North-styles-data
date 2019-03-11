// pages/upload_file/confirm_info.js
import { ajax, isBtnClick, showModal } from '../../utils/util.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
      legalPersonName: '',
      legalPersonId: '',
      legalPersonIdStart: '',
      legalPersonIdExpire: '',
      legalPersonIdAddress: '',
      controlName: '',
      controlIdNo: '',
      controlIdStart: '',
      controlIdExpire: '',
      controlIdAddress: ''
    },
  },
  changeData(val) {
    let res = {};
    res[val.currentTarget.id] = val.detail.value;
    this.setData({
      info: Object.assign({}, this.data.info, res)
    })
  },
  //跳转到人脸识别
  to_RealizeFace: function () {
    let info = this.data.info
    info.updateStep = "/pages/upload_file/realize_face"
    ajax('companyModify', {
      companyInfo: this.data.info,
    }).then(data => {
      wx.reLaunch({ //关闭当前页面，跳转到应用内的某个页面
        url: "/pages/upload_file/realize_face"
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ajax('memberInfoQuery', {
      queryContentList: ['COMPANY']
    }).then(data => {
      let res = {};
      for(let i in this.data.info) {
        if (!data.companyInfo[i]) {
          res[i] = ''
        }
        else if (i === 'legalPersonIdStart' || i === 'legalPersonIdExpire' || i === 'controlIdStart' || i === 'controlIdExpire' ) {
          let res1 = data.companyInfo[i];
          if (res1.indexOf('-') > -1) {
            res[i] = data.companyInfo[i]
          }
          else {
            res[i] = res1.substr(0, 4) + '-' + res1.substr(4, 2) + '-' + res1.substr(6, 7)
          }
        }
        else {
          res[i] = data.companyInfo[i]
        }
      }
      this.setData({
        info: res
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