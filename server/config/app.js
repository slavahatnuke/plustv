// PATH=$HOME/bin:/usr/local/bin:$PATH

let binDir = require('path').resolve(`${__dirname}/../../node_modules/.bin`);
process.env.PATH = `${binDir}:${process.env.PATH}`;

module.exports = require('plus.application').create({
    dir: __dirname,
    env: process.env.NODE_ENV || 'dev'
}).container;
