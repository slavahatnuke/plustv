module.exports = (container) => {
    container.add('MovieService', require('../movie/MovieService'), [])
};