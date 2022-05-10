import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'post',
        params: query
    });
};

/*
* admin 登陆  POST
* /adminLogin
* 邮箱 密码
* */

export const adminLogin = data => {
    return request({
        url: '/adminLogin',
        method: 'post',
        data
    });
};


/*
* 获取用户数量 聊天数量 总共建立好友量 post
* userNumAndchatNum
* 携带token
* */
export const getAllData = () => {
    return request({
        url: '/userNumAndchatNum',
        method: 'post',
        headers:{
            crazytoken:localStorage.getItem('crazyAdminToken')
        }
    });
};

/*
* 获取用户信息
* adminfindAlluser
* 携带token
* */
export const findAllUser = () => {
    return request({
        url: '/adminfindAlluser',
        method: 'post',
        headers:{
            crazytoken:localStorage.getItem('crazyAdminToken')
        }
    });
};


/*
* 修改用户信息 POST
* adminChangeUser
* crazyId changeData:{username,__V,viaUrl,tel}
* */
export const changeUser = (crazyId,changeData) => {
    return request({
        url: '/adminChangeUser',
        method: 'post',
        data:{
            crazyId:crazyId,
            changeData:changeData
        },
        headers:{
            crazytoken:localStorage.getItem('crazyAdminToken')
        }
    });
};

