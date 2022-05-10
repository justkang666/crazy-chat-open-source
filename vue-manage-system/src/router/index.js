import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  }, {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          title: '系统首页'
        },
        component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
      }, {
        path: "/table",
        name: "basetable",
        meta: {
          title: '表格'
        },
        component: () => import ( /* webpackChunkName: "table" */ "../views/BaseTable.vue")
      }
    ]
  }, {
    path: "/login",
    name: "Login",
    meta: {
      title: '登录'
    },
    component: () => import ( /* webpackChunkName: "login" */ "../views/Login.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | vue-manage-system`;
  const role = localStorage.getItem('crazyAdminToken');
  if (!role && to.path !== '/login') {
    next('/login');
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin'
        ? next()
        : next('/403');
  } else {
    next();
  }
});

export default router;