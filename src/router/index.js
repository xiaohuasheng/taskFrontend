import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Note from '@/components/Note'
import Convert from '@/components/Convert'
import WorkUtils from '@/components/WorkUtils'

Vue.use(Router)

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
    }
  ]
})
