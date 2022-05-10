// 引入nodemailer模块
const nodemailer = require('nodemailer');
var state = null

// 开启一个 SMTP 连接池
let transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',  //qq的host
  secureConnection: true, // use SSL
  port: 465,
  secure: true, // secure:true for port 465, secure:false for port 587
  auth: {
    user: '《替换》',
    pass: '《替换》' // QQ邮箱需要使用授权码
  }
});

module.exports = (data,res) => {
  // 设置邮件内容（谁发送什么给谁）
  let mailOptions = {
    from: '《替换》', // 发件人
    to: `${data.email}`, // 收件人
    subject: 'Crazy Coder 邮箱验证码', // 主题
    html: `<p>感谢您对我们的支持，您的验证码为：<b style="color:red;">${data.emailCode}</b></p>`, // html body
  };
  // 使用先前创建的传输器的 sendMail 方法传递消息对象
  transporter.sendMail(mailOptions,  (error, info) => {
    // 发送失败
    if (error) {
      res.send({code:'401',msg:'邮件发送失败，请查看邮箱是否有误'})
      return error
    }
    // 发送成功
    res.send({code:'200',msg:'邮件发送成功，请查收'})
    return info
    
  });
}



