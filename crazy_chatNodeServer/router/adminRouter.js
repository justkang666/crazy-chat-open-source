const { createToken,verifyToken } = require('../util/token')
const findAdminUser = require('../db/DAO/admin/findAdminUser')
const findUserAndMsgNum = require('../db/DAO/admin/findUserAndMsgNum')
const findAllUser = require('../db/DAO/admin/findAllUser')
const adminChangeUser = require('../db/DAO/admin/adminChangeUser')

module.exports = (app)=>{
  // adminLogin POST
  app.post('/adminLogin',(req,res)=>{
    const {email,password} = req.body
    // console.log({email,password})
    // 判断传过来的有账号和密码
    if(email && password) {
      const data = {email,password}
      findAdminUser(data,res)
    }  
  })

  // admin  userNumAndchatNum
  app.post('/userNumAndchatNum',(req,res)=>{
    const crazytoken = req.headers.crazytoken 
    // console.log(req.headers)
    if(crazytoken && crazytoken != 'null') {
      // findFriendList(crazytoken,res)
      findUserAndMsgNum(res)
    } else {
      res.send({
        code:'401',
        msg:'请先登录'
      })
    }
  })

  // adminfindAlluser
  app.post('/adminfindAlluser',(req,res)=>{
    const crazytoken = req.headers.crazytoken 
    // console.log(req.headers)
    if(crazytoken && crazytoken != 'null') {
      // findFriendList(crazytoken,res)
      findAllUser(res)
    } else {
      res.send({
        code:'401',
        msg:'请先登录'
      })
    }
  })

  // adminChangeUser
  app.post('/adminChangeUser',(req,res)=>{
    const crazyId = req.body.crazyId
    const data = req.body.changeData
    const crazytoken = req.headers.crazytoken 
    // console.log(crazyId,data)
    if(crazytoken && crazytoken != 'null') {
      // findFriendList(crazytoken,res)
      adminChangeUser(crazyId,data,res)
    } else {
      res.send({
        code:'401',
        msg:'请先登录'
      })
    }
  }) 
}