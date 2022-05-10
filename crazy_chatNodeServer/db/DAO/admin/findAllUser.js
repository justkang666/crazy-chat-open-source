const user = require('../../model/user')

module.exports = (res)=>{
  user.find({},{password:0,_id:0,token:0,},(err,doc)=>{
    if(err) {
      res.send({
        code:'402',
        msg:'数据库操作失败'
      }) 
    } else {
      if(doc.length > 0) {
        res.send({
          code:'200',
          data:doc
        })
      } else {
        res.send({
          code:'401',
          msg:'网络错误'
        })
      }
    }
  })
}