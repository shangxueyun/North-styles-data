// pages/upload_file/company_info_step2.js
import { ajax, isBtnClick, showModal } from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: "请选择",
    adress: '',
    btnClass: "button_gray",
    btnHoverClass: "button_gray_hover",
    btnBind: "",
    controlName: '',
    subContribution:'',
    pickerClass: 'black',
    info: {
      companyName: '',
      licenseNo: '',
      licenseBeginDate: '',
      licenseExpireDate: '',
      regCap: '',
      legalPersonName: '',
      registerAddress: '',
      unitType: '',
      entStatus: '',
      email: '',
    },
  },
  //省市区 onchange
  bindRegionChange: function(val) {
    let that = this;
    this.setData({
      region: val.detail.value.toString(),
      pickerClass: 'black'
    }, () => {
      if (this.data.region.length > 0 && this.data.adress) {
        // 不为空
        that.setData
          ({
            btnClass: "button_dark",
            btnHoverClass: "button_dark_hover",
            btnBind: "to_ConfirmInfo"
          })
      }
      else {
        // 为空
        that.setData
          ({
            btnClass: "button_gray",
            btnHoverClass: "button_gray_hover",
            btnBind: ""
          })
      }
    })
  },
  //详细地址 onChange
  addressChange: function (e) {
    var content = e.detail.value; // 获取当前表单元素输入框内容
    var that = this;
    that.setData({
      adress: content
    })
    if (this.data.region.length > 0 && content) {
      // 不为空
      that.setData
        ({
          btnClass: "button_dark",
          btnHoverClass: "button_dark_hover",
          btnBind: "to_ConfirmInfo"
        })
    }
    else {
      // 为空
      that.setData
        ({
          btnClass: "button_gray",
          btnHoverClass: "button_gray_hover",
          btnBind: ""
        })
    }
  },
  //跳转到：信息确认，法定代表人
  to_ConfirmInfo: function () {
    let obj = this.data.info;
    obj.updateStep = '/pages/upload_file/confirm_info'
    this.setData({
      info: obj
    })
    ajax('companyModify', {
      companyInfo: Object.assign({}, this.data.info, {
        licenseAddress: this.data.adress,
        licenseCity: this.data.region.toString(),
        legalPersonPhone: wx.getStorageSync('phone'),
      }),
    }).then(data => {
      wx.navigateTo({
        url: "confirm_info"
      })
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let res = {};
    for(let i in this.data.info) {
      if (options[i] !== 'null') {
        if (i === 'regCap' || i === 'subContribution') {
          res[i] = parseFloat(options[i])
        }
        else {
          res[i] = options[i]
        }
      }
    }
    this.setData({
      info: res,
      controlName: options.controlName,
      subContribution: options.subContribution!== 'null' ? options.subContribution : ''
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