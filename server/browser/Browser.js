const {WebTester} = require('plus.tester');

module.exports = class Browser extends WebTester{
    constructor(...args) {
        super(...args)
    }

    getSelector() {
        return this.getDriver().then(() => this.$);
    }
}
