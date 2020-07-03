//gulpをインクルード
const {src,dest,watch,series,parallel} = require('gulp');
const bs = require("browser-sync");
const uglify = require('gulp-uglify-es').default;
//gulp-load-pluginsをインクルード
const loadPlugins = require('gulp-load-plugins');
const $ = loadPlugins();
//パス情報をインクルード
const path = require("./path.js");

function styleTask () {
	return src(path.style.src)
	.pipe($.sassGlob())
	.pipe($.sass())
	.pipe($.rename({extname:".min.css"}))
	.pipe(dest(path.dist.css));
}
function serverTask(cb) {
	bs.init({
		server:{
			baseDir: path.dist.root,
			index: "index.html"
		},
		port:3059
	});
	cb();
}
function fileWatchTask (cb) {
	watch(path.style.src, parallel(styleTask));
	watch(path.script.src,parallel(scriptTask));
	watch([path.ejs.file,path.ejs.module],parallel(ejsTask));
	watch([path.html.dist, ...path.script.dist, ...path.style.dist], parallel(bsReloadTask));
	cb();
}
//ブラウザリロードタスク
function bsReloadTask(done) {
	bs.reload();
	done();
}
//JavaScript
function scriptTask() {
	return src(path.script.src)
	.pipe(uglify({}))
	.pipe($.rename({extname:".min.js"}))
	.pipe(dest(path.dist.js));
}
//EJS
function ejsTask() {
	return src([path.ejs.file,"!" + path.ejs.module])
	.pipe($.ejs())
	.pipe($.rename({extname:".html"}))
	.pipe(dest(path.dist.root));
}

exports.default = series(parallel(ejsTask,styleTask,scriptTask),serverTask,fileWatchTask);
exports.styleTask = styleTask;