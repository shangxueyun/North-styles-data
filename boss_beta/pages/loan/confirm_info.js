// pages/loan/confirm_info.js
import { ajax, isBtnClick, showModal } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum:"021-68888083",
    poperHide: true,
    getCheckCode_txt: "秒重发",
    time: 30,
    codeTxtHide: true,
    codeBtnHide: false,
    applyAmount: '',
    date: '',
    rate: '',
    returnAmount: '',
    companyName: '',
    legalPersonName: '',
    phone: '',
    accountNo: '',
    serverMount: '',
    btnClass: "button_dark",
    btnHoverClass: "button_dark_hover",
    btnBind: true,
    phoneRe: '',
    verifyCode: '',
    productCode: ''
  },
  //input验证码
  changeInput: function(e) {
    this.setData({
      verifyCode: e.detail.value
    })
  },
  //checkbox
  checkboxChange: function(e) {
    let content = e.detail.value.length === 1;
    isBtnClick.call(this, content)
  },
  //点击打电话
  makePhoneCall:function()
  {
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNum,
    })
  },
  //关闭弹窗
  closePoper: function () {
    this.setData({
      poperHide: true
    })

  },
  //打开弹窗
  showPoper: function () {
    if (this.data.btnBind) {
      this.setData({
        poperHide: false
      })
    }
  },
  //跳转到：审核中
  to_StateOfCheck:function()
  {
    let applyAmount = this.data.applyAmount.replace("￥","").replace(/,/g,"");
    ajax('loanApply', {
      productCode: this.data.productCode,
      applyAmount: applyAmount,
      verifyCode: this.data.verifyCode,
      contractNo: new Date().getTime()
    }).then(data => {
      wx.redirectTo({
        url: '../mine/loan_accept',
      })
    })
  },

  //获取验证码
  getCheckCode: function () {
    var that = this;
    ajax('sendSMSAuthCode', {
      phoneNo: that.data.phone,
      bizType: 'LOAN_APPLY'
    }).then(data => {

    })
    that.init(that);          //这步很重要，没有这步，重复点击会出现多个定时器
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
      time: 30,
      interval: interval
    })
  },

  //清除interval
  clearTimeInterval: function (that) {
    var interval = that.data.interval;
    clearInterval(interval)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let applyAmount_ = options.applyAmount.replace("￥","").replace(/,/g,"");
    let returnAmount = applyAmount_ * options.loanRate / 100 / (options.unit === '月' ? 12 : options.unit === 'YEAR' ? 1 : options.unit === 'DAY' ? 365 : 0) * options.num ;
    let phone = wx.getStorageSync('phone');
    this.setData({
      applyAmount: options.applyAmount.replace("￥",""),
      date: options.num + options.unit,
      rate: options.loanRate,
      returnAmount: (Number(returnAmount) + Number(applyAmount_)).toFixed(2),
      companyName: wx.getStorageSync('loanMes').companyName,
      legalPersonName: wx.getStorageSync('loanMes').legalPersonName,
      phone: phone,
      accountNo: wx.getStorageSync('loanMes').accountNo,
      serverMount: parseFloat(options.serverMount).toFixed(2),
      phoneRe: phone.substring(0, 3) + '****' + phone.substring(7),
      productCode: options.productCode
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