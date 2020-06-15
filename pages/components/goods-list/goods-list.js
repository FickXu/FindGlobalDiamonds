const app = getApp();

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    // 是否带有选中按钮
    isChecked: {
      type: Boolean,
      value: false
    },
    // 是否全选
    isSelectAll: {
      type: Boolean,
      value: false
    },
    // 是否可以删除
    isDelete: {
      type: Boolean,
      value: false
    },
    // 商品列表
    goodsList: {
      type: Array,
      value: []
    }
  },
  observers: {
    isSelectAll: function (isSelectAll) {
      this.isSelectAllGoods(isSelectAll)
    },
    goodsList: function (goodsList) {
      this.setData({
        '_goodsLsit': goodsList
      })
    }
  },
  data: {
    title: '购物车',
    _goodsLsit: [],
    // 默认图片-空托
    defalultImageUrlTz: app.globalData.defalultImageUrlTz,
    // 默认图片-gia
    defalultImageUrlGia: app.globalData.defalultImageUrlGia,
  },
  methods: {
    // 删除商品
    delShopcarById: function(e) {
      let params = {
        shopcarId: e.currentTarget.dataset.shopcarId,
        shopcarIndex: e.currentTarget.dataset.shopcarIndex,
        shopcarType: e.currentTarget.dataset.shopcarType,
      }
      let self = this
      wx.showModal({
        title: '删除商品',
        content: '确认删除该商品吗？',
        success (res) {
          if (res.confirm) {
            self.triggerEvent('delShopcarGoods', params)
          }
        }
      })
    },
    // 是否全选
    isSelectAllGoods: function (isSelectAll) {
      let _list = this.data._goodsLsit
      _list.map((item, key) => {
        item.checked = isSelectAll
      })

      this.setData({
        _goodsLsit: _list
      })

      this.triggerEvent('checkedList', isSelectAll ? this.data._goodsLsit : [])
    },
    checkboxChange: function(e) {
      let ids = e.detail.value

      console.log(ids)

      this.data._goodsLsit.map(item => {
        if (ids.includes(item.id.toString())) {
          item.checked = true
        } else {
          item.checked = false
        }
      })

      this.triggerEvent('checkedList', this.data._goodsLsit)
    },
    // 商品详情
    goToGoodsDetail(e) {
      // gia没有详情
      let goodsType = e.currentTarget.dataset.goodsType
      if (goodsType == 'gia') return
      
      let searchParam = {
        id: e.currentTarget.dataset.goodsId
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
    }
  },
})