const gulp = require('gulp'),
      sassConvert = require('gulp-sass'),
      sourceMaps = require('gulp-sourcemaps'),
      postcss = require('gulp-postcss'),
      sassAutoprefixer = require('autoprefixer'),
      cleanCSS = require('gulp-clean-css'),
      browserSync = require('browser-sync').create(),
      clean = require('del');

function styles() {
  return gulp.src('./project/scss_styles/*.scss')
    .pipe(sourceMaps.init())
    .pipe(sassConvert({outputStyle: 'expanded'}).on('error', sassConvert.logError))
   // .pipe(concat('style.css'))
    .pipe(postcss([ sassAutoprefixer() ]))
    .pipe(cleanCSS({level: 2}))
    .pipe(sourceMaps.write("./"))
    .pipe(gulp.dest('./project/css'))

    .pipe(browserSync.stream());
}
gulp.task('styles', styles);

gulp.task('clean_css', function () {
  return clean(['./project/css/*.+(css|map)'])
});


function serve() {
  browserSync.init({
    server: {
      baseDir: "./project",
      directory: true
    },
    logPrefix: "Lotos"
  });
}

gulp.task('page_watcher', function () {
  gulp.watch("./project/scss_styles/*.scss", gulp.series('clean_css', styles));
 // gulp.watch("./normalize.css", gulp.series('clean_index_page', styles));
  //gulp.watch("./normalize.css" ).on('change', browserSync.reload);
  gulp.watch("./project/html/index.html").on('change', browserSync.reload);
  gulp.watch("./project/scss_styles/*.scss" ).on('change', browserSync.reload);
});

gulp.task('build_page', gulp.series(gulp.parallel(serve, 'page_watcher')));
