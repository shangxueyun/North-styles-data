// pages/reg/check_phone_num.js
import { ajax, isBtnClick, showModal} from '../../utils/util.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    codeTxtHide:true,
    codeBtnHide:false,
    time:30,
    getCheckCode_txt: "秒重发",
    poperHide: true,
    btnClass: "button_gray",
    btnHoverClass: "button_gray_hover",
    btnBind: "",
    phone: "",
    password: '',
    rePassword: '',
    checkCode: ''
  },
  //输入校验 是否填入
  checkCodeChange: function (e) {
    let type = e.currentTarget.id || target.id;
    let that = this;
    let setCode = {};
    setCode[type] = e.detail.value// 获取当前表单元素输入框内容
    that.setData(setCode, () => {
      isBtnClick.call(that, (that.data.password && that.data.rePassword && that.data.checkCode))
    });
  },
  //关闭弹窗
  closePoper: function () {
    this.setData({
      poperHide: true
    })
  },
  //打开弹窗
  showPoper: function () {
    this.setData({
      poperHide: false
    })
  },
  //获取验证码
  getCheckCode:function()
  {
    var that = this;
    that.init(that);          //这步很重要，没有这步，重复点击会出现多个定时器
    ajax('sendSMSAuthCode', {
      phoneNo: that.data.phone,
      bizType: 'REGISTER'
    }, true).then(data => {
      console.log(data)
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
  btnClick: function() {
    if(this.data.btnBind) {
      let { btnBind, checkCode, password, rePassword, phone} = this.data;
      let passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/
      if (btnBind) {
        if (!passwordReg.test(password)) {
          showModal({
            content: '密码需要字数 + 字母，不小于6位！',
          })
        }
        else if (password !== rePassword) {
          showModal({
            content: '2次密码不一致',
          })
        }
        else {
          ajax('memberRegister', {
            loginIdentity: phone,
            verifyCode: checkCode,
            password: password,
            memberType: "COMPANY",
            extension: null,
            identityType: "PHONE_NO"
          }, true).then(data => {
            if (data.token) {
              wx.setStorageSync('token', data.token);
              wx.setStorageSync('phone', phone);
            }
            this.showPoper()
          })
        }
      }
    }
  },
  //跳转至：上传证件资料，upload_file/upload_file
  to_UploadFile:function()
  {
    wx.navigateTo({
      url: "/pages/upload_file/upload_file"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      phone: options.phone
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