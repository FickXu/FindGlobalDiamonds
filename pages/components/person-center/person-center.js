// 获取app实例，包含了用户信息和全局方法
const app = getApp();

Component({
	options: {
    addGlobalClass: true,
  },
	data: {
		userInfo: {}
	},
	ready: function () {
		let self = this
		// console.log(app.globalData)
		// let userInfo = {
		// 	avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTINhLTx15w3Bm9iamcriaia0ELLTnyXtUJD9wHibQSOabeVSAqMmaDp8L1zTV1R2DlW9YnI5kOJ1fTlLg/132",
		// 	city: "Shenzhen",
		// 	country: "China",
		// 	gender: 1,
		// 	language: "zh_CN",
		// 	nickName: "Fick",
		// 	province: "Guangdong"
		// }
		
		wx.getStorage({
			key: 'userInfo',
			success (res) {
				self.setData({
					userInfo: res.data
				})
			}
		})
	},
	methods: {
		// 查看购物车
		getShopCar: function () {
			wx.navigateTo({
				url: '../../pages/shop-car/shop-car'
			})
		},
		// 查看订单
		getOrders: function () {
			wx.navigateTo({
				url: '../../pages/orders/orders'
			})
		},
		openConfirm: function () {
			wx.showModal({
					content: '检测到您没打开地址权限，是否去设置打开？',
					confirmText: "确认",
					cancelText: "取消",
					success: function (res) {
							if (res.confirm) {
									wx.openSetting({
											success: (res) => { }   //打开设置面板
									})
							} else {
									console.log('用户点击取消')
							}
					}
			});
		},
		chooseAddress: function () {
			wx.navigateTo({
				url: '../../pages/address-list/address-list'
			})
		}
	}
})
