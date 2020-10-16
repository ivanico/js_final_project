const product = require('../../../pkg/products');
const productValidator = require('../../../pkg/products/validation')

const create = (req, res) => {
    console.log(req.user);
    productValidator.validate(req.body)
    .then(matches => {
        if(!matches){
            throw 'Bad request';
        }
        let data = {...req.body, owner_id: req.user.uid};
        return product.create(data);
    })
    .then(() =>{
        res.status(200).send('ok');
    })
    .catch(err => {
        console.log(err);
        res.status(500).send('internal server error');
    });
};

const getAll = (req, res) => {
    product.getAll(req.user.uid)
    .then(data => {
        res.status(200).send(data);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('internal server error');
    });
};

const getSingle = (req, res) => {
    product.getOne(req.params.id)
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send('internal server error');
    });
};

const remove = (req, res) => {
    product.remove(req.params.id, req.user.uid)
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
        return product.update(req.params.id, req.body, req.user.uid)
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