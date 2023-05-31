// pages/myinfo/myinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unbindflag: false,
    unbindcount: 0,
    fnet:false,
    identity: {
      icon: 'icon-class', // 根据实际图标名称进行设置
      text: '未绑定',
    },

  },

  bindinfo: function (e) {
    var app = getApp()
    if (app.globalData.gbindflag){
      wx.showToast({
        title: '已经绑定',
        icon: 'none', //loading/success/none
      })
      return
    }
    wx.navigateTo({ url: '/pages/certification/certification'})
  },

  close() {
    this.setData({
      unbindflag: false,
    });
  },
  unbind1() {
    var app = getApp()
    this.setData({
      unbindflag: true,
      unbindcount:app.globalData.gunbindcount,
    });
  },
  unbind2: function (e) {
    var app = getApp()
    var that = this
    var tmp = 2
    if (app.globalData.gbindflag){
      // console.log("count:",this.data.unbindcount)
      if (this.data.unbindcount == 0){
        wx.showToast({
          title: '解除绑定次数用尽',
          icon: 'none', //loading/success/none
        })
        return
      }

      wx.login({
        success: function(res) {
          if (res.code) {
            wx.request({
              url: `https://cityinthesky.top/unbind?code=${res.code}&unbindcount=${that.data.unbindcount}`,
              success: function(res) {
                // 登录成功
                if (res.statusCode === 200) {
                  // console.log(res.data)// 服务器回包信息
                  wx.showToast({
                    title: '成功解除',
                    icon: 'none', //loading/success/none
                  })
                  app.globalData.gbindflag = false

                  tmp = that.data.unbindcount -1
                  app.globalData.gunbindcount = tmp
  
                  that.setData({
                    unbindflag: false,
                    unbindcount:tmp,
                  })

                  return 
                }else{
                  wx.showToast({ title: '解除绑定失败，请稍后重试', icon: 'none',})    
                }
              }
            })
          } else {

            console.log('获取用户登录态失败！' + res.errMsg)
          }
        },
        fail: function (res) {
          wx.showToast({ title: '系统错误', icon: 'none',})
        },
      })
    }else{
      wx.showToast({
        title: '请先绑定',
        icon: 'none', //loading/success/none
      })
      return
    }
  },

  feedback: function (e) {
    wx.navigateTo({ url: '/pages/feedback/feedback' })
  },

  copyright: function (e) {
    wx.navigateTo({ url: '/pages/copyright/copyright' })
  },

  contactus: function (e) {
    wx.navigateTo({ url: '/pages/contactus/contactus' })
  },

  subscribe: function (e) {
    var app = getApp()
    if (!app.globalData.gbindflag){
      wx.showToast({
        title: '请先绑定',
        icon: 'none', //loading/success/none
      })
      return
    }
    wx.requestSubscribeMessage({
      tmplIds: ['ZQ8OKHUs78ga24tSsNJUv0AWxiBmrHKJMAMzbLT41Pk'],
      success (res) { }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var app = getApp()
    this.setData({
      fnet:app.globalData.gnet,
      unbindcount:app.globalData.gunbindcount,
      identity:app.globalData.gidentity,
    })

    wx.setNavigationBarTitle({
      title: '我的'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var app = getApp()

    this.setData({
      fnet:app.globalData.gnet,
      unbindcount:app.globalData.gunbindcount,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    var that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title: " ",    // 默认是小程序的名称(可以写slogan等)
      path: '/pages/welcome/welcome',    // 默认是当前页面，必须是以‘/'开头的完整路径
      imageUrl: 'https://cityinthesky.top/locationpic/sharepic.png',   //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      success: function(res){
        // 转发成功之后的回调
        if(res.errMsg == 'shareAppMessage:ok'){
        }
      },
      fail: function(){
        // 转发失败之后的回调
        if(res.errMsg == 'shareAppMessage:fail cancel'){
          // 用户取消转发
        }else if(res.errMsg == 'shareAppMessage:fail'){
          // 转发失败，其中 detail message 为详细失败信息
        }
      }
    }
    // 返回shareObj
    return shareObj;

  }
})