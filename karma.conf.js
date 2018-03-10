// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {

  var configuration = {
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    files: [
      { pattern: './node_modules/@angular/material/prebuild-themes/indigo-pink.css', included: true, watched: true },
      { pattern: './src/assets/**', watched: false, included: false, nocache: false, served: true},
      { pattern: './server/assets/**/*.json', watched: false, included: false, nocache: false, served: true},
      { pattern: './src/assets/**/*.jpg', watched: false, included: false, nocache: false, served: true},
      { pattern: './src/assets/**/*.png', watched: false, included: false, nocache: false, served: true}
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'test'
    },
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Firefox'],
    singleRun: false,
    proxies: {
      '/assets': '/base/src/assets/'
    }
  };

  // if (process.env.TRAVIS) {
  //   configuration.browsers = ['Chrome_travis_ci'];
  // }

  config.set(configuration);
};
