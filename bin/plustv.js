#!/usr/bin/env node

const program = require('commander');
const app = require('../server/config/app');

program
    .version(require('../package.json').version)
    .command('search <q>')
    .action((q) => {
        app.MovieService.search(q)
            .then((movies) => {
                movies.sort((a, b) => a.seeds > b.seeds ? -1 : 1);
                return movies.slice(0, 10);
            })
            .then((movies) => console.log(JSON.stringify(movies, null, '\t')))
            .catch((err) => console.log(err, err.stack))
    });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}