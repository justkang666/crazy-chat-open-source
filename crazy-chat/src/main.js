import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

//引入SocketIo
import VueSocketIO from "vue-socket.io";
import SocketIO from  "socket.io-client"
Vue.use(new VueSocketIO({
  debug:true,
  connection:SocketIO('ws://localhost:8801'),
}))

//引入vant ui
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

//注册全局组件
import chatNav from "@/components/chat-nav";
import chatFriend from "@/components/chat-friend";
import chatFrame from "@/components/chat-frame";
import chatFriendReq from "@/components/chat-friendReq";
Vue.component(chatNav.name,chatNav)
Vue.component(chatFriend.name,chatFriend)
Vue.component(chatFrame.name,chatFrame)
Vue.component(chatFriendReq.name,chatFriendReq)


Vue.config.productionTip = false

//全局事件总线
const bus = new Vue()
Vue.prototype.$bus = bus

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
