// pages/main/main.js
import staticData from '../../data/staticData.js'
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    today_chapters:0,
    today_punchs: [],
    startIndex: [0, 0],
    volumesStart: [
      ["创", "出", "利", "民", "申", "书", "士", "得", "撒上", "撒下", "王上", "王下", "代上", "代下", "拉", "尼", "斯", "伯", "诗", "箴", "传", "歌", "赛", "耶", "哀", "结", "但", "何", "珥", "摩", "俄", "拿", "弥", "鸿", "哈", "番", "该", "亚", "玛", "太", "可", "路", "约", "徒", "罗", "林前", "林后", "加", "弗", "腓", "西", "帖前", "帖后", "提前", "提后", "多", "门", "来", "雅", "彼前", "彼后", "约一", "约二", "约三", "犹", "启"], staticData.chapter_list[0]
    ],
    volumesEnd: [
      ["创", "出", "利", "民", "申", "书", "士", "得", "撒上", "撒下", "王上", "王下", "代上", "代下", "拉", "尼", "斯", "伯", "诗", "箴", "传", "歌", "赛", "耶", "哀", "结", "但", "何", "珥", "摩", "俄", "拿", "弥", "鸿", "哈", "番", "该", "亚", "玛", "太", "可", "路", "约", "徒", "罗", "林前", "林后", "加", "弗", "腓", "西", "帖前", "帖后", "提前", "提后", "多", "门", "来", "雅", "彼前", "彼后", "约一", "约二", "约三", "犹", "启"], staticData.chapter_list[0]
    ],
    endIndex: [0, 0],
  },
  bindMultiPickerChange: function(e) {
    this.setData({
      "startIndex[0]": e.detail.value[0],
      "startIndex[1]": e.detail.value[1],
      "endIndex[0]": e.detail.value[0],
      "endIndex[1]": e.detail.value[1]
    })
  },
  bindMultiPickerColumnChange: function(e) {
    switch (e.detail.column) {
      case 0:
        this.setData({
          "volumesStart[1]": staticData.chapter_list[e.detail.value]
        })
    }
  },
  bindMultiPickerChange2: function(e) {
    this.setData({
      "endIndex[0]": e.detail.value[0],
      "endIndex[1]": e.detail.value[1]
    })
  },
  bindMultiPickerColumnChange2: function(e) {
    switch (e.detail.column) {
      case 0:
        this.setData({
          "volumesEnd[1]": staticData.chapter_list[e.detail.value]
        })
    }
  },
  saveRecord: function() {
    var that =this
    var start = this.data.startIndex
    var end = this.data.endIndex
    if (start[0] > end[0]) {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
      return
    }
    else if (start[0] = end[0] && start[1] > end[1]) {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
      return
    }
    else{
      app.send('/record/save', {"content": start.concat(end)},"POST").then(function(data){
        that.todayStatic()
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  todayStatic:function(){
    var that = this
    app.send('/record/today').then(function(data){
      that.setData({
        'today_punchs':data.records,
        'today_chapters':data.chapters
      })
    })
  },
  onLoad: function(options) {
    this.todayStatic()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})