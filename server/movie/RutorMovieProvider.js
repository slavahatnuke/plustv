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
            .then(() => browser.getSelector())
            .then((aSelector) => $ = aSelector)
            .then(() => {
                return Promise.resolve()
                    .then(() => browser.iType('input[name="search"]', q))
                    .then(() => $('input[name="search"]').sendKeys('\n'));
            })

            //
            .then(() => browser.iSee(`#index table tr a[href*=magnet]`))
            .then(() => browser.iSee(`#index table tr td a:nth-child(3)`))

            //titles
            .then(() => $.all(`#index table tr td a:nth-child(3)`))
            .then((elements) => Promise.all(elements.map((element) => element.getAttribute('innerText'))))
            .then((items) => {
                items.forEach((item, idx) => {
                    let movie = new Movie;
                    movie.title = item;
                    movies.push(movie);
                });
            })

            // urls
            .then(() => $.all(`#index table tr td a:nth-child(3)`))
            .then((elements) => Promise.all(elements.map((element) => element.getAttribute('href'))))
            .then((items) => {
                items.forEach((item, idx) => movies[idx].url = item);
            })
            //
            //
            // .then((elements) => Promise.all(elements.map((element) => {
            //     let movie = new Movie;
            //
            //     return Promise.resolve()
            //         .then(() => element.getAttribute('innerText'))
            //         .then((title) => movie.title = title)
            //
            //         .then(() => element.getAttribute('href'))
            //         .then((url) => movie.url = url)
            //         .then(() => movies.push(movie));
            // })))

            // //titles
            // .then((selector) => $.all(`#index table tr td a:nth-child(3)`))
            // .then((elements) => Promise.all(elements.map((element) => {
            //     let movie = new Movie;
            //
            //     return Promise.resolve()
            //         .then(() => element.getAttribute('innerText'))
            //         .then((title) => movie.title = title)
            //
            //         .then(() => element.getAttribute('href'))
            //         .then((url) => movie.url = url)
            //         .then(() => movies.push(movie));
            // })))

            //magnets
            .then(() => $.all(`#index table tr td a[href*=magnet]`))
            .then((elements) => Promise.all(elements.map((element) => element.getAttribute('href'))))
            .then((items) => {
                items.forEach((item, idx) => movies[idx].magnet = item);
            })

            //seeds
            .then(() => $.all(`#index table tr td .green`))
            .then((elements) => Promise.all(elements.map((element) => element.getAttribute('innerText'))))
            .then((items) => {
                items.forEach((item, idx) => movies[idx].seeds = item ? item.trim() : item);
            })

            //peers
            .then((selector) => $.all(`#index table tr td .red`))
            .then((elements) => Promise.all(elements.map((element) => element.getAttribute('innerText'))))
            .then((items) => {
                items.forEach((item, idx) => movies[idx].peers = item ? item.trim() : item);
            })

            //size
            .then((selector) => $.all(`#index table tr td:nth-last-child(2)`))
            .then((elements) => Promise.all(elements.map((element) => element.getAttribute('innerText'))))
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