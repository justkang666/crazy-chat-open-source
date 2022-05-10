const chatList = require('../model/chatList')


module.exports = (data)=>{
  let newChatList = {
    crazyId:data.sendId,
    msg:data.msg,
    time:new Date().toLocaleString()
  }
  chatList.updateOne({Fid:data.Fid},{$push:{chatList:newChatList}},(err,doc)=>{
    if(err) {
      console.log('err')
    } else {
      console.log(data.Fid)
    }
  })
}