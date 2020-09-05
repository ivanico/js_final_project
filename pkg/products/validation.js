const validator = require('node-input-validator');

const schema = {
    name: 'required|minLength:2',
    description: 'required|minLength:2',
    type: 'required|minLength:2',
    purchase_date: 'required',
    price: 'required|integer'
};

const validate = (data) => {
    let v = new validator.Validator(data, schema);
    return v.check();
}

module.exports = {
    validate
}