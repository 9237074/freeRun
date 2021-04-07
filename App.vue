//wx0d924d10e89a476b
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			if (process.env.NODE_ENV === 'development') {
				plus.navigator.closeSplashscreen();
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}

	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	// @import "colorui/main.css";
	// @import "colorui/icon.css";
	@font-face {
		/* 声明"custom-icon"字体 */
		font-family: "custom-icon";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,xxxxxxxx') format('woff2');
	}
	@import "./static/fonts/iconfont.css";
	
	.custom-icon {
		/* 引用上面声明的"custom-icon"字体 */
		font-family: "custom-icon" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	
	/* 字体图标的前缀为"custom-icon-" */
	.custom-icon-copy:before {
	  content: "\e641";
	}
</style>
