module.exports = (container) => {

    container.add('MovieService', require('../movie/MovieService'), ['MovieService.providers', 'StorageService']);

    container.add('MovieService.providers', function () {
        return container.find(['movie', 'provider']);
    });

    container.add('RutrackerMovieProvider', require('../movie/RutrackerMovieProvider'), [])
    container.add('StorageService', require('../storage/StorageService'), ['config/zero']);
};