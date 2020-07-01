const {src,dest,watch,series,parallel} = require('gulp');
const loadPlugins = require('gulp-load-plugins');
const $ = loadPlugins();
const server = require("browser-sync").create();
const uglify = require('gulp-uglify-es').default;



const path = require("./path.js");

const styles = () => {
	return src(path.style.src)
	.pipe($.sassGlob())
	.pipe($.sass())
	.pipe(dest(path.dist.css));
}
const startAppServer=() =>{
	server.init({
		server:{
			baseDir:"./dist",
		}
	});
	watch(path.style.src,styles);
	watch(path.script.src,scripts);
	watch(path.style.dist).on("change",server.reload);
	watch(path.script.dist).on("change",server.reload);
}


const scripts = () =>{
	return src(path.script.src)
	.pipe(uglify({}))
	.pipe(dest(path.dist.js));
}

exports.default = series(parallel(styles,scripts),startAppServer);
exports.styles = styles;