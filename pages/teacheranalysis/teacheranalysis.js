// pages/teacheranalysis/teacheranalysis.js
// pages/analysis/analysis.js

import * as echarts from '../../ec-canvas/echarts';

function setOption(chart,title,referencedata,studata) {
  var option = {
    title: {
      //text: '测试下面legend的红色区域不应被裁剪',
      text: title,
      // left: 'center',
      top: 0,
      textStyle: {
        fontSize: 14,
        fontWeight: 'bold'
      }
    },
    // legend: {
    //   data: ['能力值'],
    //   top:30,
    // },
    backgroundColor: "#ffffff",
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    radar: {
      // shape: 'circle',
      indicator: referencedata
    },
    series: [{
      name: '能力值',
      type: 'radar',
      data: [{
        value: studata,
        name: '能力值'
      },

      ]
    }]
  };

  chart.setOption(option);
  return chart;

}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolarray: [],
    schoolindex: 0,
    classarray: [],
    classindex: [0, 0],
    gradeindex: 0,
    partarray: [],
    partindex: 0,
    keystuarray: [],
    keystuindex: 0,
    stuname: '',
    phone:'',
    bindflag: false,
    role:'0',
    userid:'',
    roleanalysis:'0',
    fparents: true,
    fteachers: false,
    fnet:false,
    fsubmit:true,
    fteaanalysis:true,
    fpstushow:false,
    fpteashow:false,
    fKeyStu:false,
    fstudentanalysis:false,
    fclassanalysis:true,
    fgradeanalysis:false,
    payinfo:'0',
    totalNum: 0,
    passNum: 0,
    passRate: 0,
    thisExam:'',
    identity: {
      icon: 'icon-class', // 根据实际图标名称进行设置
      text: '未绑定',
    },
    allsubjects: [
    ],
    thisExamData: [
    ],
    classgradedata:{

    },
    Keystudent:[{'name':"总分一本临界生",'data':[['A','B','C',],
    ['21','22','23',],
   ]},
    {'name':"语文一本临界生",'data':[['A','B','C','D'],
    ['21','22','23','24'],
    ['A','B','C','D'],
    ['25','26','27','28']]},
    ],
    ec: {
      // onInit: initChart
      lazyLoad: true
    },
    
  },
  bindSchoolChange: function(e) {
    // console.log('School发送选择改变，携带值为', e.detail.value)
    this.setData({
      schoolindex: e.detail.value
    })
  },
  bindClassChange: function(e) {
    // console.log('Class发送选择改变，携带值为', e.detail.value)
    var app = getApp()
    app.globalData.gclassindex = e.detail.value

    this.setData({
      classindex: e.detail.value,
    })
  },

  bindClassColumnChange: function (e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      classarray: this.data.classarray,
      classindex: this.data.classindex
    };
    data.classindex[e.detail.column] = e.detail.value;
    var app = getApp()
    var tmpclassarray = app.globalData.gclassarray


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
    });

  },

  bindGradeChange: function(e) {
    // console.log('part发送选择改变，携带值为', e.detail.value)
    var tmp = ['整体','语文','数学','英语']
    if(e.detail.value == 1){
      tmp = ['整体','语文','数学','英语']
    }else{
      tmp = ['整体','语文','数学','英语','物/政','化/历','生/地']
    }
    this.setData({
      gradeindex: e.detail.value,
      partarray:tmp
    })


  },

  bindPartChange: function(e) {
    // console.log('part发送选择改变，携带值为', e.detail.value)
    this.setData({
      partindex: e.detail.value
    })

  },

  bindKeyStuChange: function(e) {
    // console.log('School发送选择改变，携带值为', e.detail.value)
    this.setData({
      keystuindex: e.detail.value
    })
  },

  bindStunameInput: function (e) {

    var app = getApp()
    app.globalData.gstuname = e.detail.value
    this.setData({
      stuname: e.detail.value
    })
  },

  classgogogo: function (e) {
    console.log("classgogogo")
    this.setData({
      fteaanalysis:true,
      fclassanalysis:true,
      fgradeanalysis:false,
      roleanalysis:'1',
    })
  },
  gradegogogo: function (e) {
    console.log("gradegogogo")
    this.setData({
      fteaanalysis:true,
      fclassanalysis:false,
      fgradeanalysis:true,
      roleanalysis:'2',
    })
  },

  submitdata: function (e) {
    if (!this.data.bindflag){
      wx.showToast({
        title: '请先绑定孩子信息',
        icon: 'none', //loading/success/none
      })
      return
    }

    if (!this.data.fsubmit){
      return
    }

    wx.showToast({
      title: '开始生成请稍后', 
      icon: 'success', 
      duration: 1000 
      });  
    this.onReady();

    var that = this


    wx.request({
      url: `https://cityinthesky.top/dataanalysis?stuname=${that.data.stuname}&classname=${that.data.classarray[1][that.data.classindex[1]]}&gradename=${that.data.classarray[0][that.data.gradeindex]}&schoolname=${that.data.schoolarray[that.data.schoolindex]}&partindex=${that.data.partindex}&userid=${that.data.userid}&role=${that.data.role}&roleanalysis=${that.data.roleanalysis}&keystuflag=${that.data.keystuindex}`,
      success: function(res) {
        if (res.statusCode === 200){
          console.log("res.data",res.data)// 服务器回包信息
          if (res.data == "error"){
            wx.showToast({ title: '获取信息失败，请核对选项信息', icon: 'none', })
            return 
          }
          if (res.data == "isnull"){
            wx.showToast({ title: '获取信息失败，请核对选项信息', icon: 'none', })
            return 
          }

          var tmp = {'td':res.data['td'], 'th':res.data['th']}

          if (that.data.role == '1' && that.data.roleanalysis != '0'){

            if (res.data['KeyStu'] != null && res.data['KeyStu'] != "isnull"){
              if (that.data.keystuindex == 0)
              {
                var note = '一本线段次上下浮动150名次的为一本临界生'
              }else{
                var note = '历次一本进线率在60%-70%之间的为一本临界生（包含60%不包含70%）'
              }
              that.setData({
                KeyStuNote:note,
                fKeyStu:true,
              })
            }

            that.setData({
              fpstushow:false,
              fpteashow:true,
              classgradedata : tmp,
              Keystudent : res.data['KeyStu']
            })

            return
          }

          var title = '一本能力值'
          var referencedata = [{ name:res.data[1][1]['name'] , max: res.data[0]['totalNum']},
          { name:res.data[1][2]['name'] , max: res.data[0]['totalNum']},
          { name:res.data[1][3]['name'] , max: res.data[0]['totalNum']},
          { name:res.data[1][4]['name'] , max: res.data[0]['totalNum']},
          { name:res.data[1][5]['name'] , max: res.data[0]['totalNum']},
          { name:res.data[1][6]['name'] , max: res.data[0]['totalNum']},]
          var studata = [res.data[1][1]['passNum'],res.data[1][2]['passNum'],res.data[1][3]['passNum'],
          res.data[1][4]['passNum'],res.data[1][5]['passNum'],res.data[1][6]['passNum']]
          console.log(title,referencedata,studata)
          that.ecComponent.init((canvas, width, height, dpr) => {
            // 获取组件的 canvas、width、height 后的回调函数
            // 在这里初始化图表
            const chart = echarts.init(canvas, null, {
              width: width,
              height: height,
              devicePixelRatio: dpr // new
            });
      
            setOption(chart,title,referencedata,studata);
            // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
            that.chart = chart;
      
            // 注意这里一定要返回 chart 实例，否则会影响事件处理等
            return chart;
          });
          var text = ''
          if (res.data[1][0]['passRate'] > 90){
            text += '孩子的成绩整体情况很好，'
          }else if(res.data[1][0]['passRate'] > 70){
            text += '孩子的成绩整体情况较好，'
          }else if(res.data[1][0]['passRate'] > 50){
            text += '孩子的成绩有波动，'
          }else {
            text += '孩子的成绩目前存在差距，'
          }
          var goodpart = []
          var badpart = []

          for(var i =1 ;i < res.data[1].length; i++){
            if (res.data[1][i]['passRate'] > 80){
              if (res.data[1][i]['name'] != '理综' && res.data[1][i]['name'] != '文综'){
                goodpart.push(res.data[1][i]['name'])
              }
            } 
            if (res.data[1][i]['passRate'] < 55){
              if (res.data[1][i]['name'] != '理综' && res.data[1][i]['name'] != '文综'){
                badpart.push(res.data[1][i]['name'])
              }
            }
          }
          if(goodpart.length != 0){
            text += '优势科目：'
            for(var i =0 ;i < goodpart.length; i++){
              text += goodpart[i]
              if(i != (goodpart.length -1)){
                text += '、'
              }
            }
          }
          if(badpart.length != 0){
            if(goodpart.length != 0){
              text += '；劣势科目：'
            }else{
              text += '劣势科目：'
            }
            for(var i =0 ;i < badpart.length; i++){
              text += badpart[i]
              if(i != (badpart.length -1)){
                text += '、'
              }
            }
          }

          that.setData({
            totalNum: res.data[0]['totalNum'],
            allsubjects: res.data[1],
            passNum:res.data[1][0]['passNum'],
            passRate:res.data[1][0]['passRate'],
            thisExam:res.data[2][0]['thisExam'],
            thisExamData:res.data[2][1],
            resultanalysis:text,
            fpstushow: true,
            fpteashow:false,
            fsubmit:false,
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
    console.log("options",options)
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
      keystuarray:app.globalData.gkeystuarray,
      identity:app.globalData.gidentity,
    })

    var tmpclassarray = app.globalData.gclassarray
    var tmpexamarray = app.globalData.gexamarray



    switch (this.data.classindex[0]) {
      case 0:
        this.setData({
          classarray : tmpclassarray[0],
        })

        break;
      case 1:
        this.setData({
          classarray : tmpclassarray[1],
        })

        break;
      case 2:
        this.setData({
          classarray : tmpclassarray[2],
        })
        
        break;
      case 3:
        this.setData({
          classarray : tmpclassarray[3],
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

    if (options.id == '0'){
      this.setData({
        fstudentanalysis:true,
        fclassanalysis:false,
        fgradeanalysis:false,
        roleanalysis:'0',
      })
      wx.setNavigationBarTitle({
        title: '学生分析'
      })
    }
    else if (options.id == '1'){
      this.setData({
        fstudentanalysis:false,
        fclassanalysis:true,
        fgradeanalysis:false,
        roleanalysis:'1',
      })
      wx.setNavigationBarTitle({
        title: '班级分析'
      })
    }
    else if (options.id == '2'){
      this.setData({
        fstudentanalysis:false,
        fclassanalysis:false,
        fgradeanalysis:true,
        roleanalysis:'2',
      })
      wx.setNavigationBarTitle({
        title: '年级分析'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.ecComponent = this.selectComponent('#mychart-dom-graph');
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
      keystuarray:app.globalData.gkeystuarray,
      fsubmit:app.globalData.gsubmit,
    })

    var tmpclassarray = app.globalData.gclassarray

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


    switch (this.data.classindex[0]) {
      case 0:
        this.setData({
          classarray :tmpclassarray[0],

        })

        break;
      case 1:
        this.setData({
          classarray :tmpclassarray[1],

        })

        break;
      case 2:
        this.setData({
          classarray :tmpclassarray[2],
        })
        break;
      case 3:
        this.setData({
          classarray : tmpclassarray[3],
        })
            
        break;
    }


    if (this.data.role == '1'){
      this.setData({
        fteaanalysis : false
      })
    }else{
      this.setData({
        fteaanalysis : true
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