import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import EditTodoModal from '@/components/EditTodoModal';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/todos/home',
    },
    {
      path: '/todos/:project',
      name: 'home',
      component: Home,
      props: true,
      children: [
        {
          path: 'edit/:id',
          name: 'edit-todo',
          component: EditTodoModal,
        },
      ],
    },
  ],
});
