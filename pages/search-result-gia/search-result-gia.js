import request from '../api/request'

const app = getApp();

Page({
  options: {
    addGlobalClass: true,
  },
  /**
   * 页面的初始数据
   */
  data: {
    title: '搜索结果-GIA',
    statusBar: app.globalData.CustomBar,
    xPosition: 'inherit',
    yPosition: 'inherit',
    giaList: [],
    count: 0,
    currentPage: 0,
    maxPage: 0,
    searchParams: {},
    goodId: '',
    modalShow: false,
    // 是否播放视频
    isPlayerVideo: false,
    // 视频播放地址
    videoUrl: '',
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
  onLoad: function () {
    // url中的参数通过option.query接收；其他通过自定义事件通信

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
    
    const eventChannel = this.getOpenerEventChannel()
    console.log(eventChannel)
    eventChannel.on('acceptParams', function (data) {
      console.log('接收到的参数：', data)
      self.setData({
        searchParams: data
      })
      self.searchgialist()
    })
  },
  // 图片预览
  previewImage(e) {
    let urls = e.currentTarget.dataset.bigImages
    wx.previewImage({
      current: 0,
      urls: JSON.parse(urls)
    })
  },
  // 视频播放
  playVideo(e) {
    let url = e.currentTarget.dataset.smallVideo
    this.setData({
      isPlayerVideo: true,
      videoUrl: url
    })
  },
  // 主页面-Gia商品搜索
  searchgialist() {
    let params = this.data.searchParams
    request('bus/searchgialist', params).then(res => {
      if (res.data.code == 0) {
        let data = res.data.data
        
        this.setData({
          giaList: data.dataList,
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

      this.searchgialist()
    }
  },
  // 上一页
  nextPage() {
    if (this.data.searchParams.currentPage < this.data.maxPage) {
      this.setData({
        'searchParams.currentPage': ++this.data.searchParams.currentPage
      })

      this.searchgialist()
    }
  },
  // 商品选中
  checkboxChange(e) {
    this.setData({
      goodId: e.detail.value.join(',')
    })

    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  // 添加到购物车
  addShopCar() {
    let params = {
      goodId: this.data.goodId,
      goodsType: 1, // 1,gia 2,空托
      openId: app.globalData.openId
    }

    request('shopcar/saveshopcar', params).then(res => {
      if (res.data.code == 0) {
        wx.showToast({
          title: res.data.msg,
          success() {
            // 跳转到购物车
            wx.navigateTo({
              url: '../../pages/shop-car/shop-car'
            })
          }
        })
      }
    })
  },
  // 直接下单
  placedirectly() {
    let self = this
    // 先选择地址
    wx.navigateTo({
      url: '../../pages/address-list/address-list',
      events: {
        setShippingAddress: function (data) {
          console.log('已选地址:', data)
          let params = {
            goodsId: self.data.goodId,
            goodsType: 1,
            shopAddressId: data.id,
            openId: app.globalData.openId
          }
          request('order/placedirectly', params).then(res => {
            if (res.data.code == 0) {
              wx.showToast({
                title: res.data.msg,
                success() {
                  // 打开先下操作窗口
                  self.setData({
                    modalShow: true
                  })
                }
              })
            }
          })
        }
      },
      success: function (res) {
        res.eventChannel.on('setShippingAddress')
      },
      fail (err) {
        console.log(err)
      }
    })
  }
})