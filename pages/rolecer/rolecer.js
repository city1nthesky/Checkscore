// pages/rolecer/rolecer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'123',
    classarray: ['2133', '2102', '2103', '2104'],
    classindex: 0,
    teaname:'',
    cercode:'6666',
    role:'1',
    payinfo:'0',
    isChecked:false,

  },
  bindPhoneInput: function (e) {
    // console.log(e.detail.value)
    this.setData({
      phone: e.detail.value
    })
  },

  bindTeanameInput: function (e) {
    // console.log(e.detail.value)
    this.setData({
      teaname: e.detail.value
    })
  },
  bindCodeInput: function (e) {
    // console.log(e.detail.value)
    this.setData({
      cercode: e.detail.value
    })
  },
  onCheckboxChange: function(e) {
    console.log("ischecked",this.data.isChecked)
    var tmpflag = !(this.data.isChecked)
    console.log("tmpflag",tmpflag)
    this.setData({
      isChecked: tmpflag
    });
  },

  tapLogin: function() {

    if (this.data.phone.length != 11){
      //弹窗提示
      wx.showToast({
        title: '手机号长度错误',
        icon: 'none', //loading/success/none
      })
      return 
    }
    //正则匹配手机格式
    var reg = /^(1[3|4|5|6|7|8|9])\d{9}$/
    if (!reg.test(this.data.phone)){
      wx.showToast({
        title: '手机号输入错误',
        icon: 'none',
      })
      return
    }

    if (this.data.teaname == ''){
      wx.showToast({
        title: '请输入您的姓名',
        icon: 'none',
      })
      return
    }
    // console.log(this.data.cercode)
    if (this.data.cercode == ''){
      wx.showToast({
        title: '请输入认证码',
        icon: 'none',
      })
      return
    }

    var that = this
    var app = getApp()
    // app.globalData.gstuname = this.data.stuname
 
    wx.login({
      success: function(res) {
        if (res.code) {
          wx.request({
            url: `https://cityinthesky.top/certification?code=${res.code}&phone=${that.data.phone}&teaname=${that.data.teaname}&role=${that.data.role}&cercode=${that.data.cercode}`,
            success: function(res) {

              // 登录成功
              if (res.statusCode === 200) {
                if (res.data.coderror == "coderror")
                {
                  wx.showToast({
                    title: '认证失败，认证码错误',
                    icon: 'none',
                  })
                  return 
                }

               //console.log(res.data.sessionId)// 服务器回包内容
               app.globalData.gstuname = that.data.teaname
               app.globalData.gphone = that.data.phone
               app.globalData.grole = that.data.role
               app.globalData.gunbindcount = res.data.unbindcount
               app.globalData.gbindflag = true
               app.globalData.gfirstbind = true

              wx.showToast({
                title: '认证成功',
                icon: 'none',
              })
              setTimeout(()=>
                {
                  wx.navigateBack({
                    delta: 2,
                  })
                }, 1000)

              }
            }
          })
        } else {

          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.role = options.id
    // console.log(this.data.role)

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