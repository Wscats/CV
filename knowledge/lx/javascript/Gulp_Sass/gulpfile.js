var gulp = require('gulp');

var concat = require('gulp-concat');

var uglify = require('gulp-uglify');

var rename = require('gulp-rename');

// 合并js文件
// 1.引包
// 2.创建gulp任务

gulp.task('concatJS',function(){
	// 找到要合并的js文件
	gulp.src('src/dafeiji/js/*.js')

		// 文档流：all.js
		.pipe(concat('all.js'))

		// .表示当前目录
		// ..上一层目录
		.pipe(gulp.dest('./'))

		// 压缩js文件
		.pipe(uglify({
			compress: false
		}))

		// 重命名
		.pipe(rename({suffix:'.min'}))

		// 输出压缩的版本
		// all.min.js
		.pipe(gulp.dest('./'))
});



