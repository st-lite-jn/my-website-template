module.exports = {
	dist : {
		root:"./dist/",
		js : "./dist/assets/js/",
		css : "./dist/assets/css/",
		img :"./dist/assets/img/"
	},
	src : {
		js : "./src/assets/js/",
		css : "./src/assets/scss/",
		img :"./src/assets/img/"
	},
	script:{
		dist : ["./dist/assets/js/**/*.js","./dist/assets/js/**/*.min.js"],
		src : "./src/assets/js/**/*.js"
	},
	style:{
		dist : ["./dist/assets/css/**/*.css","./dist/assets/css/**/*.min.css"],
		src : "./src/assets/scss/**/*.scss"
	},
	image:{
		dist : "./dist/assets/img/**/*.[jpg||gif||png||svg]",
		src : "./src/assets/img/**/*.[jpg||gif||png||svg]",
	},
	ejs :{
		file:"./src/**/*.ejs",
		module:"./src/**/_*.ejs"
	},
	html:{
		dist:"./dist/**/*.html"
	}
}
