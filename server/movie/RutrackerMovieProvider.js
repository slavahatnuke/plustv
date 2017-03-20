const Movie = require('./Movie');
const MovieProvider = require('./MovieProvider');

module.exports = class RutrackerMovieProvider extends MovieProvider {
    constructor() {
        super();
    }

    search(q) {
        return Promise.resolve()
            .then(() => {
                return [new Movie];
            });
    }
};

module.exports.$tags = ['movie', 'provider'];