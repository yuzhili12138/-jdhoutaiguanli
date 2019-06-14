import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

import login from '../components/pages/login'
import home from '../components/pages/home'

import news from '../components/pages/news'
import device from '../components/pages/device'
import manage from '../components/pages/manage'
import user from '../components/pages/user'

import create from '../components/pages/create'
// import list from '../components/views/list'
import createuser from '../components/pages/createuser'
import createNews from '../components/pages/createNews'

import createDe from '../components/pages/createDe'




export default new Router({
  routes: [
    {
      path: '/login',
      component: login,

    }, {
      path: '*',
      redirect: '/login'
    }, {
      path: '/home',
      component: home,
      children: [{
        path:'',
        redirect:'news'
      },{
        path: 'news',
        component: news,
        name: '通知列表页'
      },{
        path:'manage/create/:id',
        component:create,
        name: '添加/修改管理员'
      },{
        path:'news/create/:id',
        component:createNews,
        name:'添加/修改通知'
      },{
        path:'user/create/:id',
        component:createuser,
        name:'添加/修改用户'
      },{
        path:'device/create/:id',
        component:createDe,
        name:'添加/修改设备'
      }
        , {
        path: 'device',
        component: device,
        name: '设备列表页'
      }, {
        path: 'manage',
        component: manage,
        name: '管理员列表页',
      }, {
        path: 'user',
        component: user,
        name: '用户列表页'

      },

      ]
    }

  ]
})
