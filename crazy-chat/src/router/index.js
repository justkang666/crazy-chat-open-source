import Vue from 'vue'
import VueRouter from 'vue-router'
import {
	Switch,Toast
} from 'vant';

Vue.use(VueRouter)
Vue.use(Switch);
Vue.use(Toast);

import Home from '@/views/home'
import Login from '@/views/login'
import AddFriend from '@/views/addFriend'
import Setting from "@/views/setting";
import Register from "@/views/register";
import findPassword from "@/views/findPassword";
const routes = [
	//  注册一级路由

	{
		path: '/',
		name:'Home',
		component: Home,
		meta: {
			header: true,
			footer: true
		},
		children: [
			{
				path: 'chatPage',
				name:'chatPage',
				component:()=>import('@/views/home/chatPage'),
				meta: {
					isShow: true,
				},
			}
		]
	},
	{
		path: '/login',
		name:'login',
		component: Login,
		meta: {
			header: false,
			footer: false
		}
	},
	{
		path: '/register',
		name:'register',
		component: Register,
		meta: {
			header: false,
			footer: false
		}
	},
	{
		path: '/findPassword',
		name:'findPassword',
		component: findPassword,
		meta:{
			header: false,
			footer: false
		}
	},
	{
		path: '/addfriend',
		name:'addfriend',
		component: AddFriend,
		meta: {
			header: true,
			footer: true
		},
		children: [
			{
				path: 'friendReq',
				name:'friendReq',
				component:()=>import('@/views/addFriend/friendReq'),
				meta: {
					isShow: true,
					footer: true
				},
			}
		]
	},
	//  二级路由 http://localhost:8080/#/setting/changeinfo  children:[path:'changeinfo',component:()=>import('')]
	{
		path: '/setting',
		name:'setting',
		component:Setting,
		meta: {
			header: false,
			footer: true,
			isShow: false
		},
		// children
		children: [{
				path: 'myInfo',
				name:'myInfo',
				component: () => import('@/views/setting/myInfo'),
				meta: {
					header: false,
					footer: true,
					isShow: true
				}
			}, {
				path: 'changePassword',
				name:'changePassword',
				component: () => import('@/views/setting/changePassword'),
				meta: {
					header: false,
					footer: true,
					isShow: true
				}
			}, {
				path: 'servePage',
				name:'servePage',
				component: () => import('@/views/setting/servePage'),
				meta: {
					header: false,
					footer: true,
					isShow: true
				}
			},
			{
				path: 'collectPage',
				name:'collectPage',
				component: () => import('@/views/setting/collectPage'),
				meta: {
					header: false,
					footer: true,
					isShow: true
				}
			},
			{
				path: 'friendCircle',
				name:'friendCircle',
				component: () => import('@/views/setting/friendCircle'),
				meta: {
					header: false,
					footer: true,
					isShow: true
				}
			},
			{
				path: 'settingPage',
				name:'settingPage',
				component: () => import('@/views/setting/settingPage'),
				meta: {
					header: false,
					footer: true,
					isShow: true
				}
			},
			{
				path: 'privacyState',
				name:'privacyState',
				component: () => import('@/views/setting/privacyState'),
				meta: {
					header: false,
					footer: true,
					isShow: true
				}
			},

		]
	}
]


const router = new VueRouter({
	routes,
})

// 全局路由守卫
router.beforeEach((to,from,next)=>{
	if(localStorage.getItem('crazytoken') && localStorage.getItem('crazytoken') != null) {
		if (to.path === '/login' || to.path === '/register' || to.path === '/findPassword') {
			Toast.fail('请先退出登录')
			console.log(1)
		} else {
			next()
		}
	} else {
		if (to.path !== '/login' || to.path !== '/register' || to.path !== '/findPassword') {
			next();
		} else {
			Toast.fail('您还没有登录，请先登录')
			next('/login');
		}
	}
})
router.beforeEach((to,from,next)=>{
	document.title = to.name
	next()
})


export default router
