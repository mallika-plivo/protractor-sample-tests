describe('protractor sample tests', function() {
    browser.ignoreSynchronization = true;
    // var originalTimeout;

    // beforeEach(function() {
    //     originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    //     jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    // });

    // afterEach(function() {
    //   jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    // });
    it('@OD-456:should create a phlo application', function() {
      var EC = protractor.ExpectedConditions;
      browser.get('https://www.google.com/');
      element(by.id('lst-ib')).sendKeys('test');
      browser.actions().sendKeys(protractor.Key.ENTER).perform();
      // element(by.name('btnK')).click();
    });

    it('@OD-123:should create a phlo application 123', function() {
      var EC = protractor.ExpectedConditions;
      browser.get('https://www.google.com/');
      element(by.id('lst-ib')).sendKeys('test123');
      browser.actions().sendKeys(protractor.Key.ENTER).perform();
      // element(by.name('btnK')).click();
    });


  });