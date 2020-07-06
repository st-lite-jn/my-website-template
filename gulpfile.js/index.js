//gulpをインクルード
const {src,dest,watch,series,parallel} = require('gulp');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
//gulp-load-pluginsをインクルード
const loadPlugins = require('gulp-load-plugins');
const $ = loadPlugins();
//パス情報をインクルード
const path = require("./path.js");

const styleTask = () => {
	return src(path.style.src)
	.pipe($.sassGlob())
	.pipe($.sass())
	.pipe($.rename({extname:".min.css"}))
	.pipe(dest(path.dist.css));
}
const serverTask = (cb) => {
	browserSync.init({
		watch: true,
		reloadOnRestart: true,
		notify:true,
		server:{
			baseDir: "./dist/",
			index: "index.html"
		}
	});
	cb();
}
const fileWatchTask = () => {
	watch(path.style.src, parallel(styleTask));
	watch(path.script.src,parallel(scriptTask));
	watch([path.ejs.file,path.ejs.module],parallel(ejsTask));
	watch(["./dist/**/*.html", ...path.script.dist, ...path.style.dist],parallel(bsReloadTask));
}

//ブラウザリロードタスク
const bsReloadTask = (cb) => {
	browserSync.reload();
	cb();
}

//JavaScript
const scriptTask = () =>{
	return src(path.script.src)
	.pipe(uglify({}))
	.pipe($.rename({extname:".min.js"}))
	.pipe(dest(path.dist.js));
}
//EJS
const ejsTask = () =>{
	return src([path.ejs.file,"!" + path.ejs.module])
	.pipe($.ejs())
	.pipe($.rename({extname:".html"}))
	.pipe(dest(path.dist.root));
}

exports.default = series(parallel(ejsTask,styleTask,scriptTask),serverTask,fileWatchTask);
exports.styleTask = styleTask;