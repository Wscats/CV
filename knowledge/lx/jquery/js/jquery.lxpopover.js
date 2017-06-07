;(function($){
	// $.fn === $.prototype
	$.fn.lxpopover = function(){
		// this => $('#box')
				

		this.each(function(idx,ele){
			// each方法中的this为dom节点对象
			// 和ele相同
			var $pop = $(this);
			init();


			// 初始化函数
			function init(){
				$pop.addClass('lxpopover');

				// 标题
				var $popTitle = $('<div/>');
				$popTitle.addClass('title').text('弹窗标题');

				// 内容
				var $popContent = $('<div/>').addClass('content').text('弹窗内容');

				// 关闭按钮
				var $btnClose = $('<span/>').addClass('btnClose').html('&times;');

				// 组合
				$pop.append([$popTitle,$popContent,$btnClose])

				// 写入页面
				// $pop.appendTo('body');


				// 关闭
				$btnClose.on('click',function(){
					// $pop.hide();

					$pop.remove();
				})
			}
		});

		return this;
	}
})(jQuery);
