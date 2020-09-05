const validator = require('node-input-validator');

const registerSchema = {
    first_name: 'required|minLength:2',
    last_name: 'required|minLength:2',
    email: 'required|email',
    date_of_birth: 'required',
    telephone: 'required|integer',
    country: 'required',
    password: 'required|minLength:6'    
};

const loginSchema = {
    email: 'required|email',
    password: 'required|minLength:6'
};

const register = (data) => {
    let v = new validator.Validator(data, registerSchema);
    return v.check();
};

const login = (data) => {
    let v = new validator.Validator(data, loginSchema);
    return v.check();
};

module.exports = {
    register,
    login
};