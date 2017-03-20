const Movie = require('./Movie');
const MovieProvider = require('./MovieProvider');

module.exports = class RutorMovieProvider extends MovieProvider {
    constructor(BrowserService) {
        super();
        this.BrowserService = BrowserService;
    }

    search(q) {
        let browser;
        let movies = [];
        let $;

        return Promise.resolve()
            .then(() => this.BrowserService.getBrowser())
            .then((aBrowser) => browser = aBrowser)
            .then(() => {
                return Promise.resolve()
                    .then(() => browser.iOpen('http://rutor.info'))
                    .then(() => browser.iSee('input[name="search"]'))
            })
            .then(() => {
                return Promise.resolve()
                    .then(() => browser.iType('input[name="search"]', q))
                    .then(() => browser.iClick('input#sub'));
            })
            //
            .then(() => browser.iSee(`#index table tr a`))
            .then(() => browser.getSelector())
            .then((aSelector) => $ = aSelector)

            //titles
            .then((selector) => $.all(`#index table tr td a:nth-child(3)`))
            .then((elements) => Promise.all(elements.map((element) => {
                let movie = new Movie;

                return Promise.resolve()
                    .then(() => element.getAttribute('innerText'))
                    .then((title) => movie.title = title)

                    .then(() => element.getAttribute('href'))
                    .then((url) => movie.url = url)
                    .then(() => movies.push(movie));
            })))

            //magnets
            .then((selector) => $.all(`#index table tr td a[href*=magnet]`))
            .then((elements) => Promise.all(elements.map((element) => element.getAttribute('href'))))
            .then((magnets) => {
                magnets.forEach((magnet, idx) => movies[idx].magnet = magnet);
            })

            // stop
            .then(() => browser.stop())
            .catch((err) => {
                return Promise.resolve()
                    .then(() => browser && browser.stop())
                    .then(() => Promise.reject(err));
            })
            // return
            .then(() => movies);
    }
};

module.exports.$tags = ['movie', 'provider'];