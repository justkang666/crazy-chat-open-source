const mongoose = require('../index')
const customId = require('custom-id')
const Schema = mongoose.Schema;
const id = customId({})

const userSchema = new Schema({
  username:{
    type:String,
  },
  email:{
    type:String
  },
  password:{
    type:String
  },
  token:{
    type:String,
    default:null
  },
  crazyId:{
    type:String,
    default:`crazy-${id}`
  },
  tel:{
    type:Number,
    default:null
  },
  regTime:{
    type:Date,
    default:new Date()
  },
  sing:{
    type:String,
    default:'用户暂未设置签名'
  },
  viaUrl:{
    type:String,
    default:'https://tse1-mm.cn.bing.net/th/id/R-C.29a84eb867bf75b5327e7df3b1a7e32c?rik=iW9zjAJwqTB%2fdA&riu=http%3a%2f%2ftupian.qqw21.com%2farticle%2fUploadPic%2f2019-7%2f201971622263482217.jpeg&ehk=W4G6YV7SJ1LFEFGJ3r%2bsC66stsnts%2bGu%2b7tsCcMPWGA%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1'
  }


})

module.exports = mongoose.model('User',userSchema)