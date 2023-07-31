const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({


    firstname:String,
    middlename:String,
    lastname:String,
    phone:{type:String,unique:true},
    email:{type:String,unique:true},
    username:{type:String,unique:true},
    Country:String,
    password:String

    
})

const Model = mongoose.model('user',UserSchema)

module.exports=Model;