var mongoose = require('mongoose');

const Product = mongoose.model(
    'product',
    {
        name: String,
        description: String,
        type: String,
        purchase_date: Date,
        price:Number
    },
    'products'
)

const create = (data) => { 
    return new Promise((success , fail) => {
        let p = new Product(data);
        p.save(err =>{
            if(err) {
                return fail(err);
            }
            return success();
        });
    });
};

const getAll= () => {
    return new Promise((success, fail) =>{
        Product.find({}, (err, data) =>{
            if(err) {
                return fail(err);
            }
            return success(data);
        });
    });    
};

const getOne = () => {
    return new Promise((success, fail) =>{
        Product.findOne({_id: id}, (err,data) => {
            if(err) {
                return fail (err);
            }
            return success(data)
        });
    });
};

const remove = () => {
    return new Promise((success, fail) =>{
        Product.deleteOne({_id: id}, err => {
            if(err) {
                return fail (err);
            }
            return success()
        });
    });
};

const update = () => {
    return new Promise((success, fail) =>{
        Product.updateOne({_id: id}, data, err => {
            if(err) {
                return fail (err);
            }
            return success(data)
        });
    });
};



module.exports = {
    getAll,
    getOne,
    create,
    remove,
    update
};