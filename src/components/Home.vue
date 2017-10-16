<template>
  <div class='weekly'>
    <h1 class='centered'>{{ msg }}</h1>
    <div class='ui stackable very relaxed grid container'>
      <div class='three column computer one column mobile row'>
        <div class='sixteen wide column'>
          <project-menu v-bind:projects='projects'></project-menu>
          <todo-list
            v-on:add-todo='addTodo'
            v-on:update-todo='updateTodo'
            v-on:delete-todo='deleteTodo'
            v-bind:todos='currentTodos'></todo-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import debug from 'debug';

import * as db from '@/database';
// import '@/database/seed';

import TodoList from '@/components/TodoList';
import ProjectMenu from '@/components/ProjectMenu';

const log = debug('app:Home');

const titleize = text => text[0].toUpperCase() + text.substr(1);

export default {
  name: 'Home',
  props: ['project'],
  data() {
    return {
      msg: 'Welcome to Your Week',
      isLoading: false,
      filters: {
        done: false,
      },
      todos: [],
    };
  },
  created() {
    this.fetchTodos();
    db.onChange(() => this.fetchTodos());
  },
  watch: {
    $route: 'fetchTodos',
  },
  computed: {
    currentTodos() {
      return this.projectTodos(this.project).filter(this.filterTodo.bind(this));
    },

    projects() {
      const names = this.todos.map(todo => todo.project.toLowerCase());
      const props = Array.from(new Set(names)).map(name => ({
        name,
        path: `todos/${name}`,
        title: titleize(name),
        pendingCount: this.pendingProjectTodosCount(name),
      }));
      log('projects', props);
      return props;
    },
  },

  methods: {
    filterTodo(todo) {
      return Object.entries(this.filters).every(([filter, val]) => todo[filter] === val);
    },

    addTodo(todo) {
      const project = titleize(this.project);
      const newTodo = { project, ...todo };
      log('adding todo', newTodo);
      db.addTodo(newTodo);
    },

    updateTodo(todo) {
      return db.updateTodo(todo).then(() => {
        log('updated todo', todo);
      });
    },

    deleteTodo(todo) {
      return db.deleteTodo(todo).then(() => {
        log('deleted todo', todo);
      });
    },

    pendingProjectTodosCount(project) {
      return this.projectTodos(project).filter(todo => !todo.done).length;
    },

    projectTodos(project) {
      return this.todos.filter(todo => todo.project.toLowerCase() === project.toLowerCase());
    },

    fetchTodos() {
      this.isLoading = true;

      db.getTodos().then((doc) => {
        const todos = doc.rows.map(row => row.doc);
        log('fetched todos', todos);
        this.todos = todos;
      });
    },
  },
  components: {
    TodoList,
    ProjectMenu,
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  h1 {
    margin-bottom: 2rem;
    text-align: center;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
