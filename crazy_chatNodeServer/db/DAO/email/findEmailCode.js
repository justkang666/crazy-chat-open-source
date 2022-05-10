const EmailCode = require('../../model/emailCode')
const saveUser = require('../saveUser')

module.exports = (data,res)=>{
  // 查询
  EmailCode.find({email:data.email},(error,result)=>{
    if(error) {
      console.log('数据库操作失败')
    } else {
      if(result.length > 0) {
        console.log(11)
        // 有匹配内容
        if(result[0].emailCode == data.emailCode) {
          saveUser(data,res)
          // res.send('1')
        } else {
          res.send({
            code:'401',
            msg:'验证码错误'
          })
        }
      } else {
        res.send({
          code:'401',
          msg:'请先获取验证码'
        })
      }
    }
  })
}