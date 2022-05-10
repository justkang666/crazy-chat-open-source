const mongoose = require('../index')
const Schema = mongoose.Schema;

const chatListSchema = new Schema({
  Fid:String,
  chatList:{
    type:Array,
    default:[]
  }
})

module.exports = mongoose.model('chatList',chatListSchema)