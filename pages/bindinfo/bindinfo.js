// pages/bindinfo/bindinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"123",
    stuname:"",
    role:'0',
    schoolarray: ['淅川一高'],
    schoolindex: 0,
    gradearray: ['2022级','2021级','2020级'],
    gradeindex: 0,
    payinfo:'0',
    isChecked: false,
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

    if (this.data.stuname == ''){
      wx.showToast({
        title: '请输入孩子姓名',
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
            url: `https://cityinthesky.top/bindinfo?code=${res.code}&schoolname=${that.data.schoolarray[that.data.schoolindex]}&phone=${that.data.phone}&stuname=${that.data.stuname}&role=${that.data.role}`,
            success: function(res) {

              // 登录成功
              if (res.statusCode === 200) {

               //console.log(res.data.sessionId)// 服务器回包内容
               app.globalData.gstuname = that.data.stuname
               app.globalData.gphone = that.data.phone
               app.globalData.grole = that.data.role
               app.globalData.gunbindcount = res.data.unbindcount
               app.globalData.gbindflag = true
               app.globalData.gfirstbind = true

              wx.showToast({
                title: '绑定成功',
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
  bindSchoolChange: function(e) {
    // console.log('School发送选择改变，携带值为', e.detail.value)
    this.setData({
      schoolindex: e.detail.value
    })
  },
  bindGradeChange: function(e) {
    // console.log('Grade发送选择改变，携带值为', e.detail.value)
    this.setData({
      gradeindex: e.detail.value
    })
  },
  bindPhoneInput: function (e) {
    // console.log(e.detail.value)
    this.setData({
      phone: e.detail.value
    })
  },
  bindStunameInput: function (e) {
    // console.log(e.detail.value)
    this.setData({
      stuname: e.detail.value
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