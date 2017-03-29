module.exports = (container) => {
    let {Router} = require('express');
    let router = new Router();

    router.get('/', (req, res, next) => {
       res.send('OK');
    });

    return router;
};