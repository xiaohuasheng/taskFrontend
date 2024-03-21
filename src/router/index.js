import Vue from 'vue'
import Router from 'vue-router'
import Convert from '@/components/Convert'
import WorkUtils from '@/components/WorkUtils'
import post from '@/components/post'
import think from '@/components/think'
import taskList from '@/components/legwork/taskList'
import acceptedTask from '@/components/legwork/acceptedTask'
import issuedTask from '@/components/legwork/issuedTask'
import taskDetail from '@/components/legwork/taskDetail'
import legworkMine from '@/components/legwork/mine'
import editor from '@/components/editor'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import chatgpt from '@/components/chatgpt'
import exec from '@/components/exec'

Vue.use(Router)
Vue.use(mavonEditor)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'convert',
      component: Convert
    },
    {
      path: '/convert',
      name: 'convert',
      component: Convert
    },
    {
      path: '/work-utils',
      name: 'workUtils',
      component: WorkUtils
    },
    {
      path: '/post',
      name: 'post',
      component: post
    },
    {
      path: '/editor',
      name: 'editor',
      component: editor
    },
    {
      path: '/chatgpt',
      name: 'chatgpt',
      component: chatgpt,
      meta: {
        title: 'chatgpt'
      }
    },
    {
      path: '/think',
      name: 'think',
      component: think,
      meta: {
        title: 'Thinking'
      }
    },
    {
      path: '/exec',
      name: 'exec',
      component: exec,
      meta: {
        title: 'Exec'
      }
    },
    {
      path: '/legwork/task',
      name: 'taskList',
      component: taskList,
      meta: {
        title: '待领取的'
      }
    },
    {
      path: '/legwork/accepted-task',
      name: 'acceptedTask',
      component: acceptedTask,
      meta: {
        title: '我领取的'
      }
    },
    {
      path: '/legwork/issued-task',
      name: 'issuedTask',
      component: issuedTask,
      meta: {
        title: '我发布的'
      }
    },
    {
      path: '/legwork/mine',
      name: 'mine',
      component: legworkMine,
      meta: {
        title: '我的主页'
      }
    },
    {
      path: '/legwork/task/detail',
      name: 'taskDetail',
      component: taskDetail,
      meta: {
        title: '任务详情'
      }
    }
  ]
})
