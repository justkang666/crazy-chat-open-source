const EmailCode = require('../../model/emailCode')

module.exports = (data)=>{
  const {email,emailCode} = data
  const newEmailCode = new EmailCode({
    email,
    emailCode
  })
  // 先把原有删除掉
  EmailCode.findOneAndDelete({email},(error,result)=>{
    if(error) {
      console.log('数据库操作失败')
    } else {
      if(result.length > 0) {
        // 有匹配内容
        console.log('已删除')
      }
    }
  })
  newEmailCode.save((err,result)=>{
    console.log(err,result)
  })
}
