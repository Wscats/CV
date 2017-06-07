// 这时一个公共模块
// 定义一个模块，必须遵循一定的格式
// define()
define(function(){
	// return一个函数/对象
	return {
		randomColor:function(){
			return 'yellow';
		},
		getStyle:function(){
			return '12px'
		},
		animate:function(){
			console.log('我是来搞事情的！');
		}
	}
});
