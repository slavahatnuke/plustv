const Movie = require('./Movie');

module.exports = class MovieProvider {
    search(q) {
        throw new Error('Abstract');
    }
};
