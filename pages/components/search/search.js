import request from '../../api/request'

const app = new getApp()

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    isIpx: app.globalData.isIpx,
    searchboxPadding: '170rpx',
    resetPadding: '97rpx',
    tabsSearch: [
      {
        value: 1,
        label: 'GIA'
      },
      {
        value: 2,
        label: '空托'
      }
    ],
    TabCur: 1,
    currentShapeIndex: -1,
    // 形状（这个版本没有）
    // shape: [
    //   '../../images/1-1.png',
    //   '../../images/2-1.png',
    //   '../../images/3-1.png'
    // ],
    // 规格
    ggGiaList: [],
    ggGiaIndex: -1,
    // 颜色
    ysGiaList: [],
    ysGiaIndex: -1,
    // 净度
    jbGiaList: [],
    jbGiaIndex: -1,
    // 快捷键
    quickGiaList: [],
    quickGiaIndex: -1,
    // 切工
    qgGiaList: [],
    qgGiaIndex: -1,
    // 抛光
    pgGiaList: [],
    pgGiaIndex: -1,
    // 对称
    dcGiaList: [],
    dcGiaIndex: -1,
    // 荧光
    ygGiaList: [],
    ygGiaIndex: -1,
    // 证书
    zsGiaList: [],
    zsGiaIndex: -1,
    // 地点
    placeGiaList: [],
    placeGiaIndex: -1,
    // 空托
    diamondType: [
      '../../images/0-1.png',
      '../../images/1-1.png',
      '../../images/2-1.png'
    ],
    // currentShapeStatus: 0,
    // 分
    xkgyTzList: [],
    xkgyTzIndex: -1,
    // 手寸
    scTzList: [],
    scTzIndex: -1,
    // 金重
    jjzTzList: [],
    jjzTzIndex: -1,
    // 工厂
    factoryTzList: [],
    factoryTzIndex: -1,
    // 材质
    czTzList: [],
    czTzIndex: -1,
    // 工艺
    gyTzList: [],
    gyTzIndex: -1,
    // 戒臂
    jbTzList: [],
    jbTzIndex: -1,
    // 副石
    stones: ['有', '无'],
    stonesIndex: -1,
    // 热门搜索
    hotTzList: [],
    hotTzIndex: -1,
    // gia搜索参数
    giaParams: {
      currentPage: 1,
      pagesize: 50,
      // 对称
      dc: '',
      // 规格
      gg: '',
      // 净度
      jb: '',
      // 抛光
      pg: '',
      // 地点
      place: '',
      // 价格开始
      priceStart: '',
      // 价格结束
      priceEnd: '',
      // 切工
      qg: '',
      // 推荐搜索
      quick: '',
      // 荧光
      yg: '',
      // 颜色
      ys: '',
      // 重量开始
      zlStart: '',
      // 重量结束
      zlEnd: '',
      // 证书
      zs: ''
    },
    // 空托搜索参数
    ktParams: {
      currentPage: 1,
      pagesize: 50,
      // 材质
      cz: '',
      // 工厂
      factory: '',
      // 工艺
      gy: '',
      // 热门搜索
      hot: '',
      // 副石 0 有，1 无
      isfs: '',
      // 戒臂
      jb: '',
      // 首饰类别
      sslb: '',
      // 金重
      jjz: '',
      // 手寸
      sc: '',
      // 镶口
      xkgy: ''
      // // 金重开始
      // jjzStart: '',
      // // 金重结束
      // jjzEnd: '',
      // // 手寸开始
      // scStart: '',
      // // 手寸结束
      // scEnd: '',
      // // 镶口开始
      // xkgyStart: '',
      // // 镶口结束
      // xkgyEnd: '',
    },
    isMale: false
  },
  ready () {
    if (this.data.isIpx) {
      this.setData({
        searchboxPadding: '300rpx',
        resetPadding: '100rpx'
      })
    } else {
      this.setData({
        searchboxPadding: '242rpx',
        resetPadding: '97rpx'
      })
    }
    // 获取小程序页面搜索参数
    request('basic/appletsearchinfo').then(res => {
      if (res.data.code === 0) {
        let data = res.data.data
        this.setData({
          // 规格
          ggGiaList: data.ggGiaList,
          // 颜色
          ysGiaList: data.ysGiaList,
          // 净度
          jbGiaList: data.jbGiaList,
          // 快捷键
          quickGiaList: data.quickGiaList,
          // 切工
          qgGiaList: data.qgGiaList,
          // 抛光
          pgGiaList: data.pgGiaList,
          // 对称
          dcGiaList: data.dcGiaList,
          // 荧光
          ygGiaList: data.ygGiaList,
          // 证书
          zsGiaList: data.zsGiaList,
          // 地点
          placeGiaList: data.placeGiaList,
          // 分
          xkgyTzList: data.xkgyTzList,
          // 手寸
          scTzList: data.scTzList,
          // 金重
          jjzTzList: data.jjzTzList,
          // 工厂
          factoryTzList: data.factoryTzList,
          // 材质
          czTzList: data.czTzList,
          // 工艺
          gyTzList: data.gyTzList,
          // 戒臂
          jbTzList: data.jbTzList,
          // 热门搜索
          hotTzList: data.hotTzList
        })
      }
    })
  },
  methods: {
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id
      })
    },
    selectShape(e) {
      let shapeIndex = e.currentTarget.dataset.shapeIndex
      
      this.setData({
        'ktParams.sslb': e.currentTarget.dataset.shapeIndex == this.data.currentShapeIndex ? '' : (shapeIndex==0 ? '女戒' : (shapeIndex==1 ? '男戒' : (shapeIndex==2 ? '吊坠' : ''))),
        isMale: shapeIndex == 0 ? true : false,
        currentShapeIndex: e.currentTarget.dataset.shapeIndex == this.data.currentShapeIndex ? '-1' : shapeIndex
      })
    },
    // 重置GIA搜索条件
    resetGIA() {
      let self = this


      // 规格
      let arr1 = []
      self.data.ggGiaList.map(item => {
        arr1.push({
          value: item.value,
          selected: false
        })
      })

      // 颜色
      let arr2 = []
      self.data.ysGiaList.map(item => {
        arr2.push({
          value: item.value,
          selected: false
        })
      })

      // 净度
      let arr3 = []
      self.data.jbGiaList.map(item => {
        arr3.push({
          value: item.value,
          selected: false
        })
      })

      // 切工
      let arr4 = []
      self.data.qgGiaList.map(item => {
        arr4.push({
          value: item.value,
          selected: false
        })
      })

      // 荧光
      let arr5 = []
      self.data.ygGiaList.map(item => {
        arr5.push({
          value: item.value,
          selected: false
        })
      })

      // 抛光
      let arr6 = []
      self.data.pgGiaList.map(item => {
        arr6.push({
          value: item.value,
          selected: false
        })
      })
      
      // 对称
      let arr7 = []
      self.data.dcGiaList.map(item => {
        arr7.push({
          value: item.value,
          selected: false
        })
      })

      this.setData({
        giaParams: {
          currentPage: 1,
          pagesize: 50,
          dc: '',
          gg: '',
          jb: '',
          pg: '',
          place: '',
          priceEnd: '',
          qg: '',
          quick: '',
          yg: '',
          ys: '',
          zlStart: '',
          zlEnd: '',
          zs: ''
        },
        ggGiaList: arr1,
        ysGiaList: arr2,
        jbGiaList: arr3,
        qgGiaList: arr4,
        ygGiaList: arr5,
        pgGiaList: arr6,
        dcGiaList: arr7,
        quickGiaIndex: -1,
        zsGiaIndex: -1,
        placeGiaIndex: -1
      })
    },
    // GIA搜索结果
    searchGIA() {
      let searchParam = this.data.giaParams
      
      wx.navigateTo({
        url: '../../pages/search-result-gia/search-result-gia',
        events: {
          acceptParams: function (data) {
            console.log('accept params:', data)
          }
        },
        success: function (res) {
          // 搜索时将页码重置为第一页
          searchParam.currentPage = 1
          res.eventChannel.emit('acceptParams', searchParam)
        },
        fail (err) {
          console.log(err)
        }
      })
    },
    // 重置空托搜索条件
    resetSupport() {
      let self = this

      let arr1 = []
      self.data.xkgyTzList.map(item => {
        arr1.push({
          value: item.value,
          selected: false
        })
      })

      let arr2 = []
      self.data.scTzList.map(item => {
        arr2.push({
          value: item.value,
          selected: false
        })
      })

      let arr3 = []
      self.data.jjzTzList.map(item => {
        arr3.push({
          value: item.value,
          selected: false
        })
      })

      let arr4 = []
      self.data.czTzList.map(item => {
        arr4.push({
          value: item.value,
          selected: false
        })
      })

      let arr5 = []
      self.data.jbTzList.map(item => {
        arr5.push({
          value: item.value,
          selected: false
        })
      })

      this.setData({
        ktParams: {
          currentPage: 1,
          pagesize: 50,
          // 材质
          cz: '',
          // 工厂
          factory: '',
          // 工艺
          gy: '',
          // 热门搜索
          hot: '',
          // 副石 0 有，1 无
          isfs: '',
          // 戒臂
          jb: '',
          // 金重
          jjz: '',
          // 手寸
          sc: '',
          // 镶口
          xkgy: '',
          // // 金重开始
          // jjzStart: '',
          // // 金重结束
          // jjzEnd: '',
          // // 手寸开始
          // scStart: '',
          // // 手寸结束
          // scEnd: '',
          // 首饰类别
          sslb: '',
          // // 镶口开始
          // xkgyStart: '',
          // // 镶口结束
          // xkgyEnd: ''
        },
        xkgyTzList: arr1,
        scTzList: arr2,
        jjzTzList: arr3,
        czTzList: arr4,
        jbTzList: arr5,
        factoryTzIndex: -1,
        gyTzIndex: -1,
        stonesIndex: -1,
        hotTzIndex: -1,
        isMale: false,
        currentShapeIndex: -1
      })
    },
    // 空托搜索结果
    searchSupport() {
      let searchParam = this.data.ktParams
      
      wx.navigateTo({
        url: '../../pages/search-result-support/search-result-support',
        events: {
          acceptParams: function (data) {
            console.log('accept params:', data)
          }
        },
        success: function (res) {
          // 搜索时将页码重置为第一页
          searchParam.currentPage = 1
          res.eventChannel.emit('acceptParams', searchParam)
        },
        fail (err) {
          console.log(err)
        }
      })
    },
    // 获取多选参数
    getSelectParams: function(list, dataset) {
      let arr = list
      arr[dataset.index].selected = !arr[dataset.index].selected

      let values = []
      arr.map(item => {
        if (item.selected) {
          values.push(item.value)
        }
      })

      return {
        list: arr,
        params: values.join(';')
      }
    },
    // 选择规格
    tapSpecsItem(e) {
      let target = e.currentTarget
      let dataset = target.dataset
      
      let searchObj = new this.getSelectParams(this.data.ggGiaList, dataset)
      this.setData({
        'giaParams.gg': searchObj.params,
        ggGiaList:  searchObj.list
      })

      console.log(this.data.ggGiaList, this.data.ggGiaList)
    },
    // 选择颜色
    tapColorItem(e) {
      let target = e.currentTarget
      let dataset = target.dataset
      
      let searchObj = new this.getSelectParams(this.data.ysGiaList, dataset)
      this.setData({
        'giaParams.ys': searchObj.params,
        ysGiaList:  searchObj.list
      })
    },
    // 选择净度
    tapJDItem(e) {
      let target = e.currentTarget
      let dataset = target.dataset

      let searchObj = new this.getSelectParams(this.data.jbGiaList, dataset)
      this.setData({
        'giaParams.jb': searchObj.params,
        jbGiaList:  searchObj.list
      })
    },
    // 选择快捷键
    tapQuickItem(e) {
      let target = e.currentTarget
      let dataset = target.dataset

      let self = this
      
      this.setData({
        'giaParams.quick': this.data.quickGiaIndex == dataset.index ? '' : dataset.value,
        quickGiaIndex: this.data.quickGiaIndex == dataset.index ? -1 : dataset.index
      })

      // return
      // 联动切工，抛光，对称，荧光
      // 切工
      let arr4 = []
      self.data.qgGiaList.map(item => {
        arr4.push({
          value: item.value,
          selected: false
        })
      })

      // 荧光
      let arr5 = []
      self.data.ygGiaList.map(item => {
        arr5.push({
          value: item.value,
          selected: false
        })
      })

      // 抛光
      let arr6 = []
      self.data.pgGiaList.map(item => {
        arr6.push({
          value: item.value,
          selected: false
        })
      })
      
      // 对称
      let arr7 = []
      self.data.dcGiaList.map(item => {
        arr7.push({
          value: item.value,
          selected: false
        })
      })

      // 联动规则
      // 3EX无荧光  切工：EX   抛光：EX       对称：EX     荧光：N
      // VG-无荧光  切工：VG   抛光：EX,VG    对称：EX,VG  荧光:N
      // EX-无荧光  切工：EX   抛光：EX,VG    对称：EX,VG  荧光：N
      switch (dataset.value) {
        case '3EX无荧光':
          this.setData({
            qgGiaList: arr4,
            ygGiaList: arr5,
            pgGiaList: arr6,
            dcGiaList: arr7,
            // 切工
            'giaParams.qg': 'EX',
            'qgGiaList[0].selected':  true,
            // 抛光
            'giaParams.pg': 'EX',
            'pgGiaList[0].selected': true,
            // 对称
            'giaParams.dc': 'EX',
            'dcGiaList[0].selected': true,
            // 荧光
            'giaParams.yg': 'N',
            'ygGiaList[0].selected': true,
          })
          break;
        case 'VG-无荧光':
          this.setData({
            qgGiaList: arr4,
            ygGiaList: arr5,
            pgGiaList: arr6,
            dcGiaList: arr7,
            // 切工
            'giaParams.qg': 'VG',
            'qgGiaList[1].selected':  true,
            // 抛光
            'giaParams.pg': 'GD;VG',
            'pgGiaList[0].selected': true,
            'pgGiaList[2].selected': true,
            // 对称
            'giaParams.dc': 'GD;VG',
            'dcGiaList[0].selected': true,
            'dcGiaList[2].selected': true,
            // 荧光
            'giaParams.yg': 'N',
            'ygGiaList[0].selected': true,
          })
          break;
        case 'EX-无荧光':
          this.setData({
            qgGiaList: arr4,
            ygGiaList: arr5,
            pgGiaList: arr6,
            dcGiaList: arr7,
            // 切工
            'giaParams.qg': 'EX',
            'qgGiaList[0].selected':  true,
            // 抛光
            'giaParams.pg': 'EX;VG',
            'pgGiaList[0].selected': true,
            'pgGiaList[1].selected': true,
            // 对称
            'giaParams.dc': 'EX;VG',
            'dcGiaList[0].selected': true,
            'dcGiaList[1].selected': true,
            // 荧光
            'giaParams.yg': 'N',
            'ygGiaList[0].selected': true,
          })
          break;
      
        default:
          break;
      }

    },
    // 选择切工
    tapQGkItem(e) {
      let target = e.currentTarget
      let dataset = target.dataset

      let searchObj = new this.getSelectParams(this.data.qgGiaList, dataset)
      this.setData({
        'giaParams.qg': searchObj.params,
        qgGiaList:  searchObj.list
      })
    },
    // 选择抛光
    tapPGkItem(e) {
      let target = e.currentTarget
      let dataset = target.dataset
      
      let searchObj = new this.getSelectParams(this.data.pgGiaList, dataset)
      this.setData({
        'giaParams.pg': searchObj.params,
        pgGiaList: searchObj.list
      })
    },
    // 选择对称
    tapDCItem(e) {
      let target = e.currentTarget
      let dataset = target.dataset
      
      let searchObj = new this.getSelectParams(this.data.dcGiaList, dataset)
      this.setData({
        'giaParams.dc': searchObj.params,
        dcGiaList: searchObj.list
      })
    },
    // 选择荧光
    tapYGItem(e) {
      let target = e.currentTarget
      let dataset = target.dataset

      let searchObj = new this.getSelectParams(this.data.ygGiaList, dataset)
      this.setData({
        'giaParams.yg': searchObj.params,
        ygGiaList:  searchObj.list
      })
    },
    // 选择证书
    tapZSItem(e) {
      let target = e.currentTarget
      let dataset = target.dataset
      
      this.setData({
        'giaParams.zs':  this.data.zsGiaIndex == dataset.index ? '' : dataset.value,
        zsGiaIndex: this.data.zsGiaIndex == dataset.index ? -1 : dataset.index
      })
    },
    // 选择地点
    tapPlaceItem(e) {
      let target = e.currentTarget
      let dataset = target.dataset
      
      this.setData({
        'giaParams.place': this.data.placeGiaIndex == dataset.index ? '' : dataset.value,
        placeGiaIndex: this.data.placeGiaIndex == dataset.index ? -1 : dataset.index
      })
    },
    // 选择工厂
    tapGZItem(e) {
      let target = e.currentTarget
      let dataset = target.dataset
      
      this.setData({
        'ktParams.factory': this.data.factoryTzIndex == dataset.index ? '' : dataset.value,
        factoryTzIndex: this.data.factoryTzIndex == dataset.index ? -1 : dataset.index
      })
    },
    // 选择材质
    tapCZItem(e) {
      let target = e.currentTarget
      let dataset = target.dataset

      let searchObj = new this.getSelectParams(this.data.czTzList, dataset)
      this.setData({
        'ktParams.cz': searchObj.params,
        czTzList:  searchObj.list
      })
    },
    // 选择工艺
    tapGYItem(e) {
      let target = e.currentTarget
      let dataset = target.dataset
      
      this.setData({
        'ktParams.gy': this.data.gyTzIndex == dataset.value ? '' : dataset.value,
        gyTzIndex: this.data.gyTzIndex == dataset.index ? -1 : dataset.index
      })
    },
    // 选择戒臂
    tapJBItem(e) {
      let target = e.currentTarget
      let dataset = target.dataset

      let searchObj = new this.getSelectParams(this.data.jbTzList, dataset)
      this.setData({
        'ktParams.jb': searchObj.params,
        jbTzList:  searchObj.list
      })
    },
    // 选择副石
    tapFSItem(e) {
      let target = e.currentTarget
      let dataset = target.dataset
      
      this.setData({
        'ktParams.isfs': this.data.stonesIndex == dataset.index ? '' : dataset.index,
        stonesIndex: this.data.stonesIndex == dataset.index ? -1 : dataset.index
      })
    },
    // 选择热门
    tapRMItem(e) {
      let target = e.currentTarget
      let dataset = target.dataset
      
      this.setData({
        hotTzIndex: dataset.index
      })

      this.setData({
        'ktParams.hot':  dataset.value
      })
    },
    // 输入重量
    inputZLStart(e) {
      this.setData({
        'giaParams.zlStart': e.detail.value
      })
    },
    inputZLEnd(e) {
      this.setData({
        'giaParams.zlEnd': e.detail.value
      })
    },
    // 输入价格
    inputPriceStart(e) {
      this.setData({
        'giaParams.priceStart': e.detail.value
      })
    },
    inputPriceEnd(e) {
      this.setData({
        'giaParams.priceEnd': e.detail.value
      })
    },
    // 输入镶口/分
    tapXKItem(e) {
      let target = e.currentTarget
      let dataset = target.dataset

      let searchObj = new this.getSelectParams(this.data.xkgyTzList, dataset)
      this.setData({
        'ktParams.xkgy': searchObj.params,
        xkgyTzList:  searchObj.list
      })
    },
    // inputXKStart(e) {
    //   this.setData({
    //     'ktParams.xkgyStart': e.detail.value
    //   })
    // },
    // inputXKEnd(e) {
    //   this.setData({
    //     'ktParams.xkgyEnd': e.detail.value
    //   })
    // },
    // 输入手寸/#
    tapSCItem(e) {
      let target = e.currentTarget
      let dataset = target.dataset

      let searchObj = new this.getSelectParams(this.data.scTzList, dataset)
      this.setData({
        'ktParams.sc': searchObj.params,
        scTzList:  searchObj.list
      })
    },
    // inputSCStart(e) {
    //   this.setData({
    //     'ktParams.scStart': e.detail.value
    //   })
    // },
    // inputSCEnd(e) {
    //   this.setData({
    //     'ktParams.scEnd': e.detail.value
    //   })
    // },
    // 输入金重/g
    tapJZItem(e) {
      let target = e.currentTarget
      let dataset = target.dataset

      let searchObj = new this.getSelectParams(this.data.jjzTzList, dataset)
      this.setData({
        'ktParams.jjz': searchObj.params,
        jjzTzList:  searchObj.list
      })
    },
    // inputJZStart(e) {
    //   this.setData({
    //     'ktParams.jjzStart': e.detail.value
    //   })
    // },
    // inputJZEnd(e) {
    //   this.setData({
    //     'ktParams.jjzEnd': e.detail.value
    //   })
    // },
  },
})