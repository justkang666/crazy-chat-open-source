const jwt = require('jsonwebtoken')

// 生成token
const createToken = (data) => {
  // 过期时间 为 60s
  let token = jwt.sign({
    data,
  }, 'justkang', { expiresIn: 60*60*48 });
  return token
}
const verifyToken = (token) => {
  return jwt.verify(token,'justkang', (error, result) => {
    if(error != null) {
      return error
    } else {
       return result
    }
   
  })
}
module.exports = { createToken,verifyToken }