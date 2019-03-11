// pages/upload_file/realize_face.js
import {ajax, isBtnClick, showModal} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poperHide_1: true,
    IDN: '',
    IDS: '',
    btnBind: false,
    btnClass: "button_gray",
    btnHoverClass: "button_gray_hover",
    width: "",
    height: "",
    canvas_top: "",
    canvas_left: "",
    canvaspoperHide_1:"",
    resURL: "",
    MAX_SIZE: 300,
    compress_pictures:"",
  },
  //上传图片
  onImg: function (event) {
    let type = event.currentTarget.id || event.target.id;
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        that.setData({
          resURL: res,
          canvaspoperHide_1: ""
        })
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            let setImg = {};
            setImg[type] = 'data:image/png;base64,' + res.data;
            that.setData(setImg, () => {
              isBtnClick.call(that, (that.data.IDN))
            })
            var query = wx.createSelectorQuery();
            //选择id
            query.select('#IDN-img').boundingClientRect(function (rect) {
              that.setData({
                height: rect.height,
                width: rect.width,
                canvas_top: parseInt(rect.top)+"px",
                canvas_left: parseInt(rect.left)+"px",
              })
              that.CanvasCompress(that.data.resURL,that.data.width,that.data.height)
            }).exec();
          }
        })
      }
    })
  },
  CanvasCompress:function(res,width,height){
    let image = {width:width,height:height},MAX_SIZE = this.data.MAX_SIZE,that = this;
    const ctx = wx.createCanvasContext('attendCanvasId');
    ctx.drawImage(res.tempFilePaths[0], 0, 0, image.width, image.height);
    ctx.draw();
    setTimeout(function(){//给延时是因为canvas画图需要时间
      wx.canvasToTempFilePath({//调用方法，开始截取
        x: 0,
        y: 0,
        width: that.data.width+200,
        height: that.data.height+200,
        destWidth: that.data.width-50,
        destHeight: that.data.height-50,
        fileType:'jpg',
        quality:0.97,
        canvasId: 'attendCanvasId',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          wx.getFileSystemManager().readFile({
            filePath: tempFilePath, //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              that.setData({
                compress_pictures: 'data:image/jpg;base64,' + res.data,
              })
            }
          });
        }
      })
    }, 500);

  },
  //删除照片
  closeImg: function (event) {
    let type = event.currentTarget.id || event.target.id;
    let setImg = {};
    setImg[type.split('-')[0]] = '';
    this.setData(setImg, () => {
      isBtnClick.call(this, (this.data.IDN))
    })
    this.setData({
      compress_pictures:""
    })
  },
  //预览照片
  previewImage: function (e) {
    let type = e.currentTarget.id || e.target.id;
    var current = this.data.IDN;
    wx.previewImage({
      current: current,
      urls: [current],
      fail: function () {
        console.log('fail')
      },
      complete: function () {
        console.info("点击图片了");
      },
    })
  },

  //关闭弹窗
  closePoper: function () {
    this.setData({
      poperHide: true
    })
  },
  //关闭弹窗_1
  closePoper_1: function () {
    this.setData({
      poperHide_1: true
    }, () => {
      this.to_SignContract()
    })
  },
  //打开弹窗
  showPoper: function () {
    if (this.data.btnBind) {
      ajax('portraitCompare', {
        photo: this.data.compress_pictures,
        updateStep: "/pages/upload_file/sign_contract"
      }).then(data => {
        this.setData({
          poperHide_1: false,
          canvaspoperHide_1: "Hides"
        })
      })
    }
  },
  //打开弹窗_1
  showPoper_1: function () {
    this.setData({
      poperHide: true,
      poperHide_1: false
    })
  },
  //跳转至：合同签署
  to_SignContract:function()
  {
    wx.redirectTo({ //关闭当前页面，跳转到应用内的某个页面
      url: "/pages/upload_file/sign_contract"
      //url: "/pages/index/index"
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