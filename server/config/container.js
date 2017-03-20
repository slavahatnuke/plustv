module.exports = (container) => {

    container.add('MovieService', require('../movie/MovieService'), ['MovieService.providers', 'StorageService']);

    container.add('MovieService.providers', function () {
        return container.find(['movie', 'provider']);
    });

    container.add('RutorMovieProvider', require('../movie/RutorMovieProvider'), ['BrowserService'])
    container.add('StorageService', require('../storage/StorageService'), ['config/zero']);

    container.add('BrowserService', require('../browser/BrowserService'), ['config/browser']);
};