Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      wx.redirectTo({
        url: './login',
      })
    }
  }
})