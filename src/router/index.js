import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/dealt',
    name: 'dealt',
    component: () => import('../views/dealtpage/DealtPage.vue') //这是主页面
  },
  {
    path: '/logon',
    name: 'logon',
    component: () => import('../views/dealtpage/LogonPage.vue') //这是登录页面
  }
]

const router = new VueRouter({
  routes
})

// getItem 后面两个参数必须一样的

router.beforeEach((to, from, next) => {
  if (to.path == "/logon") {
    //如果用户要访问的是 /logonView 路由，则直接放行
    next();
  } else {
    //否则，检查用户是否已经登录（这里通过检查 sessionStorage 中是否有特定的数据来判断），如果已登录则放行，否则弹出一个提示框告知用户需要登录，并将路由切换到 /logonView
    if (sessionStorage.getItem("Chao") != null) { //存储登录
      next();
    } else {
      alert("请登录");
      next("/logon");
    }
  }
});
export default router
