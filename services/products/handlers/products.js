const product = require('../pkg/products');
const productValidator = require('../pkg/products/validation')

const getAll = (req, res) => {
    product.getAll()
    .then(data => {
        res.status(200).send(data);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('internal server error');
    });
};

const getSingle = (req, res) => {
    product.getOne()
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send('internal server error');
    });
};

const create = (req, res) => {
    productValidator.validate(req.body)
    .then(matches => {
        if(!matches){
            throw 'Bad request';
        }
        return product.create(req.body)
    })
    .then(() =>{
        res.status(200).send('ok');
    })
    .catch(err => {
        console.log(err);
        res.status(500).send('internal server error');
    });
};

const remove = (req, res) => {
    product.remove(req.params.id)
    .then(() => {
        res.status(204).send("no content");
    })
    .catch(err => {
        console.log(err);
        res.status(500).send('internal server error');
    })
};

const update = (req, res) => {
    productValidator.validate(req.body)
    .then(matches => {
        if(!matches){
            throw 'Bad request';
        }
        return product.update(req.params.id, req.body)
    })    
    .then(() => {
        res.status(200).send('no content');
    })
    .catch(err => {
        console.log(err);
        res.status(500).send('internal server error');
    });
};

module.exports = {
    getAll,
    getSingle,
    create,
    remove,
    update 
};