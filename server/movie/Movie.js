module.exports = class Movie {
    constructor(options = {}) {
        this.id = null;
        this.url = null;

        this.title = null;
        this.description = null;
        this.magnet = null;

        this.peers = 0;
        this.seeds = 0;
        this.size = null;

        this.setup(options);
    }

    setup(options = {}) {
        Object.assign(this, options);
        return this;
    }
};
