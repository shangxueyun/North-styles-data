// pages/mine/loan_needtopay.js

import { ajax, showModal } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabCurrent_expire: "on",
    tabCurrent_overdue: "",
    tabHide_expire: false,
    tabHide_overdue: true,
    datas: [],
    datas1: []
  },
  //显示：即将到期
  tabbtn_expire: function ()
  {
    this.setData({
      tabCurrent_expire: "on",
      tabCurrent_overdue: "",
      tabHide_expire: false,
      tabHide_overdue: true
    })
  },
  //显示：逾期贷款
  tabbtn_overdue: function ()
  {
    this.setData({
      tabCurrent_expire: "",
      tabCurrent_overdue: "on",
      tabHide_expire: true,
      tabHide_overdue: false
    })
  },
  to_LoanNeedToPay_Detail_expire: function (e) {
    wx.navigateTo({
      url: 'loan_needtopay_detail_expire?id=' + e.currentTarget.id+"&interest="+this.arrFor(this.data.datas,e.currentTarget.dataset.id).amount,
    })
  },
  to_LoanNeedToPay_Detail_overdue: function (e) {
    wx.navigateTo({
      url: 'loan_needtopay_detail_expire?id=' + e.currentTarget.id+"&interest="+this.arrFor(this.data.datas,e.currentTarget.dataset.id).amount,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ajax('queryRepayPlan', {
      orderType: 'LOAN',
      status: 'AR',
      page: 1,
      pageSize: 999
    }).then(data => {
      if(data){
        this.setData({
          datas: data.list
        })        
      }
    })
    ajax('queryRepayPlan', {
      orderType: 'LOAN',
      status: 'RETL',
      page: 1,
      pageSize: 999
    }).then(data => {
      if(data){
        this.setData({
          datas1: data.list
        })        
      }
    })
  },


  arrFor:function(arr,id){
    let arr1
    arr.forEach((v,i)=>{
      for(var j in v)
      {
        if(v.id == id)
        {
          arr1 = v
        }
      }
    })
    return arr1
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
  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示导航栏loading
    //wx.showNavigationBarLoading();
    // 调用接口加载数据
    // this.loadData();
    // 隐藏导航栏loading
    //wx.hideNavigationBarLoading();
    // 当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新
    setTimeout(() => {
      wx.stopPullDownRefresh();
    },1000)
    
  },
  // 上拉加载
  onReachBottom(e) {
    let that = this;
    if (that.data.hasMore) {
      that.setData({
        pageNum: that.data.pageNum + 1,  // 每次触发上拉事件，把pageNum+1
        isFirstLoad: false                // 触发到上拉事件，把isFirstLoad设为为false
      });

      that.loadData();
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})