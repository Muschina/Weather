module.exports = function() {
	var app = './src/app/';
  var root = './';
  var specRunnerFile = 'specs.html';
  var temp = './.tmp/';
  var wiredep = require('wiredep');
  var bowerFiles = wiredep({ devDependencies: true })['js'];
  var bower = {
    json: require('./bower.json'),
    directory: './bower_components/',
    ignorePath: '../..'
  };

  var config = { /**  * File paths  */
      js: './src/app/**/*.js',
      build: './build/',
      css: './src/styles/*.css',
      cssInject: temp + 'app.css',
      resultInject: './src/',
      fonts: './src/fonts/*.*',
      html: './src/**/*.html',
      htmltemplates: app + '**/*.html',
      images: './src/images/*.*',
      index: './src/index.html', 
      // app js, with no specs 
      js: [
        app + '**/*.module.js', 
        app + '**/*.js', 
        '!' + app + '**/*.spec.js'
      ],
      jsOrder: ['**/app.module.js', '**/*.module.js', '**/*.js'],
      root: root,
      temp: temp,

    /**
     * browser sync
     */
    browserReloadDelay: 1000,

    /**
     * template cache
     */
    templateCache: {
      file: 'templates.js',
      options: {
        module: 'weatherApp',
        root: 'app/',
        standalone: false
      }
    },

    /**
     * Bower and NPM files
     */
    bower: bower,
    packages: [
      './package.json',
      './bower.json'
    ],

  /**
   * wiredep and bower settings
   */
  config.getWiredepDefaultOptions = function() {
    var options = {
      bowerJson: config.bower.json,
      directory: config.bower.directory,
      ignorePath: config.bower.ignorePath
    };
    return options;
  };

  return config;
}