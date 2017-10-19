<template>
  <div class='weekly'>
    <h1 class='centered'>{{ msg }}</h1>
    <div class='ui stackable very relaxed grid container'>
      <div class='three column computer one column mobile row'>
        <div class='sixteen wide column'>
          <project-menu v-bind:projects='projects'></project-menu>
          <todo-list
            v-on:add-todo='addTodo'
            v-bind:project='project'></todo-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import debug from 'debug';
import { mapGetters } from 'vuex';

// import * as db from '@/database';
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
        // done: false,
      },
    };
  },
  created() {
    this.fetchTodos();
    // db.onChange(() => this.fetchTodos());
  },
  // watch: {
  //   $route: 'fetchTodos',
  // },
  computed: {
    currentTodos() {
      return this.currentProjectTodos.filter(this.filterTodo.bind(this));
    },

    currentProjectTodos() {
      return this.projectTodos(this.project);
    },

    projects() {
      const props = Array.from(this.projectNames).map(name => ({
        name,
        path: `todos/${name}`,
        title: titleize(name),
        pendingCount: this.pendingProjectTodosCount(name),
      }));
      log('projects', props, this.projectNames);
      return props;
    },

    ...mapGetters([
      'projectNames',
    ]),
  },

  methods: {
    filterTodo(todo) {
      return Object.entries(this.filters).every(([filter, val]) => todo[filter] === val);
    },

    addTodo(todo) {
      const project = titleize(this.project);

      this.$store.dispatch('addTodo', { ...todo, project });
    },

    pendingProjectTodosCount(project) {
      return this.projectTodos(project).filter(todo => !todo.done).length;
    },

    fetchTodos() {
      this.isLoading = true;
      this.$store.dispatch('fetchTodos');
    },

    projectTodos(project) {
      return this.$store.getters.projectTodos(project);
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
