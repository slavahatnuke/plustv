const Movie = require('./Movie');

module.exports = class MovieService {
    constructor() {

    }

    search(q) {
        return Promise.resolve().then(() => {
            return [new Movie];
        });
    }
}
