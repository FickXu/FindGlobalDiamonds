import request from '../api/request'

const app = getApp();
// pages/home/home.js
Page({
  options: {
    addGlobalClass: true,
  },
  /**
   * 页面的初始数据
   */
  data: {
    title: '购物车',
    // 购物车中选中的商品
    selectGoodsList: [],
    isSelectAll: false,
    // 页面的全选按钮
    checkedAllStatus: false,
    // 下单后弹出窗口
    modalShow: false,
    // gia列表
    searchGiaListVOList: [],
    // 空托列表
    searchTzListVOList: [],
    // 猜你喜欢
    recommendedGiaListVOList: [],
    // 购物车商品总金额
    totalAmount: 0,
    // 当前已选gia
    tempGiaList: [],
    // 当前已选tz
    tempTzList: [],
    // 商品是否可以删除
    isDelete: true
  },
  onLoad() {
    this.queryshopcarlist()
  },
  // 购物车
  queryshopcarlist() {
    let params = {
      openId: app.globalData.openId
    }
    let self = this
    // 获取购物车列表
    request('shopcar/queryshopcarlist', params).then(res => {
      if (res.data.code == 0) {
        let _data = res.data.data
        if (_data) {
          self.setData({
            searchGiaListVOList: _data.searchGiaListVOList || [],
            searchTzListVOList: _data.searchTzListVOList || []
          })
        } else {
          self.setData({
            searchGiaListVOList: [],
            searchTzListVOList: []
          })
        }
      }
    })
  },
  getCheckedGoods: function (goods) {
    if (goods.detail.length == 0) return
    let _selectGoodsList = goods.detail
    let self = this

    // 选择gia商品
    if (_selectGoodsList[0].goodsTypeShow == 'gia') {
      this.setData({
        tempGiaList: _selectGoodsList.filter(item => item.checked),
        searchGiaListVOList: _selectGoodsList
      })
    }
    
    // 选择空托商品
    if (_selectGoodsList[0].goodsTypeShow == 'tz') {
      this.setData({
        tempTzList: _selectGoodsList.filter(item => item.checked),
        searchTzListVOList: _selectGoodsList
      })
    }

    // 计算是否已经全选
    if (this.data.tempGiaList.length + this.data.tempTzList.length == this.data.searchGiaListVOList.length + this.data.searchTzListVOList.length) {
      this.setData({
        checkedAllStatus: true
      })
    } else {
      this.setData({
        checkedAllStatus: false
      })
    }

    // 计算价格
    this.getTotalAmount(this.data.tempGiaList, this.data.tempTzList)
    console.log('已选商品：',_selectGoodsList, this.data.tempGiaList, this.data.tempTzList)
  },
  // 全选
  checkboxChange: function (e) {
    let checkValue = e.detail.value
    let _status = checkValue.length > 0 ? true : false
    if (!_status) {
      this.setData({
        tempGiaList: [],
        tempTzList: []
      })
    }
    this.setData({
      isSelectAll: _status,
      checkedAllStatus: _status
    })

    // 计算价格
    this.getTotalAmount(this.data.tempGiaList, this.data.tempTzList)
    // console.log(this.data.tempGiaList, this.data.tempTzList)
  },
  // 购物车下单
  buyGoods: function () {
    let shopCarIds = ''
    let _ids = []
    let _arr = [...this.data.tempGiaList, ...this.data.tempTzList]
    _arr.map(item => {
      _ids.push(item.shopCarId)
    })

    // 

    // 是否已选择下单商品
    shopCarIds = _ids.join(',')
    if(!shopCarIds) {
     wx.showToast({
       title: '请选择商品',
       icon: 'none'
     })
     return
    }

    let self = this
    // 先选择地址
    wx.navigateTo({
      url: '../../pages/address-list/address-list',
      events: {
        setShippingAddress: function (data) {
          // let _data = {
          //   contact: "张三",
          //   contactAddress: "广东省 广州市 海珠区 新港中路397号",
          //   createBy: null,
          //   createDate: null,
          //   customerId: 7,
          //   id: 13,
          //   isDefault: 0,
          //   mobilePhone: "020-81167888",
          //   modifiedBy: null,
          //   modifiedDate: null
          // }
          console.log('已选地址:', data)
          let params = {
            shopCarIds: shopCarIds,
            shopAddressId: data.id,
            openId: app.globalData.openId
          }
          self.placeshopcar(params)
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
  // 下单
  placeshopcar(params) {
    let self = this
    request('order/placeshopcar', params).then(res => {
      if (res.data.code == 0) {
        wx.showToast({
          title: res.data.msg,
          success() {
            // 打开线下操作窗口
            self.setData({
              modalShow: true,
              tempGiaList: [],
              tempTzList: []
            })
            self.queryshopcarlist()
          }
        })
      }
    })
  },
  // 删除购物车中商品
  delshopcar(params) {
    // 待移除已选的商品
    let self = this
    let _params = {
      ids: params.detail.shopcarId,
      openId: app.globalData.openId
    }
    request('shopcar/delshopcar', _params).then(res => {
      if (res.data.code == 0) {
        wx.showToast({
          title: res.data.msg,
          success() {
            // 待移除已选的商品
            let waitDeleteGoods = params.detail.shopcarType == 'tz' ? self.data.searchTzListVOList : self.data.searchGiaListVOList
            waitDeleteGoods.splice(params.detail.shopcarIndex, 1)
            if (params.detail.shopcarType == 'tz') {
              self.setData({
                tempTzList: waitDeleteGoods.some(item => item.checked) ? waitDeleteGoods : [],
                searchTzListVOList: waitDeleteGoods
              })
            } else {
              self.setData({
                tempGiaList: waitDeleteGoods.some(item => item.checked) ? waitDeleteGoods : [],
                searchGiaListVOList: waitDeleteGoods
              })
            }
            // 重新计算价格
            self.getTotalAmount(self.data.tempGiaList, self.data.tempTzList)
          }
        })
      }
    })
  },
  // 获取已选商品总价
  getTotalAmount(gia, tz) {
    let arr = [...gia, ...tz]
    let amount = 0
    arr.map(item => {
      amount += item.goodsRealSellPrice
    })

    this.setData({
      totalAmount: amount
    })
  }
})