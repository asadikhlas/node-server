var mongoose = require('mongoose');
const formSchema=new mongoose.Schema({
    fullName: String,
    email: String,
    password:String
})
module.exports = mongoose.model('signUp1', formSchema);  