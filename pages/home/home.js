// pages/home/home.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolarray: [],
    schoolindex: 0,
    classarray: [],
    classindex: [0, 0],
    examarray: [],
    examindex: 0,
    stuname: '',
    stuscore:'',
    phone:'',
    bindflag: false,
    role:'0',
    userid:'',
    fparents: true,
    fteachers: false,
    fnet:false,
    fsubmit:true,
    ffirstshow:true,
    payinfo:'0',
    scorelist:{},
    identity: {
      icon: 'icon-class', // 根据实际图标名称进行设置
      text: '未绑定',
    },
  },
  bindSchoolChange: function(e) {
    // console.log('School发送选择改变，携带值为', e.detail.value)
    this.setData({
      schoolindex: e.detail.value,
      fsubmit: true,
    })

    var app = getApp()
    app.globalData.gsubmit = true
    app.globalData.gschoolarrayindex = e.detail.value
  },
  bindClassChange: function(e) {
    //console.log('Class发送选择改变，携带值为', e.detail.value)
    var app = getApp()
    app.globalData.gclassarrayindex = e.detail.value
    app.globalData.gsubmit = true
    var tmpexamarray = app.globalData.gexamarray

    var lexamarray = tmpexamarray[0]
    if (e.detail.value[0] == '0'){

      lexamarray = tmpexamarray[0]
    }
    if (e.detail.value[0] == '1'){

      lexamarray = tmpexamarray[1]
    }
    if (e.detail.value[0] == '2'){

      lexamarray = tmpexamarray[2]
    }
    if (e.detail.value[0] == '3'){

      lexamarray = tmpexamarray[3]
    }
    this.setData({
      classindex: e.detail.value,
      examarray: lexamarray,
      fsubmit: true
    })
  },

  bindClassColumnChange: function (e) {
    //console.log('双列修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      classarray: this.data.classarray,
      classindex: this.data.classindex
    };
    data.classindex[e.detail.column] = e.detail.value;
    var app = getApp()
    var tmpclassarray = app.globalData.gclassarray
    app.globalData.gsubmit = true


    switch (e.detail.column) {
      case 0:

        switch (data.classindex[0]) {
          case 0:
            data.classarray = tmpclassarray[0];
            break;
          case 1:
            data.classarray = tmpclassarray[1];
            break;
          case 2:
            data.classarray = tmpclassarray[2];
            break;
          case 3:
            data.classarray = tmpclassarray[3];
            break;          
        }
        data.classindex[1] = 0;
        break;
    }

    this.setData({
      classarray: data.classarray,
      classindex: data.classindex,
      fsubmit: true,
    });

  },
  Examtap:function(e){
    if (this.data.classindex[1] == 0){
      wx.showToast({ title: '获取信息失败，请选择先班级', icon: 'none', })
      return 
    }
  },
  bindExamChange: function(e) {
    // console.log('Exam发送选择改变，携带值为', e.detail.value)
    if (this.data.classindex[1] == 0){
      wx.showToast({ title: '获取信息失败，请选择先班级', icon: 'none', })
      return 
    }
    this.setData({
      examindex: e.detail.value,
      fsubmit: true,
    })
  },
  bindStunameInput: function (e) {

    var app = getApp()
    app.globalData.gstuname = e.detail.value
    app.globalData.gsubmit = true
    this.setData({
      stuname: e.detail.value,
      fsubmit: true
    })

  },
  bindinfo: function (e) {
    wx.navigateTo({ url: '/pages/certification/certification' })
  },

  submitdata: function (e) {
    if (!this.data.bindflag){
      wx.showToast({
        title: '请先绑定孩子信息',
        icon: 'none', //loading/success/none
      })
      return
    }
    if (this.data.classindex[1] == 0){
      wx.showToast({ title: '获取信息失败，请选择班级', icon: 'none', })
      return 
    }

    if (!this.data.fsubmit){
      return
    }

    var that = this

    wx.request({
      url: `https://cityinthesky.top/scorelist?stuname=${that.data.stuname}&classname=${that.data.classarray[1][that.data.classindex[1]]}&examname=${that.data.examarray[that.data.examindex]}&schoolname=${that.data.schoolarray[that.data.schoolindex]}&userid=${that.data.userid}&role=${that.data.role}`,
      success: function(res) {
        if (res.statusCode === 200){
          console.log(res.data)// 服务器回包信息
          if (res.data == "error"){
            wx.showToast({ title: '获取信息失败，请核对孩子班级姓名考试', icon: 'none', })
            return 
          }
          if (res.data == "isnull"){
            wx.showToast({ title: '获取信息失败，请核对孩子班级姓名考试', icon: 'none', })
            return 
          }
          that.setData({
            scorelist: res.data,
            fsubmit:false
          })
          return 
        }else{
          wx.showToast({ title: '获取信息失败，请核对孩子班级姓名', icon: 'none',})    
        }
      },
      fail: function (res) {
        wx.showToast({ title: '系统错误', icon: 'error',})
      },
    
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    var app = getApp()
    this.setData({
      stuname: app.globalData.gstuname,
      phone: app.globalData.gphone,
      bindflag: app.globalData.gbindflag,
      role: app.globalData.grole,
      userid: app.globalData.guserid,
      fnet:app.globalData.gnet,
      classindex:app.globalData.gclassarrayindex,
      schoolindex:app.globalData.gschoolarrayindex,
      schoolarray:app.globalData.gschoolarray,
      classarray:app.globalData.gclassarray[0],
      examarray:app.globalData.gexamarray[0],
      identity:app.globalData.gidentity,
    })

    var tmpclassarray = app.globalData.gclassarray
    var tmpexamarray = app.globalData.gexamarray



    switch (this.data.classindex[0]) {
      case 0:
        this.setData({
          classarray : tmpclassarray[0],
          examarray: tmpexamarray[0],
          examindex: 0,
        })

        break;
      case 1:
        this.setData({
          classarray : tmpclassarray[1],
          examarray: tmpexamarray[1],
          examindex: 0,
        })

        break;
      case 2:
        this.setData({
          classarray : tmpclassarray[2],
          examarray: tmpexamarray[2],
          examindex: 0,
        })
        
        break;
      case 3:
        this.setData({
          classarray : tmpclassarray[3],
          examarray: tmpexamarray[3],
          examindex: 0,
        })
          
        break;
    }

    if (this.data.role == '0'){
      this.setData({
        fparents : true,
        fteachers : false,
      })
    }
    if (this.data.role == '1'){
      this.setData({
        fparents : false,
        fteachers : true,
      })
    }
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
      stuname: app.globalData.gstuname,
      phone: app.globalData.gphone,
      bindflag: app.globalData.gbindflag,
      role: app.globalData.grole,
      classindex:app.globalData.gclassarrayindex,
      schoolindex:app.globalData.gschoolarrayindex,
      schoolarray:app.globalData.gschoolarray,
      classarray:app.globalData.gclassarray[0],
      fsubmit:app.globalData.gsubmit,
      // examarray:app.globalData.gexamarray[0],
    })

    if (app.globalData.gfirstbind){
      if (this.data.role == '0'){
        this.setData({
          fparents : true,
          fteachers : false,
        })
      }
      if (this.data.role == '1'){
        this.setData({
          fparents : false,
          fteachers : true,
        })
      }
    }

    var tmpclassarray = app.globalData.gclassarray
    var tmpexamarray = app.globalData.gexamarray


    switch (this.data.classindex[0]) {
      case 0:
        this.setData({
          classarray :tmpclassarray[0],
          examarray: tmpexamarray[0],
          // examindex: 0,
        })

        break;
      case 1:
        this.setData({
          classarray :tmpclassarray[1],
          examarray: tmpexamarray[1],
          // examindex: 0,
        })

        break;
      case 2:
        this.setData({
          classarray :tmpclassarray[2],
          examarray: tmpexamarray[2],
          // examindex: 0,
        })
        break;
      case 3:
        this.setData({
          classarray :tmpclassarray[3],
          examarray: tmpexamarray[3],
          // examindex: 0,
        })
        break;
    }

    if (this.data.ffirstshow && this.data.role == '0' && this.data.classindex[1] != 0){
      this.submitdata()
      this.data.ffirstshow = false
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
  onShareAppMessage(options) {
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