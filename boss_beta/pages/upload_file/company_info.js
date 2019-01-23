// pages/upload_file/company_info.js
import { ajax, isBtnClick} from '../../utils/util.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    btnClass: "button_gray",
    btnHoverClass: "button_gray_hover",
    btnBind: false,
    company: '',
    email: ''
  },
  //公司名称 onChange
  coNameChange:function(e)
  {
    let type = e.currentTarget.id || target.id;
    var content = e.detail.value; // 获取当前表单元素输入框内容
    var that = this;
    let reg = /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/;//修改邮箱正则表达式
    let res = {};
    res[type] = e.detail.value
    that.setData(res, () => {
      isBtnClick.call(that, (that.data.company && that.data.email && reg.test(that.data.email)))
    })
  },
  //跳转至：公司信息确认
  to_CompanyInfo_Step2: function () {
    if (this.data.btnBind) {
      ajax('companyInfoQueryByChannel', {
        companyName: this.data.company,
        email: this.data.email
      }).then(data => {
        wx.setStorageSync('company', this.data.company);
        wx.navigateTo({
          url: 'company_info_step2?companyName=' + data.companyName + '&legalPersonName=' + data.legalPersonName + '&licenseBeginDate=' + data.licenseBeginDate + '&licenseExpireDate=' + data.licenseExpireDate + '&licenseNo=' + data.licenseNo + '&regCap=' + data.regCap + '&registerAddress=' + data.registerAddress + '&entStatus=' + data.entStatus + '&unitType=' + data.unitType + '&subContribution=' + data.subContribution + '&controlName=' + data.controlName + '&email=' + this.data.email
        })
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