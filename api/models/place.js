const mongoose = require('mongoose')

const PlaceSchema = new mongoose.Schema({
    postedBy: {type:mongoose.Schema.Types.ObjectId,ref:'User'},
    address: String,
    photos: [String],
    country:{type:String},
    state:String,
    city:String,
    postalCode:Number,
    likes:{
        type: [String],
        default: [],
      },
      dislikes:{
        type: [String],
        default: [],
      },
      comments:[{
        post: { type: String, required: true },
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', // Reference to the User model
        },
        commenter:{
          type:String,
        },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      }],
    location:String,
    positiveThings: String,
    negativeThings: String,
    extraInfo: String,
    createdAt:{
        type:Date,
        default:new Date
    }
})

const PlaceModel = mongoose.model('Place',PlaceSchema)

module.exports = PlaceModel;