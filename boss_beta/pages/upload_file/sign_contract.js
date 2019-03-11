// pages/upload_file/sign_contract.js
import { ajax, isBtnClick, showModal,FileLook } from '../../utils/util.js'
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
    shortMessage: '',
    shortMes: false,
    agree: false,
    shortMes_text:'',
    phone: '',
    company: '',
    REGISTER_STATUS:"0",
    PERSON_CREDIT_QUERY_STATUS:"0",
    COMPANY_CREDIT_QUERY_STATUS:"0",
    'REGISTER': '0',
    'PERSON_CREDIT_QUERY': '0',
    'COMPANY_CREDIT_QUERY': '0'
  },
  //关闭弹窗
  closePoper: function ()
  {
    this.setData({
      poperHide: true,
      getCheckCode_txt: "秒重发",
      time: 30,
      codeTxtHide: true,
      codeBtnHide: false,
      shortMessage: ''
    })

  },
  //打开弹窗
  showPoper: function ()
  {
    this.setData({
      poperHide: false
    })
  },
  //checkbox
  checkboxChange: function(e) {
    if (e.detail.value.length > 0) {
      this.setData({
        agree: true
      })
    }
    else {
      this.setData({
        agree: false
      })
    }
  },
  //跳转至
  to_StateOfCheck:function()
  {
    if (!this.data.shortMes) {
      showModal({
        content: '请进行电子签章授权验证'
      })   
    }
    else{

      if(this.data.REGISTER != "0" && this.data.PERSON_CREDIT_QUERY != "0" && this.data.COMPANY_CREDIT_QUERY != "0"){
        this.Query_function("REGISTER",this.showModalCh,this.Query);
      }else{
        let content;
        if(this.data.REGISTER=="0")
        content = '会员注册协议尚未签章'
        else if(this.data.PERSON_CREDIT_QUERY=="0")
        content = '个人信息授权书尚未签章'
        else if(this.data.COMPANY_CREDIT_QUERY=="0")
        content = '企业数据授权书尚未签章'
        showModal({
          content: content
        })
      }
    }
  },
  Query:function(string,type){
    if(type=="REGISTER")
    this.Query_function("PERSON_CREDIT_QUERY",this.showModalCh,this.Query);
    else if(type=="PERSON_CREDIT_QUERY")
    this.Query_function("COMPANY_CREDIT_QUERY",this.showModalCh,this.Query);
    if(type=="COMPANY_CREDIT_QUERY")
    {
      if (this.data.agree) {
        wx.navigateTo({
          url: 'state_of_check'
        })
      }else {
          showModal({
            content: '请勾选确认详细阅读协议信息'
          })
      }
    }
  },
  Query_function:function(type,appModalCh,fn){
    ajax('signStatusQuery', {
      applyNo: this.data[type],        
      onlineSignType: type,
      updateStep: '/pages/upload_file/state_of_check'
    }, false, 'POST', true).then(data => {
      if (data.signStatus === '1' || data.signStatus === '3') {
        fn(wx.getStorageSync('memberId'),type)
      }else{
        appModalCh(type,true);
      }
    }).catch(() => {
      appModalCh(type,false);
    })
  },
  showModalCh:function(type,ble){
    let content;
    if(type=="REGISTER"){
      if(ble)
      content = "会员注册协议尚未签章";
      else
      content = "请进行会员注册协议签章";
    }else if(type=="PERSON_CREDIT_QUERY"){
      if(ble)
      content = "个人信息授权书尚未签章";
      else
      content = "请进行个人信息授权书签章";
    }else if(type=="COMPANY_CREDIT_QUERY"){
      if(ble)
      content = "企业数据授权书尚未签章";
      else
      content = "请进行企业数据授权书签章";
    }
    showModal({
      content: content
    })
  },
  //会员注册协议
  regClick: function(e) {
    if (!this.data.shortMes) {
      showModal({
        content: '请进行电子签章授权验证'
      })   
    }else{
      let type = e.currentTarget.id || target.id;
      
      if(type=="REGISTER"){
        if(this.data.REGISTER!="0")
          this.Query_function(type,this.app_ajax,FileLook)
        else
          this.app_ajax(type)        
      }else if(type=="PERSON_CREDIT_QUERY"){
        if(this.data.PERSON_CREDIT_QUERY != "0")
          this.Query_function(type,this.app_ajax,FileLook)
        else
          this.app_ajax(type)        
      }else if(type=="COMPANY_CREDIT_QUERY"){
        if(this.data.COMPANY_CREDIT_QUERY != "0")
          this.Query_function(type,this.app_ajax,FileLook)
        else
          this.app_ajax(type)
      }      
    }
  },
  app_ajax:function(type,ble){
    ajax('signApply', {
      onlineSignType: type,
    }).then(data => {
      let link = data.link;
      let res = {};
      res[type] = data.applyNo
      this.setData(res, function () {
        wx.navigateTo({
          url: '/pages/upload_file/sign?url=' + link.substring(0, link.indexOf('?')) + '&' + link.substring(link.indexOf('?') + 1)
        })
      })
    })
  },
  //输入框获取
  getCode: function(e) {
    this.setData({
      shortMessage:e.detail.value
    })
  },
  //验证验证码
  shortMess: function () {
    ajax('verifySMSAuthCode', {
      verifyCode: this.data.shortMessage,
      bizType: 'PHONE_NO_VERIFY'
    }).then(data => {
      this.setData({
        shortMes: true,
        poperHide: true,
        getCheckCode_txt: "秒重发",
        time: 30,
        codeTxtHide: true,
        codeBtnHide: false,
        shortMessage: ''
      })
    })
  },
  //获取验证码
  getCheckCode: function () {
    var that = this;
    that.init(that);          //这步很重要，没有这步，重复点击会出现多个定时器
    ajax('sendSMSAuthCode', {
      phoneNo: wx.getStorageSync('phone'),
      bizType: 'PHONE_NO_VERIFY'
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
    ajax('memberInfoQuery', {
    }).then(data => {
      this.setData({
        phone: data.companyInfo.legalPersonPhone,
        company: data.companyInfo.companyName
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