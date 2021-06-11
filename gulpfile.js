const { src, dest, watch, series } = require("gulp");
const del = require("del");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();

function devBuild() {
  return src("src/**/*.scss")
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(dest("site/css"))
    .pipe(browserSync.stream());
}

function clean() {
  return del(["dist"]);
}

function build() {
  return src("src/**/*.scss")
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(dest("dist"));
}

function serve() {
  browserSync.init({
    server: "./site",
  });

  watch("src/**/*.scss", devBuild);
  watch("site/*.html").on("change", browserSync.reload);
}

exports.build = series(clean, build);
exports.serve = serve;
