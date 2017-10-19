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
import { mapGetters } from 'vuex';

// import * as db from '@/database';
// import '@/database/seed';

import { titleize } from '@/utils';
import TodoList from '@/components/TodoList';
import ProjectMenu from '@/components/ProjectMenu';

export default {
  name: 'Home',
  props: ['project'],
  components: {
    TodoList,
    ProjectMenu,
  },
  data() {
    return {
      msg: 'Welcome to Your Week',
      isLoading: false,
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
    ...mapGetters([
      'projects',
    ]),
  },

  methods: {
    addTodo(todo) {
      const project = titleize(this.project);

      this.$store.dispatch('addTodo', { ...todo, project });
    },

    fetchTodos() {
      this.isLoading = true;
      this.$store.dispatch('fetchTodos');
    },
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
