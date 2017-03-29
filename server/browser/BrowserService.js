const seleniumWebdriver = require('selenium-webdriver');
const Browser = require('./Browser');

module.exports = class BrowserService {
    constructor(options = {}) {
        this.name = null;
        this.pageLoadTimeout = 30 * 1000;
        this.waitTimeout = 30 * 1000;
        Object.assign(this, options)
    }

    getBrowser() {
        let tester = new Browser(() => {
            let driver = new seleniumWebdriver.Builder().forBrowser(this.name).build();
            driver.manage().timeouts().pageLoadTimeout(this.pageLoadTimeout);
            return driver;
        });

        tester.setup({waitTimeout: this.waitTimeout});
        return tester;
    }
}
