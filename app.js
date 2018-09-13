//app.js
App({
  getUrl: function(t_url) {
    return this.globalData.host + '/' + this.globalData.apiVersion + t_url
  },
  handleExpire: function(resolve, reject, f_url, f_data, f_method) {
    var that = this;
    console.log('------handle expire------------');
    wx.login({
      success: function(res) {
        console.log('------wx login, get code:--------' + res.code);
        if (res.code) {
          wx.request({
            url: that.getUrl('/login'),
            data: {
              code: res.code,
            },
            method: 'POST',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(resp) {
              if (resp.statusCode === 200) {
                console.log('------/wx/login ok');
                if (resp.data.code === 1001) {
                  console.log('1001');
                } else {
                  that.globalData.openid = resp.data.openid
                  f_data.openid = that.globalData.openid
                  var f_cb = function() {
                    if (f_method == 'GET') {
                      var header = {
                        'Content-Type': 'application/json'
                      }
                    } else {
                      var header = {
                        "Content-Type": "application/x-www-form-urlencoded"
                      }
                    }
                    wx.request({
                      url: that.getUrl(f_url),
                      data: f_data,
                      method: f_method,
                      header: header,
                      success: function(resp) {
                        if (resp.statusCode === 200) {
                          resolve(resp.data);
                        } else {
                          that.non200(resp)
                        }
                      },
                      fail: that.networkfail
                    })
                  }
                  f_cb()
                }
              } else {
                that.non200(resp)
              }
            },
            fail: that.networkfail
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      },
      fail: that.wxfail
    })
  },
  onLaunch: function() {
    // // 展示本地存储能力
    // var that = this
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // // 登录
    // wx.login({
    //   success: res => {
    //     console.log(res)
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     this.httpPost('/login', {
    //       code: res.code
    //     }).then(function(data) {
    //       console.log('login', data)
    //       that.globalData.openid = data.openid

    //     })
    //   }
    // })
    // console.log('this.globalData.openid', this.globalData.openid)
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  send: function(sub_url, p_params, p_method) {
    var that = this
    var method = p_method || "GET"
    var params = p_params || {}
    var header = {
      'Content-Type': 'application/json'
    }
    if (method == "POST") {
      header = {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
    params.openid = that.globalData.openid
    return new Promise(function(resolve, reject) {
      wx.request({
        url: that.getUrl(sub_url),
        data: params,
        method: method,
        header: header,
        success: function(res) {
          if (res.data.code == 0) {
            resolve(res.data)
          } else if (res.data.code == 1005) {
            that.handleExpire(resolve, reject, sub_url, params, method)
          }
        },
        fail: function(res) {
          console.log("fail", res)
          reject(res)
        }
      })
    })
  },
  globalData: {
    userInfo: null,
    openid: null,
    host: "http://127.0.0.1:5000",
    apiVersion: "api001"
  }
})