//接口
const port = 'https://www.china-mz.cn/'

//时间格式化
const formatTime = (date= new Date(), type) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return type === 'requestTime' ? [year, month, day, hour, minute, second].map(formatNumber).join('') : 
  [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

//格式化时间 +0
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


/*
ajax 调用接口
@url --接口地址
@data --接口数据
@method --请求方式
 */
const ajax = (url, data={}, noToken,method='POST',noErrorShow) => {
  return new Promise((succ, fail) => {
    let timeNo = formatTime(undefined, 'requestTime');
    let token = noToken ? {} : {token: wx.getStorageSync('token')};
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: `${port}${url}`,
      method: method,
      data:{
        "service": url,
        "version": "1.0",
        "partnerId": "111111111111",
        "bizContent": Object.assign({}, {
          requestNo: timeNo,
          requestTime: timeNo,
          inputCharset: 'utf-8',
          signType: 'RSA',
          sign: 'sign',
        }, token, data),
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading()
        let data = res.data;
        if (data.status) {
          showModal({
            content: '服务维护中,请稍后再试'
          });
          return
        }
        if (data.requestStatus === 'FAIL') {
          if (!noErrorShow) {
            showModal({
              content: data.returnMessage
            })
          }
          fail()
        }
        else {
          succ(data.bizData)
        }
      },
      fail(res) {
        wx.hideLoading()
        showModal({
          content: '服务维护中,请稍后再试'
        })
      }
    })
  })
}

//按钮是否高亮 condition条件
const isBtnClick = function(condition) {
  if (condition) {
    this.setData
      ({
        btnClass: "button_dark",
        btnHoverClass: "button_dark_hover",
        btnBind: true
      })
  }
  else {
    this.setData
      ({
        btnClass: "button_gray",
        btnHoverClass: "button_gray_hover",
        btnBind: false
      })
  }
}

//弹出框
const showModal = function (opt) {
  wx.showModal({
    title: '提示',
    content: opt.content,
    showCancel: false,
    confirmColor: '#136EC2'
  })
}

//数据格式化
const getUrlData = function (obj) {
  let res = '';
  for(let i in obj) {
    res += `&${i}=${obj[i]}`
  }
  return res.substring(1)
}



module.exports = {
  formatTime: formatTime,
  ajax: ajax,
  isBtnClick: isBtnClick,
  showModal: showModal,
  getUrlData: getUrlData
}
