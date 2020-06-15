import request from '../api/request'

const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '搜索结果-空托',
    // statusBar: app.globalData.CustomBar,
    xPosition: 'inherit',
    yPosition: 'inherit',
    supportList: [],
    count: 0,
    currentPage: 0,
    maxPage: 0,
    searchParams: {},
    // 默认图片-空托
    defalultImageUrlTz: app.globalData.defalultImageUrlTz,
    // 是否为ios x系列
    isIpx: app.globalData.isIpx,
    // 翻页控件的高度
    classPagesHeight: ''
  },
  // 回到首页
  goHomePage: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  // 商品详情
  goToGoodsDetail(e) {
    let searchParam = {
      id: e.currentTarget.dataset.goodsId,
      goodsNo: e.currentTarget.dataset.goodsNo,
      jjz: this.data.searchParams.jjz,
      xkgy: this.data.searchParams.xkgy,
      sc: this.data.searchParams.sc
    }
      
    wx.navigateTo({
      url: '../../pages/goods-detail/goods-detail',
      events: {
        acceptParams: function (data) {
          console.log('accept params:', data)
        }
      },
      success: function (res) {
        res.eventChannel.emit('acceptParams', searchParam)
      },
      fail (err) {
        console.log(err)
      }
    })
  },
  onLoad: function () {
    let self = this

    if (this.data.isIpx) {
      this.setData({
        classPagesHeight: '116rpx'
      })
    } else {
      this.setData({
        classPagesHeight: '72rpx'
      })
    }

    // url中的参数通过option.query接收；其他通过自定义事件通信
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptParams', function (data) {
      console.log('接收到的参数：', data)
      self.setData({
        searchParams: data
      })

      self.searchtzlist()
    })
  },
  // 主页面-空托商品搜索
  searchtzlist() {
    let params = this.data.searchParams
    request('bus/searchtzlist', params).then(res => {
      if (res.data.code == 0) {
        let data = res.data.data
        
        this.setData({
          supportList: data.dataList,
          currentPage: data.currentPage,
          count: data.total,
          maxPage: data.maxPage
        })
      }
    })
  },
  // 上一页
  prePage() {
    if (this.data.searchParams.currentPage > 1) {
      this.setData({
        'searchParams.currentPage': --this.data.searchParams.currentPage
      })

      this.searchtzlist()
    }
  },
  // 上一页
  nextPage() {
    if (this.data.searchParams.currentPage < this.data.maxPage) {
      this.setData({
        'searchParams.currentPage': ++this.data.searchParams.currentPage
      })

      this.searchtzlist()
    }
  }
})