var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");

gulp.task("compile-sass", function() {
  return gulp
    .src(["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/*.scss"])
    .pipe(sass())
    .pipe(gulp.dest("public/css"))
    .pipe(browserSync.stream());
});

gulp.task("move-js", function() {
  return gulp
    .src([
      "node_modules/bootstrap/dist/js/bootstrap.min.js",
      "node_modules/tether/dist/js/tether.min.js",
      "node_modules/jquery/dist/jquery.min.js"
    ])
    .pipe(gulp.dest("public/js"))
    .pipe(browserSync.stream());
});

gulp.task("move-html", function() {
    return gulp.src('src/**/*.html')
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream());
});

gulp.task("launch-server", function() {
  browserSync.init({
    server: "./public"
  });
  gulp.watch(
    ["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/*.scss"],
    gulp.series("compile-sass")
  );
  gulp.watch("src/**/*.html").on("change", gulp.series('move-html', browserSync.reload));
});

gulp.task(
  "default",
  gulp.series(gulp.parallel("move-html","move-js", "compile-sass"), "launch-server")
);
