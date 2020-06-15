import request from '../api/request'

const app = getApp();
// pages/home/home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    TabCur: '',
    title: '我的订单',
    orderStatus: [
      {
        value: '',
        label: '全部'
      },
      {
        value: 1,
        label: '待付款'
      },
      {
        value: 2,
        label: '待发货'
      },
      {
        value: 4,
        label: '待收货'
      },
      {
        value: 5,
        label: '已完成'
      },
      {
        value: 7,
        label: '自提货'
      },
    ],
    orderList: [],
    // 默认图片-空托
    defalultImageUrlTz: app.globalData.defalultImageUrlTz,
  },
  onLoad() {
    this.queryorderlist()
  },
  // 获取订单列表
  queryorderlist() {
    let params = {
      goodsType: this.data.TabCur,   // 订单状态 0, 订单失效/取消;1, 待付款;2, 已付款待发货;3, 已下单待快递拿货; 4, 已发货待收货;5, 已收货待评价;6, 已评价)
      openId: app.globalData.openId
    }
    let self = this
    request('order/queryorderlist', params).then(res => {
      if (res.data.code == 0) {
        if (res.data.data) {
          self.setData({
            orderList: res.data.data
          })
        } else {
          self.setData({
            orderList: []
          })
        }
      }
    })
  },
  tabSelect(e) {
    let orderStatus = e.currentTarget.dataset.id
    this.setData({
      TabCur: orderStatus
    })
    this.queryorderlist()
  },
  // 商品详情
  goToGoodsDetail(e) {
    let goodsInfo = {
      orderInfo: e.currentTarget.dataset.orderInfo,
      goods: e.currentTarget.dataset.goodsItem,
      status: {
        id: e.currentTarget.dataset.goodsItemStatusId,
        name: e.currentTarget.dataset.goodsItemStatusName
      }
    }

    wx.navigateTo({
      url: '../../pages/orders-detail/orders-detail',
      events: {
        acceptParams: function (data) {
          console.log('accept params:', data)
        }
      },
      success: function (res) {
        res.eventChannel.emit('acceptParams', goodsInfo)
      },
      fail (err) {
        console.log(err)
      }
    })
    // wx.navigateTo({
    //   url: '../../pages/orders-detail/orders-detail'
    // })
    // let self = this
    // 先选择地址
    // wx.navigateTo({
    //   url: '../../pages/address-list/address-list',
    //   events: {
    //     setShippingAddress: function (data) {
    //       console.log('已选地址:', data)
    //       let params = {
    //         shopCarIds: shopCarIds,
    //         shopAddressId: data.id,
    //         openId: app.globalData.openId
    //       }
    //       request('order/placeshopcar', params).then(res => {
    //         if (res.data.code == 0) {
    //           wx.showToast({
    //             title: res.data.msg,
    //             success() {
    //               // 打开先下操作窗口
    //               self.setData({
    //                 modalShow: true
    //               })
    //             }
    //           })
    //         }
    //       })
    //     }
    //   },
    //   success: function (res) {
    //     res.eventChannel.on('setShippingAddress')
    //   },
    //   fail (err) {
    //     console.log(err)
    //   }
    // })
  },
  // 取消订单
  cancelOrder(e) {
    let self = this
    wx.showModal({
      title: '取消订单',
      content: '确定取消订单吗？',
      success (res) {
        if (res.confirm) {
          let params = {
            orderId: e.currentTarget.dataset.orderId,
            openId: app.globalData.openId
          }
          request('order/canelorder', params).then(res => {
            if (res.data.code == 0) {
              wx.showToast({
                title: res.data.msg,
                success() {
                  self.queryorderlist()
                }
              })
            }
          })
        }
      }
    })
  },

  // 确认到货
  confirmgoods(e) {
    let params = {
      orderId: e.currentTarget.dataset.orderId,
      openId: app.globalData.openId
    }
    let self = this
    request('order/confirmgoods', params).then(res => {
      if (res.data.code == 0) {
        wx.showToast({
          title: res.data.msg,
          success() {
            self.queryorderlist()
          }
        })
      }
    })
  },
})

