const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const db = require('../../pkg/db');
const config = require('../../pkg/config');
const products = require('./handlers/products');

db.init();

const api = express();

api.use(bodyParser.json());
api.use(
    jwt({
        secret: config.get('server').key,
        algorithms: ['HS256']
    })
);

api.get('/', products.getAll);
api.get('/:id', products.getSingle);
api.post('/', products.create);
api.delete('/:id', products.remove);
api.put('/:id', products.update);



api.listen(config.get('service_ports').products, err => {
    if (err) {
        return console.error(err);
    }
    console.log(`App started on port ${config.get('service_ports').products}`);
});
