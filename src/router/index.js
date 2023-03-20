import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Note from '@/components/Note'
import Convert from '@/components/Convert'
import WorkUtils from '@/components/WorkUtils'
import post from '@/components/post'
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
      name: 'workUtils',
      component: WorkUtils
    },
    {
      path: '/task',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/note',
      name: 'note',
      component: Note
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
    }
  ]
})
