//gulpをインクルード
const {src,dest,watch,series,parallel} = require('gulp');

//gulp-load-pluginsをインクルード
const loadPlugins = require('gulp-load-plugins');
const $ = loadPlugins();

const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const cssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const del = require('del');

//開発環境か公開環境かのフラグ
const isProd = process.env.NODE_ENV === "production";
let taskConfig = new Object();
if(isProd) {
	taskConfig = {
		sourcemaps :{
			flag : {
				sourcemaps :false
			},
			path : {
				sourcemaps : ""
			}
		}
	}
} else {
	taskConfig = {
		sourcemaps :{
			flag : {
				sourcemaps :true
			},
			path : {
				sourcemaps : "./maps"
			}
		}
	}
}

//パス情報をインクルード
const path = require("./path.js");

//SASSをCSSに変換
const styleTask = () => {
	// gulp-post-cssの設定
	const processors = [
		cssImport({
			path: [ 'node_modules' ]
		}),
		autoprefixer({})
	];
	return src(path.style.src , taskConfig.sourcemaps.flag)
	.pipe($.sassGlob())
	.pipe($.sass().on('error', $.sass.logError))
	.pipe($.postcss(processors))
	.pipe($.cleanCss())
	.pipe($.rename({extname:".min.css"}))
	.pipe(dest(path.dist.css, taskConfig.sourcemaps.path));
}

//JavaScript変換タスク
const scriptTask = () =>{
	return src(path.script.src)
	.pipe($.babel({
		presets: ['@babel/preset-env']
	}))
	.pipe(uglify({}))
	.pipe($.rename({extname:".min.js"}))
	.pipe(dest(path.dist.js));
}

//JavaScriptBundle
const scriptBundleTask = () =>{
	return src(	[
		"node_modules/jquery/dist/jquery.min.js", //jQuery 3.5.1
		"node_modules/jquery-migrate/dist/jquery-migrate.min.js", //jQuery Migrate 3.1.0
		"node_modules/swiper/dist/js/swiper.min.js", //Swiper 4.5.1
		"node_modules/picturefill/dist/picturefill.min.js" //picturefill 3.0.3
	])
	.pipe($.concat('bundle.min.js'))
	.pipe(uglify({}))
	.pipe(dest(path.dist.js));
}

//EJS
const ejsTask = () =>{
	return src([path.ejs.file,"!" + path.ejs.module])
	.pipe($.ejs())
	.pipe($.rename({extname:".html"}))
	.pipe(dest(path.dist.root));
}

//ローカルサーバー起動
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

//ブラウザリロードタスク
const bsReloadTask = (cb) => {
	browserSync.reload();
	cb();
}

//ファイル削除処理
const cleanTask = () =>{
	return del([...path.script.dist,...path.style.dist,path.html.dist,path.dist.js + "maps",path.dist.css + "maps"])
}

//ファイル監視タスク
const fileWatchTask = () => {
	watch(path.style.src, parallel(styleTask));
	watch(path.script.src, parallel(scriptTask));
	watch([path.ejs.file, path.ejs.module]).on("change",series(ejsTask,bsReloadTask));
	watch([...path.script.dist, ...path.style.dist]).on("change",series(bsReloadTask));
	watch(path.image.dist).on("change",series(bsReloadTask));
}

//gulpタスク
exports.default = series(parallel(ejsTask,styleTask,scriptBundleTask,scriptTask),serverTask,fileWatchTask);
exports.publish = series(cleanTask,ejsTask,styleTask,scriptBundleTask,scriptTask);

