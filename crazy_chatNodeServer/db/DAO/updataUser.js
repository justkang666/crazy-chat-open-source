const user = require('../model/user')
const { createToken,verifyToken } = require('../../util/token')
module.exports = (url,token,res)=>{
  let tokenInfo = verifyToken(token)
  let id = tokenInfo.data.crazyId
  user.find({crazyId:id},(err,doc)=>{
    if(err){
      res.send({
        code:'402',
        msg:'网络错误'
      })
    } else {
      if(doc.length > 0) {
        console.log(doc[0])
        // console.log(data)
        user.updateOne(doc[0],url,(err,doc)=>{
          if(err){
            res.send({
              code:'401',
              msg:'修改失败'
            })
          } else {
            res.send({
              code:'200',
              msg:'修改成功'
            })
          }  
        })
      } else {
        res.send({
          code:'401',
          msg:'修改失败'
        })
      }
    }
  })
}