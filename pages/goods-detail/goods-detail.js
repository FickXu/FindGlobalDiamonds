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
    title: '商品详情',
    searchParams: {},
    recommendList: [],
    detailInfo: {},
    modalShow: false,
    goodsImgs: [],
    // 规格列表
    specList: [],
    curentSpecIndex: 0,
    // 所有规格商品详情
    specsInfo: []
  },
  onLoad() {
    let self = this
    // self.searchtzinfo()
    // url中的参数通过option.query接收；其他通过自定义事件通信
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptParams', function (data) {
      console.log('接收到的参数：', data)
      self.setData({
        searchParams: data
      })

      // 获取详情
      self.searchtzinfo()
    })
  },
  // 选择规格
  bindSpecChange(e) {
    console.log(e)

    this.setData({
      curentSpecIndex: e.detail.value,
      detailInfo: this.data.specsInfo[e.detail.value],
      goodsImgs: this.data.specsInfo[e.detail.value].bigImg ? JSON.parse(this.data.specsInfo[e.detail.value].bigImg) : [this.data.specsInfo[e.detail.value].smallImg],
      'searchParams.id': this.data.specsInfo[e.detail.value].id
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
            goodsId: self.data.searchParams.id,
            goodsType: 2,
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
  },
  // 主页面-空托商品详情
  searchtzinfo: function () {
    let params = {
      goodsNo: this.data.searchParams.goodsNo,
      jjz: this.data.searchParams.jjz,
      xkgy: this.data.searchParams.xkgy,
      sc: this.data.searchParams.sc
      // goodsNo: 'DSYA0782BB'
    }
    let self = this

    request('bus/searchtzinfobygoodsno', params).then(res => {
      if (res.data.code == 0) {
        // 处理规格
        let specs = res.data.data
        let _specs = []
        specs.map(item => {
          _specs.push({
            value: item.goodsNo,
            label: `手寸：${item.sc}# 镶口：${item.xk}分 金重：${item.jjz} 价格：¥${item.memberPrice}`
          })
        })

        self.setData({
          specsInfo: res.data.data,
          detailInfo: res.data.data[0],
          specList: _specs,
          goodsImgs: res.data.data[0].bigImg ? JSON.parse(res.data.data[0].bigImg) : [res.data.data[0].smallImg],
          'searchParams.id': res.data.data[0].id
        })
      }
    })
  },
  // 回到首页
  goHomePage: function () {
    wx.navigateBack({
      delta: 2
    })
  },
  // 添加到购物车
  addShopCar() {
    let params = {
      goodId: this.data.searchParams.id,
      goodsType: 2, // 1,gia 2,空托
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
  }
})