import request from "@/api/request";


/*
 * 登录 api post
 * email
 * password
 * */
export const reqLogin = (data) => {
	return request({
		method: 'POST',
		url: '/login',
		data: data,
	})
}


/* 
	获取验证码 api post 
	email 
*/
export const getVerifyCode = (data) => {
	return request({
		method: 'post',
		url: '/getEmailCode',
		data: data
	})
}

/*
	注册请求 api post
	register
*/
export const subRegister = (data) => {
	return request({
		method: 'post',
		url: '/register',
		data: data
	})
}

/*
* 找回密码  POST
* //findPassword
* 邮箱验证码 邮箱 password
* */
export const findPassword = (data) => {
	return request({
		method: 'post',
		url: '/findPassword',
		data: data
	})
}

/*
* 获取朋友列表 api  POST
* /friendList
* headers:{crazytoken:xxx}
* */
export const getFriendList = () => {
	let token = localStorage.getItem('crazytoken')
	return request({
		method: 'post',
		url: '/friendList',
		headers:{'crazytoken':token}
	})
}

/*
* 获取个人信息 api POST
* /myInfo
* headers:{crazytoken:xxx}
* */

export const getMyInfo = () => {
	let token = localStorage.getItem('crazytoken')
	return request({
		method: 'post',
		url: '/myInfo',
		headers:{'crazytoken':token}
	})
}

/*
* 查找user api POST
* /findUser
* headers:{crazytoken:xxx}
* data ｛username｝
* */

export const getUserList = (data) => {
	let token = localStorage.getItem('crazytoken')
	return request({
		method: 'post',
		url: '/findUser',
		data:data,
		headers:{'crazytoken':token}
	})
}

/*
* 修改userInfo api POST
* /updateUser
* headers:{crazytoken:xxx}
* data ｛username/sing/tel/viaUrl｝
* */

export const updateUser = (data) => {
	let token = localStorage.getItem('crazytoken')
	return request({
		method: 'post',
		url: '/updateUser',
		data:data,
		headers:{'crazytoken':token}
	})
}

//,

export const reqFile = (data) => {
	let token = localStorage.getItem('crazytoken')
	return request({
		method: 'post',
		url: '/fileImg',
		data:{base64:data},
		headers:{'crazytoken':token}
	})
}

/*
* 发送添加好友请求  POST token 请求的id  (friendId)
* /addFriend
* */
export const reqAddFriend = (data) => {
	let token = localStorage.getItem('crazytoken')
	return request({
		method: 'post',
		url: '/addFriend',
		data:data,
		headers:{'crazytoken':token}
	})
}

/*
* 获取朋友信息 api POST
* /findFriendInfo
* headers:{crazytoken:xxx}  data:{friendId}
* */

export const getFriendInfo = (id) => {
	let token = localStorage.getItem('crazytoken')
	return request({
		method: 'post',
		url: '/findFriendInfo',
		data:{friendId:id},
		headers:{'crazytoken':token}
	})
}

/*
* 改变朋友状态
* /updateFriendState
* headers:{crazytoken:xxx}  data:{friendId}
*  */

export const updateFriend = (id,state) => {
	let token = localStorage.getItem('crazytoken')
	return request({
		method: 'post',
		url: '/updateFriendState',
		data:{friendId:id,state},
		headers:{'crazytoken':token}
	})
}


/*
* 获取聊天列表 POST
* getChatList
* token  Fid
* */
export const getChatList = (Fid)=>{
	let token = localStorage.getItem('crazytoken')
	return request({
		method: 'post',
		url: '/getChatList',
		data:{Fid:Fid},
		headers:{'crazytoken':token}
	})
}
