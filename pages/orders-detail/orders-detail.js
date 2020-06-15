const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '我的订单',
    modalShow: false,
    goodsInfo: {},
    status: {},
    // 默认图片-空托
    defalultImageUrlTz: app.globalData.defalultImageUrlTz,
    // 订单信息
    orderInfo: {}
  },
  onLoad () {
    let self = this
    // url中的参数通过option.query接收；其他通过自定义事件通信
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptParams', function (data) {
      console.log('接收到的参数：', data)
      self.setData({
        goodsInfo: data.goods,
        status: data.status,
        orderInfo: data.orderInfo
      })

      // 获取详情
      // self.searchtzinfo()
      createBy: null
      createDate: null
      customerId: 1
      goodsDesc: "gia商品描述"
      goodsDiscount: 1
      goodsId: 6688
      goodsImg: null
      goodsName: null
      goodsOrderStatue: 0
      goodsOriginalPrice: 2031
      goodsRealPrice: 2031
      goodsType: 1
      goodsTypeName: "GIA"
      id: 1
      modifiedBy: null
      modifiedDate: null
      orderId: 2
    })
  },
  contacService () {
    this.setData({
      modalShow: true
    })
  },
  cancelOrder () {
    let params = {
      orderId: this.data.goodsInfo.goodsId,
      openId: app.globalData.openId
    }
    let self = this
    request('order/canelorder', params).then(res => {
      if (res.data.code == 0) {
        wx.showToast({
          title: res.data.msg,
          success() {
            wx.navigateBack()
          }
        })
      }
    })
  }
})