#!/usr/bin/env node

const program = require('commander');
const app = require('../server/config/app');

program
    .version(require('../package.json').version)
    .command('search <q>')
    .action((q) => {
        app.MovieService.search(q).then((movies) => console.log(JSON.stringify(movies, null, '\t')))
    });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}