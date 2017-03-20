module.exports = require('plus.application').create({
    dir: __dirname,
    env: process.env.NODE_ENV || 'dev'
}).container;
