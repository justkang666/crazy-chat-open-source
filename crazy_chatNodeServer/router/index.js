const findUser = require('../db/DAO/findUser')
// const saveUser = require('../db/DAO/saveUser')
const findFriendList = require('../db/DAO/findFriendList')
const sendEmail = require('../db/DAO/email/sendEmial')
const saveEmailCode = require('../db/DAO/email/saveEmailCode')
const findEmailCode = require('../db/DAO/email/findEmailCode')
const findMyInfo = require('../db/DAO/findMyInfo')
const findUserList = require('../db/DAO/findUserList')
const updataUser = require('../db/DAO/updataUser')
const { createToken,verifyToken } = require('../util/token')
const addFriend = require('../db/DAO/addFriend')
const findFriendInfo = require('../db/DAO/findFriendInfo')
const updateFriend = require('../db/DAO/updateFriend')
const findChatList = require('../db/DAO/findChatList')
const findUserPassword = require('../db/DAO/findUserPassword')

const adminRouter = require('./adminRouter')


module.exports = (app)=>{
  // body参数中间件
  const bodyParser = require('body-parser')
  app.use(bodyParser.json())
 
  // 登录
  app.post('/login',(req,res)=>{
    const {email,password} = req.body
    // console.log({email,password})
    // 判断传过来的有账号和密码
    if(email && password) {
      const data = {email,password}
      findUser(data,res)
    }  
  })

  // 发送邮件 存储数据
  app.post('/getEmailCode', (req,res)=>{
    const data = req.body
    // 随机6位
    data.emailCode = Math.random().toFixed(6).slice(-6)
    console.log(data)
    saveEmailCode(data)
    sendEmail(data,res)
  })  
  // 注册
  app.post('/register', async (req,res)=>{
    console.log(req.body)
    findEmailCode(req.body,res)
  })

  // 获取个人数据
  app.post('/myInfo',(req,res)=>{
    const crazytoken = req.headers.crazytoken 
    // console.log(req.headers)
    if(crazytoken && crazytoken != 'null') {
      // findFriendList(crazytoken,res)
      findMyInfo(crazytoken,res)
    } else {
      res.send({
        code:'401',
        msg:'请先登录'
      })
    }
  })

  // 获取朋友列表
  app.post('/friendList',(req,res)=>{
    const crazytoken = req.headers.crazytoken 
    // console.log(req.headers)
    if(crazytoken && crazytoken != 'null') {
      findFriendList(crazytoken,res)
    } else {
      res.send({
        code:'401',
        msg:'请先登录'
      })
    }
  })

  // 搜索好友列表 data{username} token
  app.post('/findUser',(req,res)=>{
    const data = req.body
    const crazytoken = req.headers.crazytoken 
    // console.log(req.headers)
    if(crazytoken && crazytoken != 'null') {
      findUserList(data,res)
    } else {
      res.send({
        code:'401',
        msg:'请先登录'
      })
    }
  })

  // 修改个人信息
  app.post('/updateUser',(req,res)=>{
    const data = req.body
    const crazytoken = req.headers.crazytoken 
    // console.log(req.headers)
    if(crazytoken && crazytoken != 'null') {
      updataUser(data,crazytoken,res)
    } else {
      res.send({
        code:'401',
        msg:'请先登录'
      })
    }
  })

  // 上传头像
  app.post('/fileImg',(req,res)=>{
    const data = req.body
    const crazytoken = req.headers.crazytoken 
    let id = verifyToken(crazytoken).data.crazyId
    if(crazytoken && crazytoken != 'null') {
      const fs = require('fs');
      const path = 'public/img/'+ id +'.png';
      const base64 = data.base64.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
      const dataBuffer = Buffer.from(base64, 'base64'); //把base64码转成buffer对象，
      fs.writeFile(path, dataBuffer, function(err){//用fs写入文件
          if(err){
            console.log('写入失败');
            res.send('头像上传失败22')
          }else{
            console.log('写入成功！');
            const url = 'http://localhost:8800/' + path.replace('public',"")
            updataUser({viaUrl:url},crazytoken,res)
          }
      })
    } else {
      res.send({
        code:'401',
        msg:'请先登录'
      })
    }
  })

  // 添加好友   token 和 要添加的好友id
  app.post('/addFriend',(req,res)=>{
    const friendId = req.body.friendId
    const crazytoken = req.headers.crazytoken 
    if(crazytoken && crazytoken != 'null') {
      addFriend(crazytoken,friendId,res)
    } else {
      res.send({
        code:'401',
        msg:'请先登录'
      })
    }
  })

  // 查找朋友信息   token 和 朋友id
  app.post('/findFriendInfo',(req,res)=>{
    const friendId = req.body.friendId
    const crazytoken = req.headers.crazytoken 
    if(crazytoken && crazytoken != 'null') {
      findFriendInfo(friendId,crazytoken,res)
    } else {
      res.send({
        code:'401',
        msg:'请先登录'
      })
    }
  })

   // 更新朋友状态   token 和 朋友id
   app.post('/updateFriendState',(req,res)=>{
    const friendId = req.body.friendId
    const state = req.body.state
    const crazytoken = req.headers.crazytoken 
    if(crazytoken && crazytoken != 'null') {
      updateFriend(crazytoken,friendId,state,res)
    } else {
      res.send({
        code:'401',
        msg:'请先登录'
      })
    }
  })

   // 获取聊天列表 Fid
   app.post('/getChatList',(req,res)=>{
    const Fid = req.body.Fid
    const crazytoken = req.headers.crazytoken 
    if(crazytoken && crazytoken != 'null') {
      findChatList(crazytoken,Fid,res)
    } else {
      res.send({
        code:'401',
        msg:'请先登录'
      })
    }
  })

  // 找回密码 邮箱 密码 邮箱验证码
  app.post('/findPassword',(req,res)=>{
    const data = req.body
    findUserPassword(data,res)
  })

  // admin Router

  adminRouter(app)
}



