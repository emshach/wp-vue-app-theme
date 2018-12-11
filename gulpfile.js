var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var $ = require( 'gulp-load-plugins' )();

var sassFiles = './css/src/*.scss';

gulp.task( 'css', function () {    
  gulp.src( './css/src/style.scss' )    
     .pipe( sourcemaps.init() )
     .pipe( $.sass({ includePaths: "./node_modules/breakpoint-sass/stylesheets" }))
     .pipe( sass().on( 'error', sass.logError ))        
     //.pipe(cleanCSS())
     .pipe( sourcemaps.write( './' ))  
     .pipe( gulp.dest( './css/dist' ));
});


//run gulp and tasks in 2nd param runs
gulp.task( 'default', [ 'css' ]);

//run gulp watch - and automatically runs task in 2nd param:
gulp.task( 'watch',function() {
  gulp.watch( sassFiles, [ 'css' ]);
});
