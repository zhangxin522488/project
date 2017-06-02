var gulp=require('gulp');
//引入压缩CSS的模块
var minifycss = require('gulp-minify-css');

var uglify = require("gulp-uglify");
//压缩js
gulp.task("changeUglifyJs",function(){
	//src后（）里的是要压缩的文件的路径
	gulp.src("js/*.js")
	.pipe(uglify())//压缩
	//dist/js是将压缩的文件存放的路径
	.pipe(gulp.dest("dist/js"));
});
//压缩css
gulp.task("minifycss",function(){
	gulp.src("css/*.css")
	.pipe(minifycss())//压缩
	.pipe(gulp.dest("dist/css"));
});
//监听
gulp.task("watch",function(){
	gulp.watch("js/*.js",["changeUglifyJs"]);
	gulp.watch("*.html",["changeUglifyHtml"]);
	gulp.watch("css/*.css",["minifycss"]);
	
})

//运行watch监听
//gulp watch
//复制
gulp.task("changeUglifyHtml",function(){
	//src后（）里的是要复制的文件的路径
	gulp.src("img/*.*")
	//dist/js是将复制的文件存放的路径
	.pipe(gulp.dest("dist/img"));
});

