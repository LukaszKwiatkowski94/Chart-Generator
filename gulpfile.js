const { src, dest, series, parallel, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
// const imagemin = require("gulp-imagemin");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

paths = {
	sass: "./src/sass/*.scss",
	sassObserv: "./src/sass/**/*.scss",
	sassDest: "./dist/css",
	js: "./src/js/**/*.js",
	jsDest: "./dist/js",
	img: "./src/img/*",
	imgDest: "./dist/img",
	dist: "./dist",
};

function sassCompiler(done) {
	src(paths.sass)
		.pipe(sourcemaps.init())
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(rename({ suffix: ".min" }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.sassDest));
	done();
}

function javaScript(done) {
	src(paths.js)
		.pipe(sourcemaps.init())
		.pipe(babel({ presets: ["@babel/env"] }))
		.pipe(uglify())
		.pipe(rename({ suffix: ".min" }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.jsDest));
	done();
}

// function convertImages(done) {
// 	src(paths.img).pipe(imagemin()).pipe(dest(paths.imgDest));
// 	done();
// }

function startBrowserSync(done) {
	browserSync.init({
		server: {
			baseDir: "./",
		},
	});
	done();
}

function watchForChanges(done) {
	watch("./*.html").on("change", reload);
	watch([paths.sassObserv, paths.js], parallel(sassCompiler, javaScript)).on(
		"change",
		reload
	);
	// watch(paths.img, convertImages).on("change", reload);
	done();
}

const mainFunctions = parallel(sassCompiler, javaScript);
exports.default = series(mainFunctions, startBrowserSync, watchForChanges);
