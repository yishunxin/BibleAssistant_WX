// pages/biblecata/biblecata.js
const staticData = require('../../data/staticData.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chapterlist: [],
    currentTab: 1,
    old_bible_cata: staticData.old_bible_cata,
    new_bible_cata: staticData.new_bible_cata,
    currentcata: staticData.old_bible_cata[0]
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  getChapterlist: function (num) {
    var arr1 = new Array(num);
    for (var i = 0; i < arr1.length; i++) {
      arr1[i] = i;
    }
    return arr1
  },
  changecata:function(e){
    this.setData({ currentcata: e.currentTarget.dataset.item})
    this.setData({ chapterlist: this.getChapterlist(this.data.currentcata.chapter) })
    this.setData({ currentTab: (this.data.currentTab==1)?2:1})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ chapterlist: this.getChapterlist(this.data.currentcata.chapter) })
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