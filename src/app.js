var util = require('./util/util')
var wxApi = require('./util/wxApi')
var wxRequest = require('./util/wxRequest')
App({
    //小程序启动钩子
    onLaunch: function () {
	    var _this = this;
	    wx.showToast({
		    title: '加载中',
		    icon: 'loading',
		    duration: 10000
	    });
	    //1.获取code
	    var wxLogin = wxApi.wxLogin()
	    wxLogin().then(res => {
		    console.log('1.成功了')
		    console.log(res.code)
		    var url = "xxx";
		    var params = {
			    appid: "wxed7******2d465",
			    secret: "e9c5e4c******09ecc5ebd811",
			    js_code: res.code,
			    grant_type: "authorization_code"
		    }
		    //2.获取openid
		    return wxRequest.getRequest(url, params)
	    }).then(res => {
		    console.log('2.成功了')
		    console.log(res)
		    var url = "";
		    var data = {}
		    //3.获取绑定手机号码
		    return wxRequest.postRequest(url, data)
	    }).then(res => {
		    console.log('3.成功了')
		    console.log(res)
		    //4.获取系统信息
		    var wxGetSystemInfo = wxApi.wxGetSystemInfo()
		    return wxGetSystemInfo()
	    }).then(res => {
		    console.log('4.成功了')
		    console.log(res)
		    //5.获取用户信息
		    var wxGetUserInfo = wxApi.wxGetUserInfo()
		    return wxGetUserInfo()
	    }).then(res => {
		    console.log('5.成功了')
		    console.log(res.userInfo)
		    _this.setData({
			    userInfo: res.userInfo
		    })
	    }).finally(function (res) {
		    console.log('finally~')
		    wx.hideToast()
	    })
    },
    //小程序显示回调
    onShow: function () {
        console.log('App Show')
    },
    //小程序隐藏回调
    onHide: function () {
        console.log('App Hide')
    },
    //全局对象
    globalData: {
        hasLogin: false
    }
});