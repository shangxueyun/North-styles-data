// pages/upload_file/upload_file.js
import {ajax} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    YYZZ: '',
    KHXK: '',
    JGXY: '',
    FRHK: '',
    FRPO: '',
    FRJH: '',
    SJKZ: '',
    YYZZ2: '',
    btnDisabled: true,
    btnClass: "button_gray",
    btnHoverClass: "button_gray_hover",
    poperHide_1:"poperHideS",
    hintMsg:"",
  },
  //跳转到：上传身份证
  to_UploadIdcard:function()
  {
    if (!this.data.btnDisabled) {
      ajax('companyModify', {
        companyInfo: {
          licenseNoPhoto: this.data.YYZZ, //营业执照
          openingPermitPhoto: this.data.KHXK, //开户许可
          organizationNoPhoto: this.data.JGXY, //组织机构
          legalAccountBookPhotoUrl: this.data.FRHK,
          legalSpouseIdPhotoUrl: this.data.FRPO,
          legalMarriageCertificatePhotoUrl: this.data.FRJH,
          letterOfQuiryPhotoUrl: this.data.SJKZ,
          otherPhotoUrl: this.data.YYZZ2,          
          token:this.data.token,
          updateStep: "/pages/upload_file/upload_idcard"
        },
      }).then(data => {
        wx.navigateTo({ //关闭当前页面，跳转到应用内的某个页面
          url: "/pages/upload_file/upload_idcard"
        })
      })    
    }
  },
  //上传图片
  onImg: function(event) {
    let type = event.currentTarget.id || target.id;
    let that = this,image;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
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
                      that.btnStatus()
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
                  that.btnStatus()
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
  closeImg: function(event) {
    let type = event.currentTarget.id || target.id;
    let setImg = {};
    setImg[type.split('-')[0]] = '';
    this.setData(setImg, () => {
      this.btnStatus()
    })
  },
  //预览照片
  previewImage: function (e) {
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
  //按钮判断
  btnStatus: function() {
    if (this.data.YYZZ && this.data.KHXK && this.data.JGXY && this.data.FRHK) {
      this.setData
        ({
          btnClass: "button_dark",
          btnHoverClass: "button_dark_hover",
          btnDisabled: false
        });
    }
    else {
      this.setData
        ({
          btnClass: "button_gray",
          btnHoverClass: "button_gray_hover",
          btnDisabled: true
        });
    }
  },
  hintMsgF:function(){
    this.setData
    ({
      poperHide_1: "poperHideS"
    });
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