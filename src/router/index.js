import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Note from '@/components/Note'
import Convert from '@/components/Convert'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
    }
  ]
})
