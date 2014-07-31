// Include gulp + plugins
var gulp      = require('gulp');
var sass      = require('gulp-sass');
var prefix    = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename    = require('gulp-rename');



// Options
var options = {};

options.sass = {
    errLogToConsole: true,
    sourceMap: 'sass',
    sourceComments: 'map'
};

options.autoprefixer = {
    map: true,
    from: 'css',
    to: 'kleinfreund.min.css'
};



// work around for sourcemaps: https://github.com/dlmanning/gulp-sass/issues/28#issuecomment-43951089
var processWinPath = function(file) {
    var path = require('path');
    if (process.platform === 'win32') {
        file.path = path.relative('.', file.path);
        file.path = file.path.replace(/\\/g, '/');
    }
};



// Process Sass (compile, prefix, minify)
gulp.task('sass', function() {
    return gulp.src('sass/**/*.scss')
        // work around for sourcemaps: https://github.com/dlmanning/gulp-sass/issues/28#issuecomment-43951089
        .on('data', processWinPath)

        // Process Sass files
        .pipe(sass(options.sass))

        // Prefix CSS properties
        // Autoprefixer doesn't play well with source maps
        .pipe(prefix(
            'last 2 version', '> 1%', 'ie 9', 'ie 8',
            options.autoprefixer
        ))

        // Output regular `*.css`
        .pipe(gulp.dest('css'))

        // Minify CSS
        .pipe(minifycss())

        // Append `.min` to filename
        .pipe(rename({ suffix: '.min' }))

        // Output minified `*.min.css`
        .pipe(gulp.dest('css'));
});



gulp.task('watch', function() {
    gulp.watch('sass/**/*.scss', ['sass'])
});



// Default task is simply called with `gulp`, 'sass-watch'
gulp.task('default', ['sass', 'watch']);
