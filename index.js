var gulp         = require('gulp');
var axis         = require('axis');
var lost         = require('lost');
var rupture      = require('rupture');
var typographic  = require('typographic');
var stylus       = require('gulp-stylus');
var postcss      = require('gulp-postcss');
var elixir       = require('laravel-elixir');
var gulpif       = require('laravel-elixir/node_modules/gulp-if');
var gulpFilter   = require('laravel-elixir/node_modules/gulp-filter');
var sourcemaps   = require('laravel-elixir/node_modules/gulp-sourcemaps');
var minify       = require('laravel-elixir/node_modules/gulp-minify-css');
var autoprefixer = require('laravel-elixir/node_modules/gulp-autoprefixer');
var utilities    = require('laravel-elixir/ingredients/commands/Utilities');
var Notification = require('laravel-elixir/ingredients/commands/Notification');

elixir.extend('stylusBundle', function(src, output) {

    var config = this;

    var baseDir = config.assetsDir + 'stylus';

    src = utilities.buildGulpSrc(src, baseDir, '**/*.styl');

    gulp.task('stylusBundle', function() {

        var filter = gulpFilter(['*', '!_*.styl']);

        var onError = function(err) {

            new Notification().error(err,'Error on line <%= error.lineno %> at column <%= error.column %>\n');

            this.emit('end');
        };

        return gulp.src(src)
            .pipe(filter)
            .pipe(gulpif(config.production, sourcemaps.init()))
            .pipe(stylus({
                use: [axis(), typographic(), rupture()],
                import: ['typographic']
            })).on('error', onError)
            .pipe(postcss([
                lost()
            ]))
            .pipe(autoprefixer())
            .pipe(gulpif(config.production, minify()))
            .pipe(gulpif(config.production, sourcemaps.write('.', {
                includeContent: false, sourceRoot: '.'
            })))
            .pipe(gulp.dest(output || config.cssOutput))
            .pipe(new Notification().message('Stylus Compiled!'));
    });

    this.registerWatcher('stylusBundle', baseDir + '/**/*.styl');

    return this.queueTask('stylusBundle');

});
