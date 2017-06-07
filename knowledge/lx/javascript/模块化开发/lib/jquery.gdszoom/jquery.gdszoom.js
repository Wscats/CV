;(function($){
	$.fn.gdszoom = function(options){
		/*
			* 大图区域大小
			* 大图的位置
			* 小图于大图的间隔
			* 放大镜颜色
		 */
		
		var defaults = {
			width:480,
			height:300,
			position:'right',//left,bottom,right
			gap:20,
			zoomColor:'rgba(255,255,0,0.5)'
		}

		// 覆盖默认参数
		// ES6
		// var opt = Object.assign({},defaults,options);

		// jQuery的静态方法
		var opt = $.extend({},defaults,options);

		// 遍历
		this.each(function(){
			// 获取小图
			var $smallContainer = $(this).addClass('gdszoom');
			var $smallImg = $smallContainer.children('img');
			var $bigContainer;
			var $bigImg;
			var $minZoom;
			var ratio


			init();

			// 初始化函数
			function init(){
				// 创建放大镜
				$minZoom = $('<span/>').addClass('minzoom').appendTo($smallContainer);

				$bigContainer = $('<div/>').addClass('gdszoom-big');

				var imgUrl = $smallImg.data('big') || $smallImg.attr('src');
				$bigImg = $('<img/>').attr('src',imgUrl);

				// 大图写入页面
				$bigContainer.append($bigImg).appendTo('body');


				// 定制样式
				if(opt.position){
					var left = 0;
					var top = $smallContainer.offset().top;
					if(opt.position === 'left'){
						left = $smallContainer.offset().left - opt.width - opt.gap;

						console.log($smallContainer.offset().left,opt.width,opt.gap)
					}else if(opt.position === 'right'){
						left = $smallContainer.offset().left + $smallImg.outerWidth() + opt.gap;
					}else if(opt.position === 'bottom'){
						left = $smallContainer.offset().left;
						top = $smallContainer.offset().top + $smallContainer.outerHeight() + opt.gap;
					}


					$bigContainer.css({
						top:top,
						left:left
					});
				}

				$bigContainer.css({
					width:opt.width,
					height:opt.height
				})

				


				// 等大图加载完成后
				// 获取图片信息
				/*$bigImg[0].onload = function(){

					// 大图小图的比例
					ratio = $smallImg.outerWidth()/$bigImg.outerWidth();

					console.log($smallImg.outerWidth(),$bigImg.outerWidth())
				}*/

				// 事件绑定
				$smallContainer.on('mouseenter',function(){
					show();
					
				}).on('mouseleave',function(){
					hide();
				}).on('mousemove',function(e){
					var offset = $smallContainer.offset();

					// 把放大镜中心定位到鼠标位置
		            var left = e.pageX - offset.left - $minZoom.outerWidth()/2;
		            var top = e.pageY - offset.top - $minZoom.outerHeight()/2;

		            // 限定放大镜移动的区域
		            if(left < 0){
		                left = 0;
		            }else if(left > $smallImg.outerWidth() - $minZoom.outerWidth()){
		                left = $smallImg.outerWidth() - $minZoom.outerWidth()
		            }

		            if(top < 0){
		                top = 0;
		            }else if(top > $smallImg.outerHeight() - $minZoom.outerHeight()){
		                top = $smallImg.outerHeight() - $minZoom.outerHeight()
		            }

		            $minZoom.css({left:left,top:top});

		            $bigImg.css({left:-left/ratio,top:-top/ratio});
				});
			}

			// 显示
			function show(){
				$bigContainer.show();
				$minZoom.show();

				ratio = $smallImg.outerWidth()/$bigImg.outerWidth();


				// 根据小图与大图的比例改变放大镜的形状
	            $minZoom.css({
	            	width:$bigContainer.outerWidth()*ratio,
	            	height:$bigContainer.outerHeight()*ratio
	            });
			}

			// 隐藏
			function hide(){
				$bigContainer.hide();
				$minZoom.hide();
			}
		});


		return this;
	}
})(jQuery);