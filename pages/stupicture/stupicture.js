// pages/stupicture/stupicture.js
import * as echarts from '../../ec-canvas/echarts';

function setOption(chart,title,datalist,xname,yname,xdata,ydata,isinversey) {
  var tmpdata = []
  for (var i=0; i < datalist.length; i++){
    if (datalist[i] !='一本线'){
      var tmpobj ={
        name: datalist[i],
        type: 'line',
        //smooth: true,
        data: ydata[datalist[i]]
      }
    }else{
      var tmpobj ={
        name: datalist[i],
        type: 'line',
        color:'#FF3300',
        //smooth: true,
        data: ydata[datalist[i]]
      }
    }

    tmpdata.push(tmpobj)
  }
  if (isinversey == "1"){
    var yisinversey ={
      x: 'center',
      type: 'value',
      inverse:true,//翻转y轴
      scale:true,//不从0开始
      name:yname,
      nameLocation:'center',
      nameGap:37,
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      axisLine: {
        show: true
      },
      // show: false
    }
  }else{
    var yisinversey ={
      x: 'center',
      type: 'value',
      inverse:false,//不翻转y轴
      scale:true,//不从0开始
      name:yname,
      nameLocation:'center',
      nameGap:37,
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      axisLine: {
        show: true
      },
      // show: false
    }
  }

  var option = {
    title: {
      //text: '测试下面legend的红色区域不应被裁剪',
      text: title,
      left: 'center'
    },
    legend: {
      data: datalist,
      top: 30,
      left: 'center',
      //backgroundColor: 'red',
      z: 100
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      name:xname,
      nameLocation:'center',
      nameGap:23,
      data: xdata,
      axisLine: {
        onZero: false
      },
      // show: false
    },
    yAxis:yisinversey,
    series : tmpdata
  
  };

  chart.setOption(option);
  // return chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolarray: ['淅川一高'],
    schoolindex: 0,
    classarray: [],
    classindex: [0, 0],
    partarray: [],
    partindex: 0,
    stuname: '',
    stuscore:'',
    codeUrl:[],
    phone:'',
    bindflag:false,
    role:'0',
    userid:'',
    fparents: true,
    fteachers: false,
    fnet:false,
    fsubmit:true,
    ffirstshow:true,
    radioflag:'1',
    payinfo:'0',
    stucharts:{},
    identity: {
      icon: 'icon-class', // 根据实际图标名称进行设置
      text: '未绑定',
    },
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    isDisposed: false,
    isDisposed2: false,
    isDisposed3: false,
    isDisposed4: false,
    isDisposed5: false,
    isDisposed6: false,
    isDisposed7: false,
    isDisposed8: false,
    isDisposed9: false,
    isDisposed10: false,

  },
  bindSchoolChange: function(e) {
    // console.log('School发送选择改变，携带值为', e.detail.value)
    this.setData({
      schoolindex: e.detail.value,
      fsubmit: true
    })
    var app = getApp()
    app.globalData.gsubmit = true
    app.globalData.gschoolarrayindex = e.detail.value
  },
  bindClassChange: function(e) {
    // console.log('Class发送选择改变，携带值为', e.detail.value)
    var app = getApp()
    app.globalData.gclassarrayindex = e.detail.value
    app.globalData.gsubmit = true

    this.setData({
      classindex: e.detail.value,
      fsubmit :true,
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
  bindExamChange: function(e) {
    // console.log('part发送选择改变，携带值为', e.detail.value)
    this.setData({
      partindex: e.detail.value
    })

  },
  bindStunameInput: function (e) {
 
    var app = getApp()
    app.globalData.gstuname = e.detail.value
    app.globalData.gsubmit = true
    this.setData({
      stuname: e.detail.value,
      fsubmit: true,
    })
  },
  bindinfo: function (e) {
    wx.navigateTo({ url: '/pages/certification/certification' })
  },

  radioChange: function(e) {
    // console.log('用户选择的单选框的值为：', e.detail.value)
    this.setData({
      radioflag: e.detail.value,
      fsubmit: true,
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

    if (this.data.classindex[1] == 0){
      wx.showToast({ title: '获取信息失败，请核对班级、姓名', icon: 'none', })
      return 
    }

    if (!this.data.fsubmit){

      return
    }

    wx.showToast({
      title: '开始生成请稍后', 
      icon: 'success', 
      duration: 2000 
      });  
    this.onReady();

    var that = this
    var title = []
    var xname = []
    var yname = []
    var datalist = []
    var xdata = []
    var ydata = {}
    var ydatalist = []
    var flag = false
    var radioflag = that.data.radioflag
    wx.request({

      url: `https://cityinthesky.top/pic_data?stuname=${that.data.stuname}&classname=${that.data.classarray[1][that.data.classindex[1]]}&partname=${that.data.partarray[that.data.partindex]}&schoolname=${that.data.schoolarray[that.data.schoolindex]}&radioflag=${that.data.radioflag}&userid=${that.data.userid}&role=${that.data.role}`,
    
      success: function(res) {
        if (res.statusCode === 200){
          flag = true
          //console.log(res.data)// 服务器回包信息
          if (res.data == "error"){
            wx.showToast({ title: '获取信息失败，请核对班级、姓名', icon: 'none', })
            flag = false
            return 
          }
          if (res.data == "isnull"){
            wx.showToast({ title: '获取信息失败，请核对班级、姓名', icon: 'none', })
            flag = false
            return 
          }
          that.setData({
            stucharts : res.data,     //设置data里面的图片urlS
            fsubmit:false
          })
          title = that.data.stucharts.title
          datalist = that.data.stucharts.datalist
          xdata = that.data.stucharts.xdata
          for (var k=0; k < datalist.length; k++){
            var tmpydata = {}
            for (var i in datalist[k]){

              switch(datalist[k][i]){
                case '总分':
                case '总分段次':
                  var tmplist = []
                  for (var j in that.data.stucharts.ydata[k][i]["stu"]){
                    tmplist.push(that.data.stucharts.ydata[k][i]["stu"][j])
                  };
                  tmpydata.总分 = tmplist
                  break;
                case '语文':
                case '语文段次':
                  var tmplist = []
                  for (var j in that.data.stucharts.ydata[k][i]["stu"]){
                    tmplist.push(that.data.stucharts.ydata[k][i]["stu"][j])
                  };
                  tmpydata.语文 = tmplist
                  break;
                case '数学':
                case '数学段次':
                  var tmplist = []
                  for (var j in that.data.stucharts.ydata[k][i]["stu"]){
                    tmplist.push(that.data.stucharts.ydata[k][i]["stu"][j])
                  };
                  tmpydata.数学 = tmplist
                  break;
                  case '外语':
                  case '外语段次':
                    var tmplist = []
                    for (var j in that.data.stucharts.ydata[k][i]["stu"]){
                      tmplist.push(that.data.stucharts.ydata[k][i]["stu"][j])
                    };
                    tmpydata.外语 = tmplist
                    break;
                  case '物理':
                  case '物理段次':
                    var tmplist = []
                    for (var j in that.data.stucharts.ydata[k][i]["stu"]){
                      tmplist.push(that.data.stucharts.ydata[k][i]["stu"][j])
                    };
                    tmpydata.物理 = tmplist
                    break;
                  case '化学':
                  case '化学段次':
                    var tmplist = []
                    for (var j in that.data.stucharts.ydata[k][i]["stu"]){
                      tmplist.push(that.data.stucharts.ydata[k][i]["stu"][j])
                    };
                    tmpydata.化学 = tmplist
                    break;
                  case '生物':
                  case '生物段次':
                    var tmplist = []
                    for (var j in that.data.stucharts.ydata[k][i]["stu"]){
                      tmplist.push(that.data.stucharts.ydata[k][i]["stu"][j])
                    };
                    tmpydata.生物 = tmplist
                    break;
                  case '政治':
                  case '政治段次':
                    var tmplist = []
                    for (var j in that.data.stucharts.ydata[k][i]["stu"]){
                      tmplist.push(that.data.stucharts.ydata[k][i]["stu"][j])
                    };
                    tmpydata.政治 = tmplist
                    break;
                  case '历史':
                  case '历史段次':
                    var tmplist = []
                    for (var j in that.data.stucharts.ydata[k][i]["stu"]){
                      tmplist.push(that.data.stucharts.ydata[k][i]["stu"][j])
                    };
                    tmpydata.历史 = tmplist
                    break;
                  case '地理':
                  case '地理段次':
                    var tmplist = []
                    for (var j in that.data.stucharts.ydata[k][i]["stu"]){
                      tmplist.push(that.data.stucharts.ydata[k][i]["stu"][j])
                    };
                    tmpydata.地理 = tmplist
                    break;
                  case '理综':
                  case '理综段次':
                      var tmplist = []
                      for (var j in that.data.stucharts.ydata[k][i]["stu"]){
                        tmplist.push(that.data.stucharts.ydata[k][i]["stu"][j])
                      };
                      tmpydata.理综 = tmplist
                      break;
                  case '文综':
                  case '文综段次':
                        var tmplist = []
                        for (var j in that.data.stucharts.ydata[k][i]["stu"]){
                          tmplist.push(that.data.stucharts.ydata[k][i]["stu"][j])
                        };
                        tmpydata.文综 = tmplist
                        break;
                  case '综合':
                  case '综合段次':
                        var tmplist = []
                        for (var j in that.data.stucharts.ydata[k][i]["stu"]){
                          tmplist.push(that.data.stucharts.ydata[k][i]["stu"][j])
                        };
                        tmpydata.综合 = tmplist
                        break;
                case '一本线':
                case '一本线段次':
                  tmplist = []
                  for (var j in that.data.stucharts.ydata[k][i]["yibenxian"]){
                    tmplist.push(that.data.stucharts.ydata[k][i]["yibenxian"][j])
                  };
                  tmpydata.一本线 = tmplist
                  break;
              }
            }

            ydatalist.push(tmpydata)
          }
          xname = that.data.stucharts.xname
          yname = that.data.stucharts.yname
        }else{
          wx.showToast({ title: '获取信息失败，请核对班级、姓名、学科', icon: 'none', })
          flag = false
        }

        return
      },
      fail: function (res) {

        wx.showToast({ title: '系统错误', icon: 'error', })
        flag = false
        return 

      },
      complete: function (res) {

        if (flag){
          that.ecComponent.init((canvas, width, height, dpr) => {
            const chart = echarts.init(canvas, null, {
              width: width,
              height: height,
              devicePixelRatio: dpr // new
            });
            that.chart = chart;
   
            return chart;
          });

      
           for (var i=0; i < title.length; i++){

            switch(i){
              case 0:
 
                that.ecComponent.init((canvas, width, height, dpr) => {
                  // 获取组件的 canvas、width、height 后的回调函数
                  // 在这里初始化图表
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });

                  // setOption(chart,'test',['a','b','c'],['周一', '周二', '周三', '周四', '周五', '周六', '周日'],{'a':[18, 36, 65, 30, 78, 40, 33], 'b':[12, 50, 51, 35, 70, 30, 20], 'c':[10, 30, 31, 50, 40, 20, 10]});
                  setOption(chart,title[0],datalist[0],xname[0],yname[0],xdata[0],ydatalist[0],radioflag);
                  // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
                  that.chart = chart;
                  that.setData({
                    isDisposed: false
                  });
                  // 注意这里一定要返回 chart 实例，否则会影响事件处理等
                  return chart;
                });

                break;
             case 1:

              that.ecComponent2.init((canvas, width, height, dpr) => {
                // 获取组件的 canvas、width、height 后的回调函数
                // 在这里初始化图表
                const chart = echarts.init(canvas, null, {
                  width: width,
                  height: height,
                  devicePixelRatio: dpr // new
                });
                setOption(chart,title[1],datalist[1],xname[1],yname[1],xdata[1],ydatalist[1],radioflag);
                // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
                that.chart = chart;
                that.setData({
                  isDisposed2: false
                });
                // 注意这里一定要返回 chart 实例，否则会影响事件处理等
                return chart;
              });
              break;
              case 2:
 
                that.ecComponent3.init((canvas, width, height, dpr) => {
                  // 获取组件的 canvas、width、height 后的回调函数
                  // 在这里初始化图表
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  setOption(chart,title[2],datalist[2],xname[2],yname[2],xdata[2],ydatalist[2],radioflag);
                  // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
                  that.chart = chart;
                  that.setData({
                    isDisposed3: false
                  });
                  // 注意这里一定要返回 chart 实例，否则会影响事件处理等
                  return chart;
                });
                break;
                case 3:
                  that.ecComponent4.init((canvas, width, height, dpr) => {
                    // 获取组件的 canvas、width、height 后的回调函数
                    // 在这里初始化图表
                    const chart = echarts.init(canvas, null, {
                      width: width,
                      height: height,
                      devicePixelRatio: dpr // new
                    });
                    setOption(chart,title[3],datalist[3],xname[3],yname[3],xdata[3],ydatalist[3],radioflag);
                    // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
                    that.chart = chart;
                    that.setData({
                      isDisposed4: false
                    });
                    // 注意这里一定要返回 chart 实例，否则会影响事件处理等
                    return chart;
                  });

                break;
                case 4:
                  that.ecComponent5.init((canvas, width, height, dpr) => {
                    // 获取组件的 canvas、width、height 后的回调函数
                    // 在这里初始化图表
                    const chart = echarts.init(canvas, null, {
                      width: width,
                      height: height,
                      devicePixelRatio: dpr // new
                    });
                    setOption(chart,title[4],datalist[4],xname[4],yname[4],xdata[4],ydatalist[4],radioflag);
                    // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
                    that.chart = chart;
                    that.setData({
                      isDisposed5: false
                    });
                    // 注意这里一定要返回 chart 实例，否则会影响事件处理等
                    return chart;
                  });
                break;
                case 5:
                  that.ecComponent6.init((canvas, width, height, dpr) => {
                    // 获取组件的 canvas、width、height 后的回调函数
                    // 在这里初始化图表
                    const chart = echarts.init(canvas, null, {
                      width: width,
                      height: height,
                      devicePixelRatio: dpr // new
                    });
                    setOption(chart,title[5],datalist[5],xname[5],yname[5],xdata[5],ydatalist[5],radioflag);
                    // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
                    that.chart = chart;
                    that.setData({
                      isDisposed6: false
                    });
                    // 注意这里一定要返回 chart 实例，否则会影响事件处理等
                    return chart;
                  });
 
                break;
                case 6:
                  that.ecComponent7.init((canvas, width, height, dpr) => {
                    // 获取组件的 canvas、width、height 后的回调函数
                    // 在这里初始化图表
                    const chart = echarts.init(canvas, null, {
                      width: width,
                      height: height,
                      devicePixelRatio: dpr // new
                    });
                    setOption(chart,title[6],datalist[6],xname[6],yname[6],xdata[6],ydatalist[6],radioflag);
                    // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
                    that.chart = chart;
                    that.setData({
                      isDisposed7: false
                    });
                    // 注意这里一定要返回 chart 实例，否则会影响事件处理等
                    return chart;
                  });
 
                break;
                case 7:
                  that.ecComponent8.init((canvas, width, height, dpr) => {
                    // 获取组件的 canvas、width、height 后的回调函数
                    // 在这里初始化图表
                    const chart = echarts.init(canvas, null, {
                      width: width,
                      height: height,
                      devicePixelRatio: dpr // new
                    });
                    setOption(chart,title[7],datalist[7],xname[7],yname[7],xdata[7],ydatalist[7],radioflag);
                    // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
                    that.chart = chart;
                    that.setData({
                      isDisposed8: false
                    });
                    // 注意这里一定要返回 chart 实例，否则会影响事件处理等
                    return chart;
                  });
 
                break;
                case 8:
                  that.ecComponent9.init((canvas, width, height, dpr) => {
                    // 获取组件的 canvas、width、height 后的回调函数
                    // 在这里初始化图表
                    const chart = echarts.init(canvas, null, {
                      width: width,
                      height: height,
                      devicePixelRatio: dpr // new
                    });
                    setOption(chart,title[8],datalist[8],xname[8],yname[8],xdata[8],ydatalist[8],radioflag);
                    // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
                    that.chart = chart;
                    that.setData({
                      isDisposed9: false
                    });
                    // 注意这里一定要返回 chart 实例，否则会影响事件处理等
                    return chart;
                  });
 
                break;
                case 9:
                  that.ecComponent10.init((canvas, width, height, dpr) => {
                    // 获取组件的 canvas、width、height 后的回调函数
                    // 在这里初始化图表
                    const chart = echarts.init(canvas, null, {
                      width: width,
                      height: height,
                      devicePixelRatio: dpr // new
                    });
                    setOption(chart,title[9],datalist[9],xname[9],yname[9],xdata[9],ydata[9],radioflag);
                    // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
                    that.chart = chart;
                    that.setData({
                      isDisposed10: false
                    });
                    // 注意这里一定要返回 chart 实例，否则会影响事件处理等
                    return chart;
                  });
 
                break;
            }
          }
        }
      }  
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
      partarray:app.globalData.gpartarray,
      identity:app.globalData.gidentity,
    })
    wx.setNavigationBarTitle({
      title: '进退步展示'
    })

    var tmpclassarray = app.globalData.gclassarray

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
        classarray :tmpclassarray[3],
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
  // 获取组件
  this.ecComponent = this.selectComponent('#mychart-dom-bar');
  this.ecComponent2 = this.selectComponent('#mychart-dom-bar2');
  this.ecComponent3 = this.selectComponent('#mychart-dom-bar3');
  this.ecComponent4 = this.selectComponent('#mychart-dom-bar4');
  this.ecComponent5 = this.selectComponent('#mychart-dom-bar5');
  this.ecComponent6 = this.selectComponent('#mychart-dom-bar6');
  this.ecComponent7 = this.selectComponent('#mychart-dom-bar7');
  this.ecComponent8 = this.selectComponent('#mychart-dom-bar8');
  this.ecComponent9 = this.selectComponent('#mychart-dom-bar9');
  this.ecComponent10 = this.selectComponent('#mychart-dom-bar10');
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
      // partarray:app.globalData.gpartarray,
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
          classarray :tmpclassarray[3],
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