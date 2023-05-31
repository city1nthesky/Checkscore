// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    text:"",
    phone:"",
    role:'0',
    // toast: false,
    // hideToast: false,
  },

  openToast() {
    this.setData({
      toast: true,
    });
    setTimeout(() => {
      this.setData({
        hideToast: true,
      });
      setTimeout(() => {
        this.setData({
          toast: false,
          hideToast: false,
        });
      }, 300);
      setTimeout(()=>
      {
        wx.navigateBack({
          delta: 1,
        })
      }, 400);
    }, 2000);

  },

  bindKeyInput: function (e) {
    // console.log(e.detail.value)
    this.setData({
      text: e.detail.value
    })
  },
  submit: function (e) {

    var app = getApp()
    var that = this
    if (app.globalData.gbindflag){
      wx.request({
        url: `https://cityinthesky.top/feedback?flag=1&mesg=${this.data.text}&phone=${app.globalData.gphone}&name=${app.globalData.gstuname}`,
        success: function(res) {
          if (res.statusCode === 200){
            // console.log(res.data)// 服务器回包信息
            that.openToast()
            return
          }else{
            wx.showToast({ title: '反馈失败请稍后重试', icon: 'none',})    
            return
          }
        },
        fail: function (res) {
          wx.showToast({ title: '系统错误', icon: 'error',})
          return
        },
      })
    }else{
      wx.request({
        url: `https://cityinthesky.top/feedback?flag=0&mesg=${this.data.text}`,
        success: function(res) {
          if (res.statusCode === 200){
            // console.log(res.data)// 服务器回包信息
            that.openToast()
            return
          }else{
            wx.showToast({ title: '反馈失败请稍后重试', icon: 'none',})    
            return 
          }
        },
        fail: function (res) {
          wx.showToast({ title: '系统错误', icon: 'error',})
          return
        },
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    if (!app.globalData.gbindflag){
      wx.showToast({
        title: '您未绑定，反馈时请留下您的姓名和联系方式',
        icon: 'none', //loading/success/none
        duration: 4000,
      })
    }

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