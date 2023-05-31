// app.js
App({
  globalData:{
    gbindflag:false,
    gstuname:'',
    gphone:'',
    grole:'0',
    gpayinfo:'0',
    guserid:'',
    gnet:false,
    gsubmit:true,
    gunbindcount:0,
    gschoolarray:[],
    gclassarray:[],
    gexamarray:[],
    ganalysisarray:[],
    gkeystuarray:[],
    gpartarray:[],
    gschoolarrayindex:0,
    gclassarrayindex:[0,0],
    gfirstbind:false,
    gidentity: {
      icon: 'icon-class', // 根据实际图标名称进行设置
      text: '未绑定',
    },
  },
    
  /**
   * 生命周期函数--监听页面加载
   */
  onLaunch(options) {
    var that = this
    wx.login({
      success: function(res) {
        if (res.code) {
          wx.request({
            url: `https://cityinthesky.top/isbind?code=${res.code}`,
            success: function(res) {
              // 登录成功
              if (res.statusCode === 200) {
                if(res.data == "error"){
                  return
                }
                if(res.data == "isnull"){
                }
                //console.log(res.data)
                that.globalData.gbindflag = res.data.flag
                that.globalData.gphone = res.data.phone
                that.globalData.grole = res.data.role
                that.globalData.gstuname = res.data.stuname
                that.globalData.gunbindcount = res.data.unbindcount
                that.globalData.guserid = res.data.userid
                that.globalData.gnet = true
                that.globalData.gschoolarray = res.data.schoolarray
                that.globalData.gclassarray = res.data.classarray
                that.globalData.gexamarray = res.data.examarray
                that.globalData.gpartarray = res.data.partarray
                that.globalData.ganalysisarray = res.data.analysisarray
                that.globalData.gkeystuarray = res.data.keystuarray
                that.globalData.gschoolarrayindex = res.data.schoolarrayindex
                that.globalData.gclassarrayindex = res.data.classarrayindex

                if(that.globalData.grole == 0){
                  var identity = {
                    icon: 'icon-class', // 根据实际图标名称进行设置
                    text: '家长',
                  }
                  that.globalData.gidentity = identity
                }else if(that.globalData.grole == 1){
                  var identity = {
                    icon: 'icon-class', // 根据实际图标名称进行设置
                    text: '老师',
                  }
                  that.globalData.gidentity = identity
                }else{
                  var identity = {
                    icon: 'icon-class', // 根据实际图标名称进行设置
                    text: '未绑定',
                  }
                  that.globalData.gidentity = identity
                }
                
              }
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
          that.globalData.gbindflag = false
        }
      }
    });

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

  }
})
