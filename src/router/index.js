import Vue from 'vue'
import Router from 'vue-router'
import Convert from '@/components/Convert'
import WorkUtils from '@/components/WorkUtils'
import post from '@/components/post'
import think from '@/components/think'
import taskList from '@/components/legwork/taskList'
import taskDetail from '@/components/legwork/taskDetail'
import editor from '@/components/editor'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import chatgpt from '@/components/chatgpt'

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
      path: '/legwork/task',
      name: 'taskList',
      component: taskList,
      meta: {
        title: '任务列表'
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
