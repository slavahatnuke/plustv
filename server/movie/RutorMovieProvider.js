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
                    .then(() => browser.get('input[name="search"]').sendKeys('\n'));
            })

            // its ok
            .then(() => browser.iSee(`#index table tr a[href*=magnet]`))
            .then(() => browser.iSee(`#index table tr td a:nth-child(3)`))

            //titles
            .then(() => browser.iFindAttribute(`#index table tr td a:nth-child(3)`, 'innerText'))
            .then((items) => {
                items.forEach((item, idx) => {
                    let movie = new Movie;
                    movie.title = item;
                    movies.push(movie);
                });
            })

            // urls
            .then(() => browser.iFindAttribute(`#index table tr td a:nth-child(3)`, 'href'))
            .then((items) => {
                items.forEach((item, idx) => movies[idx].url = item);
            })

            //magnets
            .then(() => browser.iFindAttribute(`#index table tr td a[href*=magnet]`, 'href'))
            .then((items) => {
                items.forEach((item, idx) => movies[idx].magnet = item);
            })

            //seeds
            .then(() => browser.iFindAttribute(`#index table tr td .green`, 'innerText'))
            .then((items) => {
                items.forEach((item, idx) => movies[idx].seeds = item ? item.trim() : item);
            })

            //peers
            .then(() => browser.iFindAttribute(`#index table tr td .red`, 'innerText'))
            .then((items) => {
                items.forEach((item, idx) => movies[idx].peers = item ? item.trim() : item);
            })

            //size
            .then(() => browser.iFindAttribute(`#index table tr td:nth-last-child(2)`, 'innerText'))
            .then((items) => {
                items.forEach((item, idx) => movies[(idx-1)] && (movies[(idx-1)].size = item));
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