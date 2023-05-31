/*测试用的不用看*/
Page({
  data: {
    allList: [
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 },
      { label: '选项3', value: 3 },
      { label: '选项4', value: 4 },
      { label: '选项5', value: 5 },
      { label: '选项6', value: 6 },
      { label: '选项7', value: 7 },
      { label: '选项8', value: 8 },
      { label: '选项9', value: 9 },
      { label: '选项10', value: 10 },
      { label: '选项11', value: 11 },
      { label: '选项12', value: 12 },
      { label: '选项13', value: 13 },
      { label: '选项14', value: 14 },
      { label: '选项15', value: 15 },
    ],
    searchValue: '',
    displayList: [],
  },

  onLoad: function () {
    // 初始化显示所有选项
    this.setData({
      displayList: this.data.allList,
    });
  },

  onSearchInputChange: function (e) {
    // 监听搜索框输入
    this.setData({
      searchValue: e.detail.value,
    });
  },

  onSearchConfirm: function () {
    // 监听搜索框确认
    this.searchData();
  },

  onSearchClear: function () {
    // 监听清空搜索框
    this.setData({
    searchValue: '',
    displayList: this.data.allList,
    });
    },
    
    onSearchCancel: function () {
    // 监听取消搜索
    wx.navigateBack({
    delta: 1,
    });
    },
    
    onCheckboxChange: function (e) {
    // 监听多选框选择
    const value = e.detail.value;
    const items = this.data.displayList;
    for (let i = 0; i < items.length; i++) {
    if (value.indexOf(items[i].value) !== -1) {
    items[i].checked = true;
    } else {
    items[i].checked = false;
    }
    }
    this.setData({
    displayList: items,
    });
    },
    
    searchData: function () {
    // 搜索选项
    const searchValue = this.data.searchValue.trim().toLowerCase();
    const items = this.data.allList;
    const result = [];
    for (let i = 0; i < items.length; i++) {
    if (items[i].label.toLowerCase().indexOf(searchValue) !== -1) {
    result.push(items[i]);
    }
    }
    this.setData({
    displayList: result,
    });
    },
    });
    
    
    
    
    
    