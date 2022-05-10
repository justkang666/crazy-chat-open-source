const mongoose = require('../index')
const Schema = mongoose.Schema;

const friendListSchema = new Schema({
  crazyId:{
    type:String
  },
  friends:{
    type:Array,
    default:[]
  },
})

module.exports = mongoose.model('frendList',friendListSchema)