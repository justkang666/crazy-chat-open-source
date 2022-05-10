const mongoose = require('../index')
const Schema = mongoose.Schema;

const emailCodeSchema = new Schema({
  emailCode:{
    type:Number,
  },
  email:{
    type:String
  },
  register:{
    type:Boolean,
    default:false
  }
})

module.exports = mongoose.model('emailCode',emailCodeSchema)