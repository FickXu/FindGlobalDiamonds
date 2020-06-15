const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '全球找钻网',
    PageCur: 'home',
    isLogin: false,
    showSearch: 'block',
    loginCode: 0,
    bgService: app.globalData.defalultImageUrlLXWM
  },

  // 通知登录状态
  login: function (res) {
    let detail = res.detail
    if (detail.status == 200) {
      this.setData({
        isLogin: true,
        showSearch: 'block',
        loginCode: 0
      })
      // console.log('login success:', detail, app.globalData)
    }
  },

  // 页面显示时检查登录状态
  onShow: function () {
    let self = this
    if (app.globalData.loginCode == 10007) {
      self.setData({
        isLogin: false,
        showSearch: 'none',
        loginCode: app.globalData.loginCode
      })
      return
    }

    // 检查是否有废弃的授权字段
    wx.getStorage({
      key: 'wechatAppletInfo',
      success(res) {
        wx.clearStorage()
      }
    })

    wx.getStorage({
      key: 'userInfo',
      success (res) {
        // console.log('Page home:', res)
        self.setData({
          isLogin: true,
          showSearch: 'block'
        })
        // 缓存到全局
        app.globalData.userInfo = res.data
      },
      fail (err) {
        console.log('get storage fail:', err)
        self.setData({
          isLogin: false
        })
      }
    })
  },

  // 页面导航
	routerPage: function(event) {
    let self = this
    let data = event.currentTarget.dataset.page;
    
    if (!this.data.isLogin && data == 'person-center') {
      wx.showModal({
        title: '提示',
        content: '用户未登录，请重新登录',
        success (res) {
          if (res.confirm) {
            wx.clearStorage({
              success () {
                app.globalData.loginCode = 10007
                self.setData({
                  isLogin: false,
                  showSearch: 'none',
                  loginCode: app.globalData.loginCode
                })
              }
            })
          }
        }
      })
      return
    } else {
      self.setData({
        PageCur: data,
        loginCode: 0,
        showSearch: 'block'
      })
    }
	}
})