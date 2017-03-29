const Movie = require('./Movie');

module.exports = class MovieService {
    constructor(providers, StorageService) {
        this.providers = providers;
        this.StorageService = StorageService;
    }

    search(q) {
        let result = [];
        return Promise.all(this.providers.map((provider) => provider.search(q)))
            .then((arrayOfMovies) => {
                return result.concat.apply(result, arrayOfMovies);
            })
            .then((movies) => this.StorageService.save(movies))
            .then((movies) => movies.sort((a, b) => a.seeds > b.seeds));
    }
}
