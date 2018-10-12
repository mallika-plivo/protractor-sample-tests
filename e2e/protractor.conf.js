// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

// const { SpecReporter } = require('jasmine-spec-reporter');
// var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var HTMLReport = require('protractor-html-reporter');
var jasmineReporters = require('jasmine-reporters');
var fs = require('fs-extra');

exports.config = {
  allScriptsTimeout: 20000,
  specs: [
    './src/*.js'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  // baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {   
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
        consolidateAll: true,
        savePath: './',
        filePrefix: 'xmlresults'
    }));
    fs.emptyDir('screenshots/', function (err) {
      console.log(err);
    });

    jasmine.getEnv().addReporter({
        specDone: function(result) {
            if (result.status == 'failed') {
                browser.getCapabilities().then(function (caps) {
                    var browserName = caps.get('browserName');
                    testConfig = {
                      reportTitle: 'Test Execution Report',
                      outputPath: './',
                      screenshotPath: './screenshots',
                      testBrowser: browserName,
                    };
                    new HTMLReport().from('xmlresults.xml', testConfig);
                    browser.takeScreenshot().then(function (png) {
                        var stream = fs.createWriteStream('screenshots/' + browserName + '-' + result.fullName+ '.png');
                        stream.write(new Buffer(png, 'base64'));
                        stream.end();
                    });
                });
            }
        }
    });
  },
  onComplete: function() {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function (caps) {
       browserName = caps.get('browserName');
       browserVersion = caps.get('version');

       var HTMLReport = require('protractor-html-reporter');

       testConfig = {
           reportTitle: 'Test Execution Report',
           outputPath: './',
           screenshotPath: './screenshots',
           testBrowser: browserName,
           browserVersion: browserVersion,
           modifiedSuiteName: false,
           screenshotsOnlyOnFailure: true
       };
       new HTMLReport().from('xmlresults.xml', testConfig);
   });
  }
};