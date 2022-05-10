const user = require('../../model/user')

module.exports = (id,data,res)=>{
  user.findOneAndUpdate({crazyId:id},data,(err,doc)=>{
    if(err) {
      res.send({
        code:'402',
        msg:'数据库操作失败'
      })
    } else {
      if(doc) {
        // 查到了
        res.send({
          code:'200',
          msg:'修改成功'
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