var mongoose = require('mongoose');

const Product = mongoose.model(
    'product',
    {
        name: String,
        description: String,
        type: String,
        purchase_date: Date,
        price:Number,
        owner_id:String
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

const getAll= (uid) => {
    return new Promise((success, fail) =>{
        let query = {owner_id: uid};
        Product.find(query, (err, data) =>{
            if(err) {
                return fail(err);
            }
            return success(data);
        });
    });    
};

const getOne = (id) => {
    return new Promise((success, fail) =>{
        Product.findOne({_id: id}, (err,data) => {
            if(err) {
                return fail (err);
            }
            return success(data)
        });
    });
};

const remove = (id, uid) => {
    return new Promise((success, fail) =>{
        Product.deleteOne({_id: id, owner_id: uid}, err => {
            if(err) {
                return fail (err);
            }
            return success()
        });
    });
};

const update = (data, id, uid) => {
    return new Promise((success, fail) =>{
        Product.updateOne({_id: id, owner_id: uid}, data, err => {
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