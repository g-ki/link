import Vue from 'vue';
import Router from 'vue-router';
import Chat from '@/modules/chat';

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: Chat },
    {
      path: '/c',
      component: Chat,
      children: [
        { path: 'new', name: 'chat-new', component: Chat },
        { path: ':id', name: 'chat-show', component: Chat },
      ],
    },
  ],
});


export default router;
