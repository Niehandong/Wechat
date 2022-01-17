//index.js
//获取应用实例
import request from '../../utils/util'
const app = getApp()

Page({
  data: {
  bannerList: [],//轮播图
  recommendList: [],//推荐歌单
  topList:[], //排行榜数据

  },
  // 生命周期函数--监听页面加载
  onLoad: async function (options) {
   //轮播图请求
    let bannerListData = await request('/banner', {type: 2});
    this.setData({
      bannerList:bannerListData.banners
    })
    //推荐歌单数据
    let recomendListData = await request('/personalized',{limit: 10});
    this.setData({
      recommendList:recomendListData.result
    })
    //获取排行榜数据
    let index = 0;
    let resultArr = [];
    while(index < 5){
      let topListData = await request('/top/list',{idx:index++});
      let topListItem = {name: topListData.playlist.name, tracks: topListData.playlist.tracks.slice(0,3)}
      resultArr.push(topListItem);
      this.setData({
        topList:resultArr
      })
    }
     
  },
  //跳转至recommendsong页面
  toRecommendSong(){
    wx.navigateTo({
      url: '/songPackage/pages/recommendSong/recommendSong',
    })
  },
  //跳转至toOther页面
  toOther(){
    wx.navigateTo({
      url: '/otherPage/pages/other/other',
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
