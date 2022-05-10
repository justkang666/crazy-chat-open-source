import {getFriendList,getMyInfo, reqLogin} from "@/api";
import Vue from 'vue';
import { Toast } from 'vant';
import router from '@/router'

Vue.use(Toast);

const state = {
  friendList:{},
  myInfo:{}
}
const mutations = {
  GETFRIEND(state,data) {
    state.friendList = data
  },
  GETINFO(state,data){
    state.myInfo=data
  }
}
const actions = {
  //登录
  async login(a,data) {
    let result = await reqLogin(data)
    console.log(result)
    if(result && result.code == 200) {
      Toast.success('登陆成功');
      //把token存到本地
      localStorage.setItem('crazytoken',result.token)
      router.push('/')
    } else {
      Toast.fail('账号或密码错误');
    }
  },
  // 获取朋友列表
  async getFriend({commit}){
    let result = await getFriendList()
    if(result.code == '200') {
      let fList = JSON.parse(JSON.stringify(result.data));
      commit('GETFRIEND',fList)
    } else {
      // this.$notify('请重新登录1')
      Toast.fail('请重新登录')
      router.push('/login')
    }
  },
  //获取个人信息
  async getInfo ({commit}) {
    let result = await getMyInfo()
    if(result.code == '200') {
      localStorage.setItem('myInfo',JSON.stringify(result.data))
      commit('GETINFO',result.data)
    } else {
      // this.$notify('请重新登陆')
      Toast.fail('请重新登录')
      localStorage.clear('crazytoken')
      router.push('/login')
    }
  }
}

const getters = {
  myInfo: state => JSON.parse(JSON.stringify(state)).myInfo,
  friendList: (state)=>{
    if(state.friendList.friends) {
      let newArr = state.friendList.friends.filter((item)=>{
        if(item.state === 1){
          return item
        }
      })
      state.friendList.friends = newArr
    }
    return state.friendList
  }

}
const user =  {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default user
