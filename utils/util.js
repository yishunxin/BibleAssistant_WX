const host = "http://127.0.0.1:5000"
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function httpGet(sub_url, params) {
  wx.request({
    url: host + sub_url,
    data: params,
    method: 'GET',
    header: {
      'Content-Type': 'application/json'
    },
    success: function(res) {
      console.log("sucess", res)
      return res
    },
    fail: function(res) {
      console.log("fail", res)
      return res
    }
  })
}

module.exports = {
  formatTime: formatTime,
  httpGet: httpGet
}