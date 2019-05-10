// pages/upload_file/upload_idcard.js
import { ajax, isBtnClick, showModal } from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    poperHide: true,
    IDN: '',
    IDS: '',
    btnBind: false,
    btnClass: "button_gray",
    btnHoverClass: "button_gray_hover",
    poperHide_1:"poperHideS",
    hintMsg:"",
  },
  //上传图片
  onImg: function(event) {
    let type = event.currentTarget.id || target.id;
    let that = this,image;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        //base64压缩
        image = res.tempFiles[0].path.substr(res.tempFiles[0].path.indexOf(".")+1,res.tempFiles[0].path.length);
        var tempFilesSize = res.tempFiles[0].size;
        if(tempFilesSize <= 2500000){   //图片小于或者等于2M时 可以执行获取图片
          that.setData
          ({
            poperHide_1: "poperHideS",
            hintMsg:'',
          });
          if(tempFilesSize >= 81000){
            wx.compressImage({
              src: res.tempFiles[0].path, // 图片路径
              quality: 5, // 压缩质量
              success: res => { //成功的回调
                wx.getFileSystemManager().readFile({
                  filePath: res.tempFilePath, //选择图片返回的相对路径
                  encoding: 'base64', //编码格式
                  success: res => { //成功的回调
                    let setImg = {};
                    setImg[type] = 'data:image/'+image+';base64,' + res.data
                    that.setData(setImg, () => {
                      isBtnClick.call(that, (that.data.IDN && that.data.IDS))
                    })
                  }
                });
              }
            })
          }else{
            wx.getFileSystemManager().readFile({
              filePath: res.tempFilePaths[0], //选择图片返回的相对路径
              encoding: 'base64', //编码格式
              success: res => { //成功的回调
                let setImg = {};
                setImg[type] = 'data:image/'+image+';base64,' + res.data
                that.setData(setImg, () => {
                  isBtnClick.call(that, (that.data.IDN && that.data.IDS))
                })
              }
            });
          }
        }else{    //图片大于2M，弹出一个提示框
          that.setData({
            poperHide_1: "",
            hintMsg:'图片过大,请进行压缩后上传'
          })
        }
      }
    })
  },
  //删除照片
  closeImg: function (event) {
    let type = event.currentTarget.id || event.target.id;
    let setImg = {};
    setImg[type.split('-')[0]] = '';
    this.setData(setImg, () => {
      isBtnClick.call(this, (this.data.IDN && this.data.IDS))
    })
  },
  //预览照片
  previewImage: function(e) {
    let type = e.currentTarget.id || e.target.id;
    var current = this.data[type.split('-')[0]];
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
  //打开弹窗
  showPoper: function () {
    if (this.data.btnBind) {
      this.setData({
        poperHide: false
      }) 
    }
  },
  //跳转至：上传证件资料，upload_file/upload_file
  to_CompanyInfo: function () {
    let that = this;
        ajax('uploadPicture', {
          front: this.data.IDN,
          behind: this.data.IDS,          
          who: '2',
          updateStep: "/pages/upload_file/company_info"
        }).then(data => {
          wx.navigateTo({
            url: "company_info"
          })
        })
  },
  //跳转至：上传身份证——实际控制人
  to_UploadIdCard_Controller:function()
  {
    let that = this;
        ajax('uploadPicture', {
          front: this.data.IDN,
          behind: this.data.IDS,         
          who: '0',
          updateStep: "/pages/upload_file/upload_idcard_controller"
        }).then(data => {
          wx.navigateTo({
            url: "upload_idcard_controller"
          })
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