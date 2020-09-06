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

api.get('/product', products.getAll);
api.get('/product/:id', products.getSingle);
api.post('/product', products.create);
api.delete('/product/:id', products.remove);
api.put('/product/:id', products.update);



api.listen(config.get('service_ports').product, err => {
    if (err) {
        return console.error(err);
    }
    console.log(`App started on port ${config.get('service_ports').products}`);
});
