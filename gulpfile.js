'use strict';

var gulp = require('gulp');
var config = require('./gulp.config')();
var del = require('del');
var glob = require('glob');
var $ = require('gulp-load-plugins')({ lazy: true });

/**
 * List the available gulp tasks
 */
gulp.task('help', $.taskListing);
gulp.task('default', gulp.series('help'));

gulp.task('jshint', function() {
	return gulp.src(config.js)
		.pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
    .pipe($.jshint.reporter('fail'))	
    .pipe($.jscs());
});

gulp.task('clean', function(done) {
  var files = [].concat(
    config.temp,
    config.build
  );
  return del(files, done);
});

gulp.task('styles', function() {
  return gulp
    .src(config.css)
    .pipe($.autoprefixer({ browsers: ['last 2 version', '> 5%'] }))
    .pipe(gulp.dest(config.temp));
});

gulp.task('images', function() {
 	return gulp
    .src(config.images)
    .pipe($.imagemin({ optimizationLevel: 4 }))
    .pipe(gulp.dest(config.build + 'images'));
});

gulp.task('fonts', function() {
  return gulp
    .src(config.fonts)
    .pipe(gulp.dest(config.build + 'fonts'));
});

/**
 * Create $templateCache from the html templates
 * @return {Stream}
 */
gulp.task('templatecache', function() {
  return gulp
    .src(config.htmltemplates)
    .pipe($.minifyHtml({ empty: true }))
    .pipe($.angularTemplatecache(
      config.templateCache.file,
      config.templateCache.options
    ))
    .pipe(gulp.dest(config.temp));
});

/**
 * Wire-up the bower dependencies
 * @return {Stream}
 */
gulp.task('wiredep', function() {
  var wiredep = require('wiredep').stream;
  var options = config.getWiredepDefaultOptions();

  return gulp
    .src(config.index)
    .pipe(wiredep(options))
    .pipe(inject(config.js, '', config.jsOrder))
    .pipe(gulp.dest(config.resultInject));
});

gulp.task('inject', function() {
 return gulp
    .src(config.index)
    .pipe(inject(config.cssInject))
    .pipe(gulp.dest(config.resultInject));
});

/**
 * Optimize all files, move to a build folder,
 * and inject them into the new index.html
 * @return {Stream}
 */
gulp.task('optimize', gulp.series('inject'), function() {
  var assets = $.useref.assets({ searchPath: './' });
  // Filters are named for the gulp-useref path
  var cssFilter = $.filter('**/*.css');
  var jsFilter = $.filter('**/*.js');

  var templateCache = config.temp + config.templateCache.file;

  return gulp
    .src(config.index)
    .pipe($.plumber())
    .pipe(inject(templateCache, 'templates'))
    .pipe(assets) // Gather all assets from the html with useref
    // Get the css
    .pipe(cssFilter)
    .pipe($.minifyCss())
    .pipe(cssFilter.restore())
    // Get the custom javascript
    .pipe(jsFilter)
    .pipe($.ngAnnotate({ add: true }))
    .pipe($.uglify())
    .pipe(getHeader())
    .pipe(jsFilter.restore())
    // Take inventory of the file names for future rev numbers
    .pipe($.rev())
    // Apply the concat and file replacement with useref
    .pipe(assets.restore())
    .pipe($.useref())
    // Replace the file names in the html with rev numbers
    .pipe($.revReplace())
    .pipe(gulp.dest(config.build));
});

/**
 * Build everything
 * This is separate so we can run tests on
 * optimize before handling image or fonts
 */
gulp.task('build', gulp.series('clean', gulp.parallel('wiredep', 'styles', 'templatecache'),
  'inject', gulp.parallel('optimize', 'images', 'fonts')), function() {
  var msg = {
    title: 'gulp build',
    subtitle: 'Deployed to the build folder',
    message: 'Running `gulp serve-build`'
  };
  del(config.temp);
  notify(msg);
});

/**
 * Inject files in a sorted sequence at a specified inject label
 * @param   {Array} src   glob pattern for source files
 * @param   {String} label   The label name
 * @param   {Array} order   glob pattern for sort order of the files
 * @returns {Stream}   The stream
 */
function inject(src, label, order) {
  var options = { read: false };
  if (label) {
    options.name = 'inject:' + label;
  }

  return $.inject(gulp.src(src, options).pipe(orderSrc(src, order)));
}

function orderSrc(src, order) {
  //order = order || ['**/*'];
  return gulp
    .src(src)
    .pipe($.if(order, $.order(order)));
}

/**
 * Format and return the header for files
 * @return {String}           Formatted file header
 */
function getHeader() {
  var pkg = require('./package.json');
  var template = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @authors <%= pkg.authors %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''
  ].join('\n');
  return $.header(template, {
    pkg: pkg
  });
}







