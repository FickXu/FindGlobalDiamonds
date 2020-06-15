const app = getApp();

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    modalShow: true,
    bgKFGJ: app.globalData.defalultImageUrlKFGJ
  },
  // ready () {
  //   console.log('------------')
  // },
  methods: {
    // 关闭弹窗
    hideModal: function () {
      this.setData({
        modalShow: false
      })
    }
  }
})