let express = require('express');

let app = express();

let container = require('./config/app');
container.add('app', app);

let bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/api', require('./api')(container));

let port = process.env.PORT || container.get('config/port');
app.listen(port, () => {
    console.log(`PORT: ${port}`)
    console.log(`ENV : ${container.get('config/env')}`)
});

