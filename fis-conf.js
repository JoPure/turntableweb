// 可能有时候开发的时候不需要压缩、合并图片、也不需要 hash。那么给上面配置追加如下配置；
// fis3 release debug 启用 media debug 的配置
fis.media('debug').match('*.{js,css,png}', {
	useHash: false,
	useSprite: false,
	optimizer: null
})

// 线上环境
// fis3 release production 
fis.media('production')
	.match('::packager', {
		postpackager: fis.plugin('loader', {
			allInOne: true
		})
	})
	.match('*.{css,scss}', {
		optimizer: fis.plugin('clean-css'), 
		release: '/$0',
//		url:'static/pro$0',
		domain: 'http://static.t.changicvn.com'
	})
	.match('*.js', {
		optimizer: fis.plugin('uglify-js'),
		release: '/$0',
		domain: 'http://static.t.changicvn.com'
	})
	.match('*.{png,jpg,bmp,gif,swf}', {
		release: '/$&',
		domain: 'http://images-sg-cdn.pocketgamesol.com/t'
	})
	.match('*.{js,css,png,jpeg,gif,jpg,swf}', {
		useHash: true
	})


